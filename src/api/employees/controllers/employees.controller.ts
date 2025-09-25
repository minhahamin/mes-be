import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { EmployeesService } from '../services/employees.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@ApiTags('API/EMPLOYEES')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: '직원 등록', description: '새로운 직원 정보를 등록합니다.' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: '직원이 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 직원 ID 또는 이메일입니다.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: '직원 목록 조회', description: '등록된 모든 직원 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '직원 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '직원 상세 조회', description: '특정 직원의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '직원 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '직원 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 직원을 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '직원 정보 수정', description: '기존 직원의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '직원 ID', type: 'number' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: '직원 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 직원을 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 직원 ID 또는 이메일입니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '직원 삭제', description: '기존 직원을 삭제합니다.' })
  @ApiParam({ name: 'id', description: '직원 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '직원이 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 직원을 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
