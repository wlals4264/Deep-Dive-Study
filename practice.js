function solution(s = 1110000101) {
  // 문자열을 돌면서 1이 나오면 해당 인덱스를 저장하는 배열을 만든다.
  // 1110000101
  // 012    7 9
  // 만약 배열의 length가 6보다 작거나 같고
  // 1. 배열의 0번째 값과 2번째 값의 차가 2보다 작거나 같으면 일단 한 손 연주 가능
  // 2. 배열의 3번째 값과 배열의 마지막 값의 차가 2보다 작거나 같으면 두 손 연주 가능
  // 1번과 2번 모두 만족해야 양손 연주가능한 곡이다 "YES"출력
  // 아니면 "NO" 출력
  const pushKeysArr = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 1) {
      pushKeysArr.push(i);
    }
  }

  console.log(pushKeysArr);
}

solution();
