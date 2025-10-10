import { PlaylistDocument } from './playlists.schema';
import { PlaylistsRepository } from './playlists.repository';
import { BaseError, BaseService, ErrorCode } from '@shared';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Injectable } from '@nestjs/common';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { SaveOptions } from 'mongoose';

@Injectable()
export class PlaylistsService extends BaseService<
  PlaylistDocument,
  CreatePlaylistDto,
  UpdatePlaylistDto
> {
  constructor(protected readonly repository: PlaylistsRepository) {
    super();
  }

  create = async (createPlaylistDto: CreatePlaylistDto, options?: SaveOptions) => {
    try {
      const playlist = await this.repository.create(createPlaylistDto, options);
      return playlist;
    } catch (error) {
      if (
        error.code == 11000 &&
        ['MongoError', 'MongoServerError'].includes(error.name)
      ) {
        throw new BaseError(ErrorCode.Exist, 'AllReadyExist', error);
      }
      throw BaseError.Unknown(error);
    }
  };
}
