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
