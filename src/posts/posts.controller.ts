import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from './auth.guard';
import { HasValidUserId } from 'src/expenses/hasValidUserId.guard';
import { IsAdminGuard } from 'src/guards/idAdmin.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(HasValidUserId)
  create(@Req() request, @Body() createPostDto: CreatePostDto) {
    const userId = request.userId;
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
