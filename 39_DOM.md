# 39 DOM

🥸 **"DOM은 무엇인가?"**
🎃 브라우저의 렌더링 엔진은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성하는데, 이때 생성된 DOM은 HTML문서의 계층적 구조와 정보를 표현하며 이것들을 제어할 수 있는 프로퍼티와 메서드를 포함한 DOM API를 제공하는 트리 자료구조라고 할 수 있다.

<br>

## 39.1 노드

### 39.1.1 HTML 요소와 노드 객체

HTML 요소 : HTML 문서를 구성하는 개별적인 요소를 의미한다.
(ex. `<div class="greeting">Hello</div>`)
HTML 요소는 렌더링 엔진에 의해 DOM을 구성하는 요소 노드 객체로 변환되는데, HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.
HTML 문서는 HTML 요소들의 집합으로 이뤄지며, 각각의 HTML 요소들은 서로 중첩 관계에 의해 계층적인 부자 관계를 형성하는데, 이러한 부자 관계를 반영하여 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료 구조로 구성한다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/9b283a0a-8814-4e50-8b20-3782937ab901/image.png)

> 🌳 트리 자료구조
> 노드 간의 계층적 구조(부자 관계, 형제 관계)를 표현하는 비선형 자료구조를 말한다. 트리 자료구조는 하나의 최상위 노드에서 시작하며, 이를 루트 노드라 한다. 루트 노드는 0개 이상의 자식 노드를 갖는다. 자식 노드가 없는 노드를 리프 노드라 한다.

<br>

📚 **노드 객체들로 구성된 트리 자료구조를 DOM이라 한다. 따라서 DOM을 DOM 트리라고 부르기도 한다.**

<br>

### 39.1.2 노드 객체의 타입

노드 객체는 총 12개의 종류(노드 타입)가 있다. 이 중에서 중요한 노드 타입은 다음과 같이 4개다.

1. 문서 노드(document node)

- 문서 노드는 DOM트리의 최상위에 존재하는 루트 노드로서 `document` 객체를 가리킨다. 이는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로서 전역 객체 `window`의 `document` 프로퍼티에 바인딩되어 있다. 따라서 문서 노드는 `window.document` 또는 `document`로 참조할 수 있다.

2. 요소 노드(element node)

- HTML 요소를 가리키는 객체다. 요소 노드들은 서로 부자 관계를 형성하여 문서의 구조를 표현한다.

3. 어트리뷰트 노드(attribute node)

- HTML 요소의 어트리뷰트를 가리키는 객체다. 어트리뷰트 노드는 해당 HTML 요소의 요소 노드와 연결되어 있다. 단, 어트리뷰트는 부모 노드와 연결되어 있지 않기 때문에 요소 노드의 형제 노드가 아니며, 따라서 어트리뷰트 노드에 접근하려면 먼저 요소 노드에 접근해야 한다.

4. 텍스트 노드(text node)

- 텍스트 노드는 HTMl 요소의 텍스트를 가리키는 객체로, 요소 노드가 문서의 구조를 나타낸다면, 텍스트 노드는 문서의 정보를 표현한다고 할 수 있다. 텍스트 노드는 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드이다. 즉, 텍스트 노드는 DOM 트리의 최종단이다. 따라서 텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 한다.

<br>

### 39.1.3 노드 객체의 상속 구조

DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 **DOM API**를 사용할 수 있다. 이를 통해 노드 객체는 자신의 부조, 형제, 자식을 탐색할 수 있으며, 자신의 어트리뷰트와 텍스트를 조작할 수 있다.

노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 <u>호스트 객체</u>다. 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
([🔗 호스트 객체에 대해 정리된 블로그 링크](https://velog.io/@bangina/FE%EB%A9%B4%EC%A0%91%EB%8C%80%EB%B9%84-%ED%98%B8%EC%8A%A4%ED%8A%B8-%EA%B0%9D%EC%B2%B4Host-Objects%EC%99%80-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EA%B0%9D%EC%B2%B4Native-Objects), [🔗 표준 빌트인 객체 MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects))

<br>

![](https://velog.velcdn.com/images/wlals4264/post/40b9c129-9a98-467f-80c6-2fa4463b9311/image.png)

<br>

모든 노드 객체는 `Object`, `EventTarget`, `Node` 인터페이스를 상속받는다. 또 각각의 노드는 연결된 인터페이스를 상속받는다. 특히 요소 노드는 추가적으로 `HTMLElement`와 태그의 종류별로 세분화된 인터페이스를 상속받는다. 이를 프로토타입 체인 관점에서 살펴보면 다음과 같다. 예시로 든 요소 노드는 `input`이다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/249d175f-d4e2-4b5f-a781-61e108016f71/image.png)

<br>

DOM API를 사용하기 위해 지금까지 살표본 노드 객체의 상속 구조를 자세히 알아야 할 필요는 없다. 중요한 것은 DOM API를 사용하여 노드에 접근하고 HTMl의 구조나 내용 또는 스타일 등을 동적으로 변경하는 방법이다. 이제 그것에 대해 살펴보자.

<br>

## 39.2 요소 노드 취득

### 39.2.1 id를 이용한 요소 노드 취득

`Document.prototype.getElementById` 메서드는 인수로 전달한 `id` 값을 갖는 하나의 요소 노드를 탐색하여 반환한다. 만약, HTML 문서 내에 중복된 `id` 값을 갖는 요소가 여러개 존재하더라도 에러가 발생하지 않고 그 중 첫 번째 요소 노드만 반환하고 만약 인수로 전달된 `id` 값을 갖는 요소가 없다면 `null`을 반환한다.

HTML 요소에 `id` 어트리뷰트를 부여하면 `id` 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다. 단, 이미 존재하는 전역 변수면 재할당되지 않는다.

### 39.2.2 태그 이름을 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 DOM 컬렉션 객체인 `HTMLCollction` 객체를 반환한다. `HTMLCollction` 객체는 유사 배열 객체이면서 이터러블이다.

`Document.prototype.getElementByTagName` 메서드는 DOM의 루트 노드인 `document`를 통해 호출하며 DOM 전체에서 요소 노드를 탐색하여 반환한다. 하지만 `Element.prototype.getElementByTagName` 메서드는 특정 요소 노드를 통해 호출하며, 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.

만약 인수로 전달된 태그 이름을 갖는 요소가 존재하지 않는 경우 `getElementByTagName` 메서드는 빈 `HTMLCollection` 객체를 반환한다.

<br>

### 39.2.3 class를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementByClassName` 메서드는 인수로 전달한 `class` 값으르 갖는 모든 요소 노드들을 탐색하여 반환한다. 인수로 전달할 `class` 값은 공백으로 구부하여 여러 개의 `class`를 지정할 수 있다. `getElementByTagName` 메서드와 마찬가지로 `getElementByClassName` 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 `HTMLCollection` 객체를 반환한다.

<br>

`getElementByTagName` 메서드와 마찬가지로 `getElementByClassName` 메서드는 `Document.prototype`에 정의된 메서드와 `Element.prototype`에 정의된 메서드가 있으며, `getElementByTagName` 메서드와 동일한 방식으로 동작하며 요소가 존재하지 않는 경우도 마찬가지다.

<br>

### 39.2.4 CSS 선택자를 이용한 요소 노드 취득

`Document.prototype/Element.prototype.querySelector` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.

- 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인 경우 첫 번째 요소 노드만 반환한다.
- 인수로 전달된 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 `null`을 반환한다.
- 인수로 전달된 CSS 선택자가 문법에 맞지 않는 경우 `DOMException` 에러가 발생한다.

<br>

`Document.prototype/Element.prototype.querySelectorAll` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 `NodeList` 객체로 반환한다. `NodeList` 객체는 유사 배열 객체이면서 이터러블이다.

- 인수로 전달한 CSS 선택자를 만족시키는 요소가 존재하지 않는 경우 빈 `NodeList` 객체를 반환한다.
- 인수로 전달한 CSS 선택자가 분법에 맞지 않는 경우 `DOMException` 에러가 발생한다.

<br>

앞서 살펴본 메서드와 마찬가지로 `Document.prototype`에 정의된 메서드와 `Element.prototype`에 정의된 메서드가 존재하며 동작 방식은 같다.

CSS 선택자 문법을 사용하는 `querySelector`, `querySelectorAll` 메서드는 `getElementById`, `getElementBy***` 메서드보다 다소 느린 것으로 알려져 잇다. 하지만 좀 더 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있어 `id` 값이 있는 요소 노드를 취득하는 경우를 제외하고는 `querySelector`, `querySelectorAll` 메서드를 사용하는 것을 권장한다.

<br>

### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

`Element.prototype.matches` 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지를 `boolean`으로 반환한다.

<br>

### 39.2.6 HTMLCollection과 NodeList의 차이

`HTMLCollection`과 `NodeList`는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다. 둘 다 유사 배열 객체이면서 이터러블이다. 따라서 `for...of` 문으로 순회할 수 있고, **스프레드 문법을 사용하여 간단히 배열로 변환할 수 있다.**

`HTMLCollection`과 `NodeList`의 중요한 특징은 살아 있는 객체라는 것이다. `HTMLCollection`는 언제나 `live` 객체로 동작한다. 단, `NodeList`는 대부분의 경우 노드 객체의 상태 변화를 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 `non-live` 객체로 동작한다.(경우에 따라 `live` 객체로 동작, ex: `childNodes` 프로퍼티가 반환하는 `NodeList` 객체는 `live` 객체로 동작)

<br>

`live` 객체로서 발생할 수 있는 여러 문제들 때문에 `HTMLCollection` 객체와 `NodeList` 객체를 사용할 때 스프레드 문법을 사용해 배열로 변환해서 사용하는 것을 권장한다.

<br>

## 39.3 노드 탐색

![](https://velog.velcdn.com/images/wlals4264/post/ff4607d9-d8b6-4c62-a8d5-e13359f05e57/image.png)

<br>

DOM 트리 상의 노드를 탐색할 수 있도록 `Node`, `Element` 인터페이스는 트리 탐색 프로퍼티를 제공한다.

`parentNode` `previouseSibling`, `firstChild`, `childeNodes` 프로퍼티는 `Node.prototype`이 제공하고, 프로퍼티 키에 `Element`가 포함된 `parentElementNode`, `nextElementSibling`, `chidren` 프로퍼티는 `Element.prototype`이 제공한다.

노드 탐색 프로퍼티는 모드 접근자 프로퍼티이면서 `setter`가 없는 읽기 전용 접근자 프로퍼티다.

<br>

### 39.3.1 공백 텍스트 노드

HTML 요소 사이의 스페이스, 탭, 줄바꿈(개행) 등의 공백 문자는 텍스트 노드를 생성한다. 이를 공백 텍스트 노드라고 한다.

<br>

### 39.3.2 자식 노드 탐색

![](https://velog.velcdn.com/images/wlals4264/post/7b8d371c-2aa2-4ea3-b4da-f537a3cd764a/image.png)

![](https://velog.velcdn.com/images/wlals4264/post/6e3c3817-2361-4ff7-970d-d1721c5f069f/image.png)

<br>

공백 텍스트 노드가 포함되어 반환되는지 아닌지에 주목하자.

<br>

### 39.3.3 자식 노드 존재 확인

자식 노드가 존재하는지 확인하려면 `Node.prototype.hasChildNodes` 메서드를 사용한다. 단, 텍스트 노드를 포함하여 존재를 확인한다.

자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인하고 싶다면 `hasChildNodes` 대신 `children.length` 또는 `Element` 인터페이스의 `childeElementCount` 프로퍼티를 사용하자. 이때 반환값을 불리언 값으로 받고 싶다면 부정 연산자를 두 번 사용하여 바꿔주자.

<br>

### 39.3.4 요소 노드의 텍스트 노드 탐색

요소 노드의 텍스트 노드는 요소 노드의 자식 노드다. 따라서 요소 노드의 텍스트 노드는 `firstChild` 프로퍼티로 접근할 수 있다.

<br>

### 39.3.5 부모 노트 탐색

부모 노드를 탐색하려면 `Node.prototype.parentNode` 프로퍼티를 사용한다.

<br>

### 39.3.6 형제 노드 탐색

부모 노드가 같은 형제 노드를 탐색하려면 다음과 같은 노드 탐색 프로퍼티를 사용한다. 단, 어트리뷰트 노드는 부모 노드가 같은 형제 노드가 아니기 때문에 반환되지 않으므로 주의하자.

![](https://velog.velcdn.com/images/wlals4264/post/9de626ab-676c-4707-baee-8e8f876eac54/image.png)

![](https://velog.velcdn.com/images/wlals4264/post/626dd47c-e798-4586-b340-ae15aa4478d6/image.png)

<br>

## 39.4 노드 정보 취득

노드 객체에 대한 정보를 취득하려면 다음과 같은 노드 정보 프로퍼티를 사용한다.

![](https://velog.velcdn.com/images/wlals4264/post/9c91a235-e6eb-400d-b3b3-0653c06243d3/image.png)

<br>

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

`Node.prototype.nodeValue` 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티다. 따라서 `nodeValue` 프로퍼티는 참조와 할당 모두 가능하다.

노드 객체의 `nodeValue` 프로퍼티를 참조하면 노드 객체의 값을 반환한다. 노드 객체의 값이란 텍스트 노드의 텍스트다. 따라서 텍스트 노드가 아닌 노드, 즉 문서 노드나 요소 노드의 `nodeValue` 프로퍼티를 참조하면 `null`을 반환한다.

텍스트 노드의 `nodeValue` 프로퍼티에 값을 할당하면 텍스트 노드의 값, 즉 텍스트를 변경할 수 있다.

<br>

### 39.5.2 textContent

`Node.prototype.textContent` 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티로서 요소 노드의 텍스트와 자손 노드의 텍스트를 모두 취득하거나 변경한다.

요소 노드의 `childNodes` 프로퍼티가 반환한 모든 노드들의 텍스트 노드의 값, 즉 텍스트를 모두 반환한다. 이때 HTML 마크업은 무시된다.

요소 노드의 `textContent` 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가된다. 이때 할당한 문자열에 HTML 마크업이 포함되어 있더라도 문자열 그대로 인식되어 텍스트 취급된다. 즉, HTML 마크업이 파싱되지 않는다.

⚠️ `textContent`와 유사한 동작을 하는 `innerText` 프로퍼티의 사용 주의

- `innerText` 프로퍼티는 CSS에 순종적이어서, CSS에 의해 비표시(`visibility: hidden;`)로 지정된 요소 노드의 텍스트를 반환하지 않는다.
- `innerText` 프로퍼티는 CSS를 고려해야 하므로 `textContent`에 비해 느리다.

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
