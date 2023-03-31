import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesSchema, UsersSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cases', schema: CasesSchema },
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
