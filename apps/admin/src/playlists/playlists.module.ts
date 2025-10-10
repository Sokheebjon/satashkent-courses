import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { SharedPlaylistsModule } from '@shared/modules/playlists/playlists.module';

@Module({
  imports: [
    SharedPlaylistsModule,
  ],
  controllers: [PlaylistsController],
})
export class PlaylistsModule {}
