# 46 제너레이터와 async/await

## 46.1 제너레이터란?

### 제너레이터와 일반 함수의 차이

1. 일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다. 제너레이터 함수는 **함수 호출자에게 함수 실행의 제어권을 양도(`yield`)할 수 있다.**

2. 일반 함수를 호출하면 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다. 제너레이터 함수는 **함수 호출자와 함수의 상태를 양방향으로 주고받을 수 있다.**

3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다. 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다. 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 **이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.**

<br>

## 46.2 제너레이터 함수의 정의

제너레이터 함수는 `function*` 키워드로 선언한다. 그리고 하나 이상의 `yield` 표현식을 포함한다. 이것을 제외하면 일반 함수를 정의하는 방법과 같다. 애스터리스크(`*`)의 위치는 `function` 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 위해 `function` 키워드 바로 뒤에 붙이는 것을 권장한다.

<br>

```javascript
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  *genObjMethod() {
    yield 1;
  },
};

// 제너레이터 클래스 메서드
class MyClass {
  *genClsMethod() {
    yield 1;
  }
}
```

<br>

제너레이터 함수는 화살표 함수로 정의할 수 없다.

```javascript
const genArrowFunc = * () => {
  yield 1;
}; // SyntaxError: Unexpected token '*'
```

<br>

제너레이터 함수는 `new` 연산자와 함께 생성자 함수로 호출할 수 없다.

```javascript
function* genFunc() {
  yield 1;
}

new genFunc(); // TypeError: genFunc is not a constructor
```

<br>

## 46.3 제너레이터 객체

**제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.** (🔗 [34.1절 "이터레이션 프로토콜"](https://velog.io/@wlals4264/34-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94#341-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%EC%85%98-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C))

<br>

```javascript
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();
// 제너레이터 객체는 이터러블이면서 이터레이터다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true
```

<br>

+) 제너레이터 객체는 `next` 메서드를 갖는 이터레이터인 동시에 이터레이터에는 없는 `return`, `throw` 메서드를 갖는다.

- `next` 메서드 : 제너레이터 함수의 `yield` 표현식까지 코드 블록을 실행하고 `yield`된 값을 `value` 프로퍼티 값으로, `false`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절드 객체를 반환한다.

- `return` 메서드 : 인수로 전달받은 값을 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

- `throw` 메서드 : 인수로 전달받은 에러를 발생시키고 `undefined`를 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

<br>

```javascript
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.return('End!')); // { value: "End!", done: true }
console.log(generator.throw('Error!')); // { value: undefined, done: true }
```

<br>

## 46.4 제너레이터의 일시 중지와 재개

제너레이터는 `yield` 키워드와 `next` 메서드를 통해 실행을 일시 중지했다가 필요할 때 다시 재개할 수 있다. `next` 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다. 단, 일반 함수처럼 한 번에 코드 블록의 모든 코드를 일괄 실행하는 것이 아니라 **`yield` 표현식까지만** 실행한다. `yield` 키워드는 제너레이터 함수의 실행을 **일시 중지**시키거나 **`yield` 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환**한다.

<br>

```javascript
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
coonst generator = genFunc();

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 표현식에서 yield된 값 1이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 1, done: false}

// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 두 번째 yield 표현식에서 yield된 값 2가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 2, done: false}

// 다시 next 메서드를 호출하면 세 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 표현식에서 yield된 값 3이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 3, done: false}

// 다시 next 메서드를 호출하면 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 제너레이터 함수의 반환값 undefined가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
console.log(generator.next()); // {value: undefined, done: true}
```

<br>

제너레이터 객체의 `next` 메서드를 호출하면 `yield` 표현식까지 실행되고 일시 중지된다. 이때 함수의 제어권이 호출자(위 예제의`generator`)로 양도된다.
제너레이터 객체의 `next` 메서드는 `value`, `done` 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. `next` 메서드가 반환한 이터레이터 리절트 객체의 `value` 프로퍼티에는 `yield` 표현식에서 `yield`된 값이 할당되고 `done` 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언값이 할당된다.

이터레이터의 `next` 메서드와 달리 제너레이터 객체의 `next` 메서드에는 인수를 전달할 수 있다. 제너레이터 객체의 `next` 메서드에 전달한 인수는 제너레이터 함수의 `yield` 표현식을 할당받는 변수에 할당된다. (!!😮!! `yield` 표현식을 할당받는 변수에 `yield` 표현식의 평가 결과가 할당되는 것이 아니라는 것에 주의하자.)

제너레이터 함수는 `next` 메서드와 `yield` 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. `next` 메서드를 통해 `yield` 표현식까지 함수를 실행시켜 제너레이터 객체가 관리하는 상태(`yield`된 값)를 꺼내올 수 있고, `next` 메서드에 인수를 전달해서 제너레이터 객체에 상태(`yield` 표현식을 할당받는 변수)를 밀어넣을 수 있다. 그리고 이를 통해 비동기 처리를 동기 처리처럼 구현할 수 있다.

<br>

## 46.5 제너레이터의 활용

### 46.5.1 이터러블의 구현

제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있다.

### 46.5.2 비동기 처리

제너레이터 함수는 `next` 메서드와 `yield` 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. 이러한 특성을 활용하면 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다. 즉, `then/catch/finally`와 같은 후속 처리 메서드없이 비동기 처리 결과를 반환하도록 구현할 수 있다.

```javascript
const async = (generatorFunc) => {
  const generator = generatorFunc(); // ② generator 객체 생성

  const onResolved = (arg) => {
    const result = generator.next(arg); // ⑤ 제너레이터 실행

    return result.done ? result.value : result.value.then((res) => onResolved(res)); // ⑦ 프로미스가 resolve한 response 객체를 onResolved에 인수로 전달하며 재귀호출
  };

  return onResolved; // ③ onResolved 함수 반환(`generator`를 기억하는 클로저)
};

async(function* fetchTodo() {
  // ① 즉시 실행 함수로 async 함수 호출
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url); // ⑥ next 메서드에 전달된 인수가 할당됨
  const todo = yield response.json(); // ⑧
  console.log(todo);
})(); // ④ onResolved 함수 즉시 실행
```

🥸 클로저, 즉시 실행 함수, 재귀 호출, 제너레이터 메서드들의 특성을 이해하고 책없이 흐름을 쭉 설명해보자

<br>

## 46.6 async/await

위의 예제처럼 제너레이터로 비동기 처리를 동기 처리처럼 동작하도록 구현하는 것은 너무도 복잡하고 장황하다. ES8(ECMAScript 2017)에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 **`async/await`**가 도입되었다.

`async/await`를 사용하면 마찬가지로 프로피스의 후속 처리 메서드없이 마치 동기 처리처럼 프로미스 결과를 반환하도록 구현할 수 있다.

<br>

```javascript
async function fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const reponse = await fetch(url);
  const todo = await reponse.json();
  console.log(todo);
}

fetchTodo();
```

<br>

### 46.6.1 async 함수

`await` 키워드는 반드시 `async` 함수 내부에서 사용해야 한다. `async` 함수는 `async` 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. `async` 함수가 명시적으로 프로미스를 반환하지 않더라도 `async` 함수는 암묵적으로 반환값을 `resolve`하는 프로미스를 반환한다.

클래스의 `constructor` 메서드는 인스턴스를 반환해야 하기 때문에 프로미스를 반환하는 `async` 메서드가 될 수 없다.

<br>

### 46.6.2 await 키워드

`await` 키워드는 프로미스가 `settled` 상태가 될 때까지 대기하다가 `settled` 상태가 되면 프로미스가 `resolve`한 처리 결과를 반환한다. **`await` 키워드는 반드시 프로미스 앞에서 사용해야 한다.**

<br>

```javascript
const getGithubUserName = async (id) => {
  const res = await fetch(`http://api.github.com/users/${id}`); // ① 프로미스가 settled 상태가 될 때까지 대기, settled 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당됨.
  const { name } = await res.json();
  console.log(name);
};

getGithubUserName('bluemin');
```

<br>

### 46.6.3 에러 처리

비동기 처리를 위한 콜백 패턴의 단점으로는 에러는 호출자 방향으로 전파되기 떄문에 `try...catch` 문을 통한 에러처리가 원활하지 못하다는 점이 있었다.

`async/await`에서 에러 처리는 `try...catch` 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문이다.

만약 `async` 함수 내에서 `catch` 문을 사용해서 에러 처리를 하지 않으면 `async` 함수는 발생한 에러를 `reject`하는 프로미스를 반환한다. 따라서 `async` 함수를 호출하고 `Promise.prototype.catch`(후속 처리 메서드)를 사용해 에러를 캐치할 수도 있다. (굳이..?)

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
