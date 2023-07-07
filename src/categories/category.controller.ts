import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';


@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/create/category')
  createCategory(@Body() data: CategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Post('/create/unit')
  createUnit(@Body() data: CategoryDto) {
    return this.categoryService.createUnit(data);
  }

  @Get('/get/units')
  getUnits() {
    return this.categoryService.getUnits();
  }

  @Get('/get/categories')
  getCategories() {
    return this.categoryService.getCategories();
  }
}
