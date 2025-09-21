# MES Backend API

NestJS를 사용한 MES(Manufacturing Execution System) 백엔드 API입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js (v18 이상)
- MySQL (v8.0 이상)
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=mes_db

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h

# Server
PORT=3000
NODE_ENV=development
```

3. 데이터베이스 생성
MySQL에서 `mes_db` 데이터베이스를 생성하세요.

4. 애플리케이션 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run build
npm run start:prod
```

## 📚 API 엔드포인트

### 인증 (Auth)
- `POST /auth/register` - 회원가입
- `POST /auth/login` - 로그인
- `GET /auth/profile` - 프로필 조회 (인증 필요)

### 사용자 (Users)
- `GET /users` - 모든 사용자 조회
- `GET /users/:id` - 특정 사용자 조회
- `POST /users` - 사용자 생성
- `PATCH /users/:id` - 사용자 정보 수정
- `DELETE /users/:id` - 사용자 삭제

### 기타
- `GET /` - API 상태 확인
- `GET /health` - 헬스 체크

## 🛠️ 개발 도구

### 스크립트
- `npm run start:dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run test` - 테스트 실행
- `npm run lint` - 코드 린팅
- `npm run format` - 코드 포맷팅

### 기술 스택
- **Framework**: NestJS
- **Database**: MySQL + TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Language**: TypeScript

## 📁 프로젝트 구조

```
src/
├── auth/                 # 인증 모듈
│   ├── dto/             # 데이터 전송 객체
│   ├── guards/          # 인증 가드
│   ├── strategies/      # Passport 전략
│   └── ...
├── users/               # 사용자 모듈
│   ├── dto/
│   ├── entities/        # 데이터베이스 엔티티
│   └── ...
├── common/              # 공통 모듈
│   ├── decorators/      # 커스텀 데코레이터
│   ├── filters/         # 예외 필터
│   └── ...
├── config/              # 설정 파일
├── app.module.ts        # 루트 모듈
└── main.ts             # 애플리케이션 진입점
```

## 🔧 설정

### 데이터베이스
TypeORM을 사용하여 MySQL과 연결됩니다. `src/config/database.config.ts`에서 데이터베이스 설정을 확인할 수 있습니다.

### 인증
JWT 토큰을 사용한 인증 시스템이 구현되어 있습니다. 토큰은 Authorization 헤더에 Bearer 토큰으로 전송해야 합니다.

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
