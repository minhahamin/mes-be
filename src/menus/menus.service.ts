import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  // 계층적 메뉴 구조로 조회
  async getMenuHierarchy() {
    const categories = await this.menuCategoryRepository.find({
      where: { isActive: true },
      relations: ['menuItems'],
      order: { sortOrder: 'ASC' }
    });

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      displayName: category.displayName,
      icon: category.icon,
      sortOrder: category.sortOrder,
      children: category.menuItems
        .filter(item => item.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(item => ({
          id: item.id,
          name: item.name,
          displayName: item.displayName,
          url: item.url,
          icon: item.icon,
          sortOrder: item.sortOrder
        }))
    }));
  }
}