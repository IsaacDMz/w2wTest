import {INestApplication,ValidationPipe} from '@nestjs/common';
import{Test} from '@nestjs/testing';
import {AppModule} from '../src/app.module'; 
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e',() => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
      );
      await app.init();
      await app.listen(3333);

      prisma = app.get(PrismaService)
      await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth',() => {
    describe('Signup',() => {
      it('should signup',()=>{
        const dto:AuthDto = {
          email:'test@gmail.com',
          password: '1234'
        }
        return pactum.spec().post('http://localhost:3333/auth/signup',
        ).withBody({})
      });
    });

    describe('Signin',() => {
      it.todo('should signin');
    });
  });

  describe('User',() => {
    describe('Get me',() => {});

    describe('Edit User',() => {});
  });

  describe('Bookmarks',() => {
    describe('Create bookmark',() => {});

    describe('Get bookmarks',() => {});

    describe('Get bookmark by id',() => {});

    describe('Delete bookmark',() => {});
  });
});