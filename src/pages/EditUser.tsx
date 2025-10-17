import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteMember,
  getMemberById,
  type ResponseMember,
} from "../utils/api/api";
import { useEffect, useState } from "react";

const translate_ko = {
  SAINT: "성도",
  KWONSA: "권사",
  DEACONESS: "집사",
};

const EditUser = () => {
  const { id } = useParams();
  console.log("🚀 ~ UserDetail ~ id:", id);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id!),
    enabled: !!id,
  });

  const [form, setForm] = useState<ResponseMember | null>(null);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

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

  const handleEditUser = (id: string | undefined) => {
    if (!id) return;

    const res = confirm("정말로 회원을 삭제하시겠습니까?");
    if (res) {
      deleteUserMutate(id);
    }
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
      <h1 className="text-2xl font-bold pt-4">회원 정보 수정</h1>
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-full bg-gray-200 w-10 h-10 justify-center mb-2">
            <User size={24} />
          </div>
          <div>{data?.name}</div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate(-1)}>취소</Button>
          <Button type="primary" onClick={() => handleEditUser(id)}>
            저장
          </Button>
        </div>
      </div>
      <Form
        initialValues={{
          ...form,
        }}
      >
        <div>
          <div className="flex flex-col gap-4">
            <div>필수정보</div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Form.Item
                  label="이름"
                  name="name"
                  rules={[{ required: true, message: "이름을 입력해주세요." }]}
                >
                  <Input value={form?.name || data?.name} />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label="바나바교육"
                  name="banabaEducation"
                  rules={[
                    {
                      required: true,
                      message: "바나바교육 여부를 입력해주세요.",
                    },
                  ]}
                >
                  <Select
                    defaultValue={
                      data?.barnabasEducation === "COMPLETED"
                        ? "완료"
                        : "미완료"
                    }
                    value={data?.barnabasEducation}
                    options={[
                      { value: "COMPLETED", label: "완료" },
                      { value: "NOT_COMPLETED", label: "미완료" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Form.Item
                  label="성별"
                  name="gender"
                  rules={[{ required: true, message: "성별을 입력해주세요." }]}
                >
                  <Select
                    defaultValue={data?.gender === "MALE" ? "남" : "여"}
                    value={data?.gender}
                    options={[
                      { value: "MALE", label: "남" },
                      { value: "FEMALE", label: "여" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label="세례 여부"
                  name="baptism"
                  rules={[
                    { required: true, message: "세례 여부를 입력해주세요." },
                  ]}
                >
                  <Select
                    defaultValue={data?.baptism === "RECEIVED" ? "O" : "X"}
                    value={data?.baptism}
                    options={[
                      { value: "RECEIVED", label: "O" },
                      { value: "NOT_RECEIVED", label: "X" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Form.Item
                  label="직분"
                  name="position"
                  rules={[{ required: true, message: "직분을 입력해주세요." }]}
                >
                  <Select
                    defaultValue={data?.position}
                    value={data?.position}
                    options={[
                      { value: "SAINT", label: "성도" },
                      { value: "KWONSA", label: "권사" },
                      { value: "DEACONESS", label: "집사" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label="제자반 여부"
                  name="discipleship"
                  rules={[
                    { required: true, message: "제자반 여부를 입력해주세요." },
                  ]}
                >
                  <Select
                    defaultValue={
                      data?.discipleship === "COMPLETED" ? "완료" : "미완료"
                    }
                    value={data?.discipleship}
                    options={[
                      { value: "COMPLETED", label: "완료" },
                      { value: "NOT_COMPLETED", label: "미완료" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Form.Item
                  label="생년월일"
                  name="birthDate"
                  rules={[
                    { required: true, message: "생년월일을 입력해주세요." },
                  ]}
                >
                  <Input value={data?.birthDate} placeholder="ex) 19921031" />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label="전화번호"
                  name="phone"
                  rules={[
                    { required: true, message: "전화번호를 입력해주세요." },
                  ]}
                >
                  <Input value={data?.phone} placeholder="ex) 01012345678" />
                </Form.Item>
              </div>
            </div>
            <div className="flex-1">
              <Form.Item
                name={"registeredAt"}
                label="등록일"
                rules={[{ required: true, message: "등록일을 선택해주세요" }]}
              >
                <DatePicker
                  onChange={(_, dateString) =>
                    setForm({ ...form, registeredAt: dateString as string })
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>

          {/* 구분선 */}
          <div className="my-6 border-b border-gray-300" />

          <div className="flex flex-col gap-4">
            <div>추가정보</div>
            <div className="flex">
              <div className="flex-1">소속셀: {data?.cellId || "미정"}</div>
              <div className="flex-1">소속가족: {data?.familyId || "미정"}</div>
            </div>
            <div className="flex">{/* <div className="flex-1"></div> */}</div>
          </div>

          {/* 구분선 */}
          <div className="my-6 border-b border-gray-300" />
          <div>비고</div>
          {data?.note || "없음"}
        </div>
      </Form>
    </div>
  );
};

export default EditUser;
