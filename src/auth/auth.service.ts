import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {AuthDto, SingInDto} from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {jwtSecret} from "../utils/constants";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { email, password, userName } = dto;

    const foundUser = await this.prisma.user.findUnique({where: {email}});

    if(foundUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        userName,
        hashedPassword
      }
    })

    return {message: 'sign up was successful'};
  }

  async signin(dto: SingInDto) {
    const {email, password} = dto;

    const foundUser = await this.prisma.user.findUnique({where: {email}});

    if(!foundUser) {
      throw new BadRequestException('Wrong Credentials');
    }

    const isMatch = await this.comparePasswords(password, foundUser.hashedPassword);

    if(!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email
    });

    return { token };
  }

  async signout() {
    return {message: 'sign out was successful'};
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async signToken(args: {id: string, email: string}) {
    const payload = args;

    return await this.jwt.signAsync(payload, {secret: jwtSecret});
  }
}
