import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ValidatorBuilder from '../../../../contexts/validation-service/application/validatorBuilder.provider';
import IpValidator from '../../../../contexts/validation-service/application/ipValidator.provider';
import CurrencyValidator from '../../../../contexts/validation-service/application/currencyValidator.provider';
import CountTransactionsPerPeriod from '../../../../contexts/validation-service/application/countTransactionsPerPeriod';
import BalanceValidator from '../../../../contexts/validation-service/application/balanceValidator.provider';

const validationServiceMetadata: ModuleMetadata = {
  providers: [
    ValidatorBuilder,
    IpValidator,
    CurrencyValidator,
    CountTransactionsPerPeriod,
    BalanceValidator,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
};

export { validationServiceMetadata };
