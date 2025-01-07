## 31.1 정규표현식이란?

정규 표현식(regular expression)은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다. 정규 표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다. 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.

<br>

## 31.2 정규 표현식의 생성

정규 표현식 객체를 생성하기 위해서는 정규 표현식 리터럴과 `RegExp` 생성자 함수를 사용할 수 있다. 일반적으로 정규 표현식 리터럴을 사용하며 다음과 같이 표현한다.

`/표현식/i`

여기서 양 옆의 `/`는 시작과 종료를 알리는 기호이며, 그 사이에 표현식이 들어가고 필요에 따라 플래그를 적는다.

<br>

```javascript
const target = 'Is this all there is?';

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

regexp.test(target); // true
```

<br>

`RegExp` 생성자 함수를 사용하여 `RegExp` 객체를 생성할 수도 있다.

```javascript
/**
 * pattern: 정규 표현식의 패턴
 * flags: 정규 표현식의 플래그(g, i, m, u, y)
 */

new RegExp(pattern[, flags])
```

<br>

## 31.3 `RegExp` 메서드

### 31.3.1 `RegExp.prototype.exec`

`exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 `null`을 반환한다.

<br>

```javascript
const arget = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target);
// ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>

`exec` 메서드는 문자열 내의 모든 패턴을 검색하는 `g`플래그를 지정해도 첫 번째 매칭 결과만 반환하므로 주의하자.

<br>

### 31.3.2 `RegExp.prototype.test`

`test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.

<br>

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // true
```

<br>

### 31.3.3 `String.prototype.match`

`String` 표준 빌트인 객체가 제공하는 `match` 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.

<br>

```javascript
const target = 'Is this all there is?';
consts regExp = /is/;

target.match(regExp);
// ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>

`exec` 메서드는 문자열 내의 모든 패턴을 검색하는 `g`플래그르르 지정해도 첫 번째 결과만 반환했지만, `String.prototype.match` 메서드는 `g`플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

<br>

```javascript
const target = 'Is this all there is?';
const regExp = /is/g;

target.match(regExp); // ["is", "is"]
```

<br>

## 31.4 플래그

패턴과 함께 정규 표현식을 구성하는 플래그는 정규 표현식의 검새개 방식을 설정하기 위해 사용한다. 플래그는 총 6개 있다. 그중 중요한 3가지를 살펴보자.

<br>

| 플래그 | 의미        | 설명                                                            |
| :----: | ----------- | --------------------------------------------------------------- |
|   i    | Ignore case | 대소문자를 구별하지 않고 패턴을 검색한다.                       |
|   g    | Global      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
|   m    | Multi line  | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.                  |

<br>

플래그는 옵션이므로 선택적으로 사용할 수 있고, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수도 있다. 어떠한 플래그를 사용하지 않은 경우 대소문자를 구별해서 패턴을 검색하며, 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭만 검색하고 종료한다.

<br>

## 31.5 패턴

패턴은 `/`로 열고 닫으며 문자열의 따옴표는 생략한다.

<br>

### 31.5.1 문자열 검색

정규 표현식의 패턴에 문자 또는 문자열을 지정하여 앞서 살펴본 `RegExp` 메서드를 사용해 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.

<br>

```javascript
const target = 'Is this all there is?';
const regExp = /is/;
regExp.test(target); // true
target.match(regExp); // ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

<br>

### 31.5.2 임의의 문자열 검색

`.`은 임의의 문자 한 개를 의미한다. 문자의 내용이 무엇이든 상관없다. 다음 예제를 보면 `.`을 3개 연속하여 패턴을 생성했으므로 문자의 내용과 상관없이 3자리 문자열과 매치한다.

<br>

```javascript
const target = 'Is this all there is?';
const regExp = /.../g;
target.match(regExp); // ["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

<br>

### 31.5.3 반복 검색

`{m,n}`은 앞선 패턴(다음 예제의 경우 A)이 최소 m번, 최대 n번 반복되는 문자열을 의미한다. 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의하기 바란다.

<br>

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;
target.match(regExp); // ["A", "AA", "A", "AA", "A"}
```

<br>

`{n}`은 앞선 패턴이 n번 반복되는 문자열을 의미한다. 즉, `{n}`은 `{n,n}` 과 같다.

<br>

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;
target.match(regExp); // ["AA", "AA"}
```

<br>

`{n,}` 은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.

<br>

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;
target.match(regExp); // ["AA", "AAA"}
```

<br>

`+`는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. 즉, `+`는 `{1,}`과 같다. 다음 예제의 경우 A+는 앞선 패턴 'A'가 한번 이상 반복되는 문자열, 즉 'A'만으로 이루어진 문자열 'A', 'AA', 'AAA', ...와 매치한다.

<br>

```javascript
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A+/g;
target.match(regExp); // ["A", "AA", "A", "AAA"}
```

<br>

`?`는 앞선 패턴이 최대 한 번(0번 포함) 이상 반복되는 문자열을 의미한다. 즉, `?`는 `{0,1}`과 같다. 다음 예제의 경우 `/colou?r/`는 'colo' 다음 'u'가 최대 한 번(0번 포함) 이상 반복되고 'r'이 이어지는 문자열 'color', 'colour'와 매치한다.

<br>

```javascript
const target = 'color colour';

const regExp = /coulo?r/g;
target.match(regExp); // ["color", "colour"]
```

<br>

### 31.5.4 `OR` 검색

`|` 은 or의 의미를 갖는다. 다음 예제의 `/A|B/`는 'A' 또는 'B'를 의미한다.

<br>

```javascript
const target = 'A AA B BB Aa Bb';

const regExp = /A|B/g;
target.match(regExp); // ["A", "A", "A", "B", "B", "B", "A", "B"]
```

<br>

분해되지 않은 단어 레벨로 검색하기 위해서는 `+`를 함께 사용한다.

<br>

```javascript
const target = 'A AA B BB Aa Bb';

const regExp = /A+|B+/g;
target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

<br>

위 예제는 패턴을 or로 한 번 이상 반복하는 것인데 이를 간단히 표현하면 다음과 같다. `[]`내의 문자는 or로 동작한다. 그 뒤에 `+`를 사용하면 앞선 패턴을 한 번 이상 반복한다.

<br>

```javascript
const target = 'A AA B BB Aa Bb';

const regExp = /[AB+]/g;
target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

<br>

범위를 지정하려면 `[]`내에 `-`를 사용한다. 다음 예제의 경우 대문자 알파벳을 검색한다.

<br>

```javascript
const target = 'A AA BB ZZ Aa Bb';

const regExp = /[A-Z]+/g;
target.match(regExp); // ["A", "AA", "BB", "ZZ", "A", "B"]
```

<br>

대소문자를 구별하지 않고 알파벳을 검색하는 방법은 다음과 같다.

<br>

```javascript
const target = 'AA BB Aa Bb 12';

const regExp = /[A-Za-z]+/g;
target.match(regExp); // ["AA", "BB", "Aa", "Bb"]
```

<br>

숫자를 검색하는 방법은 다음과 같다.

<br>

```javascript
const target = 'AA BB 12,345';

const regExp = /[0-9]+/g;
target.match(regExp); // ["12", "345"]
```

<br>

위 예제의 경우 쉼표 때문에 매칭 결과가 분리되므로 수미표를 패턴에 포함시키면 다음과 같은 결과가 나온다.

<br>

```javascript
const target = 'AA BB 12,345';

const regExp = /[0-9,]+/g;
target.match(regExp); // ["12,345"]
```

<br>

위 예제를 간단히 표현하면 다음과 같다. `\d`는 숫자를 의미한다. 즉, `\d`는 `[0-9]`와 같다. `\D`는 `\d`와 반대로 동작한다. 즉, `\D`는 숫자가 아닌 문자를 의미한다.

`\w`는 알파벳, 숫자, 언더스코어를 의미한다. 즉, `\w`는 `[A-Za-z0-9_]`와 같다. `\W`는 `\w`와 반대로 동작한다. 즉, `\W`는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

<br>

### 31.5.5 NOT 검색

`[...]` 내의 `^`은 not의 의미를 갖는다. 예를 들어, `[^0-9]`는 숫자를 제외한 문자를 의미한다. 따라서 `[0-9]`와 같은 의미의 `\d`와 반대로 동작하는 `\D`는 `[^0-9]`와 같고, `[A-Za-z0-9_]`와 같은 의미의 `\w`와 반대로 동작하는 `\W`는 `[^A-Za-z0-9_]`와 같다.

<br>

### 31.5.6 시작 위치로 검색

`[...]` 밖의 `^`은 문자열의 시작을 의미한다. 단, `[...]` 내의 `^`은 not의 의미를 가지므로 주의하자.

<br>

```javascript
const target = 'https://poiemaweb.com';

const regExp = /^https/;
regExp.test(target); // true
```

<br>

### 31.5.7 마지막 위치로 검색

`$`는 문자열의 마지막을 의미한다.

<br>

```javascript
const target = 'https://poiemaweb.com';

const regExp = /com$/;
regExp.test(target); // true
```

<br>

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
