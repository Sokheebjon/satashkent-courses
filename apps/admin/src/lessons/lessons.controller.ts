import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from '@shared/modules/lessons/lessons.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LessonResponseDto } from '@shared/modules/lessons/dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdateLessonDto } from '@shared/modules/lessons/dto/update-lesson.dto';
import { CreateLessonDto } from '@shared/modules/lessons/dto/create-lesson.dto';
import { RolesGuard } from '../role/role.guard';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    const result = this.lessonsService.create(createLessonDto);
    return result;
  }

  @ApiOkResponse({ type: LessonResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.lessonsService.pagin({}, query);
    return result;
  }

  @ApiOkResponse({ type: LessonResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.lessonsService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const result = await this.lessonsService.updateById(param.id, updateLessonDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.lessonsService.deleteById(param.id);
    return result;
  }
}
