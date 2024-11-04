# 15 let, const 키워드와 블록 레벨 스코프

## 15.1 var 키워드로 선언한 변수의 문제점

### 15.1.1 변수 중복 선언 허용

<code>var</code> 키워드로 선언한 변수는 중복 선언이 가능하다.

#### 💻 예제 코드

```javascript
var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

위 예제처럼 만약 동일한 이름의 변수가 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수 값이 변경되는 부작용이 발생한다.

<br>

### 15.1.2 함수 레벨 스코프

<code>var</code> 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

#### 💻 예제 코드

```javascript
var x = 1;

if (true) {
  // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10
```

함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다. 이로 인해 의도치 않게 전역 변수가 중복 선언되는 경우가 발생한다.

<br>

### 15.1.3 변수 호이스팅

<code>var</code> 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 변수 선언문 이전에 변수를 참조하는 것은 에러를 발생시키지는 않지만 프로그램의 흐름상 맞지 않을뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

<br>

## 15.2 let 키워드

앞에서 살펴본 <code>var</code>의 단점을 보완하기 위해 ES6에서는 새로운 변수 선언 키워드인 <code>let</code>과 <code>const</code>를 도입했다. <code>var</code> 키워드와의 차이점을 중심으로 <code>let</code> 키워드를 살펴보자.

### 15.2.1 변수 중복 선언 금지

<code>var</code> 키워드로 동일한 이름의 변수를 중복 선언하면 아무런 에러가 발생하지 않는다. 하지만 <code>let</code> 키워드로 동일한 이름의 변수를 중복 선언하면 문법 에러가 발생한다.

#### 💻 예제 코드

```javascript
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
var foo = 123;
var foo = 456; // 재할당되어 값이 변경된다.

// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 123;
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

<br>

### 15.2.2 블록 레벨 스코프

<code>var</code> 키워드로 선언한 변수는 함수 레벨 스코프를 따른다. 하지만 <code>let</code> 키워드로 선언한 변수는 모든 코드 블록(함수, <code>if</code>문, <code>while</code>문, <code>try/catch</code>문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

#### 💻 예제 코드

```javascript
let foo = 1; // 전역 변수

{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

<br>

### 15.2.3 변수 호이스팅

<code>var</code> 키워드로 선언한 변수와 달리 <code>let</code> 키워드로 선언한 변수는 **변수 호이스팅이 발생하지 않는 것처럼 동작한다.**

#### 💻 예제 코드

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

<code>var</code> 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 "선언 단계"와 "초기화 단계"가 한번에 진행된다.

하지만, **<code>let</code> 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다.** 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다. 따라서 초기화 단계가 실행되기 이전에 변수에 접근하려고 하면 참조 에러가 발생한다. 이처럼 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없는 구간을 **일시적 사각지대**라고 부른다.

```javascript
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

![](https://velog.velcdn.com/images/wlals4264/post/c62c40d8-c1c3-4c45-bbed-9c50c6714f3d/image.png)

<br>

결국 <code>let</code> 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보인다. 하지만 아래 예제를 보면 <code>let</code> 키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에 참조 에러가 발생한다. 만약, 호이스팅이 발생하지 않는다면 참조 에러가 아닌 전역 변수 <code>foo</code>의 값을 출력해야 한다.

```javascript
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2; // 지역 변수
}
```

<br>

> **🥸 ES6의 호이스팅 **
> 자바스크립트는 ES6에서 도입된 <code>let</code>, <code>const</code>를 포함해서 모든 선언(<code>var</code>, <code>let</code>, <code>const</code>, <code>function</code>, <code>class</code> 등)을 호이스팅한다. 단, ES6에서 도입된 <code>let</code>, <code>const</code>, <code>class</code>를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.

<br>

### 15.2.4 전역 객체와 let

<code>let</code> 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. <code>let</code> 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 된다.

<br>

## 15.3 const 키워드

<code>const</code> 키워드는 일반적으로 상수를 선언하기 위해 사용한다. <code>const</code> 키워드의 특징은 <code>let</code> 키워드와 대부분 동일하므로 <code>let</code> 키워드와 다른 점을 중심으로 살펴보자.

<br>

### 15.3.1 선언과 초기화

**<code>const</code> 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.**

#### 💻 예제 코드

```javascript
const foo = 1;
```

그렇지 않으면 다음과 같이 문법 에러가 발생한다.

```javascript
const foo; // SyntaxError: Missing initializer in const declaration
```

<br>

<code>const</code> 키워드로 선언한 변수는 <code>let</code> 키워드와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

<br>

### 15.3.2 재할당 금지

<code>var</code> 또는 <code>let</code> 키워드로 선언한 변수는 재할당이 자유로우나 **<code>const</code> 키워드로 선언한 변수는 재할당이 금지된다.**

#### 💻 예제 코드

```javascript
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

<br>

### 15.3.3 상수

상수는 재할당이 금지된 변수를 말한다. 따라서 <code>const</code> 키워드의 특징을 상수를 표현하는데 사용하기도 한다. <code>const</code> 키워드로 선언된 변수에 원시 값을 할당한 경우 원시 값은 변경할 수 없는 값이고 <code>const</code> 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없다.

#### 💻 예제 코드

```javascript
// 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;

console.log(afterTaxPrice); // 110
```

<br>

### 15.3.4 const 키워드와 객체

**<code>const</code> 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.** 변경 불가능한 값인 원시 값은 재할당 없이 변경할 수 있는 방법이 없지만 객체는 재할당 없이도 직접 변경이 가능하기 때문이다.

#### 💻 예제 코드

```javascript
const person = {
  name: 'Lee',
};

// 객체는 변경 가능한 값이다. 따라서 재할당 없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

**<code>const</code> 키워드는 재할당을 금지할 뿐 "불변"을 의미하지는 않는다.**

<br>

### 15.4 var 🆚 let 🆚 const

변수 선언에는 기본적으로 <code>const</code> 를 사용하고 <code>let</code>은 재할당이 필요한 경우에 한정해 사용하는 것이 좋다. <code>const</code> 키워드는 의도치 않은 재할당을 방지하기 때문에 좀 더 안전하게 사용 가능하다. <code>var</code>와 <code>let</code>, <code>const</code> 키워드는 다음과 같이 사용하는 것을 권장한다.

> - ES6를 사용한다면 <code>var</code> 키워드는 사용하지 않는다.

- 재할당이 필요한 경우에 한정해 <code>let</code> 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는(재할당이 필요 없는 상수) 원시 값과 객체에는 <code>const</code> 키워드를 사용한다. <code>const</code> 키워든느 재할당을 금지하므로 <code>var</code>, <code>let</code> 키워드보다 안전하다.

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
