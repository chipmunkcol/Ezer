// AddUser, editUser, addFamily, editFamily 공통으로 사용되는 커스텀 훅을 만들어보자

import { useState } from "react";

export function useInputForm<T extends Record<string, any>>(initForm: T) {
  const [form, setForm] = useState<T>(initForm);

  const onChange = <K extends keyof T>(key: K, value: T[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(initForm);
  };

  return { form, onChange, resetForm };
}

// export default useInputForm;
