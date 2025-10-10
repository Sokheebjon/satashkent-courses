import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared';
import { AuthModule } from 'shared/modules/auth';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { CategoryDocument, CategorySchema } from './categories.schema';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: CategoryDocument.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class SharedCategoriesModule {}
