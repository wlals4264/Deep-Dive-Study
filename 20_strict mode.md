# 20 strict mode

## 20.1 strict mode란?

#### 💻 예제 코드

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

위의 예제에서 `foo` 함수 내에서 선언하지 않은 `x` 변수에 값 `10` 을 할당했다. 이때 자바스크립트 엔진은 `x` 변수를 찾아야 `x` 에 값을 할당할 수 있기 때문에 `x` 변수가 어디서 선언되었는지 스코프 체인을 통해 검색한다.

먼저, `foo` 함수의 스코프에서 `x` 변수가 선언되었는지 확인하고 선언이 없으므로 `foo` 함수의 상위 스코프, 즉 전역 스코프에서 `x` 변수의 선언을 검색한다.

위 예제에서 현재 전역에도 `x` 변수가 선언되어 있지 않기 때문에 `ReferenceError` 를 발생시킬 것으로 예상하겠지만, 자바스크립트 엔진은 **암묵적으로 전역 객체에 `x` 프로퍼티를 동적 생성**한다. 이때 전역 객체의 `x` 프로퍼티는 마치 전역 변수처럼 사용할 수 있다. 이러한 현상을 **암묵적 전역(implicit global)** 이라 한다.

이러한 암묵적 전역은 개발자의 의도와 상관없이 발생하므로 오류를 발생시키는 원인이 될 가능성이 크다. 따라서, 반드시 `var`, `let`, `const` 키워드를 사용해 변수를 선언한 다음 사용해야한다.

하지만 인간은 언제나 실수를 하므로 키워드의 사용만으로 완벽히 오류를 잡기는 어려울 것이다. 따라서 오류를 줄여 안정적인 코드를 만들기 위한 근본적인 해결책으로 등장한 것이 ES5에 추가된 **`strcit mode`** 이다.

<br>

> 🔍 **ESLint**
>
> ESLint는 자바스크립트 코드의 품질과 일관성을 유지하기 위한 정적 분석 도구이다. ESLint를 사용해도 `strict mode`와 유사한 효과를 얻을 수 있다. 린트 도구는 `strict mode` 가 제한하는 오류는 물론이고 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 더욱 강력한 도구로 사용할 수 있다. 따라서 책에서는 `strict mode` 보다 ESLint 사용을 추천한다. 사용 방법은 공식 사이트와 아래 첨부 사이트에서 참고하자. (VSC에서는 확장 프로그램으로 다운받아 사용하는 것이 간편하다.)
>
> 🔗 https://eslint.org/
> 🔗 https://poiemaweb.com/eslint

<br>

## 20.2 strict mode의 적용

### 💡 strict mode 사용방법

`strict mode` 를 사용하기 위해서는 전역의 선두 또는 함수 몸체의 선두에 `'use strict';` 를 추가하면 된다.

#### 전역의 선두에 추가

```javascript
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

<br>

#### 함수 몸체의 선두에 추가

함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 `strict mode` 가 적용된다.

```javascript
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```

<br>

#### 😈 bad example

```javascript
function foo() {
  x = 10; // 에러가 발생하지 않는다.
  ('use strict'); // 선두에 추가하지 않았으므로,
}
foo();
```

<br>

## 20.3 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 `strict mode` 는 스크립트 단위로 적용된다. 따라서 해당 스크립트에 한정되어 적용된다. 만약 어떤 스크립트에서는 `strict mode` 를 사용하고 어떤 스크립트는 `non-strict mode` 로 사용한다면 오류를 발생시킬 수 있다. 특히 외부 서드파티 라이브러리를 사용하는 경우에는 라이브러리가 `non-strict mode` 일 수 있다. 이런 가능성 때문에 전역에 `strict mode` 를 사용하지 않는 것이 좋다. 만약 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 `strict mode` 를 적용한다.

```javascript
// 전역에서 선언하는 것이 아난 즉시 실행 함수의 선두에 선언하여
// scope를 분리해주자.
(function () {
  'use strict';

  // Do something...
})();
```

<br>

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

함수 단위로 `strict mode` 를 적용할 때도, 어떤 함수는 `strict mode` 를 적용하고 어떤 함수는 `strict mode` 를 적용하지 않을 수 있다. 이것은 바람직하지 않으며 모든 함수에 일일이 `strict mode` 를 적용하는 것도 번거로운 일이다. 만약, `strict mode` 가 적용된 함수가 참조할 함수 외부의 컨텍스트에 `strict mode` 를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

따라서 `strict mode` 는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

<br>

## 20.5 strict mode가 발생시키는 에러

### 20.5.1 암묵적 전역

선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.

<br>

#### 💻 예제 코드

```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

<br>

### 20.5.2 변수, 함수, 매개변수의 삭제

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError` 가 발생한다.

<br>

#### 💻 예제 코드

```javascript
(function () {
  'use strict';

  var x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.
})();
```

<br>

### 20.5.3 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

<br>

#### 💻 예제 코드

```javascript
(function () {
  'use strict';

  // SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

<br>

### 20.5.4 with 문의 사용

`with` 문을 사용하면 `SyntaxError` 가 발생한다. `with` 문은 전달된 객체를 스코프 체인의 최우선 위치에 추가한다. 자바스크립트에서 객체의 속성을 간결하게 접근하기 위해 사용되는 구문이며 `with` 문을 사용하면 특정 객체의 범위 내에서 그 객체의 속성들을 직접 참조할 수 있다. 하지만 성능과 가독성에 악영향을 미치므로 현재는 권장되지 않는다.

<br>

#### 💻 예제 코드

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

<br>
<br>

## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

`strict mode` 에서 함수를 일반 함수로서 호출하면 `this` 에 `undefined` 가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 `this` 를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

<br>

#### 💻 예제 코드

```javascript
(function () {
  'use strict';

  // 일반 함수
  function foo() {
    console.log(this); // undefined
  }
  foo();

  // 생성자 함수
  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

<br>

### 20.6.2 arguments 객체

`strict mode` 에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않는다.

<br>

#### 💻 예제 코드

```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
