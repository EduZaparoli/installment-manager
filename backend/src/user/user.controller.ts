import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
	ParseIntPipe,
	UseGuards,
	HttpStatus,
	HttpException,
	Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResetUserPasswordDto } from "./dto/reset-user-password";
import { Client, InstallmentsResponse, PurchasesResponse } from "./entities/client.entity";
import { CustomerInfoDto } from "./dto/customerInfo.dto";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Response } from "express";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Post("paymentSlip")
	async generatePaymentSlip(@Body() body: { totalAmount: number; customerInfo: CustomerInfoDto }) {
		const { totalAmount, customerInfo } = body;
		const boletoHtml = await this.userService.generatePaymentSlip(totalAmount, customerInfo);
		return boletoHtml;
	}

	@UseGuards(JwtAuthGuard)
	@Put("updateInstallments/:purchaseId")
	async updateInstallments(
		@Param("purchaseId", ParseIntPipe) purchaseId: number,
		@Body() body: { installmentNumbers: number[]; status: string },
	) {
		const { installmentNumbers, status } = body;
		return this.userService.updateInstallments(purchaseId, installmentNumbers, status);
	}

	@UseGuards(JwtAuthGuard)
	@Get("documentNumber/:documentNumber")
	async findByDocumentNumber(@Param("documentNumber") documentNumber: string): Promise<Client> {
		try {
			return await this.userService.findByDocumentNumber(documentNumber);
		} catch (error) {
			if (error.status === HttpStatus.NOT_FOUND) {
				throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
			}
			throw error;
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get(":documentNumber/purchases/all")
	async findAllPurchases(@Param("documentNumber") documentNumber: string): Promise<PurchasesResponse> {
		return this.userService.findAllPurchases(documentNumber);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":productId/installments")
	async findInstallmentsByProduct(@Param("productId") productId: number): Promise<InstallmentsResponse> {
		return this.userService.findInstallmentsByProduct(productId);
	}

	@Patch("reset-password")
	async resetPassword(@Body() updatePasswordDto: ResetUserPasswordDto) {
		return this.userService.resetPassword(updatePasswordDto);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Get("all")
	findAll() {
		return this.userService.findAll();
	}

	@UseGuards(LocalAuthGuard)
	@Get("email/:email")
	findByEmail(@Param("email") email: string) {
		return this.userService.findByEmail(email);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":documentNumber/payment-slips")
	async getPaymentSlips(@Param("documentNumber") documentNumber: string) {
		try {
			const paymentSlips = await this.userService.findPaymentSlipsByCustomer(documentNumber);
			return paymentSlips;
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get("download/paymentSlip/:id")
	async downloadPaymentSlip(@Param("id") id: number, @Res() res: Response) {
		return this.userService.downloadPaymentSlip(id, res);
	}
}
