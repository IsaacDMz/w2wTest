import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService} from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config"; 
import { UpdateUserDTO } from "./dto";
import { User } from "@prisma/client";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ){}

    async updateProfile(user :User){
        this.prisma.user.update({
            where:{
                email: user.email,
            },
            data: user
        });
    }
}
