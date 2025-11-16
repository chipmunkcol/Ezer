import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { MemberForm } from "../../../pages/AddUser";
import { postMember, type Member } from "../../api/api";
import { emptyStringToNull } from "../../function/function";
import { SweatConfirm } from "../../libs/sweatAlert";
import useNavigater from "../useNavigater";

const useAddUser = (initController: () => void) => {
  const { goHome } = useNavigater();
  // const { formatedBirthDate, resetBirthDateForm } = useBirthDateForm();

  const onSubmitValidation = (form: MemberForm) => {
    if (
      !form?.name ||
      !form?.position ||
      !form?.gender ||
      !form?.barnabasEducation ||
      !form?.baptism ||
      !form?.discipleship
    ) {
      alert("필수 정보를 모두 입력해주세요.");
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (
    form: MemberForm,
    formatedBirthDate: string | null
  ) => {
    // e.preventDefault();

    const isValidated = onSubmitValidation(form);
    if (!isValidated) return;

    // console.log("🚀 ~ onSubmit ~ formatedBirthDate:", formatedBirthDate);
    const newForm = {
      ...form,
      birthDate: formatedBirthDate,
      registeredAt:
        (form.registeredAt && dayjs(form.registeredAt).format("YYYY-MM-DD")) ||
        null, // YYYY-MM-DD
    } as Member; // 타입 단언 말고 다른 방법이 있을까?

    postMemberMutation.mutate(emptyStringToNull(newForm));
    // postMemberMutation.mutate(newForm as Member);
  };

  const queryClient = useQueryClient();
  const postMemberMutation = useMutation({
    mutationFn: postMember,
    onSuccess: async (data) => {
      console.log("회원 등록 성공:", data);
      // 초기화
      initController();

      queryClient.invalidateQueries({ queryKey: ["members"] });

      const res = await SweatConfirm(
        "회원이 등록되었습니다.",
        "회원 관리 페이지로 돌아가시겠습니까?"
      );
      if (res) {
        goHome();
      }
    },
    onError: (error) => {
      console.log("회원 등록 실패:", error);

      alert(error.message || "회원 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return { onSubmit };
};

export default useAddUser;
