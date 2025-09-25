import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('API/APP')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API 상태 확인', description: 'MES Backend API의 기본 상태를 확인합니다.' })
  @ApiResponse({ status: 200, description: 'API가 정상적으로 실행 중입니다.' })
  getHello(): string {
    return 'MES Backend API가 정상적으로 실행 중입니다! 🚀';
  }

  @Get('health')
  @ApiOperation({ summary: '헬스 체크', description: '서버의 상태와 실행 시간을 확인합니다.' })
  @ApiResponse({ 
    status: 200, 
    description: '서버 상태 정보를 성공적으로 조회했습니다.',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'OK' },
        timestamp: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
        uptime: { type: 'number', example: 123.456 }
      }
    }
  })
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
