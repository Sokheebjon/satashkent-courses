import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PagingQueryDto, ParamDto } from '@shared';
import { RolesGuard } from './role.guard';
import { Roles } from '@shared/decorators/role.decorator';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.roleService.create(createRoleDto);
    return result;
  }

  @Get()
  async findPagin(@Query() query: PagingQueryDto) {
    const result = await this.roleService.paging(query);
    return result;
  }

  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.roleService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(@Param() param: ParamDto, @Body() updateRoleDto: UpdateRoleDto) {
    const result = await this.roleService.updateById(param.id, updateRoleDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.roleService.deleteById(param.id);
    return result;
  }
}
