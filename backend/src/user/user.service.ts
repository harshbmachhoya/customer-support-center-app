import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async login(user: Users): Promise<Users | HttpException> {
    // Validate user credentials in DB
    const validUser = await this.userModel
      .findOne({ email: user.email, password: user.password })
      .exec();

    if (validUser) {
      return validUser;
    }
    throw new HttpException(
      'Incorrect email or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async createAgent(user: Users): Promise<Users | HttpException> {
    try {
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
