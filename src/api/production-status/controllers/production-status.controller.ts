import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductionStatusService } from '../services/production-status.service';

@ApiTags('API/PRODUCTION-STATUS')
@Controller('production-status')
export class ProductionStatusController {
  constructor(private readonly productionStatusService: ProductionStatusService) {}

  @Get()
  @ApiOperation({ 
    summary: '전체 생산현황 조회', 
    description: '모든 생산계획과 생산지시의 현황을 조회합니다. 계획 수량 대비 완료 수량, 달성률 등을 포함합니다.' 
  })
  @ApiResponse({ status: 200, description: '전체 생산현황을 성공적으로 조회했습니다.' })
  findAllStatus() {
    return this.productionStatusService.findAllStatus();
  }

  @Get('in-progress')
  @ApiOperation({ 
    summary: '진행중인 생산현황 조회', 
    description: '현재 진행중인 생산계획들의 현황을 조회합니다.' 
  })
  @ApiResponse({ status: 200, description: '진행중인 생산현황을 성공적으로 조회했습니다.' })
  findInProgressStatus() {
    return this.productionStatusService.findInProgressStatus();
  }

  @Get('plan/:planId')
  @ApiOperation({ 
    summary: '생산계획별 현황 조회', 
    description: '특정 생산계획의 상세 현황을 조회합니다. 관련된 모든 생산지시 정보를 포함합니다.' 
  })
  @ApiParam({ name: 'planId', description: '생산계획 ID', type: 'string', example: 'PLAN2024001' })
  @ApiResponse({ status: 200, description: '생산계획별 현황을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  findStatusByPlanId(@Param('planId') planId: string) {
    return this.productionStatusService.findStatusByPlanId(planId);
  }

  @Get('work-order/:orderId')
  @ApiOperation({ 
    summary: '생산지시별 현황 조회', 
    description: '특정 생산지시의 현황을 조회합니다. 연관된 생산계획 정보를 포함합니다.' 
  })
  @ApiParam({ name: 'orderId', description: '생산지시 ID', type: 'string', example: 'ORDER2024001' })
  @ApiResponse({ status: 200, description: '생산지시별 현황을 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  findStatusByWorkOrder(@Param('orderId') orderId: string) {
    return this.productionStatusService.findStatusByWorkOrder(orderId);
  }

  @Get('product/:productCode')
  @ApiOperation({ 
    summary: '제품별 생산현황 조회', 
    description: '특정 제품의 전체 생산현황을 조회합니다. 모든 생산계획의 합계와 달성률을 포함합니다.' 
  })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string', example: 'PROD001' })
  @ApiResponse({ status: 200, description: '제품별 생산현황을 성공적으로 조회했습니다.' })
  findStatusByProduct(@Param('productCode') productCode: string) {
    return this.productionStatusService.findStatusByProduct(productCode);
  }

  @Get('work-center/:workCenter')
  @ApiOperation({ 
    summary: '작업장별 생산현황 조회', 
    description: '특정 작업장의 생산현황을 조회합니다.' 
  })
  @ApiParam({ name: 'workCenter', description: '작업장', type: 'string', example: 'A라인' })
  @ApiResponse({ status: 200, description: '작업장별 생산현황을 성공적으로 조회했습니다.' })
  findStatusByWorkCenter(@Param('workCenter') workCenter: string) {
    return this.productionStatusService.findStatusByWorkCenter(workCenter);
  }

  @Get('date-range')
  @ApiOperation({ 
    summary: '기간별 생산현황 조회', 
    description: '특정 기간의 생산현황을 조회합니다. 기간 내 모든 생산계획의 합계와 달성률을 포함합니다.' 
  })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true, example: '2024-01-01' })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true, example: '2024-01-31' })
  @ApiResponse({ status: 200, description: '기간별 생산현황을 성공적으로 조회했습니다.' })
  findStatusByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.productionStatusService.findStatusByDateRange(startDate, endDate);
  }
}
