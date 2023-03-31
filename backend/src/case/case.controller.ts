import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { Cases } from 'src/schemas';
import { MongoExceptionFilter, createCaseSchema } from 'src/validation';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post('/create')
  @UsePipes(new ZodValidationPipe(createCaseSchema))
  @UseFilters(MongoExceptionFilter)
  async createCase(@Res() response, @Body() report: Cases) {
    const newUser = await this.caseService.createCase(report);
    return response.status(HttpStatus.CREATED).json(newUser);
  }
}
