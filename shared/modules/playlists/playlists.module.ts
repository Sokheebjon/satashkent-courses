import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared';
import { AuthModule } from 'shared/modules/auth';
import { PlaylistsService } from './playlists.service';
import { PlaylistsRepository } from './playlists.repository';
import { PlaylistDocument, PlaylistSchema } from './playlists.schema';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: PlaylistDocument.name,
        schema: PlaylistSchema,
      },
    ]),
  ],
  providers: [PlaylistsService, PlaylistsRepository],
  exports: [PlaylistsService, PlaylistsRepository],
})
export class SharedPlaylistsModule {}
