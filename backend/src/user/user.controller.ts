import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ResetUserPasswordDto } from "./dto/reset-user-password";
import { Client, InstallmentsResponse, PurchasesResponse } from "./entities/client.entity";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Put("updateInstallments/:purchaseId")
	async updateInstallments(@Param("purchaseId") purchaseId: number, @Body() updateInstallmentsDto: any) {
		return this.userService.updateInstallments(purchaseId, updateInstallmentsDto.installments);
	}

	@Get("documentNumber/:documentNumber")
	async findByDocumentNumber(@Param("documentNumber") documentNumber: string): Promise<Client> {
		return this.userService.findByDocumentNumber(documentNumber);
	}

	@Get(":documentNumber/purchases/all")
	async findAllPurchases(@Param("documentNumber") documentNumber: string): Promise<PurchasesResponse> {
		return this.userService.findAllPurchases(documentNumber);
	}

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

	@Get("all")
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userService.findOne(+id);
	}

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
