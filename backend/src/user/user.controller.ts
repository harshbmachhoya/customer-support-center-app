import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { createAgentSchema } from '../validation';
import { Users } from '../schemas';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'nestjs-zod';

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

  @Post('/create/agent')
  // using schema
  @UsePipes(new ZodValidationPipe(createAgentSchema))
  async createAgent(@Res() response, @Body() user: Users) {
    const newUser = await this.userServerice.createAgent(user);
    return response.status(HttpStatus.CREATED).json(newUser);
  }
}
