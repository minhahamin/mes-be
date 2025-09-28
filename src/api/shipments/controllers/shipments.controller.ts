import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ShipmentsService } from '../services/shipments.service';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';

@ApiTags('API/SHIPMENTS')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @ApiOperation({ summary: '출하 등록', description: '새로운 출하 정보를 등록합니다.' })
  @ApiBody({ type: CreateShipmentDto })
  @ApiResponse({ status: 201, description: '출하가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  @ApiOperation({ summary: '출하 목록 조회', description: '등록된 모든 출하 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '출하 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 출하 조회', description: '특정 상태의 출하들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '출하 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 출하를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.shipmentsService.findByStatus(status);
  }

  @Get('customer/:customerName')
  @ApiOperation({ summary: '고객별 출하 조회', description: '특정 고객의 출하들을 조회합니다.' })
  @ApiParam({ name: 'customerName', description: '고객명', type: 'string' })
  @ApiResponse({ status: 200, description: '고객별 출하를 성공적으로 조회했습니다.' })
  findByCustomer(@Param('customerName') customerName: string) {
    return this.shipmentsService.findByCustomer(customerName);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: '수주별 출하 조회', description: '특정 수주의 출하들을 조회합니다.' })
  @ApiParam({ name: 'orderId', description: '수주 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '수주별 출하를 성공적으로 조회했습니다.' })
  findByOrderId(@Param('orderId') orderId: string) {
    return this.shipmentsService.findByOrderId(orderId);
  }

  @Get('responsible/:responsiblePerson')
  @ApiOperation({ summary: '담당자별 출하 조회', description: '특정 담당자의 출하들을 조회합니다.' })
  @ApiParam({ name: 'responsiblePerson', description: '담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '담당자별 출하를 성공적으로 조회했습니다.' })
  findByResponsiblePerson(@Param('responsiblePerson') responsiblePerson: string) {
    return this.shipmentsService.findByResponsiblePerson(responsiblePerson);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 출하 조회', description: '특정 우선순위의 출하들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 출하를 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.shipmentsService.findByPriority(priority);
  }

  @Get('carrier/:carrier')
  @ApiOperation({ summary: '운송업체별 출하 조회', description: '특정 운송업체의 출하들을 조회합니다.' })
  @ApiParam({ name: 'carrier', description: '운송업체', type: 'string' })
  @ApiResponse({ status: 200, description: '운송업체별 출하를 성공적으로 조회했습니다.' })
  findByCarrier(@Param('carrier') carrier: string) {
    return this.shipmentsService.findByCarrier(carrier);
  }

  @Get('shipment-date-range')
  @ApiOperation({ summary: '출하일 범위별 출하 조회', description: '특정 출하일 범위의 출하들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '출하일 범위별 출하를 성공적으로 조회했습니다.' })
  findByShipmentDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.shipmentsService.findByShipmentDateRange(startDate, endDate);
  }

  @Get('delivery-date-range')
  @ApiOperation({ summary: '배송예정일 범위별 출하 조회', description: '특정 배송예정일 범위의 출하들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '배송예정일 범위별 출하를 성공적으로 조회했습니다.' })
  findByDeliveryDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.shipmentsService.findByDeliveryDateRange(startDate, endDate);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '출하 상태 업데이트', description: '특정 출하의 상태를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '출하 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '출하 상태가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 출하를 찾을 수 없습니다.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.shipmentsService.updateStatus(id, status);
  }

  @Patch(':id/tracking')
  @ApiOperation({ summary: '추적번호 업데이트', description: '특정 출하의 추적번호를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '출하 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      trackingNumber: { type: 'string' },
      carrier: { type: 'string' }
    } 
  } })
  @ApiResponse({ status: 200, description: '추적번호가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 출하를 찾을 수 없습니다.' })
  updateTrackingNumber(
    @Param('id', ParseIntPipe) id: number, 
    @Body('trackingNumber') trackingNumber: string,
    @Body('carrier') carrier?: string
  ) {
    return this.shipmentsService.updateTrackingNumber(id, trackingNumber, carrier);
  }

  @Get(':id')
  @ApiOperation({ summary: '출하 상세 조회', description: '특정 출하의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '출하 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '출하 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 출하를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '출하 정보 수정', description: '기존 출하의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '출하 ID', type: 'number' })
  @ApiBody({ type: UpdateShipmentDto })
  @ApiResponse({ status: 200, description: '출하 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 출하를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentsService.update(id, updateShipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '출하 삭제', description: '기존 출하를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '출하 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '출하가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 출하를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentsService.remove(id);
  }
}
