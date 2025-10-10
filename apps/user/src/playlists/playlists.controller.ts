import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PlaylistsService } from "@shared/modules/playlists/playlists.service";
import { CreatePlaylistDto } from "@shared/modules/playlists/dto/create-playlist.dto";
import { UpdatePlaylistDto } from "@shared/modules/playlists/dto/update-playlist.dto";
import { PagingQueryDto } from "@shared/validator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PlaylistResponseDto } from "@shared/modules/playlists/dto/response.dto";

@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly service: PlaylistsService) {}

  @ApiOkResponse({ type: PlaylistResponseDto, isArray: true })
  @Get()
  async pagin(@Query() query: PagingQueryDto) {
    return this.service.pagin({}, query);
  }

  @ApiOkResponse({ type: PlaylistResponseDto })
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() body: CreatePlaylistDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePlaylistDto) {
    return this.service.updateOne(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
