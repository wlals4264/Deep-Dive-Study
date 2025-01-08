# 28 Number

## 28.1 `Number` 생성자 함수

표준 빌트인 객체인 `Number` 객체는 생성자 함수 객체다. 따라서 `new` 연산자와 함께 호출하여 `Number` 인스턴스를 생성할 수 있다.

만약, `Number` 생성자 함수에 인수를 전달하지 않고 `new` 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 0을 할당한 `Number` 래퍼 객체를 생성한다. 만약, 인수로 숫자를 전달하면 `[[NumberData]]` 내부 슬롯에 인수로 전달받은 숫자를 할당한 `Number` 래퍼 객체를 생성한다.

<br>

```javascript
const numObj = new Number();
console.log(numObj); // Number {]]PrimitiveVelue]]: 0}

const numObj1 = new Number(10);
console.log(numObj1); // Number {]]PrimitiveVelue]]: 10}
```

<br>

`Number` 생성자 함수의 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환 후, `[[NumberData]]` 내부 슬롯에 변환된 숫자를 할당한 `Number` 래퍼 객체를 생성한다. 인수를 숫자로 변환할 수 없다면 `NaN`을 `[[NumberData]]` 내부 슬롯에 할당한 `Number` 래퍼 객체를 생성한다.

<br>

```javascript
let numObj = new Number('10');
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number('hello');
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```

<br>

`new` 연산자 없이 `Number` 생성자 함수를 호출하면 `Number` 인스턴스가 아닌 숫자를 반환한다. 이를 이용하여 명시적으로 타입을 변환하기도 한다.(9.3절 명시적 타입 변환 참고)

<br>

## 28.2 `Number` 프로퍼티

### 28.2.1 `Number.EPSILON`

`Number.EPSILON`은 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다. `Number.EPSILON`은 약 2.22044어쩌구...(그만큼 미세하게 작은 숫자!)

부동소수점 산술 연산은 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 발생할 수 밖에 없는 구조적 한계가 있는데, 이때 발생하는 미세한 오차를 해결하기 위해 사용하는 프로퍼티다.

<br>

```javascript
function isEqual(a, b) {
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // true
```

<br>

### 28.2.2 `Number.MAX_VALUE`

`Number.MAX_VALUE`는 자바스크립트에서 표현할 수 있는 가장 큰 양수 값이다. `Number.MAX_VALUE` 보다 큰 숫자는 `Infinity`다.

<br>

### 28.2.3 `Number.MIN_VALUE`

`Number.MIN_VALUE`는 자바스크립트에서 표현할 수 있는 가장 작은 양수 값이다. `Number.MIN_VALUE` 보다 작은 숫자는 `0`이다.

<br>

### 28.2.4 `Number.MAX_SAFE_INTEGER`

`Number.MAX_SAFE_INTEGER`는 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값이다.

<br>

### 28.2.5 `Number.MIN_SAFE_INTEGER`

`Number.MIN_SAFE_INTEGER`는 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값이다.

<br>

### 28.2.6 `Number.POSITIVE_INFINITY`

`Number.POSITIVE_INFINITY`는 양의 무한대를 나타내는 숫자값 `Infinity`와 같다.

<br>

### 28.2.7 `Number.NEGATIVE_INFINITY`

`Number.NEGATIVE_INFINITY`는 음의 무한대를 나타내는 숫자값 `-Infinity`와 같다.

<br>

### 28.2.8 `Number.NaN`

`Number.NaN`은 숫자가 아님(Not-aNumber)을 나타내는 숫자값이다. `window.NaN`과 같다.

<br>

## 28.3 `Number` 메서드

### 28.3.1 `Number.isFinite`

`Number.isFinite` 정적 메서드는 인수로 전달된 숫자값이 정상적인 유한수, 즉 `Infinity` 또는 `-Infinity`가 아닌지 검사하여 그 결과값을 불리언으로 반환한다. 만약 인수가 `NaN`이라면 언제나 `false`를 반환한다.

<br>

`Number.isFinite` 메서드는 빌트인 전역 함수 `isFinite`와 차이가 있다. 빌트인 전역 함수 `isFinite`는 전달받은 인수를 숫자로 암묵적 타입 변환하여 검사를 수행하지만 `Number.isFinite`는 전달받은 인수르르 숫자로 암묵적 타입 변환하지 않는다. 따라서 숫자가 아닌 값이 주어졌을 때 반환값은 언제나 `false`다.

<br>

### 28.3.2 `Number.isInteger`

`Number.isInteger` 정적 메서드는 인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언 값으로 변환한다. 검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않는다.

<br>

### 28.3.3 `Number.isNaN`

`Number.isNaN` 정적 메서드는 인수로 전달된 숫자값이 `NaN`인지 검사하여 그 결과를 불리언값으로 반환한다.

`Number.isFinite` 과 마찬가지로, `Number.isNaN`은 빌트인 전역 함수 `isNaN`과 다르게 암묵적 타입 변환하여 검사를 수행하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 `false` 다.

<br>

### 28.3.4 `Number.isSafeInteger`

`Number.isSafeInteger` 정적 메서드는 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 불리언 값으로 반환한다. 검사전, 인수를 숫자로 암묵적 타입 변환하지 않는다.

<br>

### 28.3.5 `Number.prototype.toExponential`

`toExponential` 메서드는 숫자를 지수 표기법으로 변환하여 문자열로 반환한다. 이때 소수 구분 기호를 나타내는 `.`과 객체 프로퍼티에 접근하기 위한 프로퍼티 접근 연산자 `.`의 구분을 명확히 하기 위해 꼭 숫자를 `()`로 감싸도록 하자.

<br>

### 28.3.6 `Number.prototype.toFixed`

`toFixed` 메서드는 숫자를 반올림하여 문자열로 반환한다. 반올림하는 소수점 이하 자릿수를 나타내는 0~20사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 0이 지정된다.

<br>

```javascript
(12345.6789).toFixed(1); // "12345.7"
```

<br>

### 28.3.7 `Number.prototype.toPrecision`

`toPrecision` 메서드는 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 인수를 생략하면 기본값 0이 지정된다.

<br>

```javascript
(12345.6789).toPrecision(1); // "1e+4"
```

<br>

### 28.3.8 `Number.prototype.toString`

`toString` 메서드는 숫자를 문자열로 변환하여 반환한다. 진법을 나타내는 2~36 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값 10진법이 지정된다.

<br>

```javascript
(10).toString(); // "10"
(16).toString(2); // "10000"
```

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
