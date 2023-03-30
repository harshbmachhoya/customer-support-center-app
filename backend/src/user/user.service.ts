import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

  async createUser(user: Users): Promise<Users | HttpException> {
    try {
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async updateUser(
    userId: ObjectId,
    user: Users,
  ): Promise<Users | HttpException> {
    try {
      const updatedUser = this.userModel.findByIdAndUpdate(
        userId,
        { ...user, updatedDate: Date.now() },
        {
          new: true,
        },
      );
      return updatedUser;
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async deleteUser(userId: ObjectId): Promise<Users | HttpException> {
    try {
      const deletedUser = this.userModel.findByIdAndRemove(userId);
      return deletedUser;
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
