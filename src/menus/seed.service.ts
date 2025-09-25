import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async seedMenuData() {
    // 기존 데이터 확인
    const existingCategories = await this.menuCategoryRepository.count();
    if (existingCategories > 0) {
      return;
    }

    // 상위 메뉴 생성
    const categories = await this.menuCategoryRepository.save([
      {
        name: 'production',
        displayName: '생산관리',
        icon: 'fas fa-industry',
        sortOrder: 1,
      },
      {
        name: 'quality',
        displayName: '품질관리',
        icon: 'fas fa-check-circle',
        sortOrder: 2,
      },
      {
        name: 'inventory',
        displayName: '재고관리',
        icon: 'fas fa-boxes',
        sortOrder: 3,
      },
      {
        name: 'reports',
        displayName: '보고서',
        icon: 'fas fa-chart-bar',
        sortOrder: 4,
      },
    ]);

    // 하위 메뉴 생성
    await this.menuItemRepository.save([
      // 생산관리 하위메뉴
      {
        categoryId: categories[0].id,
        name: 'production-plan',
        displayName: '생산계획',
        url: '/production/plan',
        icon: 'fas fa-calendar-alt',
        sortOrder: 1,
      },
      {
        categoryId: categories[0].id,
        name: 'production-schedule',
        displayName: '생산일정',
        url: '/production/schedule',
        icon: 'fas fa-clock',
        sortOrder: 2,
      },
      {
        categoryId: categories[0].id,
        name: 'work-orders',
        displayName: '작업지시',
        url: '/production/work-orders',
        icon: 'fas fa-tasks',
        sortOrder: 3,
      },
      {
        categoryId: categories[0].id,
        name: 'production-status',
        displayName: '생산현황',
        url: '/production/status',
        icon: 'fas fa-chart-line',
        sortOrder: 4,
      },
      // 품질관리 하위메뉴
      {
        categoryId: categories[1].id,
        name: 'quality-inspection',
        displayName: '품질검사',
        url: '/quality/inspection',
        icon: 'fas fa-search',
        sortOrder: 1,
      },
      {
        categoryId: categories[1].id,
        name: 'quality-control',
        displayName: '품질관리',
        url: '/quality/control',
        icon: 'fas fa-cogs',
        sortOrder: 2,
      },
      {
        categoryId: categories[1].id,
        name: 'defect-analysis',
        displayName: '불량분석',
        url: '/quality/defects',
        icon: 'fas fa-exclamation-triangle',
        sortOrder: 3,
      },
      // 재고관리 하위메뉴
      {
        categoryId: categories[2].id,
        name: 'inventory-status',
        displayName: '재고현황',
        url: '/inventory/status',
        icon: 'fas fa-warehouse',
        sortOrder: 1,
      },
      {
        categoryId: categories[2].id,
        name: 'stock-movement',
        displayName: '입출고',
        url: '/inventory/movement',
        icon: 'fas fa-exchange-alt',
        sortOrder: 2,
      },
      {
        categoryId: categories[2].id,
        name: 'stock-alerts',
        displayName: '재고알림',
        url: '/inventory/alerts',
        icon: 'fas fa-bell',
        sortOrder: 3,
      },
    ]);
  }
}
