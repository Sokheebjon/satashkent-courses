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
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminResponseDto } from './dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RolesGuard } from '../role/role.guard';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

@ApiTags('Admins')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @PublicRoute()
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    const result = this.adminService.create(createAdminDto);
    return result;
  }

  @ApiOkResponse({ type: AdminResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.adminService.paging(query);
    return result;
  }

  @ApiOkResponse({ type: AdminResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.adminService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const result = await this.adminService.updateById(param.id, updateAdminDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.adminService.deleteById(param.id);
    return result;
  }
}
