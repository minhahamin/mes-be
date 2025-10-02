import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';

@ApiTags('API/INVENTORY')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: '재고 등록', description: '새로운 재고 항목을 등록합니다.' })
  @ApiBody({ type: CreateInventoryDto })
  @ApiResponse({ status: 201, description: '재고가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 제품입니다.' })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: '재고 목록 조회', description: '등록된 모든 재고 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '재고 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('low-stock')
  @ApiOperation({ summary: '부족 재고 조회', description: '재주문이 필요한 재고 항목들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '부족 재고를 성공적으로 조회했습니다.' })
  findLowStock() {
    return this.inventoryService.findLowStock();
  }

  @Get('out-of-stock')
  @ApiOperation({ summary: '재고 부족 항목 조회', description: '재고가 없는 항목들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '재고 부족 항목을 성공적으로 조회했습니다.' })
  findOutOfStock() {
    return this.inventoryService.findOutOfStock();
  }

  @Get('excess-stock')
  @ApiOperation({ summary: '과잉 재고 조회', description: '최대 재고를 초과한 항목들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '과잉 재고를 성공적으로 조회했습니다.' })
  findExcessStock() {
    return this.inventoryService.findExcessStock();
  }

  @Get('total-value')
  @ApiOperation({ summary: '총 재고 가치 조회', description: '전체 재고의 총 가치를 조회합니다.' })
  @ApiResponse({ status: 200, description: '총 재고 가치를 성공적으로 조회했습니다.' })
  getTotalInventoryValue() {
    return this.inventoryService.getTotalInventoryValue();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 재고 조회', description: '특정 상태의 재고 항목들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '재고 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 재고를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.inventoryService.findByStatus(status);
  }

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 재고 조회', description: '특정 카테고리의 재고 항목들을 조회합니다.' })
  @ApiParam({ name: 'category', description: '카테고리', type: 'string' })
  @ApiResponse({ status: 200, description: '카테고리별 재고를 성공적으로 조회했습니다.' })
  findByCategory(@Param('category') category: string) {
    return this.inventoryService.findByCategory(category);
  }

  @Get('supplier/:supplier')
  @ApiOperation({ summary: '공급업체별 재고 조회', description: '특정 공급업체의 재고 항목들을 조회합니다.' })
  @ApiParam({ name: 'supplier', description: '공급업체', type: 'string' })
  @ApiResponse({ status: 200, description: '공급업체별 재고를 성공적으로 조회했습니다.' })
  findBySupplier(@Param('supplier') supplier: string) {
    return this.inventoryService.findBySupplier(supplier);
  }

  @Get('location/:location')
  @ApiOperation({ summary: '위치별 재고 조회', description: '특정 위치의 재고 항목들을 조회합니다.' })
  @ApiParam({ name: 'location', description: '보관 위치', type: 'string' })
  @ApiResponse({ status: 200, description: '위치별 재고를 성공적으로 조회했습니다.' })
  findByLocation(@Param('location') location: string) {
    return this.inventoryService.findByLocation(location);
  }

  @Get('stats/category/:category')
  @ApiOperation({ summary: '카테고리별 재고 통계', description: '특정 카테고리의 재고 통계를 조회합니다.' })
  @ApiParam({ name: 'category', description: '카테고리', type: 'string' })
  @ApiResponse({ status: 200, description: '카테고리별 재고 통계를 성공적으로 조회했습니다.' })
  getInventoryStatsByCategory(@Param('category') category: string) {
    return this.inventoryService.getInventoryStatsByCategory(category);
  }

  @Get('turnover/:productCode')
  @ApiOperation({ summary: '재고 회전율 조회', description: '특정 제품의 재고 회전율을 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiQuery({ name: 'soldQuantity', description: '판매 수량', required: true, type: 'number' })
  @ApiResponse({ status: 200, description: '재고 회전율을 성공적으로 조회했습니다.' })
  getInventoryTurnover(
    @Param('productCode') productCode: string,
    @Query('soldQuantity') soldQuantity: number
  ) {
    return this.inventoryService.getInventoryTurnover(productCode, Number(soldQuantity));
  }

  @Get('product/:productCode')
  @ApiOperation({ summary: '제품 코드로 재고 조회', description: '제품 코드로 재고 정보를 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '재고 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 제품의 재고를 찾을 수 없습니다.' })
  findByProductCode(@Param('productCode') productCode: string) {
    return this.inventoryService.findByProductCode(productCode);
  }

  @Patch('adjust/:productCode')
  @ApiOperation({ summary: '재고 조정', description: '특정 제품의 재고를 조정합니다 (입고/출고/조정).' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiBody({ 
    schema: { 
      type: 'object', 
      properties: { 
        quantity: { type: 'number', description: '수량' },
        movementType: { 
          type: 'string', 
          enum: ['in', 'out', 'adjustment', 'transfer', 'return'],
          description: '이동 유형'
        },
        notes: { type: 'string', description: '메모' }
      },
      required: ['quantity', 'movementType']
    } 
  })
  @ApiResponse({ status: 200, description: '재고가 성공적으로 조정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 제품의 재고를 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '재고가 부족합니다.' })
  adjustStock(
    @Param('productCode') productCode: string,
    @Body('quantity') quantity: number,
    @Body('movementType') movementType: string,
    @Body('notes') notes?: string
  ) {
    return this.inventoryService.adjustStock(productCode, Number(quantity), movementType, notes);
  }

  @Get(':id')
  @ApiOperation({ summary: '재고 상세 조회', description: '특정 재고의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '재고 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '재고 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 재고를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '재고 정보 수정', description: '기존 재고의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '재고 ID', type: 'number' })
  @ApiBody({ type: UpdateInventoryDto })
  @ApiResponse({ status: 200, description: '재고 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 재고를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '재고 삭제', description: '기존 재고를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '재고 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '재고가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 재고를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.remove(id);
  }
}
