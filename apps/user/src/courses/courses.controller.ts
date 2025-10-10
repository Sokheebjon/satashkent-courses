import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CoursesService } from "@shared/modules/courses/courses.service";
import { CreateCourseDto } from "@shared/modules/courses/dto/create-course.dto";
import { UpdateCourseDto } from "@shared/modules/courses/dto/update-course.dto";
import { PagingQueryDto } from "@shared/validator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CourseResponseDto } from "@shared/modules/courses/dto/response.dto";


@ApiTags('Courses')
@Controller('courses')
export class CoursesController {

    constructor(
        private readonly service: CoursesService
    ) {}

    @ApiOkResponse({ type: CourseResponseDto, isArray: true })
    @Get()
    async pagin(@Query() query: PagingQueryDto) {
        return this.service.pagin({}, query);
    }

    @ApiOkResponse({ type: CourseResponseDto })
    @Get("/:id")
    async findById(@Param("id") id: string) {
        return this.service.findById(id);
    }

    @Post()
    async create(@Body() body: CreateCourseDto) {
        return this.service.create(body);
    }

    @Put("/:id")
    async update(@Param("id") id: string, @Body() body: UpdateCourseDto) {
        return this.service.updateOne(id, body);
    }

    @Delete("/:id")
    async delete(@Param("id") id: string) {
        return this.service.deleteById(id);
    }

}
