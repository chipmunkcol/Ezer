import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById } from "../utils/api/api";

const UserDetail = () => {
  const { id } = useParams();
  console.log("🚀 ~ UserDetail ~ id:", id);
  const navigate = useNavigate();
  // const data = userInfo.find((user) => user.id === Number(id));
  // console.log("🚀 ~ UserDetail ~ data:", data);
  // if (!id) {
  //   return <div>잘못된 접근입니다.</div>;
  // }

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id!),
    enabled: !!id,
  });
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
          <Button>수정</Button>
          <Button danger>삭제</Button>
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
            <div className="flex-1">직분: {data?.position}</div>
            <div className="flex-1">
              세례 여부 {data?.baptism === "RECEIVED" ? "O" : "X"}
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              성별: {data?.gender === "MALE" ? "남" : "여"}
            </div>
            <div className="flex-1">
              제자반 여부 {data?.discipleship === "COMPLETED" ? "O" : "X"}
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />

        <div>
          <div>추가정보</div>
          <div>소속셀</div>
          <div>생년월일</div>
          <div>전화번호</div>
          <div>등록일</div>
          <div>소속가족</div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div>비고</div>
      </div>
    </div>
  );
};

export default UserDetail;
