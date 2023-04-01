import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { createUserSchema, MongoExceptionFilter } from '../validation';
import { Users } from '../schemas';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { ObjectId } from 'mongoose';
import { Delete } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userServerice: UserService) {}

  @Post('/login')
  async logIn(@Res() response, @Body() user: Users) {
    if (user.email && user.password) {
      return this.userServerice
        .login(user)
        .then((isValid) => response.status(HttpStatus.OK).json(isValid))
        .catch((err) =>
          response
            .status(err.status)
            .json({ statusCode: err.status, message: err.message }),
        );
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong!',
      });
    }
  }

  @Post('/create')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @UseFilters(MongoExceptionFilter)
  async createUser(@Res() response, @Body() user: Users) {
    const newUser = await this.userServerice.createUser(user);
    return response.status(HttpStatus.CREATED).json(newUser);
  }

  @Put('/update')
  @UseFilters(MongoExceptionFilter)
  async updateUser(
    @Res() response,
    @Query('userId') userId: ObjectId,
    @Body(new ZodValidationPipe(createUserSchema)) user: Users,
  ) {
    return await this.userServerice
      .updateUser(userId, user)
      .then((updatedUser) =>
        response
          .status(HttpStatus.OK)
          .json({ message: 'User updated successfully.', updatedUser }),
      )
      .catch((err) => {
        return response
          .status(err.status)
          .json({ statusCode: err.status, message: err.message });
      });
  }

  @Delete('/delete')
  @UseFilters(MongoExceptionFilter)
  async deleteUser(@Res() response, @Query('userId') userId: ObjectId) {
    const deletedUser = await this.userServerice.deleteUser(userId);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'User deleted.', deletedUser });
  }

  @Get('/list')
  @UseFilters(MongoExceptionFilter)
  async listUser(@Res() response) {
    const allUsers = await this.userServerice.listUser();
    return response.status(HttpStatus.OK).json({ users: allUsers });
  }
}
