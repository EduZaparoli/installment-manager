import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { ResetUserPasswordDto } from "./dto/reset-user-password";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Client, InstallmentsResponse, PurchasesResponse } from "./entities/client.entity";
import { CustomerInfoDto } from "./dto/customerInfo.dto";
import * as moment from "moment";
import { createReadStream } from "fs";
import { join } from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ticket = require("node-boleto").Boleto;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}

	async generatePaymentSlip(totalAmount: number, customerInfo: CustomerInfoDto) {
		const payer = `${customerInfo.name}\n${customerInfo.cpf}\n${customerInfo.address.street}, ${customerInfo.address.number} - ${customerInfo.address.neighborhood}\n${customerInfo.address.city} - ${customerInfo.address.state}\n${customerInfo.address.postalCode}`;

		const ticket = new Ticket({
			banco: "bradesco",
			data_emissao: new Date(),
			data_vencimento: new Date(new Date().getTime() + 5 * 24 * 3600 * 1000),
			valor: totalAmount * 100,
			nosso_numero: "12345678",
			numero_documento: "1234",
			cedente: "Your Company",
			cedente_cnpj: "10.120.000/1345-00",
			agencia: "0001",
			codigo_cedente: "12345",
			carteira: "25",
			pagador: payer,
			local_de_pagamento: "Pague preferencialmente no Bradesco",
		});

		return new Promise((resolve, reject) => {
			ticket.renderHTML(async (html: string) => {
				try {
					const paymentSlip = await this.prisma.paymentSlip.create({
						data: {
							html,
							paymentDate: null,
							status: "generated",
							value: totalAmount,
							payer: customerInfo.name,
							documentNumber: customerInfo.cpf,
							barCode: ticket.barcode_data,
							dueDate: new Date(ticket.data_vencimento),
							issuanceDate: new Date(ticket.data_emissao),
						},
					});

					const paymentSlipInstallment = await this.prisma.paymentSlipInstallment.create({
						data: {
							totalValue: totalAmount,
							paymentSlipId: paymentSlip.id,
						},
					});

					const installments = customerInfo.installments;
					for (const installment of installments) {
						const parsedDate = moment(installment.date, "DD/MM/YYYY").toDate();
						await this.prisma.paymentSlipInstallmentItem.create({
							data: {
								paymentSlipInstallmentId: paymentSlipInstallment.id,
								purchaseId: installment.purchaseId,
								number: installment.number,
								date: parsedDate,
								value: installment.value,
							},
						});
					}

					await this.sendPaymentSlipEmail(customerInfo.email, html, ticket.barcode_data);

					resolve(paymentSlip);
				} catch (error) {
					reject(error);
				}
			});
		});
	}

	async sendPaymentSlipEmail(toEmail: string, boletoHtml: string, barcode: string) {
		const msg = {
			to: toEmail,
			from: "lethalc83@gmail.com",
			subject: "Seu Boleto de Pagamento",
			text: `Aqui está seu boleto de pagamento. Código de barras: ${barcode}`,
			html: boletoHtml,
		};

		try {
			await sgMail.send(msg);
			console.log("Email enviado com sucesso");
		} catch (error) {
			console.error("Erro ao enviar o e-mail:", error);
			throw error;
		}
	}

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
					throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
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

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async findById(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
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

	async findPaymentSlipsByCustomer(documentNumber: string) {
		const paymentSlips = await this.prisma.paymentSlip.findMany({
			where: {
				documentNumber: documentNumber,
			},
		});
		if (!paymentSlips.length) {
			throw new HttpException("No payment slips found for this customer", HttpStatus.NOT_FOUND);
		}
		return paymentSlips;
	}

	async downloadPaymentSlip(slipId: number) {
		const paymentSlip = await this.prisma.paymentSlip.findUnique({
			where: { id: slipId },
		});
		if (!paymentSlip) {
			throw new HttpException("Payment slip not found", HttpStatus.NOT_FOUND);
		}

		const filePath = join(__dirname, "../../boletos", `boleto_${slipId}.pdf`);
		return createReadStream(filePath);
	}
}
