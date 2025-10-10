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
import { CategoriesService } from '@shared/modules/categories/categories.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from '@shared/modules/categories/dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdateCategoryDto } from '@shared/modules/categories/dto/update-category.dto';
import { CreateCategoryDto } from '@shared/modules/categories/dto/create-category.dto';
import { RolesGuard } from '../role/role.guard';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = this.categoriesService.create(createCategoryDto);
    return result;
  }

  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.categoriesService.pagin({}, query);
    return result;
  }

  @ApiOkResponse({ type: CategoryResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.categoriesService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.updateById(param.id, updateCategoryDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.categoriesService.deleteById(param.id);
    return result;
  }
}
