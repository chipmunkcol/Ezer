export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phoneNumber;
}

export function emptyStringToNull<T extends Record<string, any>>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key as keyof T] =
      value === "" ? null : value === undefined ? null : value;
    return acc;
  }, {} as T);
}

const translateObject = {
  SAINT: "성도",
  DEACON: "집사",
  KWONSA: "권사",
  GANSA: "간사",
  EDUCATOR: "교육사",
} as const;

type TranslateKey = keyof typeof translateObject;

export function translate_ko(key: string): string {
  if (key in translateObject) {
    return translateObject[key as TranslateKey] || key;
  }
  return key;
}
