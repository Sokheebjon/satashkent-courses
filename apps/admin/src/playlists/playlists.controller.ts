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
import { PlaylistsService } from '@shared/modules/playlists/playlists.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistResponseDto } from '@shared/modules/playlists/dto/response.dto';
import { PagingQueryDto, ParamDto } from '@shared/validator';
import { UpdatePlaylistDto } from '@shared/modules/playlists/dto/update-playlist.dto';
import { CreatePlaylistDto } from '@shared/modules/playlists/dto/create-playlist.dto';
import { RolesGuard } from '../role/role.guard';

@ApiTags('Playlists')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    const result = this.playlistsService.create(createPlaylistDto);
    return result;
  }

  @ApiOkResponse({ type: PlaylistResponseDto, isArray: true })
  @Get()
  async paging(@Query() query: PagingQueryDto) {
    const result = await this.playlistsService.pagin({}, query);
    return result;
  }

  @ApiOkResponse({ type: PlaylistResponseDto })
  @Get(':id')
  async findOne(@Param() param: ParamDto) {
    const result = await this.playlistsService.findById(param.id);
    return result;
  }

  @Put(':id')
  async update(
    @Param() param: ParamDto,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    const result = await this.playlistsService.updateById(param.id, updatePlaylistDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param() param: ParamDto) {
    const result = await this.playlistsService.deleteById(param.id);
    return result;
  }
}
