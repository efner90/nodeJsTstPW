import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
    Delete,
    Param,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiBody,
    ApiParam,
  } from '@nestjs/swagger';
  import { CreateCommentDto } from './dto/create-comment.dto';
  
  @ApiTags('Комментарии')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiBody({ type: CreateCommentDto }) // описываем тело запроса
    create(@Body() body: CreateCommentDto, @Req() req) {
      return this.commentsService.create(body.text, body.cardId, req.user);
    }
  
    @Get(':cardId')
    @ApiOperation({ summary: 'Получить все комментарии для карточки' })
    @ApiParam({ name: 'cardId', type: Number, description: 'ID карточки' })
    findAll(@Param('cardId') cardId: string) {
      return this.commentsService.findAll(+cardId);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Удалить комментарий' })
    @ApiParam({ name: 'id', type: Number, description: 'ID комментария' })
    remove(@Param('id') id: string, @Req() req) {
      return this.commentsService.remove(+id, req.user.userId);
    }
  }
  