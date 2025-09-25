import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@ApiTags('API/CUSTOMERS')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: '거래처 등록', description: '새로운 거래처 정보를 등록합니다.' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 201, description: '거래처가 성공적으로 등록되었습니다.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 데이터입니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 사업자번호 또는 거래처명입니다.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    console.log('거래처 등록 요청 데이터:', createCustomerDto);
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: '거래처 목록 조회', description: '등록된 모든 거래처 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '거래처 목록을 성공적으로 조회했습니다.' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '거래처 상세 조회', description: '특정 거래처의 상세 정보를 조회합니다.' })
  @ApiParam({ name: 'id', description: '거래처 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '거래처 정보를 성공적으로 조회했습니다.' })
  @ApiResponse({ status: 404, description: '해당 거래처를 찾을 수 없습니다.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '거래처 정보 수정', description: '기존 거래처의 정보를 수정합니다.' })
  @ApiParam({ name: 'id', description: '거래처 ID', type: 'number' })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({ status: 200, description: '거래처 정보가 성공적으로 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 거래처를 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '이미 등록된 사업자번호 또는 거래처명입니다.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '거래처 삭제', description: '기존 거래처를 삭제합니다.' })
  @ApiParam({ name: 'id', description: '거래처 ID', type: 'number' })
  @ApiResponse({ status: 200, description: '거래처가 성공적으로 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '해당 거래처를 찾을 수 없습니다.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
