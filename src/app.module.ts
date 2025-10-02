import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { CompaniesModule } from './api/companies/companies.module';
import { CustomersModule } from './api/customers/customers.module';
import { EmployeesModule } from './api/employees/employees.module';
import { ProductsModule } from './api/products/products.module';
import { OrdersModule } from './api/orders/orders.module';
import { PurchasesModule } from './api/purchases/purchases.module';
import { ReceiptsModule } from './api/receipts/receipts.module';
import { ShipmentsModule } from './api/shipments/shipments.module';
import { DeliveriesModule } from './api/deliveries/deliveries.module';
import { ProductionPlansModule } from './api/production-plans/production-plans.module';
import { WorkOrdersModule } from './api/work-orders/work-orders.module';
import { ProductionStatusModule } from './api/production-status/production-status.module';
import { PurchaseReceiptStatusModule } from './api/purchase-receipt-status/purchase-receipt-status.module';
import { QualityInspectionsModule } from './api/quality-inspections/quality-inspections.module';
import { ClaimsModule } from './api/claims/claims.module';
import { InventoryModule } from './api/inventory/inventory.module';
import { InventoryStatusModule } from './api/inventory-status/inventory-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_DATABASE || 'mes-be',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 프로덕션에서도 자동 테이블 생성 (포트폴리오용)
      logging: false,
    }),
    // AuthModule,
    // UsersModule,
    MenusModule,
    CompaniesModule,
    CustomersModule,
    EmployeesModule,
    ProductsModule,
    OrdersModule,
    PurchasesModule,
    ReceiptsModule,
    ShipmentsModule,
    DeliveriesModule,
    ProductionPlansModule,
    WorkOrdersModule,
    ProductionStatusModule,
    PurchaseReceiptStatusModule,
    QualityInspectionsModule,
    ClaimsModule,
    InventoryModule,
    InventoryStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
