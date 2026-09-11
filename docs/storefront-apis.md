# Storefront APIs

고객용 Morrow Coffee 웹에서 사용하는 공개 조회 API입니다. 관리자용 API와
달리 로그인 없이 publishable key로 호출할 수 있으며, 판매 중인 상품 정보와
판매 가능 여부만 반환합니다.

## 상품 목록

```http
POST /rest/v1/rpc/get_storefront_products
```

```json
{
  "p_page": 1,
  "p_page_size": 24,
  "p_keyword": null,
  "p_category": null,
  "p_sort": "featured"
}
```

- `p_category`: `whole-bean`, `drip-bag`, `capsule`, `cold-brew`, `gear` 또는 `null`
- `p_sort`: `featured`, `price-asc`, `price-desc`, `name`
- 응답: `items`, `page`, `pageSize`, `totalCount`, `totalPages`
- 비활성 상품은 반환하지 않습니다.
- 원본 재고 수량과 예약 수량은 노출하지 않고 판매 가능 수량과 품절 여부만 반환합니다.

## 상품 상세

```http
POST /rest/v1/rpc/get_storefront_product_detail
```

```json
{
  "p_slug": "bean-house-200"
}
```

- 상품 목록에서 받은 `slug`를 전달합니다.
- 활성 상품 한 건과 판매 가능 수량, 품절 여부를 반환합니다.
- 판매가 중단되었거나 존재하지 않는 상품은 `null`을 반환합니다.
- 로그인 없이 publishable key로 호출할 수 있습니다.
