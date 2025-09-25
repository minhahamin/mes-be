-- 상위 메뉴 데이터
INSERT INTO menu_categories (name, display_name, icon, sort_order) VALUES
('production', '생산관리', 'fas fa-industry', 1),
('quality', '품질관리', 'fas fa-check-circle', 2),
('inventory', '재고관리', 'fas fa-boxes', 3),
('reports', '보고서', 'fas fa-chart-bar', 4);

-- 하위 메뉴 데이터
INSERT INTO menu_items (category_id, name, display_name, url, icon, sort_order) VALUES
-- 생산관리 하위메뉴
(1, 'production-plan', '생산계획', '/production/plan', 'fas fa-calendar-alt', 1),
(1, 'production-schedule', '생산일정', '/production/schedule', 'fas fa-clock', 2),
(1, 'work-orders', '작업지시', '/production/work-orders', 'fas fa-tasks', 3),
(1, 'production-status', '생산현황', '/production/status', 'fas fa-chart-line', 4),

-- 품질관리 하위메뉴
(2, 'quality-inspection', '품질검사', '/quality/inspection', 'fas fa-search', 1),
(2, 'quality-control', '품질관리', '/quality/control', 'fas fa-cogs', 2),
(2, 'defect-analysis', '불량분석', '/quality/defects', 'fas fa-exclamation-triangle', 3),

-- 재고관리 하위메뉴
(3, 'inventory-status', '재고현황', '/inventory/status', 'fas fa-warehouse', 1),
(3, 'stock-movement', '입출고', '/inventory/movement', 'fas fa-exchange-alt', 2),
(3, 'stock-alerts', '재고알림', '/inventory/alerts', 'fas fa-bell', 3);
