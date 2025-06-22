import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { compare } from 'bcryptjs';
import { SignupDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;
    const user = await this.usersRepository.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });
    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }
    const hashedPassword = await hash(password, 12);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      categories: {
        createMany: {
          data: [
            // Income
            { name: 'Salário', icon: 'travel', type: 'INCOME' },
            { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
            { name: 'Outro', icon: 'other', type: 'INCOME' },
            // Expense
            { name: 'Casa', icon: 'home', type: 'EXPENSE' },
            { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
            { name: 'Educação', icon: 'education', type: 'EXPENSE' },
            { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
            { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
            { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
            { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
            { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
            { name: 'Outro', icon: 'other', type: 'EXPENSE' },
          ],
        },
      },
    });

    return user;
  }
}
