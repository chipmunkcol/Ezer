import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMember, getMemberById } from "../utils/api/api";

const translate_ko = {
  SAINT: "성도",
  KWONSA: "권사",
  DEACONESS: "집사",
};

const UserDetail = () => {
  const { id } = useParams();
  console.log("🚀 ~ UserDetail ~ id:", id);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id!),
    enabled: !!id,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => {
      alert("회원이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      navigate("/");
    },
    onError: (error) => {
      console.log("회원 삭제 실패", error);
      alert(error.message || "회원 삭제에 실패했습니다.");
    },
  });

  const handleUserDelete = (id: string | undefined) => {
    if (!id) return;

    const res = confirm("정말로 회원을 삭제하시겠습니까?");
    if (res) {
      deleteUserMutate(id);
    }
  };

  const goEditUser = (id: string | undefined) => {
    if (!id) return;
    navigate(`/edit/user/${id}`);
  };

  console.log("🚀 ~ UserDetail ~ data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>회원 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!data) {
    return <div>회원 정보가 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={() => navigate(-1)}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">회원 상세 정보</h1>
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-full bg-gray-200 w-10 h-10 justify-center mb-2">
            <User size={24} />
          </div>
          <div>{data?.name}</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => goEditUser(id)}>수정</Button>
          <Button danger onClick={() => handleUserDelete(id)}>
            삭제
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div>필수정보</div>
          <div className="flex">
            <div className="flex-1">이름: {data?.name}</div>
            <div className="flex-1">
              바나바교육 {data?.barnabasEducation === "COMPLETED" ? "O" : "X"}{" "}
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              성별: {data?.gender === "MALE" ? "남" : "여"}
            </div>
            <div className="flex-1">
              세례 여부 {data?.baptism === "RECEIVED" ? "O" : "X"}
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              직분: {translate_ko[data?.position as keyof typeof translate_ko]}
            </div>
            <div className="flex-1">
              제자반 여부 {data?.discipleship === "COMPLETED" ? "O" : "X"}
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />

        <div className="flex flex-col gap-4">
          <div>추가정보</div>
          {/* <div>소속셀</div>
          <div>생년월일</div>
          <div>전화번호</div>
          <div>등록일</div>
          <div>소속가족</div> */}
          <div className="flex">
            <div className="flex-1">소속셀: {data?.cellId || "미정"}</div>
            <div className="flex-1">소속가족: {data?.familyId || "미정"}</div>
          </div>
          <div className="flex">
            <div className="flex-1">생년월일: {data?.birthDate}</div>
            <div className="flex-1">전화번호: {data?.phone}</div>
          </div>
          <div className="flex-1">등록일: {data?.registeredAt}</div>
          <div className="flex">{/* <div className="flex-1"></div> */}</div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div>비고</div>
        {data?.note || "없음"}
      </div>
    </div>
  );
};

export default UserDetail;
