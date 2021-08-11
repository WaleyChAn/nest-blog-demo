import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest-blog', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
