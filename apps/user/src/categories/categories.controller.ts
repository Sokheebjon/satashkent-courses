import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoriesService } from "@shared/modules/categories/categories.service";
import { CreateCategoryDto } from "@shared/modules/categories/dto/create-category.dto";
import { UpdateCategoryDto } from "@shared/modules/categories/dto/update-category.dto";
import { PagingQueryDto } from "@shared/validator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CategoryResponseDto } from "@shared/modules/categories/dto/response.dto";


@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly service: CategoriesService
    ) {}

    @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
    @Get()
    async pagin(@Query() query: PagingQueryDto) {
        return this.service.pagin({}, query);
    }

    @ApiOkResponse({ type: CategoryResponseDto })
    @Get("/:id")
    async findById(@Param("id") id: string) {
        return this.service.findById(id);
    }

    @Post()
    async create(@Body() body: CreateCategoryDto) {
        return this.service.create(body);
    }

    @Put("/:id")
    async update(@Param("id") id: string, @Body() body: UpdateCategoryDto) {
        return this.service.updateOne(id, body);
    }

    @Delete("/:id")
    async delete(@Param("id") id: string) {
        return this.service.deleteById(id);
    }

}
