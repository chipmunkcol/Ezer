import { Button, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postMember } from "../utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

const initForm = {
  name: "",
  position: "",
  barnabasEducation: "",
  baptism: "",
  discipleship: "",
  gender: "",
  phone: "",
  birthDate: "", // "1990-01-01"
  cellId: null,
  familyId: null,
  barnabasName: "",
  registeredAt: "",
  note: "",
};

const AddUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initForm);
  console.log("🚀 ~ AddUser ~ form:", form);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onChangeSelect = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async () => {
    // e.preventDefault();

    if (
      !form.name ||
      !form.position ||
      !form.gender ||
      !form.birthDate ||
      !form.barnabasEducation ||
      !form.baptism ||
      !form.discipleship ||
      !form.phone ||
      !form.registeredAt
    ) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    const newForm = {
      ...form,
      birthDate: `${form.birthDate.slice(0, 4)}-${form.birthDate.slice(
        4,
        6
      )}-${form.birthDate.slice(6, 8)}`, // YYYY-MM-DD
      registeredAt: dayjs(form.registeredAt).format("YYYY-MM-DD"),
    };

    postMemberMutation.mutate(newForm);
  };

  const queryClient = useQueryClient();
  const postMemberMutation = useMutation({
    mutationFn: postMember,
    onSuccess: (data) => {
      console.log("회원 등록 성공:", data);
      alert("회원이 성공적으로 등록되었습니다.");
      setForm(initForm);
      queryClient.invalidateQueries({ queryKey: ["members"] });
      const res = confirm("목록으로 돌아가시겠습니까?");
      if (res) {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("회원 등록 실패:", error);

      alert(error.message || "회원 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={() => navigate(-1)}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">회원 상세 정보</h1>

      <Form onFinish={onSubmit}>
        <div className="flex flex-col gap-4 py-4">
          <div className="text-xl">필수 정보</div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                이름 <span className="text-red-600">*</span>
              </div>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "이름을 입력해주세요" }]}
              >
                <Input name="name" onChange={onChangeInput} />
              </Form.Item>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  바나바 교육 <span className="text-red-600">*</span>
                </div>
                <Form.Item
                  name={"barnabasEducation"}
                  rules={[{ required: true, message: "선택해주세요" }]}
                >
                  <Select
                    options={[
                      { value: "COMPLETED", label: "수료" },
                      { value: "NOT_COMPLETED", label: "미수료" },
                    ]}
                    onChange={(value) =>
                      onChangeSelect({ name: "barnabasEducation", value })
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                직분 <span className="text-red-600">*</span>
              </div>
              <Form.Item
                name={"position"}
                rules={[{ required: true, message: "선택해주세요" }]}
              >
                <Select
                  options={[
                    { value: "SAINT", label: "성도" },
                    { value: "DEACONESS", label: "집사" },
                    { value: "KWONSA", label: "권사" },
                  ]}
                  onChange={(value) =>
                    onChangeSelect({ name: "position", value })
                  }
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  세례 여부 <span className="text-red-600">*</span>
                </div>
                <Form.Item
                  name={"baptism"}
                  rules={[{ required: true, message: "선택해주세요" }]}
                >
                  <Select
                    options={[
                      { value: "RECEIVED", label: "세례 받음" },
                      { value: "NOT_RECEIVED", label: "받지 않음" },
                      { value: "UNKNOWN", label: "알수 없음" },
                    ]}
                    onChange={(value) =>
                      onChangeSelect({ name: "baptism", value })
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                성별 <span className="text-red-600">*</span>
              </div>
              <Form.Item
                name={"gender"}
                rules={[{ required: true, message: "선택해주세요" }]}
              >
                <Select
                  options={[
                    { value: "MALE", label: "남" },
                    { value: "FEMALE", label: "여" },
                  ]}
                  onChange={(value) =>
                    onChangeSelect({ name: "gender", value })
                  }
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  제자반 여부 <span className="text-red-600">*</span>
                </div>
                <Form.Item
                  name={"discipleship"}
                  rules={[{ required: true, message: "선택해주세요" }]}
                >
                  <Select
                    options={[
                      { value: "COMPLETED", label: "수료" },
                      { value: "NOT_COMPLETED", label: "미수료" },
                    ]}
                    onChange={(value) =>
                      onChangeSelect({ name: "discipleship", value })
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div>
                  생년월일 <span className="text-red-600">*</span>
                </div>
                <Form.Item
                  name={"birthDate"}
                  rules={[
                    { required: true, message: "생년월일을 입력해주세요" },
                  ]}
                >
                  <Input
                    name="birthDate"
                    onChange={onChangeInput}
                    placeholder="ex) 19921031"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div>
                연락처 <span className="text-red-600">*</span>
              </div>
              <Form.Item
                name={"phone"}
                rules={[{ required: true, message: "연락처를 입력해주세요" }]}
              >
                <Input
                  name="phone"
                  onChange={onChangeInput}
                  placeholder="ex) 01012345678"
                  // required
                />
              </Form.Item>
            </div>
          </div>
          <div>
            등록일 <span className="text-red-600">*</span>
          </div>
          <Form.Item
            name={"registeredAt"}
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

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />

        <div className="flex flex-col gap-4">
          <div className="text-xl">추가 정보</div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>소속 셀</div>
              <Select
                options={[
                  { value: "cellId_1", label: "셀1" },
                  { value: "cellId_2", label: "셀2" },
                ]}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>소속 가족</div>
                <Select
                  options={[
                    { value: "familyId_1", label: "가족A" },
                    { value: "familyId_2", label: "가족B" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>비고</div>
              <Input.TextArea
                rows={2}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4"></div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div className="flex justify-end gap-4">
          <Button onClick={() => navigate(-1)}>취소</Button>
          <Button htmlType="submit" type="primary">
            등록하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
