import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { InventoryStatusService } from '../services/inventory-status.service';

@ApiTags('API/INVENTORY-STATUS')
@Controller('inventory-status')
export class InventoryStatusController {
  constructor(private readonly inventoryStatusService: InventoryStatusService) {}

  @Get()
  @ApiOperation({ 
    summary: '전체 재고 현황 조회', 
    description: '모든 재고의 현황을 조회합니다. 총 재고 수량, 가치, 상태별 요약을 포함합니다.' 
  })
  @ApiResponse({ status: 200, description: '전체 재고 현황을 성공적으로 조회했습니다.' })
  findAllStatus() {
    return this.inventoryStatusService.findAllStatus();
  }

  @Get('summary')
  @ApiOperation({ 
    summary: '재고 상태 요약 조회', 
    description: '재고 상태의 전반적인 요약 정보를 조회합니다. 상태별, 카테고리별 통계 및 재주문 필요 항목을 포함합니다.' 
  })
  @ApiResponse({ status: 200, description: '재고 상태 요약을 성공적으로 조회했습니다.' })
  getInventoryStatusSummary() {
    return this.inventoryStatusService.getInventoryStatusSummary();
  }

  @Get('low-stock')
  @ApiOperation({ 
    summary: '재고 부족 현황 조회', 
    description: '재주문이 필요한 재고 항목들의 현황을 조회합니다. 권장 주문 수량과 예상 비용을 포함합니다.' 
  })
  @ApiResponse({ status: 200, description: '재고 부족 현황을 성공적으로 조회했습니다.' })
  findLowStockStatus() {
    return this.inventoryStatusService.findLowStockStatus();
  }

  @Get('recent-movements')
  @ApiOperation({ 
    summary: '최근 재고 이동 내역 조회', 
    description: '최근 재고 이동 내역을 조회합니다. 입고, 출고, 조정 등의 이력을 확인할 수 있습니다.' 
  })
  @ApiQuery({ name: 'limit', description: '조회할 최대 개수', required: false, type: 'number', example: 20 })
  @ApiResponse({ status: 200, description: '최근 재고 이동 내역을 성공적으로 조회했습니다.' })
  findRecentMovements(@Query('limit') limit?: number) {
    return this.inventoryStatusService.findRecentMovements(limit ? Number(limit) : 20);
  }

  @Get('top-value')
  @ApiOperation({ 
    summary: '재고 가치 상위 항목 조회', 
    description: '재고 가치가 높은 상위 N개 항목을 조회합니다.' 
  })
  @ApiQuery({ name: 'limit', description: '조회할 최대 개수', required: false, type: 'number', example: 10 })
  @ApiResponse({ status: 200, description: '재고 가치 상위 항목을 성공적으로 조회했습니다.' })
  findTopValueItems(@Query('limit') limit?: number) {
    return this.inventoryStatusService.findTopValueItems(limit ? Number(limit) : 10);
  }

  @Get('category/:category')
  @ApiOperation({ 
    summary: '카테고리별 재고 현황 조회', 
    description: '특정 카테고리의 재고 현황을 조회합니다. 카테고리 내 총 재고와 상태별 요약을 포함합니다.' 
  })
  @ApiParam({ name: 'category', description: '카테고리', type: 'string', example: '전자제품' })
  @ApiResponse({ status: 200, description: '카테고리별 재고 현황을 성공적으로 조회했습니다.' })
  findStatusByCategory(@Param('category') category: string) {
    return this.inventoryStatusService.findStatusByCategory(category);
  }

  @Get('supplier/:supplier')
  @ApiOperation({ 
    summary: '공급업체별 재고 현황 조회', 
    description: '특정 공급업체의 재고 현황을 조회합니다.' 
  })
  @ApiParam({ name: 'supplier', description: '공급업체', type: 'string', example: '케이스코리아' })
  @ApiResponse({ status: 200, description: '공급업체별 재고 현황을 성공적으로 조회했습니다.' })
  findStatusBySupplier(@Param('supplier') supplier: string) {
    return this.inventoryStatusService.findStatusBySupplier(supplier);
  }

  @Get('location/:location')
  @ApiOperation({ 
    summary: '위치별 재고 현황 조회', 
    description: '특정 위치의 재고 현황을 조회합니다.' 
  })
  @ApiParam({ name: 'location', description: '보관 위치', type: 'string', example: 'A-01-01' })
  @ApiResponse({ status: 200, description: '위치별 재고 현황을 성공적으로 조회했습니다.' })
  findStatusByLocation(@Param('location') location: string) {
    return this.inventoryStatusService.findStatusByLocation(location);
  }

  @Get('product/:productCode')
  @ApiOperation({ 
    summary: '제품별 재고 상세 현황 조회', 
    description: '특정 제품의 상세 재고 현황을 조회합니다. 재주문 권장 정보를 포함합니다.' 
  })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string', example: 'PROD001' })
  @ApiResponse({ status: 200, description: '제품별 재고 상세 현황을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 제품의 재고를 찾을 수 없습니다.' })
  findDetailedStatusByProduct(@Param('productCode') productCode: string) {
    return this.inventoryStatusService.findDetailedStatusByProduct(productCode);
  }
}
