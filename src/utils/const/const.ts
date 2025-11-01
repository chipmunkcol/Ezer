export const OPTIONS = {
  position: [
    { value: "SAINT", label: "성도" },
    { value: "DEACON", label: "집사" },
    { value: "KWONSA", label: "권사" },
    { value: "GANSA", label: "간사*" },
    { value: "EDUCATOR", label: "교육사*" },
  ],
  baptism: [
    { value: "RECEIVED", label: "O" },
    { value: "NOT_RECEIVED", label: "X" },
    { value: "UNKNOWN", label: "알수없음" },
  ],
  barnabasEducation: [
    { value: "COMPLETED", label: "O" },
    { value: "NOT_COMPLETED", label: "X" },
  ],
  discipleship: [
    { value: "COMPLETED", label: "O" },
    { value: "NOT_COMPLETED", label: "X" },
  ],
  gender: [
    { value: "MALE", label: "남" },
    { value: "FEMALE", label: "여" },
  ],
};

export const PAGENATION_SIZE = 10;
