# 33 7번째 데이터 타입 Symbol

## 33.1 심벌이란?

심벌은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시 타입의 값이다. 심벌 값은 다른 값과 중복되지 않는 **유일무이한 값**이다. 따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

<br>

## 33.2 심벌 값의 생성

### 33.2.1 symbol 함수

심벌 값은 `Symbol` 함수를 호출하여 생성한다. 이때 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, **다른 값과 절대 중복되지 않는 유일무이한 값이다.**

<br>

```javascript
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol); // symbol()
```

<br>

언뜻 보면 생ㅅ어자 함수로 객체를 생성하는 것처럼 보이지만 `Symbol` 함수는 다른 생성자 함수와는 달리 `new` 연산자와 함께 호출하지 않는다. 즉, 다른 생성자 함수로 생성되는 것처럼 객체(인스턴스)가 아닌 변경 불가능한 원시 값이 생성된다.

<br>

```javascript
new Symbol(); // TypeError: Symbol is not a constructor
```

<br>

`Symbol` 함수에는 선택적으로 문자열을 인수로 전달할 수 있다. 이 문자열을 생성된 심벌 값에 대한 설명(description)으로 디버깅 용도로만 사용되며, 심벌 값 생성에 어떤 영향도 주지 않는다. 즉, 심벌 값에 대한 설명이 같더라도 생성된 심벌 값은 유일무이한 값이다.

<br>

```javascript
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

<br>

심벌 값도 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다. 다음 예제의 `description` 프로퍼티와 `toString` 메서드는 `Symbol.prototype`의 프로퍼티다.

<br>

```javascript
const mySymbol = Symbol('mySymbol');

// 심벌도 래퍼 객체를 생성한다.
console.log(mySymbol.description); // mySymbol
console.log(mySymbol.toString()); // Symbol(mySymbol)
```

<br>

심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
단, 불리언 값으로는 암묵적으로 타입 변환되며, 이를 통해 `if`문 등에서 존재 확인이 가능하다.

<br>

```javascript
const mySymbol = Symbol();

console.log(mySymbol + ''); // TypeError: Cannot convert a Symbol value to a string
console.log(+mySymbol); // TypeError: Cannot convert a Symbol value to a number
console.log(!!mySymbol); // true

if (mySymbol) console.log('mySymbol is not empty');
```

<br>

### 33.2.2 `Symbol.for` / `Symbol.keyFor` 메서드

`Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.

<br>

- 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
- 검색에 실패하면 새로운 심벌 값을 생성하여 `Symbol.for` 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.

<br>

```javascript
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol');
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for('mySymbol');

console.log(s1 === s2); // true
```

<br>

`Symbol` 함수는 호출될 때마다 유일무이한 심벌 값을 생성ㅎ나다. 이때 자바스크립트 엔진이 관리하는 심벌 값 저장소인 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로 전역 심벌 레지스트리에 등록되어 관리되지 않는다. **하지만 `Symbol.for` 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.**

<br>

`Symbol.keyFor` 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

<br>

```javascript
const s1 = Symbol.for('mySymbol');
Symbol.keyFor(s1); // mySymbol

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다. 따라서 keyFor 메서드를 통해 해당 키를 추출할 수 없다.
const s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined
```

<br>

## 33.3 심벌과 상수

예를 들어, 4방향, 즉 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다고 생각해 보자.

<br>

```javascript
// 여기서 상수 이름에만 의미가 있고, 값 1,2,3,4는 특별한 의미가 없다.
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You ar going UP.');
}
```

<br>

이렇게 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우, 상수 값 1, 2, 3, 4가 변경될 위험이 있고 다른 변수 값과 중복될 위험이 있으므로 이러한 경우, 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다.

<br>

```javascript
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성
const Direction = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You ar going UP.');
}
```

<br>

## 33.4 심벌과 프로퍼티 키

객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열과 심벌 값으로 만들 수 있으며, 동적으로 생성할 수도 있다. 심벌 값으로 프로퍼티 키를 동적 생성할 때는 사용할 심벌 값에 대괄호를 사용해야 한다. 프로퍼티 키로 접근할 때도 마찬가지로 대괄호를 사용해야 한다.

<br>

```javascript
coonst obj = {
  // 심벌 값으로 프로퍼티 키를 생성
  [Symbol.for('mySymbol')]: 1
};

obj[Symbol.for('mySymbol')]; // 1
```

<br>

**심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.** (아주 강조..)

<br>

## 33.5 심벌과 프로퍼티 은닉

심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `for...in` 문이나 `Object.keys`, `Object.getOwnPropertyNames` 메서드로 찾을 수 없다. 이처럼 심벌 값을 프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

<br>

```javascript
const obj = {
  [Symbol.for('mySymbol')]: 1,
};

for (const key in obj) {
  console.log(key); // 아무것도 출력되지 않는다.
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
```

<br>

하지만 프로퍼티를 완전하게 숨길 수 있는 것은 아니다. ES6에서 도입된 `Object.getOwnPropertySymbols` 메서드를 사용하면 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.

<br>

```javascript
const obj = {
  [Symbol.for('mySymbol')]: 1,
};

// getOwnPropertySymbols 메서드는 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환한다.
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
const symbolkey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolkey1]); // 1
```

<br>

## 33.6 심벌과 표준 빌트인 객체 확장

일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않는다. 개발자가 직접 추가한 메서드와 미래에 표준 사양으로 추가될 메서드의 이름이 중복될 수 있기 때문이다.

하지만 중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론, 표준 사양의 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하게 표준 빌트인 객체를 확장시킬 수 있다.

<br>

```javascript
Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

[1, 2][Symbol.for('sum')](); // 3
```

<br>

## 33.7 Well-known Symbol

자바스크립트가 기본 제공하는 빌트인 심벌 값이 있다. 빌트인 심벌 값은 `Symbol` 함수의 프로퍼티에 할당되어 있다. 이처럼 자바스크립트가 기본 제공하는 비르인 심벌 값을 ECMAScript 사양에서는 Well-known Symbol이라 부르며 자바스크립트 내부 알고리즘에 사용된다.

예를 들어, `Array`, `String`과 같이 `for...of` 문으로 순회 가능한 빌트인 이터러블은 Well-known Symbol인 `Symbol.iterator`를 키로 갖는 메서드를 가지며, `Symbol.iterator` 메서드를 호출하면 이터레이터를 반환하도록 규정되어 있다. 만약 빌트인 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하곳 싶다면 이 이터레이션 프로토콜을 따르면 된다. 즉, ECMAScript 사양에 규정되어 있는 대로 Well-known Symbol인 `Symbol.iterator`를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 된다.

예제는 책 참고!

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
