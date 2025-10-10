import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { SharedCategoriesModule } from "@shared/modules/categories/categories.module";

@Module({
    imports: [SharedCategoriesModule],
    controllers: [CategoriesController],
    
})
export class CategoriesModule {}