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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../../../../shared/modules/users/dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdateUserDto } from '../../../../shared/modules/users/dto/update-user.dto';
import { CreateUserDto } from '../../../../shared/modules/users/dto/create-user.dto';
import { RolesGuard } from '../role/role.guard';
import { UserService } from '@shared/modules/users/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const result = this.userService.create(createUserDto);
    return result;
  }

  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.userService.paging(query);
    return result;
  }

  @ApiOkResponse({ type: UserResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.userService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.updateById(param.id, updateUserDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.userService.deleteById(param.id);
    return result;
  }
}
