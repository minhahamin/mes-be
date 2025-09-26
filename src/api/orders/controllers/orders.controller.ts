import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@ApiTags('API/ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: '수주 등록', description: '새로운 수주 정보를 등록합니다.' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: '수주가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: '수주 목록 조회', description: '등록된 모든 수주 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '수주 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 수주 조회', description: '특정 상태의 수주들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '주문 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 수주를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.ordersService.findByStatus(status);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: '고객별 수주 조회', description: '특정 고객의 수주들을 조회합니다.' })
  @ApiParam({ name: 'customerId', description: '고객 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '고객별 수주를 성공적으로 조회했습니다.' })
  findByCustomer(@Param('customerId') customerId: string) {
    return this.ordersService.findByCustomer(customerId);
  }

  @Get('salesperson/:salesPerson')
  @ApiOperation({ summary: '영업담당별 수주 조회', description: '특정 영업담당의 수주들을 조회합니다.' })
  @ApiParam({ name: 'salesPerson', description: '영업 담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '영업담당별 수주를 성공적으로 조회했습니다.' })
  findBySalesPerson(@Param('salesPerson') salesPerson: string) {
    return this.ordersService.findBySalesPerson(salesPerson);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 수주 조회', description: '특정 우선순위의 수주들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 수주를 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.ordersService.findByPriority(priority);
  }

  @Get('daterange')
  @ApiOperation({ summary: '날짜 범위별 수주 조회', description: '특정 날짜 범위의 수주들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '날짜 범위별 수주를 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.ordersService.findByDateRange(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: '수주 상세 조회', description: '특정 수주의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '수주 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '수주 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 수주를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '수주 정보 수정', description: '기존 수주의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '수주 ID', type: 'number' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: '수주 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 수주를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '수주 삭제', description: '기존 수주를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '수주 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '수주가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 수주를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
