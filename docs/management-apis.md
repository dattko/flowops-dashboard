# Management APIs

재고 관리, 고객 관리와 리포트 화면에서 사용할 Supabase PostgREST RPC입니다. 모든 요청은 로그인한 관리자의 access token이 필요합니다.

## 재고 관리

### 재고 목록

```http
POST /rest/v1/rpc/get_inventory
```

```json
{
  "p_page": 1,
  "p_page_size": 10,
  "p_keyword": null,
  "p_stock_status": null
}
```

`p_stock_status`는 `normal`, `low_stock`, `sold_out` 또는 `null`을 사용합니다. 응답은 `items`, `page`, `pageSize`, `totalCount`, `totalPages`를 포함합니다.

### 재고 상세

```http
POST /rest/v1/rpc/get_inventory_detail
```

```json
{
  "p_product_id": "상품 UUID"
}
```

상품 정보, 현재 재고와 최근 재고 변경 이력 30건을 반환합니다.

### 상품 등록

```http
POST /rest/v1/rpc/create_inventory_product
```

```json
{
  "p_payload": {
    "sku": "MC-BEAN-EXAMPLE-200",
    "name": "새로운 싱글 오리진 200g",
    "description": "상품 설명",
    "price": 22000,
    "productStatus": "active",
    "onHand": 20,
    "reorderPoint": 10
  }
}
```

상품과 최초 재고를 하나의 트랜잭션으로 등록합니다. SKU는 대문자로 정규화하며 중복할 수 없습니다. 예약 재고는 0개로 시작합니다.

### 상품 정보 수정

```http
POST /rest/v1/rpc/update_inventory_product
```

```json
{
  "p_product_id": "상품 UUID",
  "p_payload": {
    "name": "수정한 상품명",
    "description": "수정한 설명",
    "price": 23000,
    "productStatus": "active",
    "reorderPoint": 12
  }
}
```

상품 정보와 안전 재고만 수정합니다. SKU, 보유 재고와 예약 재고는 이 API에서 변경하지 않습니다.

### 재고 변경

```http
POST /rest/v1/rpc/adjust_inventory_stock
```

```json
{
  "p_product_id": "상품 UUID",
  "p_payload": {
    "movementType": "inbound",
    "quantity": 20,
    "reason": "8월 정기 입고"
  }
}
```

`movementType`은 `inbound`, `outbound`, `adjustment`를 사용합니다. 입출고의 `quantity`는 증감 수량이고 실사 조정에서는 변경 후 실제 보유 수량입니다. 모든 변경은 `inventory_movements`에 기록되며 예약 재고보다 보유 재고를 낮출 수 없습니다.

## 고객 관리

고객 원본은 `public.customers`에 저장하며 주문은 `orders.customer_id`로 고객과 연결합니다. 이번 마이그레이션에는 고객 데모 데이터를 포함하지 않았습니다.

### 고객 목록

```http
POST /rest/v1/rpc/get_customers
```

```json
{
  "p_page": 1,
  "p_page_size": 10,
  "p_keyword": null,
  "p_status": null
}
```

`p_status`는 `active`, `inactive`, `blocked` 또는 `null`을 사용합니다. 각 고객에는 누적 주문 수, 누적 구매 금액과 최근 주문일이 포함됩니다.

### 고객 상세

```http
POST /rest/v1/rpc/get_customer_detail
```

```json
{
  "p_customer_id": "고객 UUID"
}
```

고객 기본 정보, 주문 요약과 최근 주문 10건을 반환합니다.

### 고객 수정

```http
POST /rest/v1/rpc/update_customer
```

```json
{
  "p_customer_id": "고객 UUID",
  "p_payload": {
    "name": "홍길동",
    "email": "customer@example.com",
    "phone": "010-1234-5678",
    "status": "active",
    "memo": "상담 시 참고할 메모"
  }
}
```

`p_payload`에는 변경할 필드만 전달할 수 있습니다.

## 리포트

### 매출 리포트

```http
POST /rest/v1/rpc/get_sales_report
```

```json
{
  "p_date_from": "2026-08-01",
  "p_date_to": "2026-08-31"
}
```

최대 1년까지 조회할 수 있으며 다음 데이터를 반환합니다.

- 전체 주문 수, 매출, 평균 주문 금액과 취소 주문 수
- 날짜별 주문 수와 매출
- 주문 상태별 건수
- 매출 기준 상위 상품 10개

날짜를 생략하면 최근 7일을 조회합니다.
