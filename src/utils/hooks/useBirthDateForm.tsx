import dayjs from "dayjs";
import { useEffect, useState } from "react";

const initBirthDateForm = {
  birthDateYear: "",
  birthDateMonth: "",
  birthDateDay: "",
};

const useBirthDateForm = (initBirthDate?: string | null) => {
  const [birthDateForm, setBirthDateForm] = useState({
    birthDateYear: "",
    birthDateMonth: "",
    birthDateDay: "",
  });

  useEffect(() => {
    if (initBirthDate) {
      const [year, month, day] = initBirthDate.split("-");
      setBirthDateForm({
        birthDateYear: year,
        birthDateMonth: month,
        birthDateDay: day,
      });
    }
  }, [initBirthDate]);

  const onChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("🚀 ~ onChangeBirthDate ~ name, value:", name, value);

    setBirthDateForm({ ...birthDateForm, [name]: value });
  };

  const formatedBirthDate =
    (birthDateForm.birthDateYear &&
      birthDateForm.birthDateMonth &&
      birthDateForm.birthDateDay &&
      dayjs(
        `${birthDateForm.birthDateYear}-${birthDateForm.birthDateMonth.padStart(
          2,
          "0"
        )}-${birthDateForm.birthDateDay.padStart(2, "0")}`
      ).format("YYYY-MM-DD")) ||
    null;

  const resetBirthDateForm = () => {
    setBirthDateForm(initBirthDateForm);
  };

  return {
    onChangeBirthDate,
    formatedBirthDate,
    resetBirthDateForm,
  };
};

export default useBirthDateForm;
