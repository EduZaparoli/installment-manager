import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetUserPasswordDto } from './dto/reset-user-password';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async resetPassword(updatePasswordDto: ResetUserPasswordDto) {
    const { email, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
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

    return 'deleted';
  }
}
