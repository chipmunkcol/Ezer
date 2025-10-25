import Swal from "sweetalert2";

export const SweatAlert = async (title: string) => {
  await Swal.fire({
    title: title,
  });
};

export const SweatConfirm = async (
  title: string,
  text?: string,
  confirmText?: string,
  cancelText?: string
) => {
  const result = await Swal.fire({
    title: title,
    text: text || "",
    showCancelButton: true,
    confirmButtonText: confirmText || "확인",
    cancelButtonText: cancelText || "취소",
  });
  return result.isConfirmed;
};
