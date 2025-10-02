import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PurchaseReceiptStatusService } from '../services/purchase-receipt-status.service';

@ApiTags('API/PURCHASE-RECEIPT-STATUS')
@Controller('purchase-receipt-status')
export class PurchaseReceiptStatusController {
  constructor(private readonly purchaseReceiptStatusService: PurchaseReceiptStatusService) {}

  @Get()
  @ApiOperation({ 
    summary: '전체 발주/입고 현황 조회', 
    description: '모든 발주와 입고의 현황을 조회합니다. 발주 수량 대비 입고 수량, 입고율 등을 포함합니다.' 
  })
  @ApiResponse({ status: 200, description: '전체 발주/입고 현황을 성공적으로 조회했습니다.' })
  findAllStatus() {
    return this.purchaseReceiptStatusService.findAllStatus();
  }

  @Get('pending')
  @ApiOperation({ 
    summary: '미입고 발주 현황 조회', 
    description: '입고율이 100% 미만인 발주들의 현황을 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: '미입고 발주 현황을 성공적으로 조회했습니다.' })
  findPendingReceipts() {
    return this.purchaseReceiptStatusService.findPendingReceipts();
  }

  @Get('completed')
  @ApiOperation({ 
    summary: '입고 완료 발주 현황 조회', 
    description: '입고율이 100%인 발주들의 현황을 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: '입고 완료 발주 현황을 성공적으로 조회했습니다.' })
  findCompletedReceipts() {
    return this.purchaseReceiptStatusService.findCompletedReceipts();
  }

  @Get('delayed')
  @ApiOperation({ 
    summary: '지연 입고 현황 조회', 
    description: '예정일이 지났으나 입고가 완료되지 않은 발주들의 현황을 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: '지연 입고 현황을 성공적으로 조회했습니다.' })
  findDelayedReceipts() {
    return this.purchaseReceiptStatusService.findDelayedReceipts();
  }

  @Get('purchase/:orderId')
  @ApiOperation({ 
    summary: '발주별 입고 현황 조회', 
    description: '특정 발주의 상세 입고 현황을 조회합니다. 관련된 모든 입고 정보를 포함합니다.' 
  })
  @ApiParam({ name: 'orderId', description: '발주 ID', type: 'string', example: 'PO2024001' })
  @ApiResponse({ status: 200, description: '발주별 입고 현황을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 발주를 찾을 수 없습니다.' })
  findStatusByPurchaseId(@Param('orderId') orderId: string) {
    return this.purchaseReceiptStatusService.findStatusByPurchaseId(orderId);
  }

  @Get('supplier/:supplierId')
  @ApiOperation({ 
    summary: '공급업체별 발주/입고 현황 조회', 
    description: '특정 공급업체의 전체 발주/입고 현황을 조회합니다.' 
  })
  @ApiParam({ name: 'supplierId', description: '공급업체 ID', type: 'string', example: 'SUP001' })
  @ApiResponse({ status: 200, description: '공급업체별 발주/입고 현황을 성공적으로 조회했습니다.' })
  findStatusBySupplier(@Param('supplierId') supplierId: string) {
    return this.purchaseReceiptStatusService.findStatusBySupplier(supplierId);
  }

  @Get('product/:productCode')
  @ApiOperation({ 
    summary: '제품별 발주/입고 현황 조회', 
    description: '특정 제품의 전체 발주/입고 현황을 조회합니다.' 
  })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string', example: 'PROD001' })
  @ApiResponse({ status: 200, description: '제품별 발주/입고 현황을 성공적으로 조회했습니다.' })
  findStatusByProduct(@Param('productCode') productCode: string) {
    return this.purchaseReceiptStatusService.findStatusByProduct(productCode);
  }

  @Get('date-range')
  @ApiOperation({ 
    summary: '기간별 발주/입고 현황 조회', 
    description: '특정 기간의 발주/입고 현황을 조회합니다. 기간 내 모든 발주의 합계와 입고율을 포함합니다.' 
  })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true, example: '2024-01-01' })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true, example: '2024-01-31' })
  @ApiResponse({ status: 200, description: '기간별 발주/입고 현황을 성공적으로 조회했습니다.' })
  findStatusByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.purchaseReceiptStatusService.findStatusByDateRange(startDate, endDate);
  }
}
