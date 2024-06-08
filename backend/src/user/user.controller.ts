import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResetUserPasswordDto } from "./dto/reset-user-password";
import { Client, InstallmentsResponse, PurchasesResponse } from "./entities/client.entity";
import { CustomerInfoDto } from "./dto/customerInfo.dto";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

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
		return this.userService.findByDocumentNumber(documentNumber);
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

	@UseGuards(LocalAuthGuard)
	@Patch("reset-password")
	async resetPassword(@Body() updatePasswordDto: ResetUserPasswordDto) {
		return this.userService.resetPassword(updatePasswordDto);
	}

	@UseGuards(LocalAuthGuard)
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
}
