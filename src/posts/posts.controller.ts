import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PostSchema } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题' })
  @IsNotEmpty({ message: '请输入标题！' })
  title: string;
  @ApiProperty({ description: '帖子内容' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  // 注入依赖
  constructor(
    @InjectModel(PostSchema)
    private readonly postModel: ModelType<PostSchema>,
  ) {}

  @Get()
  @ApiOperation({ summary: '帖子列表' })
  async index() {
    const posts = await this.postModel.find();
    return posts;
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() CreatePostDto: CreatePostDto) {
    const post = await this.postModel.create(CreatePostDto);
    return post;
  }

  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async details(@Param('id') id: string) {
    const post = await this.postModel.findById(id);
    return post;
  }

  @Put(':id')
  @ApiOperation({ summary: '帖子详情' })
  async updata(@Param('id') id: string, @Body() updataPostDto: CreatePostDto) {
    const post = await this.postModel.findByIdAndUpdate(id, updataPostDto);
    return post;
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
