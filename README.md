# MES Backend API

Manufacturing Execution System (MES) 백엔드 API 서버입니다.

- 배포 : https://mes-be-production.up.railway.app/
- swagger api문서 : https://mes-be-production.up.railway.app/api

## 🚀 기술 스택

- **Framework**: NestJS 10.x
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Deployment**: Railway

## 📁 프로젝트 구조

```
src/
├── api/                              # API 모듈들
│   ├── companies/                    # 사업장 정보 관리
│   ├── customers/                    # 거래처 정보 관리
│   ├── employees/                    # 직원 정보 관리
│   ├── products/                     # 품목 정보 관리 (재고 정보 포함)
│   ├── orders/                       # 수주 관리
│   ├── purchases/                    # 발주 관리
│   ├── receipts/                     # 입고 관리
│   ├── shipments/                    # 출하 관리
│   ├── deliveries/                   # 납품 관리
│   ├── production-plans/             # 생산계획 관리
│   ├── work-orders/                  # 생산지시 관리
│   ├── quality-inspections/          # 품질검사 관리
│   ├── claims/                       # 클레임 관리
│   ├── inventory/                    # 재고 조정 관리
│   ├── production-status/            # 생산현황 조회 (계획+지시 조인)
│   ├── purchase-receipt-status/      # 발주/입고 현황 조회 (발주+입고 조인)
│   └── inventory-status/             # 재고 현황 조회
├── auth/                             # 인증 관리
├── users/                            # 사용자 관리
├── menus/                            # 메뉴 관리
├── common/                           # 공통 모듈
│   ├── decorators/
│   └── filters/
├── config/                           # 설정 파일
├── migrations/                       # DB 마이그레이션
├── app.module.ts                     # 메인 모듈
└── main.ts                           # 애플리케이션 진입점
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=mes-be

# 서버 설정
PORT=3000
NODE_ENV=development
```

### 3. 데이터베이스 설정
PostgreSQL에서 데이터베이스를 생성하세요:

```sql
CREATE DATABASE "mes-be";
```

### 4. 서버 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start:prod
```

## 📚 API 문서

서버 실행 후 다음 URL에서 Swagger API 문서를 확인할 수 있습니다:

- **로컬**: http://localhost:3000/api
- **프로덕션**: https://mes-be-production.up.railway.app/api

## 🔧 주요 기능 모듈

### 기본 정보 관리
- **사업장 관리** (`/companies`) - 사업장 정보 CRUD
- **거래처 관리** (`/customers`) - 거래처 정보 CRUD
- **직원 관리** (`/employees`) - 직원 정보 CRUD, 자동 직원코드 생성 (EMP001...)
- **품목 관리** (`/products`) - 품목 정보 CRUD, 자동 품목코드 생성 (PROD001...), 재고 정보 조인

### 영업 관리
- **수주 관리** (`/orders`) - 수주 등록 및 관리, 자동 수주번호 생성 (ORDER2024001...)
- **출하 관리** (`/shipments`) - 출하 등록 및 추적, 자동 출하번호 생성 (SH001...)
- **납품 관리** (`/deliveries`) - 납품 예정 및 완료 관리, 자동 납품번호 생성 (DEL001...)

### 구매 관리
- **발주 관리** (`/purchases`) - 발주 등록 및 관리
- **입고 관리** (`/receipts`) - 입고 등록 및 관리
- **발주/입고 현황** (`/purchase-receipt-status`) - 발주 대비 입고 현황 조회, 입고율 계산

### 생산 관리
- **생산계획 관리** (`/production-plans`) - 생산계획 등록 및 관리, 자동 계획번호 생성 (PLAN2024001...)
- **생산지시 관리** (`/work-orders`) - 생산지시 등록 및 관리, 자동 지시번호 생성 (ORDER2024001...)
- **생산현황 조회** (`/production-status`) - 생산계획 대비 생산지시 현황, 달성률 계산

### 품질 관리
- **품질검사 관리** (`/quality-inspections`) - 품질검사 등록 및 관리
  - 검사 유형: incoming(수입검사), in_process(공정검사), final(최종검사), outgoing(출하검사)
  - 자동 품질검사번호 생성 (Q2024001...)
  - 자동 배치번호 생성 (BATCH001...)
  - 합격률 자동 계산

### 고객 관리
- **클레임 관리** (`/claims`) - 클레임 접수 및 처리
  - 클레임 유형: defect(불량), delivery_delay(배송지연), wrong_product(오배송), damaged(파손), missing_parts(부품누락)
  - 처리 상태: pending(대기), investigating(조사중), resolved(해결), rejected(거부)
  - 자동 클레임번호 생성 (CLM2024001...)

### 재고 관리
- **재고 조정 관리** (`/inventory`) - 재고 입출고 및 조정
  - 이동 유형: in(입고), out(출고), adjustment(조정), transfer(이동), return(반품)
  - 재고 상태 자동 결정: sufficient(충분), low(부족), out_of_stock(재고없음), excess(과잉)
  - 총 재고 가치 자동 계산
- **재고 현황 조회** (`/inventory-status`) - 재고 현황 분석
  - 전체/카테고리별/공급업체별/위치별 현황
  - 재주문 필요 항목 조회
  - 재고 가치 상위 항목 조회

## 🎯 핵심 기능

### 자동 ID 생성
모든 주요 엔티티에서 자동으로 고유 ID를 생성합니다:
- 직원코드: `EMP001`, `EMP002`, `EMP003`...
- 품목코드: `PROD001`, `PROD002`, `PROD003`...
- 수주번호: `ORDER2024001`, `ORDER2024002`...
- 출하번호: `SH001`, `SH002`, `SH003`...
- 납품번호: `DEL001`, `DEL002`, `DEL003`...
- 생산계획번호: `PLAN2024001`, `PLAN2024002`...
- 생산지시번호: `ORDER2024001`, `ORDER2024002`...
- 품질검사번호: `Q2024001`, `Q2024002`...
- 배치번호: `BATCH001`, `BATCH002`...
- 클레임번호: `CLM2024001`, `CLM2024002`...

### 자동 계산 기능
- **수주**: 총 금액 자동 계산 (수량 × 단가)
- **발주**: 총 금액 자동 계산
- **품질검사**: 합격률 자동 계산 (합격 수량 / 검사 수량 × 100)
- **재고**: 총 재고 가치 자동 계산 (재고 수량 × 단위 원가)
- **생산현황**: 달성률 자동 계산 (완료 수량 / 계획 수량 × 100)
- **발주/입고 현황**: 입고율 자동 계산 (입고 수량 / 발주 수량 × 100)

### 현황 조회 기능
- **생산현황**: 생산계획과 생산지시를 조인하여 실시간 진행률 제공
- **발주/입고 현황**: 발주 대비 입고 완료율, 지연 입고 추적
- **재고 현황**: 재고 수준, 재주문 필요 항목, 재고 가치 분석

### 상태 자동 결정
- **재고 상태**: 재고 수량에 따라 자동으로 상태 결정
  - 재고 0: `out_of_stock`
  - 재고 ≤ 최소 재고: `low`
  - 재고 > 최대 재고: `excess`
  - 정상 범위: `sufficient`

## 📋 주요 API 엔드포인트

### 기본 정보 관리
- `POST /companies` - 사업장 등록
- `POST /customers` - 거래처 등록
- `POST /employees` - 직원 등록
- `POST /products` - 품목 등록

### 영업/물류
- `POST /orders` - 수주 등록
- `POST /shipments` - 출하 등록
- `POST /deliveries` - 납품 등록

### 구매
- `POST /purchases` - 발주 등록
- `POST /receipts` - 입고 등록
- `GET /purchase-receipt-status` - 발주/입고 현황 조회
- `GET /purchase-receipt-status/pending` - 미입고 발주 조회
- `GET /purchase-receipt-status/delayed` - 지연 입고 조회

### 생산
- `POST /production-plans` - 생산계획 등록
- `POST /work-orders` - 생산지시 등록
- `GET /production-status` - 생산현황 조회
- `GET /production-status/in-progress` - 진행중인 생산현황
- `PATCH /production-plans/:id/start` - 생산 시작
- `PATCH /production-plans/:id/complete` - 생산 완료

### 품질/고객
- `POST /quality-inspections` - 품질검사 등록
- `GET /quality-inspections/stats/date-range` - 기간별 품질 통계
- `POST /claims` - 클레임 등록
- `PATCH /claims/:id/resolve` - 클레임 해결 처리
- `GET /claims/stats/product/:productCode` - 제품별 클레임 통계

### 재고
- `POST /inventory` - 재고 등록
- `PATCH /inventory/adjust/:productCode` - 재고 조정 (입고/출고/조정)
- `GET /inventory-status` - 전체 재고 현황
- `GET /inventory-status/summary` - 재고 상태 요약
- `GET /inventory-status/low-stock` - 재주문 필요 재고
- `GET /inventory-status/product/:productCode` - 제품별 재고 상세 현황

## 🔍 유효성 검사

모든 API는 다음과 같은 유효성 검사를 수행합니다:

- **이메일**: 올바른 이메일 형식 검증
- **전화번호**: 010-0000-0000 형식 검증
- **사업자번호**: 000-00-00000 형식 검증
- **날짜**: ISO 8601 날짜 형식 검증
- **숫자**: 타입 및 범위 검증
- **Enum**: 허용된 값만 입력 가능
- **필수 필드**: 필수 입력 필드 검증

## 🚦 상태 코드

- **200**: 성공
- **201**: 생성 성공
- **400**: 잘못된 요청 (유효성 검사 실패)
- **404**: 리소스를 찾을 수 없음
- **409**: 중복 데이터 (이미 등록된 정보)

## 🛡️ 보안

- CORS 활성화
- 전역 유효성 검사 파이프 적용
- 데이터 변환 자동화 (class-transformer)
- 프로덕션 환경에서 DB synchronize 비활성화

## 📝 개발 스크립트

```bash
# 개발 서버 실행 (hot-reload)
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start:prod

# 린팅
npm run lint

# 코드 포맷팅
npm run format

# 테스트
npm run test
```

## 🚀 Railway 배포

### 환경 변수 설정
Railway Variables 탭에서 다음 환경 변수를 설정하세요:

```
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_DATABASE=${{Postgres.PGDATABASE}}
NODE_ENV=production
```

### 배포 명령어
```bash
git add .
git commit -m "Deploy to Railway"
git push
```

Railway가 자동으로 빌드 및 배포를 수행합니다.

## 📊 데이터베이스 스키마

### 생산 관리 흐름
```
생산계획(ProductionPlan) 
    → 생산지시(WorkOrder) 
    → 품질검사(QualityInspection)
```

### 구매/재고 흐름
```
발주(Purchase) 
    → 입고(Receipt) 
    → 재고조정(Inventory)
```

### 영업 흐름
```
수주(Order) 
    → 출하(Shipment) 
    → 납품(Delivery) 
    → 클레임(Claim)
```

## 🎯 현황 조회 API

### 생산현황 (`/production-status`)
- 생산계획과 생산지시를 조인하여 실시간 진행률 제공
- 계획 수량 대비 완료/진행중 수량 표시
- 작업장별, 제품별, 기간별 현황 조회

### 발주/입고 현황 (`/purchase-receipt-status`)
- 발주와 입고를 조인하여 입고율 계산
- 미입고 발주, 지연 입고 자동 추적
- 공급업체별, 제품별 현황 조회

### 재고 현황 (`/inventory-status`)
- 전체 재고 가치 및 수량 집계
- 재주문 필요 항목 자동 탐지
- 카테고리별, 공급업체별, 위치별 통계
- 최근 재고 이동 내역 조회

## 📈 통계 및 분석 API

### 품질 통계
- `GET /quality-inspections/stats/product/:productCode` - 제품별 품질 통계
- `GET /quality-inspections/stats/date-range` - 기간별 품질 통계 (불량 유형 포함)

### 클레임 통계
- `GET /claims/stats/product/:productCode` - 제품별 클레임 통계
- `GET /claims/stats/date-range` - 기간별 클레임 통계 (유형별, 보상별)

### 재고 통계
- `GET /inventory-status/summary` - 재고 상태 요약 (상태별, 카테고리별)
- `GET /inventory-status/top-value` - 재고 가치 상위 항목

## 🔄 자동 기능

### 자동 ID 생성
- 직원코드: `EMP001`, `EMP002`...
- 품목코드: `PROD001`, `PROD002`...
- 수주번호: `ORDER2024001`, `ORDER2024002`...
- 출하번호: `SH001`, `SH002`...
- 납품번호: `DEL001`, `DEL002`...
- 생산계획: `PLAN2024001`, `PLAN2024002`...
- 생산지시: `ORDER2024001`, `ORDER2024002`...
- 품질검사: `Q2024001`, `Q2024002`...
- 배치번호: `BATCH001`, `BATCH002`...
- 클레임: `CLM2024001`, `CLM2024002`...

### 자동 계산
- 수주/발주 총액 계산
- 품질검사 합격률 계산
- 재고 총 가치 계산
- 생산 달성률 계산
- 입고율 계산

### 자동 상태 결정
- 재고 상태 (부족/충분/과잉)
- 생산계획 시작/종료일 자동 설정
- 클레임 해결일 자동 설정

## 🌐 배포 URL

- **API Base URL**: https://mes-be-production.up.railway.app
- **Swagger Documentation**: https://mes-be-production.up.railway.app/api

## 📞 지원

문제가 발생하거나 문의사항이 있으시면 이슈를 등록해주세요.

---

**MES Backend API v1.0** - Manufacturing Execution System
