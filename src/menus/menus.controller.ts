import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenusService } from './menus.service';

@ApiTags('API/MENUS')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get('hierarchy')
  @ApiOperation({ 
    summary: '메뉴 계층 구조 조회', 
    description: '상위 메뉴와 하위 메뉴의 계층적 구조를 조회합니다.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: '메뉴 계층 구조를 성공적으로 조회했습니다.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '메뉴 카테고리 ID' },
          name: { type: 'string', description: '메뉴 카테고리 이름' },
          displayName: { type: 'string', description: '표시될 메뉴 이름' },
          icon: { type: 'string', description: '아이콘 클래스명' },
          sortOrder: { type: 'number', description: '정렬 순서' },
          children: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: '메뉴 아이템 ID' },
                name: { type: 'string', description: '메뉴 아이템 이름' },
                displayName: { type: 'string', description: '표시될 메뉴 이름' },
                url: { type: 'string', description: '메뉴 링크 URL' },
                icon: { type: 'string', description: '아이콘 클래스명' },
                sortOrder: { type: 'number', description: '정렬 순서' }
              }
            }
          }
        }
      }
    }
  })
  async getMenuHierarchy() {
    return await this.menusService.getMenuHierarchy();
  }
}