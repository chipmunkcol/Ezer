const loggedError = (err: unknown) => {
  console.error("Logged Error:", err);
};

const withLogging =
  <T extends (...args: any[]) => void>(callback: T) =>
  (...args: Parameters<T>) => {
    try {
      callback(...args);
    } catch (err) {
      loggedError(err);
    }
  };

const test = (a: number, b: number): number => {
  return a + b;
};
const wrapped = withLogging(test);
