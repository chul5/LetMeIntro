# chul5 Portfolio

순수 HTML/CSS/JavaScript로 제작한 반응형 포트폴리오 웹사이트입니다. 외부 프레임워크 없이 시맨틱 마크업, CSS 변수 기반 다크 모드, GitHub API 연동, 폼 유효성 검사를 구현했습니다.

## 사용 기술

- **HTML5**: 시맨틱 태그(`header`, `nav`, `main`, `section`, `article`, `footer`) 기반 마크업
- **CSS3**: CSS 변수(`:root`) 기반 테마, Flexbox(네비게이션), Grid(프로젝트 카드, `auto-fit`/`minmax`), 모바일 퍼스트 반응형 디자인
- **Vanilla JavaScript (ES6+)**: `fetch`/`async-await`, `IntersectionObserver`, `localStorage`, 화살표 함수, 구조분해 할당, `map`/`filter`/`forEach`
- **GitHub API**: `https://api.github.com/users/chul5/repos`

빌드 도구나 패키지 매니저 없이 정적 파일로 구성되어 있습니다.

## 폴더 구조

```
index.html
css/style.css
js/
  theme.js            다크 모드 토글 + localStorage 유지
  nav.js              햄버거 메뉴, 부드러운 스크롤, 스크롤 탑 버튼, 네비 배경 전환
  scrollAnimation.js  IntersectionObserver 기반 스크롤 등장 애니메이션
  projects.js         GitHub API 연동 (로딩/성공/에러/빈 상태), 언어별 필터
  contact.js          문의 폼 유효성 검사
  typing.js           히어로 타이핑 효과 (보너스)
images/dog.svg
docs/mission.md       과제 요구사항 원문
docs/questions.md     과제 평가 문항표
```

## 로컬 실행

별도 빌드 과정이 없습니다. VS Code Live Server 확장(또는 임의의 정적 파일 서버)으로 `index.html`을 열면 됩니다.

## 기준값 (자유 변경 가능, 요구사항에 따라 명시)

- 스크롤 탑 버튼 노출: `scrollY > 300px`
- 네비게이션 배경 전환: `scrollY > 60px`
- 스크롤 등장 애니메이션(IntersectionObserver) threshold: `0.2`

## 상태 → 렌더링 흐름

1. **다크 모드 토글** (`js/theme.js`): 토글 버튼 클릭 → `theme` 상태 변경 → `data-theme` 속성 및 `localStorage` 갱신 → 전체 테마 CSS 변수 재적용
2. **GitHub API 연동** (`js/projects.js`): 페이지 로드 → `status` 상태(`loading`/`success`/`error`/`empty`) 변경 → Projects 섹션 렌더링 변경
3. **폼 유효성 검사** (`js/contact.js`): 입력/제출 이벤트 → `errors` 상태 변경 → 필드별 에러 메시지 표시/숨김
4. **프로젝트 언어 필터** (`js/projects.js`, 보너스): 필터 버튼 클릭 → `filter` 상태 변경 → `array.filter()`로 카드 목록 재렌더링

## 배포

GitHub Pages로 배포되어 있습니다.

- 배포 URL: [https://chul5.github.io/LetMeIntro/](https://chul5.github.io/LetMeIntro/)

## 스크린샷

_(TODO: 데스크톱 / 모바일 / 다크 모드 스크린샷 추가 필요)_

| 데스크톱 | 모바일 | 다크 모드 |
| --- | --- | --- |
| _추가 예정_ | _추가 예정_ | _추가 예정_ |

## 커스터마이징 체크리스트

- [x] About 섹션 소개 문구를 본인 소개로 수정
- [x] `images/dog.svg`를 실제 프로필 사진으로 교체
- [x] Skills 목록을 본인 기술 스택에 맞게 조정
- [ ] GitHub Pages 배포 후 README의 배포 URL/스크린샷 갱신
