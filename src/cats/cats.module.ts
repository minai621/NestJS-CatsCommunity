import { CommentsSchema } from './../comments/comments.schema';
import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MulterModule } from '@nestjs/platform-express';
import { Comments } from 'src/comments/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema,
      },
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
