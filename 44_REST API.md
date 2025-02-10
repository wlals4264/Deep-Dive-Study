# 44 REST API

- REST : HTTP, 즉 웹에서 클라이언트와 서버 간에 데이터를 주고 받기 위한 과정을 정리한 규칙(프로토콜)의 장점을 최대한 활용할 수 있도록 HTTP를 기반으로 클라이언트가 리소스에 접근하는 방식을 규정한 아키텍처

- REST API : REST를 기반으로 서비스 API를 구현한 것

<br>

## 44.1 REST API의 구성

REST API는 자원, 행위, 표현의 3가지 요소로 구성된다. REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/89aee24e-0c3d-4fa1-abe6-019185f405d2/image.png)

<br>

## 44.2 REST API 설계 원칙

REST에서 가장 중요한 기본적인 원칙은 두 가지다.
**URI는 리소스를 표현**하는 데 집중하고 **행위에 대한 정의는 HTTP 요청 메서드**를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.

#### 1. URI는 리소스를 표현해야 한다.

URI는 리소스를 표현하는 데 중점을 두어야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다. 따라서 이름에 `get` 같은 행위에 대한 표현이 들어가서는 안된다.

#### 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

HTTP 요청 메서드는 클라리언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다. 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)를 사용하여 CRUD를 구현한다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/8fb08e56-6a25-42a0-b42f-41ec7e39bd41/image.png)

<br>

⚠️ 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다.

<br>

REST & RESTful API에 대해 정리한 포스팅이 있으니 자세한 내용은 그 글을 참고하자!
🔗 https://velog.io/@wlals4264/RESTful-API

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
