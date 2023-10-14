import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNameSearchDTO } from './dto/product-name-search.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IscustomerInterceptor } from './interceptor/iscustomer/iscustomer.interceptor';
import { ProductCategorySearchDTO } from './dto/product-category-search.dto';
import { IsstaffGuard } from 'src/guards/isstaff/isstaff.guard';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiHeader({
  name: 'Authentication',
  description: 'JWT Bearer Token',
})
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: 201, description: 'The Product has been successfully created.'})
  @Post()
  @UseGuards(IsstaffGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({ status: 200, description: 'Displays all products'})
  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(IscustomerInterceptor)
  findAll() {
    return this.productsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Displays product'})
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(IscustomerInterceptor)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Updates product'})
  @Patch(':id')
  @UseGuards(IsstaffGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiResponse({ status: 200, description: 'Deletes product'})
  @Delete(':id')
  @UseGuards(IsstaffGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @ApiResponse({ status: 200, description: 'Searches for product by name'})
  @Post('search-product-name')
  @UseGuards(AuthGuard)
  searchProductsByName(@Body() productNameSearchDTO: ProductNameSearchDTO) {
    return this.productsService.findProductByName(productNameSearchDTO.productName);
  }

  @ApiResponse({ status: 200, description: 'Searches for product by category'})
  @Post('search-product-category')
  @UseGuards(AuthGuard)
  searchProductsByCategory(@Body() productCategorySearchDTO: ProductCategorySearchDTO) {
    return this.productsService.findProductByCategory(productCategorySearchDTO.category);
  }
}
