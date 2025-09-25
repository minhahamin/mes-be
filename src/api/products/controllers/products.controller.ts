import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@ApiTags('API/PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: '품목 등록', description: '새로운 품목 정보를 등록합니다.' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: '품목이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 품목 코드입니다.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: '품목 목록 조회', description: '등록된 모든 품목 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '품목 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('low-stock')
  @ApiOperation({ summary: '재고 부족 품목 조회', description: '최소 재고 이하인 품목들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '재고 부족 품목을 성공적으로 조회했습니다.' })
  findLowStockProducts() {
    return this.productsService.findLowStockProducts();
  }

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 품목 조회', description: '특정 카테고리의 품목들을 조회합니다.' })
  @ApiParam({ name: 'category', description: '카테고리명', type: 'string' })
  @ApiResponse({ status: 200, description: '카테고리별 품목을 성공적으로 조회했습니다.' })
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Get('supplier/:supplier')
  @ApiOperation({ summary: '공급업체별 품목 조회', description: '특정 공급업체의 품목들을 조회합니다.' })
  @ApiParam({ name: 'supplier', description: '공급업체명', type: 'string' })
  @ApiResponse({ status: 200, description: '공급업체별 품목을 성공적으로 조회했습니다.' })
  findBySupplier(@Param('supplier') supplier: string) {
    return this.productsService.findBySupplier(supplier);
  }

  @Get(':id')
  @ApiOperation({ summary: '품목 상세 조회', description: '특정 품목의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '품목 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '품목 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 품목을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '품목 정보 수정', description: '기존 품목의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '품목 ID', type: 'number' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: '품목 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 품목을 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 품목 코드입니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '품목 삭제', description: '기존 품목을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '품목 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '품목이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 품목을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
