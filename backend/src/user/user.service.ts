import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { ResetUserPasswordDto } from "./dto/reset-user-password";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Client, InstallmentsResponse, PurchasesResponse } from "./entities/client.entity";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}

	async updateInstallments(purchaseId: number, installmentNumbers: number[], status: string): Promise<string> {
		const { data } = await firstValueFrom(
			this.httpService
				.put<string>(`http://localhost:3001/client/updateInstallments/${purchaseId}`, { installmentNumbers, status })
				.pipe(
					catchError((error: AxiosError) => {
						console.log(error);
						throw error;
					}),
				),
		);
		return data;
	}

	async findByDocumentNumber(documentNumber: string): Promise<Client> {
		const { data } = await firstValueFrom(
			this.httpService.get<Client>(`http://localhost:3001/client/documentNumber/${documentNumber}`).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw error;
				}),
			),
		);
		return data;
	}

	async findAllPurchases(documentNumber: string): Promise<PurchasesResponse> {
		const { data } = await firstValueFrom(
			this.httpService.get<PurchasesResponse>(`http://localhost:3001/client/${documentNumber}/purchases/all`).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw error;
				}),
			),
		);
		return data;
	}

	async findInstallmentsByProduct(productId: number): Promise<InstallmentsResponse> {
		const { data } = await firstValueFrom(
			this.httpService.get<InstallmentsResponse>(`http://localhost:3001/client/${productId}/installments`).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw error;
				}),
			),
		);
		return data;
	}

	async resetPassword(updatePasswordDto: ResetUserPasswordDto) {
		const { email, newPassword } = updatePasswordDto;
		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await this.prisma.user.update({
			where: { email },
			data: { password: hashedPassword },
		});

		return { message: "Password updated successfully" };
	}

	async create(createUserDto: CreateUserDto) {
		const data = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, 10),
		};

		const createdUser = await this.prisma.user.create({
			data,
		});

		return {
			...createdUser,
			password: undefined,
		};
	}
	async findAll() {
		return await this.prisma.user.findMany();
	}

	async findOne(id: number) {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	async update(id: number, updateUserDto: UpdateUserDto) {
		const data = {
			...updateUserDto,
			password: await bcrypt.hash(updateUserDto.password, 10),
		};

		return await this.prisma.user.update({
			where: {
				id,
			},
			data,
		});
	}

	async remove(id: number) {
		await this.prisma.user.delete({
			where: {
				id,
			},
		});

		return "deleted";
	}
}
