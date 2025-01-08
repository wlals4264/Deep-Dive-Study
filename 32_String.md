# 32 String

## 32.1 String 생성자 함수

표준 빌트인 객체 `String`은 생성자 함수 객체다. 따라서 `new` 연산자와 함께 호출하여 `String` 인스턴스를 생성할 수 있다.

`String` 생성자 함수에 인수를 전달하지 않고 `new` 연산자와 함께 호출하면 `[[StringData]]` 내부 슬롯에 빈 문자열을 할당한 `String` 래퍼 객체를 생성한다.

`String` 생성자 함수의 인수로 문자열을 전달하면서 `new` 연산자와 함께 호출하면 `[[StringData]]` 내부 슬롯에 인수로 전달받은 문자열을 할당한 `String` 래퍼 객체를 생성한다.

<br>

```javascript
const strObj1 = new String();
console.log(strObj1); // String {length: 0, [[PrimitiveValue]]: ""}

const strObj2 = new String('Kim');
console.log(strObj2); // String {0: "K", 1: "i", 2: "m", length: 3, [[PrimitiveValue]]: "Kim"}
```

<br>

앞서 11장의 문자열과 불변성에서 살펴봤듯이 `String` 래퍼 객체는 배열과 마찬가지로 `length` 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 유사 배열 객체이면서 이터러블이다. 따라서 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있다.

그리고 9장에서 살펴봤듯이 `new` 연산자를 사용하지 않고 `String` 생성자 함수를 호출하면 `String` 인스턴스가 아닌 문자열을 반환한다. 이를 이용하여 명시적 타입 변환을 하기도 한다.

<br>

## 32.2 `length` 프로퍼티

`length` 프로퍼티는 문자열의 문자 개수를 반환한다.

<br>

## 32.3 `String` 메서드

`String` 객체의 메서드는 언제나 새로운 문자열을 반환한다. 문자열은 변경 불가능한 원시 값이기 때문에 `String` 래퍼 객체도 읽기 전용(read only)객체로 제공된다.

이제 사용 빈도가 높은 `String` 메서드를 살펴보자.

<br>

### 32.3.1 `String.prototype.indexOf`

`indexOf` 메서드는 대상 문자열에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환하며, 검색에 실패하면 `-1`을 반환한다.

<br>

```javascript
const str = 'Hello world';

str.indexOf('l'); // 2
str.indexOf('or'); // 7
str.indexOf('x'); // -1
```

<br>

`indexOf` 메서드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

<br>

```javascript
const str = 'Hello world';

str.indexOf('l', 3); // 3
```

<br>

### 32.3.2 `String.prototype.search`

`search` 메서드는 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다. 검색에 실패하면 `-1`을 반환한다.

<br>

```javascript
const str = 'Hello world';

str.search(/o/); // 4
str.search(/x/); // -1
```

<br>

### 32.3.3 `String.prototype.includes`

`includes` 메서드는 대상 문자열에서 인수로 전달받은 문자열이 포함되어 있는지를 확인하여 그 결과를 `true` 혹은 `false`로 반환한다.

<br>

```javascript
const str = 'Hello world';

str.includes('Hello'); // true
str.includes(''); // true
str.includes('x'); // false
str.includes(); // false
```

<br>

`includes` 메서드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

<br>

```javascript
const str = 'Hello world';

// 문자열 str의 인덱스 3부터 'l'이 포함되어 있는지 확인
str.includes('l', 3); // true
str.includes('H', 3); // false
```

<br>

### 32.3.4 `String.prototype.startsWith`

`startsWith` 메서드는 대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인하여 그 결과를 `true` 또는 `false`로 반환한다.

<br>

```javascript
const str = 'Hello world';

str.startsWith('He'); // true
str.startsWith('x'); // false
```

<br>

`startsWith` 메서드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

<br>

```javascript
str.startsWith(' ', 5); // true
```

<br>

### 32.3.5 `String.prototype.endsWith`

`endsWith` 메서드는 대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여 그 결과를 `true` 또는 `false`로 반환한다.

<br>

```javascript
const str = 'Hello world';

str.endsWith('ld'); // true
str.endsWith('x'); // false
```

<br>

`endsWith` 메서드의 2번째 인수로 검색할 문자열의 길이를 전달할 수 있다.

<br>

```javascript
// 문자열 str의 처음부터 5자리까지('Hello')가 'lo'로 끝나는지 확인
str.endsWith('lo', 5); // true
```

<br>

### 32.3.6 `String.prototype.charAt`

`charAt` 메서드는 대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환한다.

<br>

```javascript
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
```

<br>

인데스는 문자열의 범위, 즉 0 ~ (문자열 길이 - 1) 사이의 정수여야 한다. 인덱스가 문자열의 범위를 벗어난 정수인 경우 빈 문자열을 반환한다.

<br>

### 32.3.7 `String.prototype.substring`

`substring` 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환한다.

<br>

```javascript
const str = 'Hello World';

str.substring(1, 4); // ell
```

<br>

`substring` 메서드의 두 번째 인수는 생략할 수 있다. 이때 첫 번째 인수로 전달한 인덱스에 위치하는 문자부터 마지막 문자까지 부분 문자열을 반환한다.

<br>

```javascript
const str = 'Hello World';

str.substring(1); // 'ello World'
```

<br>

`substring` 메서드의 첫 번재 인수는 두 번째 인수보다 작은 정수여야 정상이다. 하지만 다음과 같이 인수를 전달하여도 정상 동작한다.

- 첫 번째 인수 > 두 번째 인수인 경우 두 인수는 교환된다.
- 인수 < 0 또는 `NaN`인 경우 0으로 취급된다.
- 인수 > 문자열의 길이(`str.length`)인 경우 인수는 문자열의 길이(`str.length`)로 취급된다.

<br>

### 32.3.8 `String.prototype.slice`

`slice` 메서드는 `substring` 메서드와 동일하게 동작한다. 단, `slice` 메서드에는 음수인 인수를 전달할 수 있다. 음수인 인수를 전달하면 대상 문자열의 가장 뒤에서부터 시작하여 문자열을 잘라내어 반환한다.

<br>

```javascript
const str = 'Hello world';

str.substring(0, 5); // 'hello'
str.slice(0, 5); // 'hello'

str.substring(2); // 'llo world'
str.slice(2); // 'llo world'

str.substring(-5); // 'hello world'
str.slice(-5); // 'world'
```

<br>

### 32.3.9 `String.prototype.toUpperCase`

`toUpperCase` 메서드는 대상 문자열을 모두 대문자로 변경한 문자열을 반환한다.

<br>

### 32.3.10 `String.prototype.toLowerCase`

`toLowerCase` 메서드는 대상 문자열을 모두 소문자로 변경한 문자열을 반환한다.

<br>

### 32.3.11 `String.prototype.trim`

`trim` 메서드는 대상 문자열 앞뒤에 공백 문자가 있을 경우 이를 제거한 문자열을 반환한다.

```javascript
const str = '   foo   ';

str.trim(); // 'foo'
```

<br>

### 32.3.12 `String.prototype.repeat`

`repeat` 메서드는 대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환한다. 인수로 전달받은 정수가 0이면 빈 문자열을 반환하고, 음수이면 `RangeError`를 발생시킨다. 인수를 생략하면 기본값 0이 설정된다.

<br>

```javascript
const str = 'abc';

str.repeat(); // ''
str.repeat(0); // ''
str.repeat(1); // 'abc'
str.repeat(2); // 'abcabc'
str.repeat(2.5); // 'abcabc' (2.5 -> 2)
str.repeat(-1); // RangeError: Invalid count value
```

<br>

### 32.3.13 `String.prototype.replace`

`replace` 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환한다.

<br>

```javascript
const str = 'Hello world';

str.replace('world', 'Lee'); // 'Hello Lee'
```

<br>

검색된 문자열이 여럿 존재할 경우 첫 번째로 검색된 문자열만 치환한다.

<br>

```javascript
const str = 'Hello world world';

str.replace('world', 'Lee'); // 'Hello Lee world'
```

<br>

특수한 교체 패턴을 사용할 수 있다. 예를 들어, `$&`는 검색된 문자열을 의미한다. [교체 패턴에 대한 자세한 내용은 MDN 문서를 참고하자.](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

`replace` 메서드의 첫 번째 인수로 정규 표현식을 전달할 수도 있다.

<br>

```javascript
const str = 'Hello Hello';

str.replace(/hello/gi, 'Lee'); // 'Lee Lee'
```

<br>

`replace` 메서드의 두 번째 인수로 치환 함수를 전달할 수 있다. `replace` 메서드는 첫 번째 인수로 전달한 문자열 또는 정규 표현식에 매치한 결과를 두 번째 인수로 전달한 치환 함수의 인수로 전달하면서 호출하고 치환 함수가 반환한 결과와 매치 결과를 치환한다.(교재 참고)

<br>

### 32.3.14 `String.prototype.split`

`split` 메서드는 대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환한다. 인수로 빈 문자열을 전달하면 각 문자를 모두 분리하고, 인수를 생략하면 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.

<br>

```javascript
const str = 'how are. you doing?';

str.splite(' '); // ["How", "are", "you", "doing?"]
str.split(/\s/); // ["How", "are", "you", "doing?"]
str.split(''); // ['h', 'o', 'w', ' ', 'a', 'r', 'e', '.', ' ', 'y', 'o', 'u', ' ', 'd', 'o', 'i', 'n', 'g', '?']
str.split(); // ["How are you doing?"]
```

<br>

두 번째 인수로 배열의 길이를 지정할 수 있다.

<br>

```javascript
str.split(' ', 3); // ["How", "are", "you"]
```

<br>

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
