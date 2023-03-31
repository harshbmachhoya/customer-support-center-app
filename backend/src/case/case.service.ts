import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cases, CasesDocument, Users, UsersDocument } from 'src/schemas';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Cases.name) private caseModel: Model<CasesDocument>,
    @InjectModel(Users.name) private userModel: Model<CasesDocument>,
  ) {}

  async assignAgent(): Promise<UsersDocument> {
    return this.userModel.findOne({
      case: { $in: [null, {}] },
    });
    // console.log(availableAgent);
  }

  async createCase(report: Cases): Promise<Cases | HttpException> {
    try {
      report.supportAgent = await this.assignAgent();
      const newCase = new this.caseModel(report);
      return newCase.save();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
