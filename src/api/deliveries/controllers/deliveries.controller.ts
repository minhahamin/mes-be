import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DeliveriesService } from '../services/deliveries.service';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { UpdateDeliveryDto } from '../dto/update-delivery.dto';

@ApiTags('API/DELIVERIES')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @ApiOperation({ summary: '납품 등록', description: '새로운 납품 정보를 등록합니다.' })
  @ApiBody({ type: CreateDeliveryDto })
  @ApiResponse({ status: 201, description: '납품이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: '납품 목록 조회', description: '등록된 모든 납품 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '납품 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get('today')
  @ApiOperation({ summary: '오늘 납품 예정 조회', description: '오늘 납품 예정인 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '오늘 납품 예정 목록을 성공적으로 조회했습니다.' })
  findTodayDeliveries() {
    return this.deliveriesService.findTodayDeliveries();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 납품 조회', description: '특정 상태의 납품들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '납품 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 납품을 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.deliveriesService.findByStatus(status);
  }

  @Get('customer/:customerName')
  @ApiOperation({ summary: '고객별 납품 조회', description: '특정 고객의 납품들을 조회합니다.' })
  @ApiParam({ name: 'customerName', description: '고객명', type: 'string' })
  @ApiResponse({ status: 200, description: '고객별 납품을 성공적으로 조회했습니다.' })
  findByCustomer(@Param('customerName') customerName: string) {
    return this.deliveriesService.findByCustomer(customerName);
  }

  @Get('shipment/:shipmentId')
  @ApiOperation({ summary: '출하별 납품 조회', description: '특정 출하의 납품들을 조회합니다.' })
  @ApiParam({ name: 'shipmentId', description: '출하 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '출하별 납품을 성공적으로 조회했습니다.' })
  findByShipmentId(@Param('shipmentId') shipmentId: string) {
    return this.deliveriesService.findByShipmentId(shipmentId);
  }

  @Get('driver/:driver')
  @ApiOperation({ summary: '배송기사별 납품 조회', description: '특정 배송기사의 납품들을 조회합니다.' })
  @ApiParam({ name: 'driver', description: '배송기사', type: 'string' })
  @ApiResponse({ status: 200, description: '배송기사별 납품을 성공적으로 조회했습니다.' })
  findByDriver(@Param('driver') driver: string) {
    return this.deliveriesService.findByDriver(driver);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 납품 조회', description: '특정 우선순위의 납품들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 납품을 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.deliveriesService.findByPriority(priority);
  }

  @Get('vehicle/:vehicle')
  @ApiOperation({ summary: '차량별 납품 조회', description: '특정 차량의 납품들을 조회합니다.' })
  @ApiParam({ name: 'vehicle', description: '차량정보', type: 'string' })
  @ApiResponse({ status: 200, description: '차량별 납품을 성공적으로 조회했습니다.' })
  findByVehicle(@Param('vehicle') vehicle: string) {
    return this.deliveriesService.findByVehicle(vehicle);
  }

  @Get('date-range')
  @ApiOperation({ summary: '납품일 범위별 납품 조회', description: '특정 납품일 범위의 납품들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '납품일 범위별 납품을 성공적으로 조회했습니다.' })
  findByDeliveryDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.deliveriesService.findByDeliveryDateRange(startDate, endDate);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '납품 상태 업데이트', description: '특정 납품의 상태를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '납품 상태가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.deliveriesService.updateStatus(id, status);
  }

  @Patch(':id/assign-driver')
  @ApiOperation({ summary: '배송기사 배정', description: '특정 납품에 배송기사를 배정합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      driver: { type: 'string' },
      vehicle: { type: 'string' }
    } 
  } })
  @ApiResponse({ status: 200, description: '배송기사가 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  assignDriver(
    @Param('id', ParseIntPipe) id: number, 
    @Body('driver') driver: string,
    @Body('vehicle') vehicle?: string
  ) {
    return this.deliveriesService.assignDriver(id, driver, vehicle);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '납품 완료 처리', description: '특정 납품을 완료 처리합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      notes: { type: 'string' }
    } 
  } })
  @ApiResponse({ status: 200, description: '납품이 성공적으로 완료 처리되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  completeDelivery(
    @Param('id', ParseIntPipe) id: number, 
    @Body('notes') notes?: string
  ) {
    return this.deliveriesService.completeDelivery(id, notes);
  }

  @Get(':id')
  @ApiOperation({ summary: '납품 상세 조회', description: '특정 납품의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '납품 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '납품 정보 수정', description: '기존 납품의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiBody({ type: UpdateDeliveryDto })
  @ApiResponse({ status: 200, description: '납품 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '납품 삭제', description: '기존 납품을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '납품 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '납품이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 납품을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveriesService.remove(id);
  }
}
