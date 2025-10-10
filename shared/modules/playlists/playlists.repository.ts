import { BaseRepository } from '@shared';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaylistDocument } from './playlists.schema';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistsRepository extends BaseRepository<
  PlaylistDocument,
  CreatePlaylistDto,
  UpdatePlaylistDto
> {
  protected readonly logger = new Logger(PlaylistsRepository.name);

  constructor(
    @InjectModel(PlaylistDocument.name) playlistModel: Model<PlaylistDocument>,
  ) {
    super(playlistModel);
  }
}
