import { IsNotEmpty, IsNumber, IsObject } from "class-validator";

export class GeneratePaymentSlipDto {
	@IsNumber()
	@IsNotEmpty()
	totalAmount: number;

	@IsObject()
	@IsNotEmpty()
	customerInfo: any;
}
