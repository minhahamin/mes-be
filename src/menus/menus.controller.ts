import { Controller, Get } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get('hierarchy')
  async getMenuHierarchy() {
    return await this.menusService.getMenuHierarchy();
  }
}