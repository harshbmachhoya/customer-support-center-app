import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  Query,
  HttpStatus,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { Cases } from 'src/schemas';
import { MongoExceptionFilter, createCaseSchema } from 'src/validation';
import { ZodValidationPipe } from 'nestjs-zod';
import { ObjectId } from 'mongoose';

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

  @Put('/resolve')
  @UseFilters(MongoExceptionFilter)
  async resolveCase(@Res() response, @Query('caseId') caseId: ObjectId) {
    return await this.caseService
      .resolveCase(caseId)
      .then(() =>
        response
          .status(HttpStatus.OK)
          .json({ message: 'Case resolved successfully.' }),
      )
      .catch((err) => {
        return response
          .status(err.status)
          .json({ statusCode: err.status, message: err.message });
      });
  }

  @Get('/list')
  @UseFilters(MongoExceptionFilter)
  async listCase(@Res() response) {
    const allCases = await this.caseService.listCase();
    return response.status(HttpStatus.OK).json({ cases: allCases });
  }
}
