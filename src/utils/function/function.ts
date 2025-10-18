export function emptyStringToNull<T extends Record<string, any>>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] = value === "" ? null : value;
    return acc;
  }, {} as T);
}

const translateObject = {
  SAINT: "성도",
  DEACON: "집사",
  KWONSA: "권사",
} as const;

type TranslateKey = keyof typeof translateObject;

export function translate_ko(key: string): string {
  if (key in translateObject) {
    return translateObject[key as TranslateKey] || key;
  }
  return key;
}
