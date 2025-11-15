import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { deleteFamily, getFamilyById } from "../../utils/api/api";
import useNavigater from "../../utils/hooks/useNavigater";

const FamilyDetail = () => {
  const { id } = useParams();
  const { goFamily, goEditFamily } = useNavigater();
  // console.log("🚀 ~ FamilyDetail ~ id:", id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["family", id],
    queryFn: () => getFamilyById(id!),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: (id: string) => deleteFamily(id),
    onSuccess: () => {
      alert("가족이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["families"] });
      goFamily();
    },
    onError: (error) => {
      console.log("회원 삭제 실패", error);
      alert(error.message || "회원 삭제에 실패했습니다.");
    },
  });

  const handleFamilyDelete = (id: string | undefined) => {
    if (!id) return;

    const res = confirm("정말로 가족을 삭제하시겠습니까?");
    if (res) {
      deleteUserMutate(id);
    }
  };

  console.log("🚀 ~ FamilyDetail ~ data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>가족 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>가족 정보가 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={goFamily}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">가족 상세 정보</h1>
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-full bg-gray-200 w-10 h-10 justify-center mb-2">
            <Users size={24} />
          </div>
          <div>{data?.name}</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => goEditFamily(id!)}>수정</Button>
          <Button danger onClick={() => handleFamilyDelete(id)}>
            삭제
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex">
            {/* <div className="flex-2">가족 이름(별칭): {data?.name}</div> */}
            <div className="flex-1">남편: {data?.husband?.name}</div>
            <div className="flex-1">아내: {data?.wife?.name}</div>
          </div>
          <div className="flex">
            <div className="flex-1">주소: {data?.address}</div>
          </div>

          <div className="flex">
            <div className="flex-1">자녀: {data?.childrenInfo}</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div>비고</div>
        {data?.notes || "없음"}
      </div>
    </div>
  );
};

export default FamilyDetail;
