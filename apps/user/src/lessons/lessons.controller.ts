import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { LessonsService } from "@shared/modules/lessons/lessons.service";
import { CreateLessonDto } from "@shared/modules/lessons/dto/create-lesson.dto";
import { UpdateLessonDto } from "@shared/modules/lessons/dto/update-lesson.dto";
import { PagingQueryDto } from "@shared/validator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LessonResponseDto } from "@shared/modules/lessons/dto/response.dto";

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @ApiOkResponse({ type: LessonResponseDto, isArray: true })
  @Get()
  async pagin(@Query() query: PagingQueryDto) {
    return this.service.pagin({}, query);
  }

  @ApiOkResponse({ type: LessonResponseDto })
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() body: CreateLessonDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateLessonDto) {
    return this.service.updateOne(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
