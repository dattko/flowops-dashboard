# FlowOps Bruno Collection

## 시작하기

1. [Bruno](https://www.usebruno.com/)에서 이 `bruno` 폴더를 엽니다.
2. `environments/local.example.bru`를 `environments/local.bru`로 복사합니다.
3. `local.bru`에 publishable key와 테스트 계정 정보를 입력합니다.
4. Bruno 우측 상단에서 `local` 환경을 선택합니다.
5. `Auth > Login`을 먼저 실행합니다.

로그인 성공 시 `access_token`과 `refresh_token`이 Bruno 런타임 변수로 저장됩니다. 이후 요청은 `access_token`을 공통 Bearer token으로 사용합니다.

`local.bru`는 Git에서 제외되며 `local.example.bru`에는 실제 비밀값을 입력하지 않습니다.

## 주의사항

이름에 `[변경]`이 포함된 요청은 원격 데이터를 실제로 수정합니다. 실행 전 ID와 payload를 확인하세요.
