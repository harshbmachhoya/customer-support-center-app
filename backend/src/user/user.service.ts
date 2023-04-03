import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Roles, RolesDocument, Users, UsersDocument } from '../schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(Roles.name) private roleModel: Model<RolesDocument>,
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

  async get(userId: ObjectId): Promise<Users> {
    return (await this.userModel
      .findOne({ _id: userId })
      .exec()) as unknown as Users;
  }

  async updateUser(
    userId: ObjectId,
    user: Users,
  ): Promise<Users | HttpException> {
    const userFound = await this.get(userId);

    if (!userFound || userFound === null) {
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.userModel
      .findOneAndUpdate(
        { _id: userId },
        {
          ...user,
          updatedDate: Date.now(),
        },
      )
      .exec()
      .catch((err) => {
        if (err.code === 11000) {
          throw new HttpException(
            'Duplicate record found.',
            HttpStatus.NOT_IMPLEMENTED,
          );
        }
        throw new HttpException(
          'Something went wrong!',
          HttpStatus.NOT_IMPLEMENTED,
        );
      });
  }

  async deleteUser(userId: ObjectId): Promise<Users | HttpException> {
    try {
      const deletedUser = await this.userModel.findByIdAndRemove(userId);
      if (!deletedUser || deletedUser === null) {
        throw new HttpException('User not found!', HttpStatus.NOT_IMPLEMENTED);
      } else {
        return deletedUser;
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  async listUser(): Promise<Users[] | HttpException> {
    try {
      return this.userModel.find();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
  async getRole(): Promise<Roles[] | HttpException> {
    try {
      return this.roleModel.find();
    } catch (err) {
      return new HttpException(err, HttpStatus.NOT_IMPLEMENTED);
    }
  }
}
