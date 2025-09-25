# MES Backend API

Manufacturing Execution System (MES) 백엔드 API 서버입니다.

## 🚀 기술 스택

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Language**: TypeScript
- **Documentation**: Swagger
- **Validation**: class-validator, class-transformer

## 📁 프로젝트 구조

```
src/
├── api/                    # API 모듈들
│   ├── companies/         # 사업장 정보 관리
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── controllers/
│   │   └── services/
│   ├── customers/         # 거래처 정보 관리
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── controllers/
│   │   └── services/
│   ├── employees/         # 직원 정보 관리
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── controllers/
│   │   └── services/
│   └── products/          # 품목 정보 관리
│       ├── entities/
│       ├── dto/
│       ├── controllers/
│       └── services/
├── menus/                 # 메뉴 관리
│   ├── entities/
│   └── services/
├── users/                 # 사용자 관리
├── auth/                  # 인증 관리
└── migrations/            # 데이터베이스 마이그레이션
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

# JWT 설정
JWT_SECRET=your-secret-key

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

# 프로덕션 모드
npm run start:prod
```

## 📚 API 문서

서버 실행 후 다음 URL에서 Swagger API 문서를 확인할 수 있습니다:

- **Swagger UI**: http://localhost:3000/api

## 🔧 주요 기능

### 1. 사업장 정보 관리 (Companies)
- **POST** `/companies` - 사업장 등록
- **GET** `/companies` - 사업장 목록 조회
- **GET** `/companies/:id` - 사업장 상세 조회
- **PATCH** `/companies/:id` - 사업장 정보 수정
- **DELETE** `/companies/:id` - 사업장 삭제

### 2. 거래처 정보 관리 (Customers)
- **POST** `/customers` - 거래처 등록
- **GET** `/customers` - 거래처 목록 조회
- **GET** `/customers/:id` - 거래처 상세 조회
- **PATCH** `/customers/:id` - 거래처 정보 수정
- **DELETE** `/customers/:id` - 거래처 삭제

### 3. 직원 정보 관리 (Employees)
- **POST** `/employees` - 직원 등록 (직원코드 자동생성: EMP001, EMP002...)
- **GET** `/employees` - 직원 목록 조회
- **GET** `/employees/:id` - 직원 상세 조회
- **PATCH** `/employees/:id` - 직원 정보 수정
- **DELETE** `/employees/:id` - 직원 삭제

### 4. 품목 정보 관리 (Products)
- **POST** `/products` - 품목 등록 (품목코드 자동생성: PROD001, PROD002...)
- **GET** `/products` - 품목 목록 조회
- **GET** `/products/:id` - 품목 상세 조회
- **PATCH** `/products/:id` - 품목 정보 수정
- **DELETE** `/products/:id` - 품목 삭제
- **GET** `/products/low-stock` - 재고 부족 품목 조회
- **GET** `/products/category/:category` - 카테고리별 품목 조회
- **GET** `/products/supplier/:supplier` - 공급업체별 품목 조회

### 5. 메뉴 관리 (Menus)
- **GET** `/menus/hierarchy` - 계층적 메뉴 구조 조회

## 📋 데이터 모델

### 사업장 (Company)
- `id`: 고유 ID
- `companyName`: 회사명
- `businessNumber`: 사업자번호 (고유)
- `ceoName`: 대표자명
- `address`: 주소
- `phone`: 전화번호
- `email`: 이메일
- `industry`: 업종
- `establishedDate`: 설립일

### 거래처 (Customer)
- `id`: 고유 ID
- `customerName`: 거래처명 (고유)
- `contactPerson`: 담당자명
- `phone`: 전화번호
- `email`: 이메일
- `address`: 주소
- `businessNumber`: 사업자번호 (고유)
- `industry`: 업종
- `creditLimit`: 신용한도
- `paymentTerms`: 결제 조건
- `registrationDate`: 등록일

### 직원 (Employee)
- `id`: 고유 ID
- `employeeId`: 직원코드 (자동생성, 고유)
- `name`: 직원명
- `department`: 부서
- `position`: 직급
- `phone`: 전화번호
- `email`: 이메일 (고유)
- `hireDate`: 입사일
- `salary`: 급여
- `status`: 상태 (active/inactive/resigned)
- `address`: 주소
- `emergencyContact`: 비상연락처
- `emergencyPhone`: 비상연락처 전화번호

### 품목 (Product)
- `id`: 고유 ID
- `productCode`: 품목코드 (자동생성, 고유)
- `productName`: 품목명
- `category`: 카테고리
- `description`: 품목 설명
- `unitPrice`: 단가
- `cost`: 원가
- `stock`: 재고 수량
- `minStock`: 최소 재고
- `maxStock`: 최대 재고
- `supplier`: 공급업체
- `status`: 상태 (active/inactive/discontinued)

## 🔍 유효성 검사

모든 API는 다음과 같은 유효성 검사를 수행합니다:

- **이메일**: 올바른 이메일 형식 검증
- **전화번호**: 010-0000-0000 형식 검증
- **사업자번호**: 000-00-00000 형식 검증
- **날짜**: 올바른 날짜 형식 검증
- **숫자**: 양수 및 숫자 형식 검증
- **필수 필드**: 필수 입력 필드 검증

## 🚦 상태 코드

- **200**: 성공
- **201**: 생성 성공
- **400**: 잘못된 요청
- **404**: 리소스를 찾을 수 없음
- **409**: 중복 데이터 (이미 등록된 정보)

## 🛡️ 보안

- CORS 활성화
- 전역 유효성 검사 파이프 적용
- JWT 기반 인증 (준비됨)
- 비밀번호 해싱 (bcrypt)

## 📝 개발 스크립트

```bash
# 개발 서버 실행
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

## 🔄 자동증가 기능

- **직원코드**: EMP001, EMP002, EMP003... (자동생성)
- **품목코드**: PROD001, PROD002, PROD003... (자동생성)

등록 시 코드를 입력할 필요 없이 자동으로 생성됩니다.

## 📞 지원

문제가 발생하거나 문의사항이 있으시면 이슈를 등록해주세요.

---

**MES Backend API v1.0** - Manufacturing Execution System