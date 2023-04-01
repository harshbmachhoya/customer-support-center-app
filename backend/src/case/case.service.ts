import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cases, CasesDocument, IUsers, Users } from 'src/schemas';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Cases.name) private caseModel: Model<CasesDocument>,
    @InjectModel(Users.name) private userModel: Model<CasesDocument>,
  ) {}

  async availableAgent(): Promise<IUsers> {
    return this.userModel.findOne(
      {
        case: { $eq: null },
      },
      { _id: 1, fullName: 1, email: 1 },
    ) as unknown as IUsers;
  }

  async createCase(report: Cases): Promise<Cases | HttpException> {
    try {
      const agent: IUsers = await this.availableAgent();
      report.supportAgent = agent ? agent : null;
      const newCase = await new this.caseModel(report).save();

      if (agent) {
        await Promise.resolve(
          this.userModel.findOneAndUpdate(
            { _id: agent._id },
            { case: newCase._id },
          ),
        );
      }
      return newCase;
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async resolveCase(caseId: ObjectId): Promise<void | HttpException> {
    try {
      await Promise.resolve(
        this.caseModel.findOneAndUpdate({ _id: caseId }, { isResolved: true }),
      ).then(
        async () =>
          await Promise.resolve(
            this.userModel.findOneAndUpdate({ case: caseId }, { case: null }),
          ),
      );
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async listCase(): Promise<Cases[] | HttpException> {
    try {
      return this.caseModel.find();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
