import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PurchasesService } from '../services/purchases.service';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';

@ApiTags('API/PURCHASES')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @ApiOperation({ summary: '발주 등록', description: '새로운 발주 정보를 등록합니다.' })
  @ApiBody({ type: CreatePurchaseDto })
  @ApiResponse({ status: 201, description: '발주가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: '발주 목록 조회', description: '등록된 모든 발주 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '발주 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 발주 조회', description: '특정 상태의 발주들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '발주 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 발주를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.purchasesService.findByStatus(status);
  }

  @Get('supplier/:supplierId')
  @ApiOperation({ summary: '공급업체별 발주 조회', description: '특정 공급업체의 발주들을 조회합니다.' })
  @ApiParam({ name: 'supplierId', description: '공급업체 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '공급업체별 발주를 성공적으로 조회했습니다.' })
  findBySupplier(@Param('supplierId') supplierId: string) {
    return this.purchasesService.findBySupplier(supplierId);
  }

  @Get('purchaser/:purchaser')
  @ApiOperation({ summary: '구매담당별 발주 조회', description: '특정 구매담당의 발주들을 조회합니다.' })
  @ApiParam({ name: 'purchaser', description: '구매 담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '구매담당별 발주를 성공적으로 조회했습니다.' })
  findByPurchaser(@Param('purchaser') purchaser: string) {
    return this.purchasesService.findByPurchaser(purchaser);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 발주 조회', description: '특정 우선순위의 발주들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 발주를 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.purchasesService.findByPriority(priority);
  }

  @Get('daterange')
  @ApiOperation({ summary: '날짜 범위별 발주 조회', description: '특정 날짜 범위의 발주들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '날짜 범위별 발주를 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.purchasesService.findByDateRange(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: '발주 상세 조회', description: '특정 발주의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '발주 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '발주 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 발주를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purchasesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '발주 정보 수정', description: '기존 발주의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '발주 ID', type: 'number' })
  @ApiBody({ type: UpdatePurchaseDto })
  @ApiResponse({ status: 200, description: '발주 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 발주를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '발주 삭제', description: '기존 발주를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '발주 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '발주가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 발주를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purchasesService.remove(id);
  }
}
