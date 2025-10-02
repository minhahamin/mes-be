import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QualityInspectionsService } from '../services/quality-inspections.service';
import { CreateQualityInspectionDto } from '../dto/create-quality-inspection.dto';
import { UpdateQualityInspectionDto } from '../dto/update-quality-inspection.dto';

@ApiTags('API/QUALITY-INSPECTIONS')
@Controller('quality-inspections')
export class QualityInspectionsController {
  constructor(private readonly qualityInspectionsService: QualityInspectionsService) {}

  @Post()
  @ApiOperation({ summary: '품질검사 등록', description: '새로운 품질검사 정보를 등록합니다.' })
  @ApiBody({ type: CreateQualityInspectionDto })
  @ApiResponse({ status: 201, description: '품질검사가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  create(@Body() createQualityInspectionDto: CreateQualityInspectionDto) {
    return this.qualityInspectionsService.create(createQualityInspectionDto);
  }

  @Get()
  @ApiOperation({ summary: '품질검사 목록 조회', description: '등록된 모든 품질검사 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '품질검사 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.qualityInspectionsService.findAll();
  }

  @Get('passed')
  @ApiOperation({ summary: '합격 검사 조회', description: '합격 판정된 품질검사들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '합격 검사를 성공적으로 조회했습니다.' })
  findPassed() {
    return this.qualityInspectionsService.findPassed();
  }

  @Get('failed')
  @ApiOperation({ summary: '불합격 검사 조회', description: '불합격 판정된 품질검사들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '불합격 검사를 성공적으로 조회했습니다.' })
  findFailed() {
    return this.qualityInspectionsService.findFailed();
  }

  @Get('pending')
  @ApiOperation({ summary: '대기중인 검사 조회', description: '검사 대기중인 품질검사들을 조회합니다.' })
  @ApiResponse({ status: 200, description: '대기중인 검사를 성공적으로 조회했습니다.' })
  findPending() {
    return this.qualityInspectionsService.findPending();
  }

  @Get('status/:status')
  @ApiOperation({ summary: '상태별 품질검사 조회', description: '특정 상태의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'status', description: '검사 상태', type: 'string' })
  @ApiResponse({ status: 200, description: '상태별 품질검사를 성공적으로 조회했습니다.' })
  findByStatus(@Param('status') status: string) {
    return this.qualityInspectionsService.findByStatus(status);
  }

  @Get('product/:productCode')
  @ApiOperation({ summary: '제품별 품질검사 조회', description: '특정 제품의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 품질검사를 성공적으로 조회했습니다.' })
  findByProduct(@Param('productCode') productCode: string) {
    return this.qualityInspectionsService.findByProduct(productCode);
  }

  @Get('inspection-type/:inspectionType')
  @ApiOperation({ summary: '검사 유형별 조회', description: '특정 검사 유형의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'inspectionType', description: '검사 유형', type: 'string' })
  @ApiResponse({ status: 200, description: '검사 유형별 품질검사를 성공적으로 조회했습니다.' })
  findByInspectionType(@Param('inspectionType') inspectionType: string) {
    return this.qualityInspectionsService.findByInspectionType(inspectionType);
  }

  @Get('inspector/:inspector')
  @ApiOperation({ summary: '검사자별 조회', description: '특정 검사자의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'inspector', description: '검사자', type: 'string' })
  @ApiResponse({ status: 200, description: '검사자별 품질검사를 성공적으로 조회했습니다.' })
  findByInspector(@Param('inspector') inspector: string) {
    return this.qualityInspectionsService.findByInspector(inspector);
  }

  @Get('batch/:batchNumber')
  @ApiOperation({ summary: '배치 번호별 조회', description: '특정 배치의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'batchNumber', description: '배치 번호', type: 'string' })
  @ApiResponse({ status: 200, description: '배치 번호별 품질검사를 성공적으로 조회했습니다.' })
  findByBatchNumber(@Param('batchNumber') batchNumber: string) {
    return this.qualityInspectionsService.findByBatchNumber(batchNumber);
  }

  @Get('defect-type/:defectType')
  @ApiOperation({ summary: '불량 유형별 조회', description: '특정 불량 유형의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'defectType', description: '불량 유형', type: 'string' })
  @ApiResponse({ status: 200, description: '불량 유형별 품질검사를 성공적으로 조회했습니다.' })
  findByDefectType(@Param('defectType') defectType: string) {
    return this.qualityInspectionsService.findByDefectType(defectType);
  }

  @Get('pass-rate-below/:passRate')
  @ApiOperation({ summary: '합격률 기준 조회', description: '특정 합격률 미만의 품질검사들을 조회합니다.' })
  @ApiParam({ name: 'passRate', description: '기준 합격률', type: 'number' })
  @ApiResponse({ status: 200, description: '합격률 기준 품질검사를 성공적으로 조회했습니다.' })
  findByPassRateBelow(@Param('passRate') passRate: number) {
    return this.qualityInspectionsService.findByPassRateBelow(passRate);
  }

  @Get('date-range')
  @ApiOperation({ summary: '기간별 품질검사 조회', description: '특정 기간의 품질검사들을 조회합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '기간별 품질검사를 성공적으로 조회했습니다.' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.qualityInspectionsService.findByDateRange(startDate, endDate);
  }

  @Get('stats/product/:productCode')
  @ApiOperation({ summary: '제품별 품질 통계 조회', description: '특정 제품의 품질검사 통계를 조회합니다.' })
  @ApiParam({ name: 'productCode', description: '제품 코드', type: 'string' })
  @ApiResponse({ status: 200, description: '제품별 품질 통계를 성공적으로 조회했습니다.' })
  getQualityStatsByProduct(@Param('productCode') productCode: string) {
    return this.qualityInspectionsService.getQualityStatsByProduct(productCode);
  }

  @Get('stats/date-range')
  @ApiOperation({ summary: '기간별 품질 통계 조회', description: '특정 기간의 품질검사 통계를 조회합니다. 불량 유형별 통계를 포함합니다.' })
  @ApiQuery({ name: 'startDate', description: '시작일 (YYYY-MM-DD)', required: true })
  @ApiQuery({ name: 'endDate', description: '종료일 (YYYY-MM-DD)', required: true })
  @ApiResponse({ status: 200, description: '기간별 품질 통계를 성공적으로 조회했습니다.' })
  getQualityStatsByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.qualityInspectionsService.getQualityStatsByDateRange(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: '품질검사 상세 조회', description: '특정 품질검사의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '품질검사 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '품질검사 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 품질검사를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualityInspectionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '품질검사 정보 수정', description: '기존 품질검사의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '품질검사 ID', type: 'number' })
  @ApiBody({ type: UpdateQualityInspectionDto })
  @ApiResponse({ status: 200, description: '품질검사 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 품질검사를 찾을 수 없습니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateQualityInspectionDto: UpdateQualityInspectionDto) {
    return this.qualityInspectionsService.update(id, updateQualityInspectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '품질검사 삭제', description: '기존 품질검사를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '품질검사 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '품질검사가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 품질검사를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualityInspectionsService.remove(id);
  }
}
