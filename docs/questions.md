# 과제 평가 문항표

출처: Codyssey 과제 평가 (evalutionParticipationSave)

## 항목 1

- 브라우저 창 크기를 줄였을 때 레이아웃이 모바일에 맞게 변경되는가?
  - **답변:** 모바일 퍼스트로 작성해 기본 스타일이 모바일 레이아웃이고, 768px/1024px 이상에서 media query로 넓은 화면용 레이아웃(네비게이션 가로 정렬 등)이 추가로 적용됩니다.
  - 코드: [css/style.css:172-206](../css/style.css#L172-L206) (768px 브레이크포인트), [css/style.css:208-212](../css/style.css#L208-L212) (1024px 브레이크포인트)
- 테마 토글 버튼 클릭 시 다크/라이트 모드가 전환되고, 새로고침 후에도 유지되는가?
  - **답변:** 클릭 시 `state.theme`을 토글하고 `data-theme` 속성과 `localStorage`를 함께 갱신하며, 페이지 로드 시 `localStorage`에 저장된 값(없으면 시스템 다크모드 설정)을 읽어 복원합니다.
  - 코드: [js/theme.js:9-35](../js/theme.js#L9-L35)
- 햄버거 메뉴, 스크롤 애니메이션, 맨 위로 가기 버튼 등이 정상 동작하는가?
  - **답변:** 햄버거 메뉴는 클릭마다 `state.menuOpen`을 뒤집어 `active` 클래스를 토글하고, 스크롤 애니메이션은 `IntersectionObserver`로 `.reveal` 요소가 뷰포트에 들어오면 `visible` 클래스를 추가하며, 맨 위로 가기 버튼은 스크롤 300px 이상에서 노출되고 클릭 시 `scrollTo`로 상단 이동합니다.
  - 코드: [js/nav.js:11-29](../js/nav.js#L11-L29) (햄버거), [js/scrollAnimation.js:9-19](../js/scrollAnimation.js#L9-L19) (스크롤 애니메이션), [js/nav.js:43-55](../js/nav.js#L43-L55) (스크롤 탑 버튼 / 네비 배경 전환)
- GitHub API에서 데이터를 불러와 화면에 표시되고, 로딩/에러/빈 상태가 구분되는가?
  - **답변:** `fetchRepos()`가 `status`를 `loading → success/error/empty`로 바꾸고, `render()`가 그 값에 따라 스피너, 카드 목록, 에러+재시도 버튼, 빈 상태 문구 중 하나를 렌더링합니다.
  - 코드: [js/projects.js:127-146](../js/projects.js#L127-L146) (fetchRepos), [js/projects.js:106-124](../js/projects.js#L106-L124) (render 분기)
- 필수 입력값 누락, 이메일 형식 오류 시 즉각적인 피드백이 표시되는가?
  - **답변:** 각 입력 필드의 `input` 이벤트마다 `validateField`로 즉시 재검증하고 `state.errors`를 갱신해 필드 바로 아래 에러 메시지를 표시/숨김합니다. 제출 시에도 동일한 검증을 다시 실행해 통과해야만 성공 메시지를 보여줍니다.
  - 코드: [js/contact.js:19-51](../js/contact.js#L19-L51)

**판정:** PASS / FAIL

## 항목 2

- HTML, CSS, JavaScript가 각각의 파일로 분리되어 있고, 분리한 이유와 각 파일의 역할을 구분하여 답변할 수 있는가?
  - **답변:** HTML(구조)·CSS(표현)·JS(동작)로 관심사를 분리했고, JS는 다시 기능 단위(테마/네비게이션/스크롤 애니메이션/프로젝트 API/문의 폼/타이핑 효과)로 6개 파일로 쪼개서 각 파일이 독립적으로 하나의 상태와 이벤트만 책임지도록 했습니다. 이렇게 하면 한 기능을 수정할 때 다른 기능에 영향을 줄 위험이 줄어듭니다.
  - 코드: [index.html:11-17](../index.html#L11-L17) (스타일시트/스크립트 연결부)
- header, nav, main, section, footer 등 시맨틱 태그를 사용했고, 어떤 기준으로 태그를 선택했는지 설명할 수 있는가?
  - **답변:** "이 블록이 문서에서 어떤 역할을 하는가"를 기준으로 태그를 선택했습니다. 전역 내비게이션 영역은 `header`+`nav`, 본문 콘텐츠 전체는 `main`, Hero/About/Skills/Projects/Contact처럼 독립된 콘텐츠 단위는 각각 `section`, 저작권/소셜 링크처럼 부가 정보는 `footer`로 구분해 `div`로만 감싸지 않았습니다.
  - 코드: [index.html:20-21](../index.html#L20-L21) (header/nav), [index.html:52-134](../index.html#L52-L134) (main/section), [index.html:136](../index.html#L136) (footer)
- CSS 변수(`:root`)로 색상, 폰트 등을 정의했고, 변수로 관리하면 어떤 이점이 있는지 구체적으로 답변할 수 있는가?
  - **답변:** 색상·그림자·라운드 값 등을 변수 하나로 묶어두면, 다크 모드처럼 테마 전체를 바꿀 때 각 선택자를 일일이 고치지 않고 `[data-theme="dark"]` 아래에서 변수 값만 다시 선언하면 됩니다. 실제 레이아웃 스타일(`.btn`, `.project-card` 등)은 그대로 두고 변수만 교체되는 구조입니다.
  - 코드: [css/style.css:1-30](../css/style.css#L1-L30) (`:root` / `:root[data-theme="dark"]`)
- `onclick` 인라인 속성 대신 `addEventListener`를 사용한 이유를 두 방식의 차이를 비교하여 제시할 수 있는가?
  - **답변:** `onclick="..."`은 HTML 마크업과 동작 로직이 한 곳에 섞여 유지보수가 어렵고, 같은 요소에 리스너를 하나만 붙일 수 있으며 테스트/제거가 까다롭습니다. `addEventListener`는 구조(HTML)와 동작(JS)을 분리하고, 같은 요소에 여러 핸들러를 등록할 수 있고, 요소가 없을 때 옵셔널 체이닝(`?.`)으로 안전하게 건너뛸 수 있습니다. 이 프로젝트의 모든 이벤트 바인딩이 이 방식입니다.
  - 코드: [js/nav.js:29](../js/nav.js#L29) (햄버거 버튼), [js/theme.js:35](../js/theme.js#L35) (테마 토글), [js/contact.js:54](../js/contact.js#L54) (폼 제출)

**판정:** PASS / FAIL

## 항목 3

- 다크 모드, API 호출, 폼 유효성 검사 중 하나를 예시로 들어, "이벤트 → 상태 변경 → 화면 업데이트" 흐름이 코드에서 어떻게 이어지는지 따라가며 짚어줄 수 있는가?
  - **답변(다크 모드 예시):** ① `#themeToggle` 클릭 이벤트 발생 → ② `toggleTheme()`이 `state.theme`을 `light`/`dark`로 뒤집고 `localStorage`에 저장 → ③ `applyTheme()`이 `<html>`의 `data-theme` 속성과 토글 아이콘 텍스트를 갱신 → ④ CSS의 `:root[data-theme="dark"]` 규칙이 활성화되어 배경·글자색 등 전체 테마 변수가 재적용됩니다.
  - 코드: [js/theme.js:28-35](../js/theme.js#L28-L35) (이벤트→상태→DOM 반영), [css/style.css:19-30](../css/style.css#L19-L30) (상태에 따른 CSS 반영)
- `async/await`와 `try/catch`를 사용하여 API 호출 성공과 실패를 어떻게 분기 처리했는지 코드 흐름을 따라 답변할 수 있는가?
  - **답변:** `fetchRepos()`는 먼저 `state.status = "loading"`으로 두고 렌더링한 뒤 `await fetch(...)`를 호출합니다. `response.ok`가 아니면 직접 `Error`를 던져 `catch`로 보내고, 정상이면 JSON을 파싱해 포크 저장소를 제외한 뒤 배열 길이에 따라 `success`/`empty`로 상태를 정합니다. `catch` 블록은 `status`를 `error`로 바꾸고, 마지막에 공통으로 `render()`를 호출해 상태에 맞는 화면을 그립니다.
  - 코드: [js/projects.js:127-146](../js/projects.js#L127-L146)
- `map`, `filter` 등 배열 메서드를 활용하여 GitHub 데이터를 카드 UI로 변환하는 과정을 단계별로 정리할 수 있는가?
  - **답변:** ① `state.repos`에서 현재 선택된 언어 필터에 맞는 저장소만 `array.filter()`로 걸러내고 → ② `array.map()`으로 각 저장소 객체를 구조분해 할당해 필요한 필드(`name`, `description`, `html_url` 등)만 꺼낸 뒤 템플릿 리터럴로 카드 HTML 문자열을 만들고 → ③ `join("")`으로 하나의 문자열로 합쳐 `container.innerHTML`에 대입합니다. 필터 버튼 목록도 `map`+`Set`으로 저장소들의 고유 언어를 추출해 만듭니다.
  - 코드: [js/projects.js:81-104](../js/projects.js#L81-L104) (필터링 + 카드 변환), [js/projects.js:52-79](../js/projects.js#L52-L79) (언어 목록 추출/필터 버튼)
- Flexbox와 Grid를 각각 어디에 적용했는지 확인하고 해당 상황에서 그 방식을 선택한 이유를 비교하여 설명할 수 있는가?
  - **답변:** 네비게이션 바처럼 "로고 - 메뉴 - 액션 버튼"을 한 줄에서 양 끝/가운데로 정렬해야 하는 1차원 배치는 Flexbox를 사용했습니다(`justify-content: space-between`). 반면 Skills 목록과 Projects 카드처럼 개수가 가변적이고 화면 너비에 따라 열 수가 자동으로 바뀌어야 하는 2차원 그리드 배치는 CSS Grid의 `auto-fit`/`minmax`를 사용해, 아이템 개수와 상관없이 카드 너비를 유지하며 줄바꿈되도록 했습니다.
  - 코드: [css/style.css:80-81](../css/style.css#L80-L81) (네비게이션 Flexbox), [css/style.css:334-336](../css/style.css#L334-L336) (Skills Grid), [css/style.css:388-390](../css/style.css#L388-L390) (Projects Grid)

**판정:** PASS / FAIL

## 항목 4

- 상태(STATE) 객체를 따로 만들어서 관리한 이유는 무엇이며, 그냥 변수로 처리하면 안되는지 설명할 수 있는가?
  - **답변:** 각 기능(테마, 네비게이션, 프로젝트 목록, 문의 폼)마다 개별 변수를 여러 개 흩어놓으면 "어떤 값들이 한 세트로 같이 바뀌어야 화면이 일관되게 갱신되는가"가 코드만 봐서는 드러나지 않고, 렌더링 함수가 참조할 단일 소스도 없어집니다. `state` 객체로 묶으면 그 기능의 현재 상태가 한 곳에 모이고, "이 상태가 바뀌면 이 렌더 함수를 다시 부른다"는 규칙이 명확해집니다(Single Source of Truth). 예를 들어 `projects.js`는 `status`/`repos`/`filter` 세 값이 항상 같이 고려돼야 하는데, 개별 변수였다면 렌더링 시점마다 셋을 일일이 맞춰야 해서 누락되기 쉽습니다.
  - 코드: [js/theme.js:11-13](../js/theme.js#L11-L13), [js/nav.js:11-13](../js/nav.js#L11-L13), [js/projects.js:10-14](../js/projects.js#L10-L14), [js/contact.js:15-17](../js/contact.js#L15-L17)
- 반응형 디자인에서 "모바일 퍼스트"로 작성한 이유를 이야기할 수 있는가?
  - **답변:** 기본(가장 작은 화면) 스타일을 먼저 정의하고, `min-width` 미디어쿼리로 화면이 커질 때 스타일을 "추가"하는 방식을 택했습니다. 반대로 데스크톱 기준으로 작성하고 `max-width`로 줄여나가면 좁은 화면에서 불필요한 스타일을 계속 덮어써야 해서 CSS가 지저분해지기 쉽습니다. 모바일 퍼스트는 더 제약이 많은(좁은) 환경을 기본값으로 두고 점진적으로 확장하는 방식이라 유지보수가 더 쉽습니다.
  - 코드: [css/style.css:172](../css/style.css#L172) (`@media (min-width: 768px)`), [css/style.css:208](../css/style.css#L208) (`@media (min-width: 1024px)`)

**판정:** PASS / FAIL

## 항목 5

보너스 문제 해결에 따른 크레딧 부여 (100)

**판정:** 부여 / 미부여
