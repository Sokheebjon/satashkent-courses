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
import { CoursesService } from '@shared/modules/courses/courses.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourseResponseDto } from '@shared/modules/courses/dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdateCourseDto } from '@shared/modules/courses/dto/update-course.dto';
import { CreateCourseDto } from '@shared/modules/courses/dto/create-course.dto';
import { RolesGuard } from '../role/role.guard';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    const result = this.coursesService.create(createCourseDto);
    return result;
  }

  @ApiOkResponse({ type: CourseResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.coursesService.pagin({}, query);
    return result;
  }

  @ApiOkResponse({ type: CourseResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.coursesService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const result = await this.coursesService.updateById(param.id, updateCourseDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.coursesService.deleteById(param.id);
    return result;
  }
}
