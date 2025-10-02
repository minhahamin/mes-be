import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { WorkOrdersService } from '../services/work-orders.service';
import { CreateWorkOrderDto } from '../dto/create-work-order.dto';
import { UpdateWorkOrderDto } from '../dto/update-work-order.dto';

@ApiTags('API/WORK-ORDERS')
@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post()
  @ApiOperation({ summary: '생산지시 등록', description: '새로운 생산지시 정보를 등록합니다.' })
  @ApiBody({ type: CreateWorkOrderDto })
  @ApiResponse({ status: 201, description: '생산지시가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createWorkOrderDto: CreateWorkOrderDto) {
    return this.workOrdersService.create(createWorkOrderDto);
  }

  @Get()
  @ApiOperation({ summary: '생산지시 목록 조회', description: '등록된 모든 생산지시 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '생산지시 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.workOrdersService.findAll();
  }

  @Get('today')
  @ApiOperation({ summary: '오늘 작업 예정 조회', description: '오늘 작업 예정인 생산지시들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '오늘 작업 예정을 성공적으로 조회했습니다.' })
  findTodayWorkOrders() {
    return this.workOrdersService.findTodayWorkOrders();
  }

  @Get('in-progress')
  @ApiOperation({ summary: '진행중인 생산지시 조회', description: '현재 진행중인 생산지시들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '진행중인 생산지시를 성공적으로 조회했습니다.' })
  findInProgress() {
    return this.workOrdersService.findInProgress();
  }

  @Get('pending')
  @ApiOperation({ summary: '대기중인 생산지시 조회', description: '대기중인 생산지시들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '대기중인 생산지시를 성공적으로 조회했습니다.' })
  findPending() {
    return this.workOrdersService.findPending();
  }

  @Get('completed')
  @ApiOperation({ summary: '완료된 생산지시 조회', description: '완료된 생산지시들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '완료된 생산지시를 성공적으로 조회했습니다.' })
  findCompleted() {
    return this.workOrdersService.findCompleted();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 생산지시 조회', description: '특정 상태의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '작업 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 생산지시를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.workOrdersService.findByStatus(status);
  }

  @Get('product/:productCode')
  @ApiOperation({ summary: '제품별 생산지시 조회', description: '특정 제품의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 생산지시를 성공적으로 조회했습니다.' })
  findByProductCode(@Param('productCode') productCode: string) {
    return this.workOrdersService.findByProductCode(productCode);
  }

  @Get('plan/:planId')
  @ApiOperation({ summary: '생산계획별 생산지시 조회', description: '특정 생산계획의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'planId', description: '생산계획 ID', type: 'string' })
  @ApiResponse({ status: 200, description: '생산계획별 생산지시를 성공적으로 조회했습니다.' })
  findByPlanId(@Param('planId') planId: string) {
    return this.workOrdersService.findByPlanId(planId);
  }

  @Get('work-center/:workCenter')
  @ApiOperation({ summary: '작업장별 생산지시 조회', description: '특정 작업장의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'workCenter', description: '작업장', type: 'string' })
  @ApiResponse({ status: 200, description: '작업장별 생산지시를 성공적으로 조회했습니다.' })
  findByWorkCenter(@Param('workCenter') workCenter: string) {
    return this.workOrdersService.findByWorkCenter(workCenter);
  }

  @Get('supervisor/:supervisor')
  @ApiOperation({ summary: '감독자별 생산지시 조회', description: '특정 감독자의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'supervisor', description: '감독자', type: 'string' })
  @ApiResponse({ status: 200, description: '감독자별 생산지시를 성공적으로 조회했습니다.' })
  findBySupervisor(@Param('supervisor') supervisor: string) {
    return this.workOrdersService.findBySupervisor(supervisor);
  }

  @Get('operator/:operator')
  @ApiOperation({ summary: '작업자별 생산지시 조회', description: '특정 작업자의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'operator', description: '작업자', type: 'string' })
  @ApiResponse({ status: 200, description: '작업자별 생산지시를 성공적으로 조회했습니다.' })
  findByOperator(@Param('operator') operator: string) {
    return this.workOrdersService.findByOperator(operator);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 생산지시 조회', description: '특정 우선순위의 생산지시들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 생산지시를 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.workOrdersService.findByPriority(priority);
  }

  @Get('date-range')
  @ApiOperation({ summary: '작업일 범위별 생산지시 조회', description: '특정 작업일 범위의 생산지시들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '작업일 범위별 생산지시를 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.workOrdersService.findByDateRange(startDate, endDate);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '생산지시 상태 업데이트', description: '특정 생산지시의 상태를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '생산지시 상태가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.workOrdersService.updateStatus(id, status);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: '작업 시작', description: '특정 생산지시의 작업을 시작합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '작업이 성공적으로 시작되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  startWork(@Param('id', ParseIntPipe) id: number) {
    return this.workOrdersService.startWork(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '작업 완료', description: '특정 생산지시의 작업을 완료 처리합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      actualHours: { type: 'number' }
    } 
  } })
  @ApiResponse({ status: 200, description: '작업이 성공적으로 완료 처리되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  completeWork(
    @Param('id', ParseIntPipe) id: number,
    @Body('actualHours') actualHours?: number
  ) {
    return this.workOrdersService.completeWork(id, actualHours);
  }

  @Patch(':id/hold')
  @ApiOperation({ summary: '작업 보류', description: '특정 생산지시의 작업을 보류합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      notes: { type: 'string' }
    } 
  } })
  @ApiResponse({ status: 200, description: '작업이 성공적으로 보류되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  holdWork(
    @Param('id', ParseIntPipe) id: number,
    @Body('notes') notes?: string
  ) {
    return this.workOrdersService.holdWork(id, notes);
  }

  @Patch(':id/actual-hours')
  @ApiOperation({ summary: '실제 작업시간 업데이트', description: '특정 생산지시의 실제 작업시간을 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { actualHours: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: '실제 작업시간이 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  updateActualHours(
    @Param('id', ParseIntPipe) id: number,
    @Body('actualHours') actualHours: number
  ) {
    return this.workOrdersService.updateActualHours(id, actualHours);
  }

  @Patch(':id/assign-operator')
  @ApiOperation({ summary: '작업자 배정', description: '특정 생산지시에 작업자를 배정합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { operator: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '작업자가 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  assignOperator(
    @Param('id', ParseIntPipe) id: number,
    @Body('operator') operator: string
  ) {
    return this.workOrdersService.assignOperator(id, operator);
  }

  @Patch(':id/assign-supervisor')
  @ApiOperation({ summary: '감독자 배정', description: '특정 생산지시에 감독자를 배정합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { supervisor: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '감독자가 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  assignSupervisor(
    @Param('id', ParseIntPipe) id: number,
    @Body('supervisor') supervisor: string
  ) {
    return this.workOrdersService.assignSupervisor(id, supervisor);
  }

  @Patch(':id/assign-work-center')
  @ApiOperation({ summary: '작업장 배정', description: '특정 생산지시에 작업장을 배정합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { workCenter: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '작업장이 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  assignWorkCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body('workCenter') workCenter: string
  ) {
    return this.workOrdersService.assignWorkCenter(id, workCenter);
  }

  @Patch(':id/priority')
  @ApiOperation({ summary: '우선순위 변경', description: '특정 생산지시의 우선순위를 변경합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { priority: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '우선순위가 성공적으로 변경되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  changePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body('priority') priority: string
  ) {
    return this.workOrdersService.changePriority(id, priority);
  }

  @Get(':id')
  @ApiOperation({ summary: '생산지시 상세 조회', description: '특정 생산지시의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '생산지시 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workOrdersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '생산지시 정보 수정', description: '기존 생산지시의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiBody({ type: UpdateWorkOrderDto })
  @ApiResponse({ status: 200, description: '생산지시 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateWorkOrderDto: UpdateWorkOrderDto) {
    return this.workOrdersService.update(id, updateWorkOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '생산지시 삭제', description: '기존 생산지시를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '생산지시 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '생산지시가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산지시를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workOrdersService.remove(id);
  }
}
