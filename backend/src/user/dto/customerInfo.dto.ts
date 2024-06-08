import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AddressDto {
	@IsString()
	@IsNotEmpty()
	street: string;

	@IsString()
	@IsNotEmpty()
	number: string;

	@IsString()
	@IsNotEmpty()
	neighborhood: string;

	@IsString()
	@IsNotEmpty()
	city: string;

	@IsString()
	@IsNotEmpty()
	state: string;

	@IsString()
	@IsNotEmpty()
	postalCode: string;
}

export class SelectedInstallmentsDto {
	@IsNumber()
	@IsNotEmpty()
	purchaseId: number;

	@IsNumber()
	@IsNotEmpty()
	number: number;

	@IsString()
	@IsNotEmpty()
	date: string;

	@IsNumber()
	@IsNotEmpty()
	value: number;
}

export class CustomerInfoDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	cpf: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@ValidateNested()
	@Type(() => AddressDto)
	address: AddressDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SelectedInstallmentsDto)
	installments: SelectedInstallmentsDto[];
}
