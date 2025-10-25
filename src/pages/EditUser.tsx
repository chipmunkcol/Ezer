import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById, updateMember, type Member } from "../utils/api/api";
import { initForm } from "./AddUser";
import { emptyStringToNull, translate_ko } from "../utils/function/function";
import { OPTIONS } from "../utils/const/const";

const EditUser = () => {
  const { id } = useParams();
  console.log("🚀 ~ UserDetail ~ id:", id);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id!),
    enabled: !!id,
  });

  const [form, setForm] = useState<Member>(initForm);
  console.log("🚀 ~ EditUser ~ form:", form);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onChangeSelect = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  const queryClient = useQueryClient();
  const { mutate: updateUserMutate } = useMutation({
    mutationFn: ({ id, form }: { id: string; form: Member }) =>
      updateMember(id, form),
    onSuccess: (data) => {
      console.log("🚀 ~ EditUser ~ data:", data);
      alert("회원 정보가 수정되었습니다");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      navigate("/");
    },
    onError: (error) => {
      console.log("회원 정보 수정 실패", error);
      alert(error.message || "회원 정보 수정에 실패했습니다.");
    },
  });

  const handleEditUser = (id: string | undefined, form: Member | null) => {
    if (!id) return;
    if (!form) return;
    if (
      !form.name ||
      !form.position ||
      !form.barnabasEducation ||
      !form.gender ||
      !form.baptism ||
      !form.discipleship
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    const res = confirm("수정하시겠습니까?");
    if (res) {
      const newForm = emptyStringToNull(form);
      updateUserMutate({ id, form: newForm });
    }
  };

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
      <a className="text-blue-400 cursor-pointer" onClick={() => navigate("/")}>
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
          <Button type="primary" onClick={() => handleEditUser(id, form)}>
            저장
          </Button>
        </div>
      </div>
      <Form
        initialValues={{
          ...data,
          name: data?.name || "",
          gender: data?.gender || "",
          position: translate_ko(data?.position || ""),
          baptism: data?.baptism || "",
          discipleship: data?.discipleship || "",
          banabaEducation: data?.barnabasEducation || "",
          birthDate: data?.birthDate || null,
          phone: data?.phone || null,
          registeredAt:
            (data?.registeredAt && dayjs(data?.registeredAt)) || null,
          cellId: data?.cellId || null,
          familyId: data?.familyId || null,
          barnabasName: data?.barnabasName || null,
          note: data?.note || null,
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
                  <Input name="name" onChange={onChangeInput} />
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
                    options={[
                      { value: "COMPLETED", label: "완료" },
                      { value: "NOT_COMPLETED", label: "미완료" },
                    ]}
                    onChange={onChangeSelect}
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
                  <Select options={OPTIONS.position} />
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
          </div>

          {/* 구분선 */}
          <div className="my-6 border-b border-gray-300" />

          <div className="flex flex-col gap-4">
            <div>추가정보</div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Form.Item label="생년월일" name="birthDate">
                  <Input placeholder="ex) 19921031" />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item label="전화번호" name="phone">
                  <Input placeholder="ex) 01012345678" />
                </Form.Item>
              </div>
            </div>
            <div className="flex-1">
              <Form.Item name={"registeredAt"} label="등록일">
                <DatePicker
                  onChange={(_, dateString) =>
                    setForm({
                      ...form,
                      registeredAt: (dateString as string) || null,
                    })
                  }
                  style={{ width: "100%" }}
                  // value={data?.registeredAt || null}
                />
              </Form.Item>
            </div>

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
