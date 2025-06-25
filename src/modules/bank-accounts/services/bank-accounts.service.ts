import { ValidateBankAccountsOwnershipService } from './validate-bank-account-ownership.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountsOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, color, initialBalance, type } = createBankAccountDto;
    return this.bankAccountsRepository.create({
      data: { userId, name, initialBalance, color, type },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({ where: { userId } });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
    const { name, color, initialBalance, type } = updateBankAccountDto;
    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: { name, color, initialBalance, type },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
    await this.bankAccountsRepository.delete({ where: { id: bankAccountId } });
  }
}
