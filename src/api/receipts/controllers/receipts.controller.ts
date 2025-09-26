import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ReceiptsService } from '../services/receipts.service';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';

@ApiTags('API/RECEIPTS')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  @ApiOperation({ summary: '입고 등록', description: '새로운 입고 정보를 등록합니다.' })
  @ApiBody({ type: CreateReceiptDto })
  @ApiResponse({ status: 201, description: '입고가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Get()
  @ApiOperation({ summary: '입고 목록 조회', description: '등록된 모든 입고 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '입고 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 입고 조회', description: '특정 상태의 입고들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '입고 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 입고를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.receiptsService.findByStatus(status);
  }


  @Get('supplier/:supplierId')
  @ApiOperation({ summary: '공급업체별 입고 조회', description: '특정 공급업체의 입고들을 조회합니다.' })
  @ApiParam({ name: 'supplierId', description: '공급업체 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '공급업체별 입고를 성공적으로 조회했습니다.' })
  findBySupplier(@Param('supplierId') supplierId: string) {
    return this.receiptsService.findBySupplier(supplierId);
  }

  @Get('manager/:manager')
  @ApiOperation({ summary: '담당자별 입고 조회', description: '특정 담당자의 입고들을 조회합니다.' })
  @ApiParam({ name: 'manager', description: '담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '담당자별 입고를 성공적으로 조회했습니다.' })
  findByManager(@Param('manager') manager: string) {
    return this.receiptsService.findByManager(manager);
  }

  @Get('ordering/:orderingId')
  @ApiOperation({ summary: '발주별 입고 조회', description: '특정 발주의 입고들을 조회합니다.' })
  @ApiParam({ name: 'orderingId', description: '발주 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '발주별 입고를 성공적으로 조회했습니다.' })
  findByOrdering(@Param('orderingId') orderingId: string) {
    return this.receiptsService.findByOrdering(orderingId);
  }

  @Get('partial')
  @ApiOperation({ summary: '부분 입고 현황 조회', description: '부분적으로 입고된 항목들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '부분 입고 현황을 성공적으로 조회했습니다.' })
  findPartialReceipts() {
    return this.receiptsService.findPartialReceipts();
  }

  @Get('daterange')
  @ApiOperation({ summary: '날짜 범위별 입고 조회', description: '특정 날짜 범위의 입고들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '날짜 범위별 입고를 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.receiptsService.findByDateRange(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: '입고 상세 조회', description: '특정 입고의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '입고 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '입고 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 입고를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '입고 정보 수정', description: '기존 입고의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '입고 ID', type: 'number' })
  @ApiBody({ type: UpdateReceiptDto })
  @ApiResponse({ status: 200, description: '입고 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 입고를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptsService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '입고 삭제', description: '기존 입고를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '입고 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '입고가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 입고를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.remove(id);
  }
}
