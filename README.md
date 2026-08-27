# FlowOps

스페셜티 커피 자사몰 `Morrow Coffee`의 주문, 매출, 재고 현황을 관리하는 백오피스와 고객용 웹을 함께 운영하기 위한 pnpm 모노레포입니다. 현재는 관리자용 Next.js 애플리케이션을 먼저 개발하고 있으며, 고객용 웹은 추후 `apps/web`에 추가할 예정입니다.

`FlowOps`는 운영 백오피스 제품명이고 `Morrow Coffee`는 포트폴리오에서 관리하는 데모 스토어입니다. 데모 카탈로그는 원두, 드립백, 커피 캡슐, 콜드브루와 홈카페 용품 총 100개로 구성합니다.

## 기술 스택

- pnpm workspace 기반 모노레포
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4, shadcn/ui
- Supabase Auth, REST API 연동
- TanStack Query, TanStack Table
- Zustand
- React Hook Form, Zod
- Chart.js, react-chartjs-2
- Day.js
- React Context 기반 프로필 상태 공유
- Vitest, V8 Coverage
- Storybook

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

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev` | 관리자 앱 개발 서버 실행 |
| `pnpm lint` | 관리자 앱 ESLint 검사 |
| `pnpm test` | Vitest 단위 테스트 1회 실행 |
| `pnpm test:watch` | Vitest 단위 테스트 감시 모드 |
| `pnpm test:coverage` | V8 단위 테스트 커버리지 생성 |
| `pnpm storybook` | 관리자 앱 Storybook 실행 |
| `pnpm build-storybook` | Storybook 정적 빌드 검사 |
| `pnpm build` | 관리자 앱 프로덕션 빌드 |
| `pnpm start` | 빌드된 관리자 앱 실행 |

특정 앱을 직접 실행할 때는 workspace 필터를 사용할 수 있습니다.

```bash
pnpm --filter @flowops/admin dev
pnpm --filter @flowops/admin build
pnpm --filter @flowops/admin exec tsc --noEmit
```

## 모노레포 구조

```text
flowops-dashboard/
├── apps/
│   └── admin/                 # 관리자용 Next.js 앱
├── bruno/                     # Supabase Auth·RPC API 테스트 컬렉션
├── docs/                      # 프로젝트 문서
├── package.json               # 루트 공통 명령어
├── pnpm-lock.yaml             # 저장소 전체 단일 lockfile
└── pnpm-workspace.yaml        # apps/*, packages/* workspace 등록
```

필요해질 때 다음 workspace를 추가합니다.

```text
apps/web/                      # 고객용 메인 사이트
packages/types/                # 여러 앱이 실제로 공유하는 타입
packages/api/                  # 여러 앱이 실제로 공유하는 API 규약
packages/ui/                   # 여러 앱이 실제로 공유하는 UI와 디자인 토큰
```

관리자와 고객 화면은 목적과 디자인이 다르므로 처음부터 모든 코드를 공통화하지 않습니다. 두 앱에서 실제 중복이 확인된 코드만 `packages`로 이동합니다.

## 관리자 앱 구조

관리자 앱은 Next.js App Router와 Light FSD 구조를 함께 사용합니다.

```text
apps/admin/
├── app/                       # 라우트, 레이아웃, 위젯 조합
│   ├── (admin)/               # 인증이 필요한 관리자 화면
│   ├── (auth)/                # 로그인 화면
│   ├── auth/                  # 세션 관련 Route Handler
│   └── providers.tsx          # TanStack Query Provider
├── entities/                  # 비즈니스 대상의 공통 모델과 표현
│   ├── order/                 # 주문 상세 타입, 상태·결제 라벨과 공통 스타일
│   ├── inventory/             # 재고·상품 상태 타입과 공통 상태 배지
│   ├── profile/               # 프로필 조회, 타입, Context
│   └── settings/              # 상점·배송·계정 설정 타입
├── features/                  # 사용자의 행동과 업무 기능
│   ├── auth/                  # 로그인, 로그아웃, 세션 만료 처리
│   ├── create-inventory-product/ # 상품과 최초 재고 등록
│   ├── filter-orders/         # RHF 기반 주문 검색 및 상태 필터 UI
│   ├── filter-inventory/      # RHF 기반 재고 검색 및 상태 필터 UI
│   ├── adjust-inventory-stock/ # 입고·출고·실사 조정과 이력 등록
│   ├── update-order-detail/   # 주문자·배송지·상태 수정
│   ├── update-inventory-product/ # 상품 정보와 안전 재고 수정
│   ├── add-order-consultation-note/ # 상담 메모 등록
│   └── update-settings/       # 상점·배송·계정 설정 수정
├── widgets/                   # 독립적인 화면 블록과 데이터 조합
│   ├── dashboard/             # 대시보드 조회 및 전체 화면 조합
│   ├── order-detail/          # 주문 상세 SSR 조회와 화면 조합
│   ├── order-list/            # 주문 목록 조회와 테이블
│   ├── inventory-list/        # 재고 목록 조회와 테이블 조합
│   ├── inventory-detail/      # 재고 상세 SSR 조회와 관리 기능 조합
│   ├── settings/              # 설정 SSR 조회와 화면 조합
│   ├── sidebar/               # 메뉴 조회와 사이드바
│   └── mobile-header/         # 모바일 헤더
└── shared/                    # 도메인에 의존하지 않는 공통 코드
    ├── api/base/              # 클라이언트·서버 공통 API Fetcher
    ├── lib/                   # Supabase, 날짜, 통화, 세션, 페이지 계산 유틸
    ├── model/                 # 공통 페이지네이션 타입과 기본값
    ├── store/                 # 여러 위젯이 공유하는 클라이언트 UI 상태
    └── ui/                    # shadcn/ui 기반 범용 UI와 페이지네이션
```

## FSD 의존 방향

상위 레이어는 하위 레이어를 사용할 수 있지만 반대 방향으로 참조하지 않습니다.

```text
app → widgets → features → entities → shared
```

예시는 다음과 같습니다.

- `shared/ui/button`: 주문이나 인증을 모르는 범용 버튼
- `entities/order`: 여러 주문 화면에서 사용하는 상세 타입, 상태·결제 표현과 `OrderStatusBadge`
- `features/auth`: 로그인과 로그아웃 같은 사용자 행동
- `features/filter-orders`: 주문 검색 및 상태 필터 입력 기능
- `features/filter-inventory`: 상품명·SKU 검색 및 재고 상태 필터 입력 기능
- `features/create-inventory-product`: 상품과 최초 재고를 함께 등록하는 기능
- `features/update-inventory-product`: 상품 정보와 안전 재고 수정 기능
- `features/adjust-inventory-stock`: 입고·출고·실사 조정과 이력 등록 기능
- `features/update-order-detail`: 주문 정보와 처리 상태 수정 기능
- `features/add-order-consultation-note`: 상담 메모 등록과 이력 UI
- `widgets/order-detail`: 상세 조회 후 표시 카드와 수정 기능을 조합
- `widgets/order-list`: 주문 목록 API, Query, 테이블 조합
- `widgets/inventory-list`: 재고 목록 API, Query와 테이블 조합
- `widgets/inventory-detail`: 상품 정보, 현재 재고, 조정 폼과 변경 이력 조합
- `widgets/dashboard`: 대시보드 RPC 결과를 여러 카드로 조합
- `app/(admin)/page.tsx`: `DashboardOverview` 위젯 배치

## 슬라이스 구성 규칙

각 슬라이스는 필요한 세그먼트만 만듭니다.

```text
slice-name/
├── api/                       # 실제 API 요청과 서버 액션
├── lib/                       # UI에서 사용하는 훅과 가공 로직
├── model/                     # 타입, 스키마, Context
├── ui/                        # JSX와 렌더링 로직
└── index.ts                   # 외부에 공개할 API
```

현재 프로젝트의 파일 이름 규칙은 다음과 같습니다.

```text
api/dashboard-server.api.ts
api/order-list-client.api.ts
api/auth-server.action.ts
lib/use-dashboard-metrics.ts
lib/use-order-list.ts
lib/use-active-menu.ts
```

- 일반 HTTP 요청은 `{도메인}-{실행환경}.api.ts`로 작성합니다.
- Next.js Server Action은 `{도메인}-server.action.ts`로 작성합니다.
- 커스텀 훅, Query/Mutation 훅, UI가 사용하는 가공 로직은 `lib/use-*`에 둡니다.
- `use-*` 함수는 React 컴포넌트 최상단에서 호출합니다.
- 타입, 검증 스키마와 Context는 `model`에 둡니다.
- TanStack Query의 `queryKey`는 별도 팩토리 파일 없이 해당 Query 훅에 직접 작성합니다.
- `ui`에는 JSX와 화면 표현에 직접 필요한 로직만 남깁니다.
- 아직 필요하지 않은 세그먼트는 미리 만들지 않습니다.
- 목록 필터의 검색·초기화 버튼은 `shared/ui/form/filter-form.tsx`의 공통 `FilterForm`으로 구성합니다.
- 페이지 제목 영역은 `shared/ui/page-header.tsx`의 `PageHeader`로 구성합니다.
- 대시보드와 목록의 평면 패널은 `Card`의 `appearance="panel"`을 사용합니다.
- 여러 폼에서 사용하는 textarea와 저장 결과 메시지는 각각 `InputTextarea`, `FormMessage`를 사용합니다.
- 단순 표는 `shared/ui/table.tsx`의 서버 호환 Table primitive를 사용하고, 정렬·필터 같은 상태 관리가 필요한 표는 이 primitive를 조합한 `DataTable`을 사용합니다.
- 비즈니스 상태를 해석하는 UI는 `shared`가 아니라 해당 entity에 둡니다. 주문 상태 표시는 `entities/order`의 `OrderStatusBadge`를 사용합니다.
- 단위 테스트는 검증 대상 파일과 가까운 위치에 `{파일명}.test.ts` 형식으로 작성합니다.

## 공개 API와 import 규칙

다른 슬라이스에서는 대상 슬라이스의 `index.ts`를 통해 가져옵니다.

```ts
import { ORDER_STATUS_LABELS } from "@/entities/order"
import { LoginForm } from "@/features/auth"
import { DashboardOverview } from "@/widgets/dashboard"
```

같은 슬라이스 내부에서는 순환 참조를 피하기 위해 상대 경로를 사용합니다.

```ts
import { useOrderList } from "../lib/use-order-list"
import { OrderListTable } from "./order-list-table"
```

외부 공개가 필요한 항목은 named export를 사용합니다.

```ts
export { OrderList } from "./ui/order-list"
```

## 데이터 조회 방식

- 초기 대시보드 데이터는 Server Component에서 REST API로 조회합니다.
- 주문 검색 폼은 React Hook Form으로 관리하고 확정된 필터와 페이지는 URL Search Params로 관리합니다.
- `page`, `pageSize`와 페이지 크기 선택지는 `shared/model/pagination.ts`에서 목록 공통 모델로 관리합니다.
- `shared/lib/use-list-search-params.ts`는 목록의 `page`, `pageSize`를 읽고 필터 변경 시 1페이지로 초기화합니다.
- 주문 목록의 route 필터 해석, 페이지 변경과 TanStack Query 조회는 `widgets/order-list/lib/use-order-list.ts` 한 곳에 모읍니다.
- 주문 테이블에서만 사용하는 컬럼 정의는 `widgets/order-list/ui/order-list-table.tsx`에 함께 둡니다.
- URL이 필터 상태이므로 새로고침, 뒤로 가기와 검색 결과 URL 공유에도 같은 조건이 유지됩니다.
- 범용 테이블은 `shared/ui/data-table.tsx`의 TanStack Table 컴포넌트를 사용합니다.
- 주문과 재고 목록의 검색, 상태 필터와 페이지네이션 조건은 REST API 요청으로 전달합니다.
- 상품 등록, 재고 상세와 재고 변경은 목적별 API로 분리해 연동합니다.
- 예약 재고와 판매 가능 재고는 직접 수정하지 않으며 재고 변경에는 처리 유형과 사유를 기록합니다.
- 주문 상세에서는 고객, 상품, 결제, 배송과 상태 이력을 한 번에 조회합니다.
- 주문 상세 수정은 상태별 허용 필드만 변경하며 상태 변경 이력을 자동으로 기록합니다.
- 상담 메모는 수정하지 않는 누적 이력으로 추가합니다.
- 설정 화면은 상점·배송·계정 정보를 SSR로 조회하고 변경 사항은 수정 API로 저장합니다.
- 모바일 사이드바 열림 상태와 데스크톱 접힘 상태는 Zustand로 공유하며, 접힘 설정만 브라우저에 유지합니다.
- 재고·고객 관리와 매출 리포트 API 계약은 [`docs/management-apis.md`](docs/management-apis.md)에 정리합니다.
- 통화, 날짜, 상태 색상처럼 화면 표현에 가까운 가공은 프론트엔드에서 처리합니다.
- 클라이언트와 서버 요청은 `shared/api/base`의 Fetcher를 사용합니다.

## 인증과 세션

- Supabase Auth 이메일 로그인을 사용합니다.
- 로그인 상태 유지를 선택하면 Supabase 세션 정책을 따릅니다.
- 로그인 상태 유지를 선택하지 않으면 사용자 활동 기준 2시간 세션 정책을 적용합니다.
- 프로필은 관리자 레이아웃에서 SSR로 조회한 뒤 React Context로 하위 Client Component에 전달합니다.

## 테스트

Vitest로 프로젝트가 직접 구현한 검증과 계산 로직을 테스트합니다.

| 대상 | 검증 내용 |
| --- | --- |
| 로그인 스키마 | 정상 입력, 이메일 형식, 비밀번호 최소 길이 |
| 세션 정책 | 2시간 만료값 생성, 만료 시각 해석, 잘못된 정책 처리 |
| 페이지네이션 | 처음·중간·마지막 구간과 적은 페이지 처리 |

```bash
pnpm test
pnpm test:coverage
```

현재 단위 테스트는 총 10개이며, 생성되는 `coverage/` 디렉터리는 Git에 포함하지 않습니다.

## Storybook

관리자 앱의 재사용 UI와 비즈니스 상태 표현을 API 없이 독립적으로 확인합니다. 스토리는 대상 컴포넌트와 같은 위치에 `*.stories.tsx` 형식으로 작성합니다.

- 버튼의 variant, 크기, 아이콘과 비활성 상태
- 타이포그래피 계층과 tone
- 입력창, textarea, select, 날짜 선택기와 RHF 체크박스
- 폼의 기본·설명·오류·성공 상태
- 카드, 페이지 헤더, 페이지네이션과 데이터 테이블
- 주문·재고·상품·고객 상태 배지

```bash
pnpm storybook
pnpm build-storybook
```

대시보드나 상세 페이지처럼 API와 여러 위젯에 의존하는 전체 화면은 Storybook 대상에서 제외하고, 재사용하거나 상태 비교가 필요한 컴포넌트만 관리합니다.

## 환경 변수

관리자 앱의 로컬 환경 변수는 `apps/admin/.env.local`에서 관리합니다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

`.env*` 파일은 저장소에 커밋하지 않습니다.

## Bruno API 테스트

Supabase Auth와 PostgREST RPC는 저장소의 Bruno 컬렉션으로 직접 테스트할 수 있습니다.

```bash
cp bruno/environments/local.example.bru bruno/environments/local.bru
```

복사한 `local.bru`에 Supabase publishable key와 테스트 계정을 입력한 뒤 Bruno에서 `bruno` 폴더를 열고 `Auth > Login`을 먼저 실행합니다. 로그인 성공 시 저장된 런타임 토큰을 프로필, 대시보드, 주문, 설정, 재고, 고객, 리포트 요청이 공통으로 사용합니다.

실제 사용 순서와 데이터 변경 요청의 주의사항은 [`bruno/README.md`](bruno/README.md)를 확인합니다. `local.bru`는 Git에서 제외되므로 실제 키와 계정 정보는 예제 파일에 기록하지 않습니다.

## shadcn/ui 컴포넌트 추가

관리자 앱 디렉터리를 지정해 컴포넌트를 추가합니다.

```bash
pnpm --dir apps/admin dlx shadcn@latest add dialog input
```

## 검증

```bash
pnpm lint
pnpm build
```
