import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정
  app.enableCors();
  
  // 전역 유효성 검사 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('MES Backend API')
    .setDescription('Manufacturing Execution System Backend API 문서')
    .setVersion('1.0')
    .addTag('API/COMPANIES', '사업장 정보 관리')
    .addTag('API/CUSTOMERS', '거래처 정보 관리')
    .addTag('API/EMPLOYEES', '직원 정보 관리')
    .addTag('API/PRODUCTS', '품목 정보 관리')
    .addTag('API/ORDERS', '수주 관리')
    .addTag('API/PURCHASES', '발주 관리')
    .addTag('API/RECEIPTS', '입고 관리')
    .addTag('API/SHIPMENTS', '출하 관리')
    .addTag('API/DELIVERIES', '납품 관리')
    .addTag('API/PRODUCTION-PLANS', '생산계획 관리')
    .addTag('API/WORK-ORDERS', '생산지시 관리')
    .addTag('API/PRODUCTION-STATUS', '생산현황 조회')
    .addTag('API/MENUS', '메뉴 관리')
    .addTag('API/USERS', '사용자 관리')
    .addTag('API/AUTH', '인증 관리')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
