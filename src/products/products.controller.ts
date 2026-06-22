import { Controller, Logger, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  private readonly logger = new Logger('ProductsController');
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('product.create')
  create(@Payload() createProductDto: CreateProductDto) {
    this.logger.log('Creating product');
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('product.find.all')
  findAll(@Payload() paginationDto: PaginationDto) {
    this.logger.log('Receiving find.all message');
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern('product.find.one')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('product.update')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern('product.delete')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern('product.validate')
  validateProduct(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
