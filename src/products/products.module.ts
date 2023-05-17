import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IscustomerInterceptor } from './interceptor/iscustomer/iscustomer.interceptor';
import { UtilService } from 'src/util/util.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService, IscustomerInterceptor, UtilService],
    exports: [ProductsService],
})
export class ProductsModule {}
