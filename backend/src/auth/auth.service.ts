import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { UserPayload } from "./models/UserPayload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./models/UserToken";
import { UserLogin } from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	login(user: UserLogin): UserToken {
		const payload: UserPayload = {
			sub: user.id,
			email: user.email,
			password: user.password,
		};

		const jwtToken = this.jwtService.sign(payload);

		return {
			access_token: jwtToken,
		};
	}

	async validateUserById(userId: number) {
		const user = await this.userService.findById(userId);
		if (!user) {
			throw new UnauthorizedException("User not found");
		}
		return user;
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException("Email address or password provided is incorrect!");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Email address or password provided is incorrect!");
		}

		return {
			...user,
			password: undefined,
		};
	}
}
