# 30 Date

표준 빌트인 객체인 `Date`는 날짜와 시간(연, 월, 일, 시, 분, 초, 밀리초)을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.

UTC는 국제 표준시를 말하며, KST(한국 표준시)는 UTC에 9시간을 더한 시간이다. 즉, KST는 UTC보다 9시간이 더 빠르다. 예를 들어, UTC 00:00 AM은 KST 09:00 AM이다.

<br>

## 30.1 `Date` 생성자 함수

`Date`는 생성자 함수다. `Date` 생성자 함수로 생성한 `Date` 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다. 이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로 `Date` 객체가 나나태는 날짜와 시간까지의 밀리초를 나타낸다.

`Date` 생성자 함수로 생성한 `Date` 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가진다. 현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우 `Date` 생성자 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 지정하면 된다.

<br>

### 30.1.1 `new Date()`

`Date` 생성자 함수를 인수 없이 `new` 연산자와 함께 호출하면 현재 날짜와 시간을 가지는 `Date` 객체를 반환한다. `Date` 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 `Date` 객체를 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력한다.

<br>

```javascript
new Date(); // Tue Jan 07 2025 12:21:48 GMT+0900 (한국 표준시)
```

<br>

`Date` 생성자 함수를 `new` 연산자 없이 호출하면 `Date` 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환한다.

<br>

```javascript
Date(); // 'Tue Jan 07 2025 12:22:57 GMT+0900 (한국 표준시)'
```

<br>

### 30.1.2 `new Date(milliseconds)`

`Date` 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 `Date` 객체를 반환한다.

<br>

```javascript
new Date(0); // Tue Jan 07 2025 12:21:48 GMT+0900 (한국 표준시)
```

<br>

### 30.1.3 `new Date(dateString)`

`Date` 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면 지정된 날짜와 시간을 나타내는 `Date` 객체를 반환한다. 이때 인수로 전달한 문자열은 `Date.parse` 메서드에 의해 해석 가능한 형식이어야 한다.

<br>

```javascript
new Date('May 16, 2024 10:00:00'); // Thu May 16 2024 10:00:00 GMT+0900 (한국 표준시)

new Date('2024/05/16/10:00:00'); // Thu May 16 2024 10:00:00 GMT+0900 (한국 표준시)
```

<br>

### 30.1.4 `new Date(year,month[, day, hour, minute, second, millisecond])`

`Date` 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 `Date` 객체를 반환한다. 이때 연, 월은 반드시 지정해야 한다. 지정하지 않은 옵션 정보는 0 또는 1로 초기화된다.

<br>

## 30.2 `Date` 메서드

### 30.2.1 `Date.now`

1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

<br>

### 30.2.2 `Date.parse`

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간(`new Date(dateString)`의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.

<br>

### 30.2.3 `Date.UTC`

1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다. `Date.UTC` 메서드는 `new Date(year, month[, day, hour, minute, second, millisecond])`와 같은 형식의 인수를 사용해야 한다. `Date.UTC` 메서드의 인수는 로컬 타임(KST)이 아닌 UTC로 인식된다.

<br>

### 30.2.4 `Date.prototype.getFullYear`

`Date` 객체의 연도를 나타내는 정수를 반환한다.

<br>

### 30.2.4 `Date.prototype.setFullYear`

`Date` 객체의 연도를 나타내는 정수를 설정한다. 연도 이외에 옵션으로 월, 일도 설정할 수 있다.

<br>

### 30.2.5 `Date.prototype.getFullYear`

`Date` 객체의 연도를 나타내는 정수를 반환한다.

<br>

### 30.2.6 `Date.prototype.getMonth`

`Date` 객체의 월을 나타내는 0~11의 정수를 반환한다. 1월은 0, 12월은 11이다.

<br>

### 30.2.7 `Date.prototype.setMonth`

`Date` 객체의 월을 나타내는 0~11의 정수를 설정한다. 1월은 0, 12월은 11이다. 월 이외에 옵션으로 일도 설정할 수 있다.

<br>

### 30.2.8 `Date.prototype.getDate`

`Date` 객체의 날짜(1~31)를 나타내는 정수를 반환한다.

<br>

### 30.2.9 `Date.prototype.setDate`

`Date` 객체의 날짜(1~31)를 나타내는 정수를 설정한다.

<br>

### 30.2.10 `Date.prototype.getDay`

`Date` 객체의 요일(0 ~ 6)을 나타내는 정수를 반환한다. 반환값은 다음과 같다.

일요일 -> 0
월요일 -> 1
화요일 -> 2
수요일 -> 3
목요일 -> 4
금요일 -> 5
토요일 -> 6

<br>

### 30.2.11 `Date.prototype.getHours`

`Date` 객체의 시간(0 ~ 23)을 나타내는 정수를 반환한다.

<br>

### 30.2.12 `Date.prototype.setHours`

`Date` 객체의 시간(0 ~ 23)을 나타내는 정수를 설정한다. 시간 이외에 옵션으로 분, 초, 밀리초도 설정할 수 있다.

<br>

### 30.2.13 `Date.prototype.getMinutes`

`Date` 객체의 분(0 ~ 59)을 나타내는 정수를 반환한다.

<br>

### 30.2.14 `Date.prototype.setMinutes`

`Date` 객체의 분(0 ~ 59)을 나타내는 정수를 설정한다. 분 이외에 옵션으로 초, 밀리초도 설정할 수 있다.

<br>

### 30.2.15 `Date.prototype.getSeconds`

`Date` 객체의 초(0 ~ 59)을 나타내는 정수를 반환한다.

<br>

### 30.2.16 `Date.prototype.setSeconds`

`Date` 객체의 초(0 ~ 59)을 나타내는 정수를 설정한다. 초 이외에 옵션으로 밀리초도 설정할 수 있다.

<br>

### 30.2.17 `Date.prototype.getMilliseconds`

`Date` 객체의 밀리초(0 ~ 999)를 나타내는 정수를 반환한다.

<br>

### 30.2.18 `Date.prototype.setMilliseconds`

`Date` 객체의 밀리초(0 ~ 999)를 나타내는 정수를 설정한다.

<br>

### 30.2.19 `Date.prototype.getTime`

1970년 1월 1일 00:00:00(UTC)를 기점으로 `Date` 객체의 시간까지 경과된 밀리초를 반환한다.

<br>

### 30.2.20 `Date.prototype.setTime`

1970년 1월 1일 00:00:00(UTC)를 기점으로 `Date` 객체의 시간까지 경과된 밀리초를 설정한다.

<br>

### 30.2.21 `Date.prototype.getTimezoneOffset`

UTC와 `Date` 객체에 지정된 로캘 시간과의 차이를 분 단위로 반환한다. KST는 UTC에 9시간을 더한 시간이다. 즉, UTC = KTC - 9h다.

<br>

```javascript
const today = new Date();

today.getTimezoneOffset() / 60; // -9, 분 -> 시간 환산
```

<br>

### 30.2.22 `Date.prototype.toDateString`

사람이 읽을 수 있는 형식의 문자열로 `Date` 객체의 날짜를 반환한다.

<br>

```javascript
const today = new Date('2025/1/7/12:40');

today.toString(); // 'Tue Jan 07 2025 12:40:00 GMT+0900 (한국 표준시)'
today.toDateString(); // 'Tue Jan 07 2025'
```

<br>

### 30.2.23 `Date.prototype.toTimeString`

사람이 읽을 수 있는 형식의 문자열로 `Date` 객체의 시간을 표현한 문자열을 반환한다.

<br>

```javascript
const today = new Date('2025/1/7/12:40');

today.toString(); // 'Tue Jan 07 2025 12:40:00 GMT+0900 (한국 표준시)'
today.toTimeString(); // '12:40:00 GMT+0900 (한국 표준시)'
```

<br>

### 30.2.24 `Date.prototype.toISOString`

[ISO 8601 형식](https://ko.wikipedia.org/wiki/ISO_8601)으로 `Date` 객체의 날짜와 시간을 표현한 문자열을 반환한다.

<br>

```javascript
const today = new Date('2025/1/7/12:40');

today.toString(); // 'Tue Jan 07 2025 12:40:00 GMT+0900 (한국 표준시)'
today.toISOString(); // '2025-01-07T03:40:00.000Z'

today.toISOString().slice(0, 10); // 2025-01-07
today.toISOString().slice(0, 10).replace(/-/g, ''); // 20250107
```

<br>

### 30.2.25 `Date.prototype.toLocaleString`

인수로 전달한 로캘을 기준으로 `Date` 객체의 날짜와 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동자가 중인 시스템의 로캘을 적용한다.

<br>

```javascript
const today = new Date('2025/1/7/12:40');

today.toString(); // 'Tue Jan 07 2025 12:40:00 GMT+0900 (한국 표준시)'
today.toLocaleString(); // '2025. 1. 7. 오후 12:40:00'
```

<br>

### 30.2.26 `Date.prototype.toLocaleTimeString`

인수로 전달한 로캘을 기준으로 `Date` 객체의 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용한다.

<br>

```javascript
const today = new Date('2025/1/7/12:40');

today.toString(); // 'Tue Jan 07 2025 12:40:00 GMT+0900 (한국 표준시)'
today.toLocaleTimeString(); // '오후 12:40:00'
```

<br>

## 30.3 `Date`를 활용한 시계 예제

```javascript
(function printNow() {
  const today = new Date();

  const dayNames = ['(일요일)', '(월요일)', '(화요일)', '(수요일)', '(목요일)', '(금요일)', '(토요일)'];

  // getDay 메서드는 해당 요일(0 ~ 6)을 나타내는 정수를 반환한다.
  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12;

  // 10 미만인 분과 초를 2자리로 변경
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  setTimeout(printNow, 1000);
})();
```

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
