import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@ApiTags('API/COMPANIES')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: '사업장 등록', description: '새로운 사업장 정보를 등록합니다.' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({ status: 201, description: '사업장이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 사업자번호입니다.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: '사업장 목록 조회', description: '등록된 모든 사업장 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '사업장 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '사업장 상세 조회', description: '특정 사업장의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '사업장 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '사업장 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 사업장을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '사업장 정보 수정', description: '기존 사업장의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '사업장 ID', type: 'number' })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: '사업장 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 사업장을 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 사업자번호입니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    console.log('PATCH 요청 - ID:', id);
    console.log('PATCH 요청 - 데이터:', updateCompanyDto);
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '사업장 삭제', description: '기존 사업장을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '사업장 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '사업장이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 사업장을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}
