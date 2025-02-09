# 43 Ajax

## 43.1 Ajax란?

Ajax(Asynchronous JavaScript and XHL)란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다. Ajax는 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작하며 XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

Ajax 등장 이전의 전통적인 웹페이지는 필요 없는 부분까지 다시 전송받아 렌더링하기 때문에 화면이 순간적으로 깜박이는 형상이 발생하고 서버로부터 응답을 받을 때까지 블로킹이 되는 등 웹페이지의 성능 및 사용성에 영향을 미쳤다.

Ajax의 등장으로 인해 서버로부터 변경에 필요한 데이터만 비동기 방식으로 전송받아서 렌더링이 가능해졌고 브라우저에서도 데스크톱 애플리케이션과 유사한 빠른 퍼포먼스와 부드러운 화면 전환이 가능해졌다.

<br>

## 43.2 JSON

JSON(JavaScript Object Notation)은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다. 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용할 수 있다.

### 43.2.1 JSON 표기 방식

JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트다. JSON의 키는 반드시 큰따옴표(작은따옴표 사용 불가)로 묶어야 한다. 값은 객체 리터럴과 같은 표기법을 그대로 사용할 수 있다. 하지만 문자열은 반드시 큰따옴표(작은따옴표 사용 불가)로 묶어야 한다.

<br>

```javascript
{
  "name": "Lee",
  "age": 20,
  "alive": true,
  "hobby": ["traveling", "tennis"]
}
```

<br>

### 43.2.2 JSON.stringify

`JSON.stringify` 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화(serializing)라 한다. `JSON.stringify` 메서드는 객체뿐만 아니라 배열도 JSON 포맷의 문자열로 변환한다.

<br>

### 43.2.3 JSON.parse

`JSON.parse` 메서드는 JSON 포맷의 문자열을 객체로 변환한다. 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다. 이 문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데 이를 역직렬화(deserializing)라 한다. 배열이 JSON 포맷의 문자열로 변환되어 있는 경우 `JSON.parse`는 문자열을 배열 객체로 변환한다. 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환한다.

<br>

## 43.3 XMLHttpRequest

자바스크립트를 사용하여 HTTP 요청을 전송하려면 `XMLHttpRequest` 객체를 사용한다. Web API인 `XMLHttpRequest` 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

<br>

### 43.3.1 XMLHttpRequest 객체 생성

`XMLHttpRequest` 객체는 `XMLHttpRequest` 생성자 함수를 호출하여 생성한다. `XMLHttpRequest` 객체는 브라우저에서 제공하는 Web API이므로 브라우저 환경에서만 정상적으로 동작한다.

<br>

```javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequset();
```

<br>

### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드

`XMLHttpRequest` 객체는 다양한 프로퍼티와 메서드를 제공한다.(책 or [mdn 문서](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 참고)

<br>

### 43.3.3 HTTP 요청 전송

HTTP 요청을 전송하는 경우 다음 순서를 따른다.

1. `XMLHttpRequest.prototype.open` 메서드로 HTTP 요청을 초기화한다.
2. 필요에 따라 `XMLHttpRequest.prototype.setRequestHeader` 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
3. `XMLHttpRequest.prototype.send` 메서드로 HTTP 요청을 전송한다.

<br>

```javascript
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

<br>

#### XMLHttpRequest.prototype.open

`open` 메서드는 서버에 전송할 HTTP 요청을 초기화한다. `open` 메서드를 호출하는 방법은 다음과 같다.

<br>

```javascript
xhr.open(method, url[, async])
```

<br>

- method : HTTP 요청 메서드("GET", "POST", "PUT", "DELETE" 등)
- url : HTTP 요청을 전송할 URL
- async : 비동기 요청 여부, 옵션으로 기본값은 `true`이며, 비동기 방식으로 동작한다.

<br>

HTTP 요청 메서드는 클라리언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다. 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현한다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/4aea37e3-faa6-41d2-b31f-53a456fe1dab/image.png)

<br>

#### XMLHttpRequest.prototype.send

`send` 메서드는 `open` 메서드로 초기화된 HTTP 요청을 서버에 전송한다. 기본적으로 서버로 전송하는 데이터는 GET, POST 요청 메서드에 따라 전송 방식에 차이가 있다.

- GET 요청 메서드의 경우 데이터의 URL의 일부분인 쿼리 문자열로 서버에 전송한다.
- POST 요청 메서드의 경우 데이터(페이로드)를 요청 몸체에 담아 전송한다.

`send` 메서드에는 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다. 페이로드가 객체인 경우 반드시 `JSON.stringify` 메서드를 사용하여 직렬화한 다음 전달해야 한다.

<br>

```javascript
xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));
```

<br>

**HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.**

<br>

#### XMLHttpRequest.prototype.setRequestHeader

`setRequestHeader` 메서드는 특정 HTTP 요청의 헤더 값을 설정한다. `setRequestHeader` 메서드는 반드시 `open` 메서드를 호출한 이후에 호출해야 한다. 자주 사용하는 HTTP 요청 헤더인 `Content-type`과 `Accept`에 대해 살펴보자.

<br>

`Content-type`은 요청 몸체에 담아 전송할 데이터의 [MIME](https://developer.mozilla.org/ko/docs/Web/HTTP/MIME_types) 타입의 정보를 표현한다.

- text: text/plain, text/html, text/css, text/javascript
- application: application/json, application/x-www-form-urlencode
- multipart: multipart/form-data

<br>

HTTP 클라이언트가 서버에 요청할 때 서버가 응답할 데이터의 MIME 타입을 `Accept`로 지정할 수 있다.

<br>

```javascript
// 서버가 응답할 데이터의 MIME 타입 지정: json
xhr.setRequstHeader('accpet', 'application/json');
```

<br>

만약 `Accept` 헤더를 설정하지 않으면 `send` 메서드가 호출될 때 `Accept`헤더가 `*/*`으로 전송된다.

<br>

### 43.3.4 HTTP 응답 처리

서버가 전송한 응답을 처리하려면 `XMLHttpRequest` 객체가 발생시키는 이벤트를 캐치해야 한다.

<br>

```javascript
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.ppen('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될 때마다 발생한다.
xhr.onreadystatechange = () => {
  // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
  // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 않은 상태다.
  // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
  if (xhr.readyState !== XMLHttpRequst.DONE) return;

  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.reponse));
    // {userId: 1, id: 1, title: "...", copleted: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

<br>

`readystatechange` 이벤트 대신 `load` 이벤트를 캐치해도 좋다. `load` 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다. 따라서 `load` 이벤트를 캐치하는 경우 `xhr.readyState`가 `XMLHttpRequest.DONE`인지 확인할 필요가 없다.

```javascript
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.ppen('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다.
xhr.onreadystatechange = () => {
  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.reponse));
    // {userId: 1, id: 1, title: "...", copleted: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
