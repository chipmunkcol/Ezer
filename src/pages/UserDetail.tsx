import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../data/dummy";
import { Button } from "antd";
import { User } from "lucide-react";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = userInfo.find((user) => user.id === Number(id));
  console.log("🚀 ~ UserDetail ~ data:", data);

  return (
    <div className="py-4 px-10 ">
      <a className="text-blue-400 cursor-pointer" onClick={() => navigate(-1)}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">회원 상세 정보</h1>
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-full bg-gray-200 w-10 h-10 justify-center mb-2">
            <User size={24} />
          </div>
          <div>{data?.이름}</div>
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
            <div className="flex-1">이름: {data?.이름}</div>
            <div className="flex-1">
              바나바교육 {data?.바나바교육 ? "O" : "X"}{" "}
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">직분: {data?.직분}</div>
            <div className="flex-1">세례 여부 {data?.세례여부 ? "O" : "X"}</div>
          </div>
          <div className="flex">
            <div className="flex-1">성별: {data?.성별}</div>
            <div className="flex-1">제자반 여부 {data?.제자반 ? "O" : "X"}</div>
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
