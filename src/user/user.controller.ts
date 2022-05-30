import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
//import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(
        @GetUser() user: User,
        @GetUser('email') email: string,){
            return user;
        }

    @Patch()
    editUser(){}
}
