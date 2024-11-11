# 20 this

## 22.1 this 키워드

객체는 프로퍼티와 메서드를 갖는다. 이때 동작을 나타내는 메서드는 객체의 상태를 나타내는 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자식이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

예를 들어, 객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 메서드 자신이 속한 객체를 가리키는 객체를 재귀적으로 참조할 수 있다.

#### 💻 예제 코드

```javascript
const circle = {
  radius: 5, // 프로퍼티
  getDiameter() {
    // 메서드가 자신이 속한 객체인 circle을 참조
    return 2 * circle.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

<br>

위 예제에서 객체 리터럴은 `circle` 변수에 할당되기 직전에 평가된다. 따라서 `getDiameter` 메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고 `circle` 식별자에 생성된 객체가 할당된 이후다. 따라서 메서드 내부에서 `circle` 식별자를 참조할 수 있다.

하지만 이런 재귀적인 방식은 일반적이지 않고 바람직하지 않다. 가령 다음 예제를 통해 생성자 함수 방식으로 인스턴스를 생성하는 경우를 살펴보자.

<br>

#### 💻 예제 코드

```javascript
function Circle(radius) {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * ????.radius;
  }
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5);
```

<br>

생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의한 이후 `new` 연산자와 함께 생성자 함수를 호출해야 한다. 즉, 생성자 함수가 존재해야 인스턴스를 생성할 수 있다.

위의 예제에서 생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다. 따라서 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요한데, 이를 위해 자바스크립트는 `this` 라는 특수한 식별자를 제공한다.

<br>

💡 **point**

**`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing vaiable)다. `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다. **

`this`는 자바스크립트에 의해 암묵적으로 생성되며, 함수를 호출할 때 `arguments` 객체와 `this` 가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 `arguments` 객체를 지역 변수처럼 사용하듯이, `this`도 마찬가지로 지역 변수처럼 사용할 수 있다. 이때 **`this`가 가리키는 값, 즉 `this`바인딩은 함수 호출 방식에 의해 동적으로 결정된다.**

<br>

위에서 살펴본 객체 리터럴과 생성자 함수의 예제를 `this` 키워드를 사용해 수정해 보자.

#### 💻 수정된 예제 코드(객체 리터럴)

```javascript
const circle = {
  radius: 5, // 프로퍼티
  getDiameter() {
    // this는 메서드를 호출한 객체를 가리킨다(=circle)
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

<br>

#### 💻 수정된 예제 코드(생성자 함수)

```javascript
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
  }
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

<br>
<br>

## 22.2 함수 호출 방식과 this 바인딩

**✨ `this` 바인딩(`this`에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.**

> **<함수를 호출하는 방식>**

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

**✅ 렉시컬 스코프와 `this` 바인딩은 결정시기가 다르다.**
함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 `this` 바인딩은 함수 호출 시점에 결정된다.

<br>

### 22.2.1 일반 함수 호출

**기본적으로 `this`에는 전역 객체가 바인딩된다.**

<br>

#### 💻 예제 코드

```javascript
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

<br>

이처럼 전역 함수는 물론이고 중첩 함수를 **일반 함수로 호출하면 함수 내부의 `this`에는 전역 객체가 바인딩**된다. `this`는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다. 따라서 객체를 생성하지 않는 일반 함수에서 `this`는 의미가 없다. 그렇기 때문에 `strict mode`가 적용된 일반 함수 내부의 `this`에는 `undefined`가 바인딩된다.

<br>

#### 💻 예제 코드(strict mode)

```javascript
function foo() {
  'use strict';

  console.log("foo's this: ", this); // undefined
  function bar() {
    console.log("bar's this: ", this); // undefined
  }
  bar();
}
foo();
```

<br>

메서드 내에서 정의한 중첩 함수 그리고 콜백 함수 또한 일반 함수로 호출된다면 `this`에 전역 객체가 바인딩된다. 즉 어떠한 함수라도 **일반 함수로 호출되면 내부의 `this`에는 전역 객체가 바인딩 된다.**

하지만 메서드 내에서 정의한 중첩 함수나 콜백 함수는 외부 함수의 헬퍼 함수의 역할을 하기 때문에 바인딩 된 `this`가 외부 함수와 일치하지 않는다면 헬퍼 함수로 동작하기 어려울 것이다.

따라서 다음과 같은 방법으로 메서드 메서드 내에서 정의한 중첩 함수나 콜백 함수의 `this` 바인딩을 메서드의 `this` 바인딩과 일치시킬 수 있다.

<br>

#### 💻 예제 코드

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)으르 변수 that에 바인딩한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  },
};
obj.foo();
```

<br>

보다시피 이 방법은 조금 구리다...🤔

위 방법 외에도 자바스크립트는 `this`를 명시적으로 바인딩할 수 있는 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드를 제공한다.(much better way...😇) 혹은 화살표 함수를 사용해서 `this` 바인딩을 일치시킬 수도 있다.

<br>

#### 💻 예제 코드(`Function.prototype.bind` 사용)

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(
      function () {
        console.log(this.value); // 100
      }.bind(this),
      100
    );
  },
};

obj.foo();
```

<br>

#### 💻 예제 코드(화살표 함수 사용)

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 카리킨다.
    setTimeout(() => console.log(this.value), 100); // 100
  },
};

obj.foo();
```

<br>
<br>

### 22.2.2 메서드 호출

메서드 내부의 `this`에는 **메서드를 호출한 객체**, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체가 바인딩된다.

<br>

#### 💻 예제 코드

```javascript
const person = {
  name: 'bluemin',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // bluemin
```

<br>

위 예제의 `getName` 메서드는 `person` 객체의 메서드로 정의되었다. 메서드는 프로퍼티에 바인딩된 함수다. 즉, `person` 객체의 `getName` 프로퍼티가 가리키는 함수 객체는 `person` 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. 따라서 `getName` 프로퍼티가 가리키는 함수 객체, 즉 `getName` 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/ee59ad7a-1a62-4799-b438-a1eed3a58139/image.png)

<br>

#### 💻 예제 코드

```javascript
const person = {
  name: 'bluemin',
  getName() {
    return this.name;
  },
};

const anotherPerson = {
  name: 'Jimin',
};

// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Jimin

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

<br>

![](https://velog.velcdn.com/images/wlals4264/post/af731665-c8bc-4d97-8b9e-2b94799dd514/image.png)

<br>

프로토타입 메서드 내부에서 사용된 `this`도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

<br>

#### 💻 예제 코드

```javascript
const Person(name) = {
  this.name = name;
};

Person.prototype.getName = function() {
  return this.name;
};

const me = new Person('blumin');

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // ① bluemin

Person.prototype.name = 'Jimin';

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Jimin
```

<br>

위 예제의 ①의 경우 `getName` 메서드를 호출한 객체는 `me`다. 따라서 `getName` 메서드 내부의 `this`는 `me`를 가리키며 `this.name`은 `bluemin`이다.

②의 경우 `getName` 메서드를 호출한 객체는 `Person.prototype`이다. `Person.prototype` 도 객체이므로 직접 메서드를 호출할 수 있다. 따라서 `getName` 메서드 내부의 `this`는 `Person.prototype`을 가리키며 `this.name`은 `Jiin`이다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/a38ce3e8-b743-4476-97ad-732c64fc4026/image.png)

<br>
<br>

### 22.2.3 생성자 함수 호출

생성자 함수 내부의 `this`에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

<br>

#### 💻 예제 코드

```javascript
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

<br>
<br>

### 22.3.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

`apply`, `call`, `bind` 메서드는 `Function.prototype`의 메서드다. 즉, 이들 메서드는 모든 함수가 상속받아 사용할 수 있다.

`Function.prototype.apply`, `Function.prototype.call` 메서드는 `this`로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

<br>

#### 💻 예제 코드

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

<br>
 
 
`apply`와 `call` 메서드의 본질적인 기능은 함수를 호출하는 것이다. `apply`와 `call`는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 `this`에 바인딩한다.

두 함수는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다. 인수를 전달하는 예시도 살펴보자.

<br>

#### 💻 예제 코드

```javascript
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// {Arguments(3) [1, 2, 3, callee: 𝑓, Symbol(Symbol.iterator): 𝑓]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// {Arguments(3) [1, 2, 3, callee: 𝑓, Symbol(Symbol.iterator): 𝑓]
// {a: 1}
```

<br>

`Function.prototype.bind` 메서드는 `apply`와 `call` 메서드와 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 `this` 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

<br>

#### 💻 예제 코드

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

<br>

앞서 언급했듯이 `bind` 메서드는 메서드의 `this`와 내부의 중첩 함수 또는 콜백 함수의 `this`가 불일치하는 문제를 해결하기 위해 사용된다.

<br>

#### 💻 예제 코드(wrong example😈)

```javascript
const person = {
  name: 'bluemin',
  foo(callback) {
    // ①
    setTimeout(callback, 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is .
  // 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다. 즉, ''이다.
});
```

<br>

위 예제에서 콜백 함수가 호출되기 이전인 ①의 시점에서 `this`는 `foo` 메서드를 호출한 객체, 즉 `person` 객체를 가리킨다. 그러나 `person.foo`의 콜백 함수가 일반 함수로서 호출된 ②의 시점에서 `this`는 전역 객체 `window`를 가리킨다. 이처럼 `this`가 다르면 원하는대로 기능을 할 수가 없다. `person.foo`의 콜백 함수가 외부 함수 `person.foo`의 헬퍼 함수의 기능을 할 수 있도록 `bind` 메서드를 사용해 `this` 를 일치시킬 수 있다.

<br>

#### 💻 예제 코드(bind 사용 수정 예시)

```javascript
const person = {
  name: 'bluemin',
  foo(callback) {
    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // ② Hi! my name is bluemin.
});
```

<br>

📚 **정리**
![](https://velog.velcdn.com/images/wlals4264/post/edf2b5ec-7b6f-4f4c-8518-21109549c7f2/image.png)

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
