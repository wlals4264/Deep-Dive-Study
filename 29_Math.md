# 28 Math

## 29.1 Math 프로퍼티

### 29.1.1 `Math.PI`

원주율 PI 값을 반환한다.

## 29.2 `Math` 메서드

### 29.2.1 `Math.abs`

`Math.abs` 메서드는 인수로 전달된 숫자의 절대값을 반환한다. 절대값은 반드시 0 또는 양수이어야 한다.

<br>

```javascript
Math.abs(-1); // 1
Math.abs('-1'); // 1
Math.abs(''); // 0
Math.abs([]); // 0
Math.abs(null); // 0
Math.abs(undefined); // NaN
Math.abs({}); // NaN
Math.abs('string'); // NaN
Math.abs(); // NaN
```

<br>

### 29.2.2 `Math.around`

`Math.around` 메서드는 인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환한다.

<br>

### 29.2.3 `Math.ceil`

`Math.ceil` 메서드는 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환한다. 소수점 이하를 올림하면 더 큰 정수가 된다.

<br>

### 29.2.4 `Math.floor`

`Math.floor` 메서드는 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환한다.

<br>

### 29.2.5 `Math.sqrt`

`Math.sqrt` 메서드는 인수로 전달된 숫자의 제곱근을 반환한다.

<br>

### 29.2.6 `Math.random`

`Math.random` 메서드는 임의의 난수(랜덤 숫자)를 반환한다. `Math.random` 메서드가 반환한 난수는 0에서 1미만의 실수다. 즉, 0은 포함되지만 1은 포함되지 않는다.

<br>

```javascript
Math.random(); // 0에서 1미만의 랜덤 실수

/*
1에서 10 번위의 랜덤 정수 취득
1) Math.random으로 0에서 1미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10 미만의 랜덤 실수를 구한다.
2) 0에서 10 미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
*/
const random = Math.floor(Math.random() * 10 + 1);
console.log(random); // 1에서 10 범위의 정수
```

<br>

### 29.2.7 `Math.pow`

`Math.pow` 메서드는 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환한다. ES7에서 도입된 지수 연산자를 사용하는게 가독성이 더 좋다.

<br>

### 29.2.8 `Math.max`

`Math.max` 메서드는 전달받은 인수 중에서 가장 큰 수를 반환한다. 인수가 전달되지 않으면 `-Infinify`를 반환한다. 배열을 인수로 전달받아 배열의 요소에서 최대값을 구하려면 스프레드 문법을 사용하자.

<br>

### 29.2.9 `Math.min`

`Math.min` 메서드는 전달받은 인수 중에서 가장 작은 수를 반환한다. 인수가 전달되지 않으면 `Infinity`를 반환한다. 마찬가지로 배열을 인수로 전달받아 배열의 요소에서 최소값을 구하려면 스프레드 문법을 사용하자.

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
