import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductNameSearchDTO } from './dto/product-name-search.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IscustomerInterceptor } from './interceptor/iscustomer/iscustomer.interceptor';
import { ProductCategorySearchDTO } from './dto/product-category-search.dto';
import { IsstaffGuard } from 'src/guards/isstaff/isstaff.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(IsstaffGuard)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseInterceptors(IscustomerInterceptor)
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(IscustomerInterceptor)
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(IsstaffGuard)
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(IsstaffGuard)
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }

    //Search for products by name
    @Get('search-product-name')
    searchProductsByName(@Body() productNameSearchDTO: ProductNameSearchDTO) {
        return this.productsService.findProductByName(productNameSearchDTO.productName);
    }

    @Get('search-product-name')
    @UseGuards(AuthGuard)
    @UseInterceptors(IscustomerInterceptor)
    searchProductsByCategory(@Body() categoryName: ProductCategorySearchDTO) {
        return this.productsService.findProductByCategory(categoryName.category);
    }
}
