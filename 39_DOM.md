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

## 39.6 DOM 조작

DOM 조작이란, 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다. DOM 조작은 리플로우와 리페인트가 발생하는 원이 되므로 성능에 영향을 주기 때문에 성능 최적화를 위해서 주의해서 다루어야 한다.

<br>

### 39.6.1 innerHTML

`Element.prototype.innerHTML` 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경한다. 즉, 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.

앞서 살펴본 `textContent` 프로퍼티를 참조하면 HTML 마크업을 무시하고 텍스트만 반환하지만 `innerHTML` 프로퍼티는 HTML 마크업을 포함한 문자열을 그대로 반환한다.

만약 요소 노드의 `innerHTML` 프로퍼티에 문자열을 할당하면 기존의 모든 자식 노드가 제거되고 할당한 문자열에 포함된 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.

#### innerHTML의 단점 파티 🙂

1. 크로스 사이트 스크립팅 공격(XSS: Cross-Site Scripting Attacks)에 취약하다.

- HTML 마크업 내에 자바스크립트 악성 코드가 포함되어 있다면 파싱 과정에서 그대로 실행될 가능성이 있다.
- `script` 요소 없이도 에러 이벤트를 강제로 발생시켜서 자바스크립트 코드가 실행되도록 할 수도 있다.

2. 요소 노드의 `innerHTML` 프로퍼티에 HTML 마크업 문자열을 할당하면 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경하므로 비효율적이다.

3. 새로운 요소를 삽입할 때 삽입될 위치를 지정할 수 없다.

<br>

### 39.6.2 insertAdjacentHTML 메서드

`Element.prototype.insertAdjacentHTML(position, DOMString)` 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.

`insertAdjacentHTML` 메서드는 두 번째 인수로 전달한 HTML 문자열을 파싱하고 그 결과로 생성된 노드를 첫 번째 인수로 전달한 위치(position)에 삽입하여 DOM에 반영한다. 첫 번째 인수로 전달할 수 있는 문자열은 `'beforebegin'`, `'afterbegin'`, `'beforeend'`, `'afterend'` 총 4가지이다.

`insertAdjacentHTML`는 `innerHTML`보다 효율적으로 DOM을 조작할 수 있지만 HTML 마크업 문자열을 파싱하므로 역시 크로스 사이트 스크립팅 공격에 취약하다는 단점이 있다.

<br>

### 39.6.3 노드 생성과 추가

DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드를 제공한다.

<br>

#### 💻 예제 코드

```javascript
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
    </ul>
  </body>
  <script>
      const $fruits = document.getElementById('fruits');

      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode('Banana');

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 $fruits 요소 노드의 마지막 자식 노드로 추가
      $fruits.appendChild($li);
    </script>
</html>
```

<br>

#### 요소 노드 생성

`Document.prototype.createElement(tagName)` 메서드는 요소 노드를 생성하여 반환한다. `createElement` 메서드의 매개변수 `tagName`에는 태그 이름을 나타내는 문자열을 인수로 전달한다.

이때 생성한 요소 노드는 기존 DOM에 추가되지 않고 홀로 존재하는 상태며 아무런 자식 노드를 가지고 있지 않다.

<br>

#### 텍스트 노드 생성

`Document.prototype.createTextNode(text)` 메서드는 텍스트 노드를 생성하여 반환한다. `createTextNode`의 매개변수 `text`에는 텍스트 노드의 값으로 사용할 문자열을 인수로 전달한다.

이때 생성된 텍스트 노드는 요소 노드의 자식 노드로 추가되지 않고 홀로 존재하는 상태다.

<br>

#### 텍스트 노드를 요소 노드의 자식 노드로 추가

`Node.prototype.appendChild(childNode)` 메서드는 매개변수 `childNode`에 인수로 전달한 노드를 `appendChild` 메서드를 호출한 노드의 마지막 자식 노드로 추가한다.

💡 **요소 노드에 자식 노드가 하나도 없는 경우에는** 텍스트 노드를 생성하여 요소 노드의 자식 노드로 텍스트 노드를 추가하는 것보다 **`textContent` 프로퍼티를 사용하는 편이 더욱 간편하다.** (더 자주 쓰는 방법같다)

<br>

#### 요소 노드를 DOM에 추가

`Node.prototype.appendChild` 메서드를 사용하여 텍스트 노드와 부자 관계로 연결한 요소 노드를 `#fruits` 요소 노드의 마지막 자식 요소로 추가한다.

기존의 DOM에 요소 노드를 추가하는 처리는 이 과정뿐이다. 위 예제는 단 하나의 요소 노드를 생성하여 DOM에 한번 추가하므로 DOM은 한 번 변경된다. 이때 리플로우와 리페인트가 실행된다.

<br>

### 39.6.4 복수의 노드 생성과 추가

이번에는 여러 개의 요소 노드를 생성하여 DOM에 추가해 보자.

<br>

#### 💻 예제 코드

```javascript
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
      const $fruits = document.getElementById('fruits');

	  ['Apple', 'Banana', 'Orange'].forEach(text => {
        // 1. 요소 노드 생성
        const $li = document.createElement('li');

        // 2. 텍스트 노드 생성
        const textNode = document.createTextNode(text);

		// 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

        // 4. $li 요소 노드를 $fruits 요소 노드의 마지막 자식 노드로 추가
        $fruits.appendChild($li);
      });
    </script>
</html>
```

<br>

위 예제는 3개의 요소 노드를 생성하여 DOM에 3번 추가하므로 DOM이 3번 변경된다. 이때 리플로우와 리페인트가 3번 실행된다. DOM을 변경하는 것은 높은 비용이 드는 처리이므로 가급적 횟수를 줄이는 편이 성능에 유리하다. 따라서 위 예제는 매우 비효율적인 방법이다. 👎🏻

이처럼 DOM을 여러 번 변경하는 문제를 피하기 위해 컨테이너 요소를 미리 생성한 다음, DOM에 추가하는 방법이 있다.

<br>

#### 💻 예제 코드

```javascript
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
      const $fruits = document.getElementById('fruits');

	  const $container = document.createElement('div');

	  ['Apple', 'Banana', 'Orange'].forEach(text => {
        // 1. 요소 노드 생성
        const $li = document.createElement('li');

        // 2. 텍스트 노드 생성
        const textNode = document.createTextNode(text);

		// 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

        // 4. $li 요소 노드를 컨테이너 요소의 마지막 자식 노드로 추가
        $fruits.appendChild($container);
      });

	  // 5. 컨테이너 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
      $fruits.appendChild($container);
    </script>
</html>
```

<br>

위 예제는 DOM을 한 번만 변경하므로 성능에 유리하기는 하지만 불필요한 `div` 요소가 DOM에 추가되는 단점이 있다.

이러한 문제를 해결하기 위해 `DocumentFragment` 노드를 사용해 자식 노드를 추가하여 이를 DOM에 추가하는 방법이 있다. `DocumentFragment` 노드를 DOM에 추가하면 자신은 제거되고 자신의 자식 노드만 DOM에 추가되므로 불필요한 컨테이너 요소가 생성되지 않고 리플로우와 리페인트도 한 번만 실행되므로 효율적이다. 따라서 여러 개의 요소 노드를 DOM에 추가할 떄는 이 방법을 사용하돌고 하자.

<br>

### 39.6.5 노드 삽입

#### 마지막 노드로 추가

`Node.prototype.appendChild` 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 **마지막** 자식 노드로 DOM에 추가한다.

<br>

#### 지정한 위치에 노드 삽입

`Node.prototype.insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다. 두 번째 인수로 전달받은 노드는 반드시 `insertBefore` 메서드를 호출한 노드의 자식 노드이어야 한다. 그렇지 않으면 `DOMException` 에러가 발생한다. 두 번째 인수로 전달받은 노드가 `null`이면 첫 번째 인수로 전달받은 노드를 `insertBefore` 메서드를 호출한 노드의 마지막 자식 노드로 추가한다. 즉, `appendChild`와 동일하게 동작한다.

<br>

### 39.6.6 노드 이동

DOM에 이미 존재하는 노드를 `appendChild` 또는 `insertBefore` 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉, 노드가 이동한다.

<br>

### 39.6.7 노드 복사

`Node.prototype.cloneNode([deep: true | false])` 메서드는 노드의 사본을 생성하여 반환한다. 매개변수 `deep`에 `true`를 인수로 전달하면 노드를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성하고, `false`를 인수로 전달하거나 생략하면 노드를 얕은 복사하여 노드 자신만의 사본을 생성한다. 얕은 복사로 생성된 요소 노드는 복사하지 않으므로 텍스트 노드도 없다.

<br>

### 39.6.8 노드 교체

`Node.prototype.replaceChild(newChild, oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다. 첫 번째 매개변수 `newChild`에는 교체할 새로운 노드를 인수로 전달하고, 두 번째 매개변수 `oldChild`에는 이미 존재하는 교체될 노드를 인수로 전달한다. `oldChild` 매개변수에 인수로 전달한 노드는 `replaceChild` 메서드를 호출한 자식 노드이어야 한다.

즉, `replaceChild` 메서드는 자신을 호출한 노드의 자식 노드인 `oldChild` 노드를 `newChild` 노드로 교체한다. 이때 `oldChild` 노드는 DOM에서 제거된다.

<br>

### 39.6.9 노드 삭제

`Node.prototype.removeChild(child)` 메서드는 `child` 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다. 인수로 전달한 노드는 `removeChild` 메서드를 호출한 노드의 자식 노드이어야 한다.

<br>

## 39.7 어트리뷰트

### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티

HTML 문서가 파싱될 때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결된다. 이때 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 `NamedNodeMap` 객체에 담겨서 요소 노드의 `attributes` 프로퍼티에 저장된다.

따라서 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 `Element.prototype.attributes` 프로퍼티로 취득할 수 있다. `attributes` 프로퍼티는 `getter`만 존재하는 읽기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 `NamedNodeMap` 객체를 반환한다.

<br>

### 39.7.2 HTML 어트리뷰트 조작

`Element.prototype.getAttribute/setAttribute` 메서드를 사용하면 `attributes` 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있어 편리하다. (`attributes.id.value`와 같이 `attributes` 프로퍼티를 거쳐서 취득하는 것보다 간편하다.)

특정 HTML 어트리뷰트가 존재하는지 확인하려면 `Element.prototype.hasAttribute(attributeName)` 메서드를 사용하고, 특정 HTML 어트리뷰트르르 삭제하려면 `Element.prototype.removeAttribute(attributeName)` 메서드를 사용한다.

<br>

### 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티

요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티(이하 DOM 프로퍼티)가 존재한다. 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다.

DOM 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티다. 따라서 DOM 프로퍼티는 참조와 변경이 가능하다.

<br>

#### HTML 어트리뷰트는 DOM에서 중복 관리되고 있을까?

**HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것이다. 즉, HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않는다.**

**요소 노드는 상태를 가지고 있다.** 예를 들어, 사용자가 `input` 필드에 무언가를 입력하면 변경된 **최신 상태**를 관리해야 하는 것은 물론, HTML 어트리뷰트로 지정한 **초기 상태**도 관리해야 한다. 초기 상태 값을 관리하지 않으면 웹페이지를 처음 표시하거나 새로고침할 때 초기 상태를 표시할 수 없다.

이처럼 **요소 노드는 2개의 상태, 즉 초기 상태와 최신 상태를 관리해야 한다. 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는 DOM 프로퍼티가 관리한다.**

<br>

#### 어트리뷰트 노드

**HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태는 어트리뷰트 노드에서 관리한다.** 이 값은 사용자의 입력에 의해 상태가 변경되어도 변하지 않는다.

어트리뷰트 노드가 관리하는 초기 상태 값을 취득하거나 변경하려면 `getAttribute/setAttribute` 메서드를 사용하면 된다. `getAttribute`를 통해 취득한 값은 어트리뷰트 노드에서 관리하는 초기 상태 값이다. `setAttribute` 메서드는 어트리뷰트 노드에서 관리하는 초기 상태값을 변경한다.

<br>

#### DOM 프로퍼티

**사용자가 이벽한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리한다. DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지한다.**

단, 모든 DOM 프로퍼티가 사용자의 입력에 의해 변경된 최신 상태를 관리하는 것은 아니다. `id` 어트리뷰트에 대응하는 `id` 프로퍼티는 사용자의 입력과 아무런 관계가 없다.

이처럼 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리한다. 그 외의 사용자 입력에 의한 상태 변화와 관계없는 어트리뷰트와 DOM 프로퍼티는 항상 동일한 값으로 연동한다.

<br>

### 39.7.4 data 어트리뷰트와 dataset 프로퍼티

`data` 어트리뷰트와 `dataset` 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다. `data` 어트리뷰트는 `data-user-id`, `data-role`과 같이 `data-` 접두사 다음에 임의의 이름을 붙여 사용한다.

`data` 어트리뷰트는 `HTMLElement.dataset` 프로퍼티로 취득할 수 있다. `dataset` 프로퍼티는 HTML 요소의 모든 `data` 어트리뷰트의 정보를 제공하는 `DOMStringMap` 객체를 반환한다. `DOMStringMap` 객체는 `data` 어트리뷰트의 `data-` 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다. 이 프로퍼티로 `data` 어트리뷰트의 값을 취득하거나 변경할 수 있다.

`data` 어트리뷰트의 `data-` 접두사 다음에 존재하지 않는 이름을 키로 사용하여 `dataset` 프로퍼티에 값을 할당하면 HTML 요소에 `data` 어트리뷰트가 추가된다. 이때 `dataset` 프로퍼티에 추가한 카멜케이스(ex.fooBar)의 프로퍼티 키는 `data` 어트리뷰트의 `data-` 접두사 다음에 케밥케이스(data-foo-bar)로 자동 변경되어 추가된다.

<br>

## 39.8 스타일

### 39.8.1 인라인 스타일 조작

`HTMLElement.prototype.style` 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티로서 요소 노드의 **인라인 스타일**을 취득하거나 추가 또는 변경한다.

`style` 프로퍼티를 참조하면 `CSSStyleDeclaration` 타입의 객체를 반환한다. `CSSStyleDeclaration` 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며, 이 프로퍼티에 값을 할당하면 해당 CSS 프로퍼티가 인라인 스타일로 HTML 요소에 추가되거나 변경된다.

CSS 프로퍼티는 케밥 케이스(`background-color`)를 따른다. 이에 대응하는 `CSSStyleDeclaration` 객체의 프로퍼티는 카멜 케이스(`backgroundColor`)를 따른다.

케밥 케이스의 CSS 프로퍼티를 그대로 사용하려면 객체의 마침표 표기법 대신 대괄호 표기법을 사용한다.(`$div.style['background-color] = 'yellow'`)

단위 지정이 필요한 CSS 프로퍼티는 반드시 단위를 지정해야 한다. 그렇지 않으면 적용되지 않는다.

<br>

### 39.8.2 클래스 조작

`.`으로 시작하는 클래스 선택자를 사용하여 `CSS class`를 미리 정의한 다음, HTML 요소의 `class` 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수도 있다. 이때 HTMl 요소의 `class` 어트리뷰트를 조작하려면 대응하는 요소 노드의 DOM 프로퍼티를 사용하는데, `class`가 아니라 `className`과 `classList`를 사용해야 한다.

<br>

#### className

`Element.prototype.className` 프로퍼티는 `setter`와 `getter` 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 `class` 어트리뷰트 값을 취득하거나 변경한다.

요소 노드의 `className` 프로퍼티를 참조하면 `class` 어트리뷰트 값을 문자열로 반환하고, 요소 노드의 `className` 프로퍼티에 문자열을 할당하면 `class` 어트리뷰트 값을 할당한 문자열로 변경한다.

<br>

#### classList

`Element.prototype.classList` 프로퍼티는는 `class` 어트리뷰트의 정보를 담은 `DOMTokenList` 객체를 반환한다. `DOMTokenList` 객체는 `class` 어트리뷰트의 정보를 나타내는 컬렉션 객체로서 유사 배열 객체이면서 이터러블이다. `DOMTokenList` 객체는 다음과 같이 유용한 메서드들을 제공한다.

- `add(...className)`
  `add` 메서드는 인수로 전달한 1개 이상의 문자열을 `class` 어트리뷰트 값으로 추가한다.

- `remove(...className)`
  `remove` 메서드는 인수로 전달하나 1개 이상의 문자열과 일치하는 클래스를 `class` 어트리뷰트에서 삭제한다. 인수로 전달한 문자열과 일치하는 클래스가 `class` 어트리뷰트에 없으면 에러 없이 무시된다.

- `item(index)`
  `item` 메서드는 인수로 전ㄷ라한 `index`에 해당하는 클래스를 `class` 어트리뷰트에서 반환한다. 예를 들어, `index`가 0이면 첫 번째 클래스를 반환한다.

- `contains(className)`
  `contains` 메서드는 인수로 전달한 문자열과 일치하는 클래스가 `class` 어트리뷰트에 포함되어 있는지 확인한다.

- `replace(oldClassName, newClassName)`
  `replace` 메서드는 `class` 어트리뷰트에서 첫 번째 인수로 전달한 문자열을 두 번째 인수로 전달한 문자열로 변경한다.

- `toggle(className[, force])`
  `toggle` 메서드는 `class` 어트리뷰트에 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고, 존재하지 않으면 추가한다.

두 번째 인수로 불리언 값으로 평가되는 조건식을 전달할 수 있다. 이때 조건식의 평가 결과가 `true`이면 `class` 어트리뷰트에 강제로 첫 번째 인수로 전달받은 문자열을 추가하고, `false`이면 `class` 어트리뷰트에서 강제로 첫 번재 인수로 전달받은 문자열을 제거한다.

이 밖에도 `forEach`, `entries`, `keys`, `values`, `supports` 메서드를 제공한다.

<br>

### 39.8.3 요소에 적용되어 있는 CSS 스타일 참조

`style` 프로퍼티는 인라인 스탕리만 반환한다. 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 `style` 프로퍼티로 참조할 수 없다. HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야 할 경우 `getComputedStyle` 메서드를 사용한다.

`windew.getComputedStyle(element[, pseudo])` 메서드는 첫 번째 인수(element)로 전달한 요소 노드에 적용되어 있는 평가된 스타일을 `CSSStyledDeclaration` 객체에 담아 반환한다.

`getComputedStyle` 메서드의 두 번째 인수(pseude)로 `:after`, `:before`와 같은 의사 요소를 지정하는 문자열을 전달할 수 있다. 의사 요소가 아닌 일반 요소의 경우 두 번째 인수는 생략한다.

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
