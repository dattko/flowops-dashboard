# FlowOps

주문, 매출, 재고 현황을 관리하는 백오피스와 고객용 웹을 함께 운영하기 위한 pnpm 모노레포입니다. 현재는 관리자용 Next.js 애플리케이션을 먼저 개발하고 있으며, 고객용 웹은 백오피스와 데이터 기반이 안정된 뒤 `apps/web`에 추가합니다.

## 현재 구성

- `@flowops/admin`: 운영자를 위한 백오피스
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS와 shadcn/ui 기반 UI
- TanStack Query와 Zustand 기반 상태 관리
- Chart.js 기반 대시보드 차트
- pnpm workspace 기반 모노레포

## 요구 사항

- Node.js 22 이상
- pnpm 11 이상

## 시작하기

저장소 루트에서 의존성을 설치하고 관리자 앱을 실행합니다.

```bash
pnpm install
pnpm dev
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 주요 명령어

루트 명령어는 현재 관리자 앱에 연결되어 있습니다.

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev` | 관리자 앱 개발 서버 실행 |
| `pnpm lint` | 관리자 앱 ESLint 검사 |
| `pnpm build` | 관리자 앱 프로덕션 빌드 |
| `pnpm start` | 빌드된 관리자 앱 실행 |

특정 앱을 직접 실행할 때는 workspace 필터를 사용할 수 있습니다.

```bash
pnpm --filter @flowops/admin dev
pnpm --filter @flowops/admin build
```

## 모노레포 구조

```text
flowops/
├── apps/
│   └── admin/                 # 현재 개발 중인 관리자용 Next.js 앱
│       ├── app/               # 라우트, 레이아웃, 페이지 조립
│       ├── components/        # 공통 UI와 앱 레이아웃
│       ├── features/          # 업무 기능별 UI와 로직
│       ├── lib/               # 앱 전반의 기반 코드
│       ├── public/            # 정적 파일
│       └── package.json
├── docs/                      # 프로젝트 문서
├── package.json               # 워크스페이스 공통 명령어
├── pnpm-lock.yaml             # 저장소 전체 단일 lockfile
└── pnpm-workspace.yaml        # apps/*와 packages/* 등록
```

다음 디렉터리는 실제 구현을 시작할 때 생성합니다.

```text
apps/web/                      # 고객용 메인 사이트
packages/types/                # 두 앱이 공유하는 도메인 타입
packages/api/                  # 공통 API 클라이언트와 쿼리 규약
packages/ui/                   # 실제로 두 앱에서 공유하는 UI와 디자인 토큰
```

관리자와 고객 화면은 목적과 디자인이 다르므로 UI를 처음부터 모두 공통화하지 않습니다. 두 앱에서 실제로 반복되는 타입, API 코드, 디자인 토큰이 확인됐을 때만 `packages`로 이동합니다.

## 관리자 앱 구조

관리자 앱은 기능별 코드를 모으는 feature-first 구조를 사용합니다.

```text
apps/admin/
├── app/                       # Next.js App Router
├── features/
│   └── dashboard/
│       ├── api/               # 서버 데이터 조회 규약
│       ├── components/        # 대시보드 전용 UI
│       ├── constants/         # 쿼리 키와 상태 상수
│       ├── data/              # 현재 목 데이터
│       └── model/             # 타입, 매퍼, 화면 상태 로직
├── components/
│   ├── common/                # 여러 기능에서 쓰는 공통 컴포넌트
│   ├── layout/                # Sidebar와 Header
│   └── ui/                    # shadcn/ui 기반 범용 UI
└── lib/                       # 앱 전반에서 사용하는 유틸리티와 기반 코드
```

특정 기능에서만 사용하는 컴포넌트와 타입은 해당 `features` 폴더에 둡니다. 두 기능 이상에서 실제로 재사용될 때만 앱의 `components`나 `lib`로 올립니다.

## shadcn/ui 컴포넌트 추가

관리자 앱 디렉터리를 지정해 컴포넌트를 추가합니다.

```bash
pnpm --dir apps/admin dlx shadcn@latest add dialog input
```

## 환경 변수

앱별 환경 변수는 각 앱 디렉터리에서 관리합니다.

```text
apps/admin/.env.local
apps/web/.env.local
```

Supabase를 연결할 때 관리자 앱의 `.env.local`부터 추가합니다. `.env*` 파일은 저장소에 커밋되지 않습니다.

## 다음 개발 순서

1. Supabase 프로젝트와 인증 환경 설정
2. 상품, 주문, 주문 항목, 재고 테이블 정의
3. 관리자와 고객 역할 및 RLS 정책 설정
4. 대시보드 목 데이터를 실제 조회로 교체
5. `apps/web` 고객용 사이트 추가
6. 실제 공유가 확인된 코드만 `packages`로 분리

## 검증

```bash
pnpm lint
pnpm build
```
