# 27 Set과 Map

# 37.1 Set

**`Set` 객체는 중복되지 않는 유일한 값들의 집합이다.** `Set` 객체는 배열과 유사하지만 다음과 같은 차이가 있다.

<br>

![](https://velog.velcdn.com/images/wlals4264/post/c46c522c-355c-445f-8bf1-10c0075bcd43/image.png)

<br>

## 37.1.1 Set 객체의 생성

`Set` 객체는 `Set` 생성자 함수로 생성한다. `Set` 생성자 함수에 인수를 전달하지 않으면 빈 `Set` 객체가 생성된다.

<br>

```javascript
const set = new Set();
coneole.log(set); // Set(0) {}
```

<br>

**`Set` 생성자 함수는 이터러블을 인수로 전달받아 `Set` 객체를 생성한다. 이때 이터러블의 중복된 값은 `Set` 객체에 요소로 저장되지 않는다.**

<br>

```javascript
const set1 = new Set([1, 2, 3, 4]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log((set1 = 2)); // Set(4) {"h", "e", "l", "o"}
```

<br>

중복을 허용하지 않는 `Set` 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다.

<br>

```javascript
// 배열의 중복 요소 제거
const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]

// Set을 사용한 배열의 중복 요소 제거
const uniq = array => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4]); // [2, 1, 3, 4]
```

<br>

## 37.1.2 요소 개수 확인

`Set` 객체의 요소 개수를 확인할 때는 `Set.prototype.size` 프로퍼티를 사용한다.

<br>

```javascript
const { size } = new Set([1, 2, 3, 3]);
coonsole.log(size); // 3
```

<br>

`size` 프로퍼티는 `setter` 함수 없이 `getter` 함수만 존재하는 접근자 프로퍼티다. 따라서 `size` 프로퍼티에 숫자를 할당하여 `Set` 객체의 요소 개수를 변경할 수 없다.

<br>

```javascript
const set = new Set([1, 2, 3]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
// {set: undefined, enumerable: false, configurable: true, get: ⨍}

set.size = 10; // 무시무시해
console.log(set.size); // 3
```

<br>

## 37.1.3 요소 추가

`Set` 객체에 요소를 추가할 때는 `Set.prototype.add` 메서드를 사용한다.

<br>

```javascript
const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}
```

<br>

`add` 메서드는 새로운 요소가 추가된 `Set` 객체를 반환한다. 따라서 `add` 메서드를 호출한 후에 `add` 메서드를 연속적으로 호출할 수 있다.

`Set` 객체에 중복된 요소의 추가는 허용되지 않는다. 이때 에러가 발생하지는 않고 무시된다.

<br>

```javascript
const set1 = new Set();

set1.add(1).add(2);
console.log(set1); // Set(2) {1, 2}

const set2 = new Set();
set2.add(1).add(2).add(2);
console.log(set2); // Set(2) {1, 2}
```

<br>

일치 비교 연산자 `===`을 사용하면 `NaN`과 `NaN`으르 다르다고 평가한다. 하지만 `Set` 객체는 `NaN`과 `NaN`을 같다고 평가하여 중복 추가를 허용하지 않는다. `+0`과 `-0`은 일치 비교 연산자 `===`와 마찬가지로 같다고 평가하여 중복 추가를 허용하지 않는다.

`Set` 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장할 수 있다.

<br>

### 37.1.4 요소 존재 여부 확인

`Set` 객체에 특저어 요소가 존재하는지 확인하려면 `Set.prototype.has` 메서드를 사용한다. `has` 메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환한다.

<br>

```javascript
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

<br>

### 37.1.5 요소 삭제

`Set` 객체의 특정 요소를 삭제하려면 `Set.prototype.delete` 메서드를 사용한다. `delete` 메서드는 삭제 성공 여부를 나타내는 불리언 값을 반환한다.

`delete` 메서드에는 인덱스가 아니라 삭제하려는 요소값을 인수로 전달해야 한다. `Set` 객체는 순서가 의미 없다. 다시 말해, 배열과 같이 인덱스를 갖지 않는다.

<br>

```javascript
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(1);
console.log(set); // Set(1) {3}
```

<br>

만약 존재하지 않는 요소를 삭제하려 하면 에러 없이 무시된다. `delete` 메서드는 삭제 성공 여부를 나타내는 불리언 값을 반환한다. 따라서 `Set.prototype.add` 메서드와 달리 연속적으로 호출할 수 없다.

<br>

### 37.1.6 요소 일괄 삭제

`Set` 객체의 모든 요소를 일괄 삭제하려면 `Set.prototype.clear` 메서드를 사용한다. `clear` 메서드는 언제나 `undefined`를 반환한다.

<br>

```javascript
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```

<br>

### 37.1.7 요소 순회

`Set` 객체의 요소를 순회하려면 `Set.prototype.forEach` 메서드를 사용한다. `Array.prototype.forEach` 함수와 유사하게 콜백 함수와 `forEach` 메서드의 콜백 함수 내부에서 `this`로 사용될 객체(옵션)를 인수로 전달한다. 콜백 함수는 3개의 인수를 전달받는다.

- 첫 번째 인수 : 현재 순회 중인 요소값
- 두 번째 인수 : 현재 순회 중인 요소값
- 세 번째 인수 : 현재 순회 중인 Set 객체 자체

<br>

```javascript
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

<br>

**`Set` 객체는 이터러블이다.** 따라서 `for...of` 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링의 대상이 될 수도 있다.

`Set` 객체는 요소의 순서에 의미를 갖지 않지만 `Set` 객체를 순회하는 순서는 요소가 추가된 순서를 따른다.

<br>

### 37.1.8 집합 연산

`Set` 객체는 수학적 집합을 구현하기 위한 자료구조다. 따라서 `Set` 객체를 통해 교집합, 합집합, 차집합 등을 구현할 수 있다.

<br>

#### 교집합

교집합 A∩B는 집합 A와 집합 B의 공통 요소로 구성된다.

<br>

```javascript
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // Set(2) {2, 4}
console.log(setB.intersection(setA)); // Set(2) {2, 4}
```

<br>

혹은 스프레드 문법과 배열의 `filter` 메서드를 사용해 더 간결한 방법으로도 가능하다.

<br>

```javascript
Set.prototype.intersection = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};
```

<br>

#### 합집합

합집합 A∪B는 집합 A와 집합 B의 중복 없는 모든 요소로 구성된다.

<br>

```javascript
Set.prototype.union = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
console.log(setB.union(setA)); // Set(4) {1, 2, 3, 4}
```

<br>

혹은 스프레드 문법을 사용하여 다음과 같이 더 간결하게 표현할 수도 있다.

<br>

```javascript
Set.prototype.union = function (set) {
  return new Set([...this], [...set]);
};
```

<br>

#### 차집합

차집합 A-B는 집합 A에 존재하지만 집합 B에는 존재하지 않는 요소로 구성된다.

<br>

```javascript
Set.prototype.difference = function (set) {
  // this(Set 객체)를 복사
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }

  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.difference(setB)); // Set(2) {1, 3}
console.log(setB.difference(setA)); // Set(0) {}
```

<br>

혹은 다음과 같이 스프레드 문법과 배열의 `filter` 메서드를 사용해 더 간결히 표현할 수 있다.

<br>

```javascript
Set.prototype.difference = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};
```

<br>

#### 부분 집합과 상위 집합

집합 A가 집합 B에 포함되는 경우(A⊆B) 집합 A는 집합 B의 부분집합(subset)이며, 집합 B는 집합 A의 상위 집합(superset)이다.

<br>

```javascript
// this가 subset의 상위 집합인지 확인한다.
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    if (!this.has(value));
    return false;
  }

  return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.isSuperset(setB)); // true
console.log(setB.isSuperset(setA)); // false
```

<br>

혹은 다음과 같이 스프레드 문법과 배열의 `every` 메서드를 사용하여 더 간결하게 표현할 수 있다.

<br>

```javascript
Set.prototype.isSuperset = function (subset) {
  const supersetArr = [...this];
  return [...subset].every((v) => supersetArr.includes(v));
};
```

<br>
<br>

```
> 출처 : 이웅모, 모던 자바스크립트 Deep Dive, 위키북스
```
