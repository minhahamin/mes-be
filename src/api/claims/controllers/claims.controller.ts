import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClaimsService } from '../services/claims.service';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { UpdateClaimDto } from '../dto/update-claim.dto';

@ApiTags('API/CLAIMS')
@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @ApiOperation({ summary: '클레임 등록', description: '새로운 클레임을 등록합니다.' })
  @ApiBody({ type: CreateClaimDto })
  @ApiResponse({ status: 201, description: '클레임이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.create(createClaimDto);
  }

  @Get()
  @ApiOperation({ summary: '클레임 목록 조회', description: '등록된 모든 클레임 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '클레임 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.claimsService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: '대기중인 클레임 조회', description: '대기중인 클레임들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '대기중인 클레임을 성공적으로 조회했습니다.' })
  findPending() {
    return this.claimsService.findPending();
  }

  @Get('in-progress')
  @ApiOperation({ summary: '처리중인 클레임 조회', description: '처리중인 클레임들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '처리중인 클레임을 성공적으로 조회했습니다.' })
  findInProgress() {
    return this.claimsService.findInProgress();
  }

  @Get('resolved')
  @ApiOperation({ summary: '해결된 클레임 조회', description: '해결된 클레임들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '해결된 클레임을 성공적으로 조회했습니다.' })
  findResolved() {
    return this.claimsService.findResolved();
  }

  @Get('urgent')
  @ApiOperation({ summary: '긴급 클레임 조회', description: '긴급 처리가 필요한 클레임들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '긴급 클레임을 성공적으로 조회했습니다.' })
  findUrgent() {
    return this.claimsService.findUrgent();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 클레임 조회', description: '특정 상태의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '클레임 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 클레임을 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.claimsService.findByStatus(status);
  }

  @Get('customer/:customerName')
  @ApiOperation({ summary: '고객별 클레임 조회', description: '특정 고객의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'customerName', description: '고객명', type: 'string' })
  @ApiResponse({ status: 200, description: '고객별 클레임을 성공적으로 조회했습니다.' })
  findByCustomer(@Param('customerName') customerName: string) {
    return this.claimsService.findByCustomer(customerName);
  }

  @Get('product/:productCode')
  @ApiOperation({ summary: '제품별 클레임 조회', description: '특정 제품의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 클레임을 성공적으로 조회했습니다.' })
  findByProduct(@Param('productCode') productCode: string) {
    return this.claimsService.findByProduct(productCode);
  }

  @Get('claim-type/:claimType')
  @ApiOperation({ summary: '클레임 유형별 조회', description: '특정 클레임 유형의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'claimType', description: '클레임 유형', type: 'string' })
  @ApiResponse({ status: 200, description: '클레임 유형별 클레임을 성공적으로 조회했습니다.' })
  findByClaimType(@Param('claimType') claimType: string) {
    return this.claimsService.findByClaimType(claimType);
  }

  @Get('assigned-to/:assignedTo')
  @ApiOperation({ summary: '담당자별 클레임 조회', description: '특정 담당자의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'assignedTo', description: '담당자', type: 'string' })
  @ApiResponse({ status: 200, description: '담당자별 클레임을 성공적으로 조회했습니다.' })
  findByAssignedTo(@Param('assignedTo') assignedTo: string) {
    return this.claimsService.findByAssignedTo(assignedTo);
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: '우선순위별 클레임 조회', description: '특정 우선순위의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'priority', description: '우선순위', type: 'string' })
  @ApiResponse({ status: 200, description: '우선순위별 클레임을 성공적으로 조회했습니다.' })
  findByPriority(@Param('priority') priority: string) {
    return this.claimsService.findByPriority(priority);
  }

  @Get('compensation-type/:compensationType')
  @ApiOperation({ summary: '보상 유형별 클레임 조회', description: '특정 보상 유형의 클레임들을 조회합니다.' })
  @ApiParam({ name: 'compensationType', description: '보상 유형', type: 'string' })
  @ApiResponse({ status: 200, description: '보상 유형별 클레임을 성공적으로 조회했습니다.' })
  findByCompensationType(@Param('compensationType') compensationType: string) {
    return this.claimsService.findByCompensationType(compensationType);
  }

  @Get('date-range')
  @ApiOperation({ summary: '기간별 클레임 조회', description: '특정 기간의 클레임들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '기간별 클레임을 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.claimsService.findByDateRange(startDate, endDate);
  }

  @Get('stats/product/:productCode')
  @ApiOperation({ summary: '제품별 클레임 통계 조회', description: '특정 제품의 클레임 통계를 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 클레임 통계를 성공적으로 조회했습니다.' })
  getClaimStatsByProduct(@Param('productCode') productCode: string) {
    return this.claimsService.getClaimStatsByProduct(productCode);
  }

  @Get('stats/date-range')
  @ApiOperation({ summary: '기간별 클레임 통계 조회', description: '특정 기간의 클레임 통계를 조회합니다. 클레임 유형 및 보상 유형별 통계를 포함합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '기간별 클레임 통계를 성공적으로 조회했습니다.' })
  getClaimStatsByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.claimsService.getClaimStatsByDateRange(startDate, endDate);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '클레임 상태 업데이트', description: '특정 클레임의 상태를 업데이트합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '클레임 상태가 성공적으로 업데이트되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.claimsService.updateStatus(id, status);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: '클레임 해결 처리', description: '특정 클레임을 해결 처리합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      resolutionDescription: { type: 'string' },
      compensationAmount: { type: 'number' },
      compensationType: { type: 'string' }
    } 
  } })
  @ApiResponse({ status: 200, description: '클레임이 성공적으로 해결 처리되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  resolveClaim(
    @Param('id', ParseIntPipe) id: number,
    @Body('resolutionDescription') resolutionDescription: string,
    @Body('compensationAmount') compensationAmount?: number,
    @Body('compensationType') compensationType?: string
  ) {
    return this.claimsService.resolveClaim(id, resolutionDescription, compensationAmount, compensationType);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: '담당자 배정', description: '특정 클레임에 담당자를 배정합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { assignedTo: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '담당자가 성공적으로 배정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  assignClaim(@Param('id', ParseIntPipe) id: number, @Body('assignedTo') assignedTo: string) {
    return this.claimsService.assignClaim(id, assignedTo);
  }

  @Patch(':id/priority')
  @ApiOperation({ summary: '우선순위 변경', description: '특정 클레임의 우선순위를 변경합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiBody({ schema: { type: 'object', properties: { priority: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: '우선순위가 성공적으로 변경되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  changePriority(@Param('id', ParseIntPipe) id: number, @Body('priority') priority: string) {
    return this.claimsService.changePriority(id, priority);
  }

  @Get(':id')
  @ApiOperation({ summary: '클레임 상세 조회', description: '특정 클레임의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '클레임 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '클레임 정보 수정', description: '기존 클레임의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiBody({ type: UpdateClaimDto })
  @ApiResponse({ status: 200, description: '클레임 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '클레임 삭제', description: '기존 클레임을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '클레임 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '클레임이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 클레임을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.claimsService.remove(id);
  }
}
