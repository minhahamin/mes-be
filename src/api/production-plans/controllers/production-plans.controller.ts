import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductionPlansService } from '../services/production-plans.service';
import { CreateProductionPlanDto } from '../dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from '../dto/update-production-plan.dto';

@ApiTags('API/PRODUCTION-PLANS')
@Controller('production-plans')
export class ProductionPlansController {
  constructor(private readonly productionPlansService: ProductionPlansService) {}

  @Post()
  @ApiOperation({ summary: '생산계획 등록', description: '새로운 생산계획 정보를 등록합니다.' })
  @ApiBody({ type: CreateProductionPlanDto })
  @ApiResponse({ status: 201, description: '생산계획이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createProductionPlanDto: CreateProductionPlanDto) {
    return this.productionPlansService.create(createProductionPlanDto);
  }

  @Get()
  @ApiOperation({ summary: '생산계획 목록 조회', description: '등록된 모든 생산계획 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '생산계획 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.productionPlansService.findAll();
  }

  @Get('in-progress')
  @ApiOperation({ summary: '진행중인 생산계획 조회', description: '현재 진행중인 생산계획들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '진행중인 생산계획을 성공적으로 조회했습니다.' })
  findInProgress() {
    return this.productionPlansService.findInProgress();
  }

  @Get('pending')
  @ApiOperation({ summary: '대기중인 생산계획 조회', description: '대기중인 생산계획들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '대기중인 생산계획을 성공적으로 조회했습니다.' })
  findPending() {
    return this.productionPlansService.findPending();
  }

  @Get('completed')
  @ApiOperation({ summary: '완료된 생산계획 조회', description: '완료된 생산계획들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '완료된 생산계획을 성공적으로 조회했습니다.' })
  findCompleted() {
    return this.productionPlansService.findCompleted();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 생산계획 조회', description: '특정 상태의 생산계획들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '생산 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 생산계획을 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.productionPlansService.findByStatus(status);
  }

  @Get('product/:productCode')
  @ApiOperation({ summary: '제품별 생산계획 조회', description: '특정 제품의 생산계획들을 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 생산계획을 성공적으로 조회했습니다.' })
  findByProductCode(@Param('productCode') productCode: string) {
    return this.productionPlansService.findByProductCode(productCode);
  }

  @Get('work-center/:workCenter')
  @ApiOperation({ summary: '작업장별 생산계획 조회', description: '특정 작업장의 생산계획들을 조회합니다.' })
  @ApiParam({ name: 'workCenter', description: '작업장', type: 'string' })
  @ApiResponse({ status: 200, description: '작업장별 생산계획을 성공적으로 조회했습니다.' })
  findByWorkCenter(@Param('workCenter') workCenter: string) {
    return this.productionPlansService.findByWorkCenter(workCenter);
  }

  @Get('responsible/:responsiblePerson')
  @ApiOperation({ summary: '담당자별 생산계획 조회', description: '특정 담당자의 생산계획들을 조회합니다.' })
  @ApiParam({ name: 'responsiblePerson', description: '담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '담당자별 생산계획을 성공적으로 조회했습니다.' })
  findByResponsiblePerson(@Param('responsiblePerson') responsiblePerson: string) {
    return this.productionPlansService.findByResponsiblePerson(responsiblePerson);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 생산계획 조회', description: '특정 우선순위의 생산계획들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 생산계획을 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.productionPlansService.findByPriority(priority);
  }

  @Get('date-range')
  @ApiOperation({ summary: '계획일 범위별 생산계획 조회', description: '특정 계획일 범위의 생산계획들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '계획일 범위별 생산계획을 성공적으로 조회했습니다.' })
  findByPlannedDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.productionPlansService.findByPlannedDateRange(startDate, endDate);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '생산계획 상태 업데이트', description: '특정 생산계획의 상태를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '생산계획 상태가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.productionPlansService.updateStatus(id, status);
  }

  @Patch(':id/start')
  @ApiOperation({ summary: '생산 시작', description: '특정 생산계획의 생산을 시작합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      actualStartDate: { type: 'string', format: 'date' }
    } 
  } })
  @ApiResponse({ status: 200, description: '생산이 성공적으로 시작되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  startProduction(
    @Param('id', ParseIntPipe) id: number,
    @Body('actualStartDate') actualStartDate?: string
  ) {
    return this.productionPlansService.startProduction(id, actualStartDate);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '생산 완료', description: '특정 생산계획의 생산을 완료 처리합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      actualEndDate: { type: 'string', format: 'date' },
      actualHours: { type: 'number' }
    } 
  } })
  @ApiResponse({ status: 200, description: '생산이 성공적으로 완료 처리되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  completeProduction(
    @Param('id', ParseIntPipe) id: number,
    @Body('actualEndDate') actualEndDate?: string,
    @Body('actualHours') actualHours?: number
  ) {
    return this.productionPlansService.completeProduction(id, actualEndDate, actualHours);
  }

  @Patch(':id/actual-hours')
  @ApiOperation({ summary: '실제 작업시간 업데이트', description: '특정 생산계획의 실제 작업시간을 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { actualHours: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: '실제 작업시간이 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  updateActualHours(
    @Param('id', ParseIntPipe) id: number,
    @Body('actualHours') actualHours: number
  ) {
    return this.productionPlansService.updateActualHours(id, actualHours);
  }

  @Patch(':id/assign-person')
  @ApiOperation({ summary: '담당자 배정', description: '특정 생산계획에 담당자를 배정합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { responsiblePerson: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '담당자가 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  assignResponsiblePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body('responsiblePerson') responsiblePerson: string
  ) {
    return this.productionPlansService.assignResponsiblePerson(id, responsiblePerson);
  }

  @Patch(':id/assign-work-center')
  @ApiOperation({ summary: '작업장 배정', description: '특정 생산계획에 작업장을 배정합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { workCenter: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '작업장이 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  assignWorkCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body('workCenter') workCenter: string
  ) {
    return this.productionPlansService.assignWorkCenter(id, workCenter);
  }

  @Get(':id')
  @ApiOperation({ summary: '생산계획 상세 조회', description: '특정 생산계획의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '생산계획 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productionPlansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '생산계획 정보 수정', description: '기존 생산계획의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiBody({ type: UpdateProductionPlanDto })
  @ApiResponse({ status: 200, description: '생산계획 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductionPlanDto: UpdateProductionPlanDto) {
    return this.productionPlansService.update(id, updateProductionPlanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '생산계획 삭제', description: '기존 생산계획을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '생산계획 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '생산계획이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 생산계획을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productionPlansService.remove(id);
  }
}
