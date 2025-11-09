// const loggedError = (err: unknown) => {
//   console.error("Logged Error:", err);
// };

// const withLogging =
//   <T extends (...args: any[]) => void>(callback: T) =>
//   (...args: Parameters<T>) => {
//     try {
//       callback(...args);
//     } catch (err) {
//       loggedError(err);
//     }
//   };

// const test = (a: number, b: number): number => {
//   return a + b;
// };
// const wrapped = withLogging(test);

// function emailsForCustomer() {
//   const emails = ["a", "b", "c"].map((v) => {
//     // 비즈니스 로직
//     return `some-${v}`;
//   });
//   return console.log(emails);
// }

// emailsForCustomer();

function wrapMapped(array: number[], callback: (arg: any) => void) {
  return array.map((v) => {
    return callback(v);
  });
}

function temp(a: number) {
  return a * 2;
}

// console.log(wrapMapped([1, 2, 3], temp));

const customers = [
  { name: "Alice", email: "alice@naver.com", purchase: 3 },
  { name: "Bob", email: "bob@google.com", purchase: 5 },
  { name: "Charlie", email: "char@naver.com", purchase: 2 },
  // { name: "David", email: null },
];

const tempArray = customers.map((v) => v.email);
const filteredNull = tempArray.filter((v) => v !== null);
// console.log(filteredNull);

function sigma() {
  return customers.reduce((acc, cur) => acc * (cur.purchase || 1), 1);
}

// console.log(sigma());

function maxNum() {
  return customers.reduce(
    (max, num) => (max < num.purchase ? num.purchase : max),
    Number.MIN_VALUE
  );
}

// console.log(maxNum());

function minNum() {
  return customers.reduce(
    (min, num) => (min > num.purchase ? num.purchase : min),
    Number.MAX_VALUE
  );
}

console.log(minNum());
