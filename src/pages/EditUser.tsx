import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMemberById,
  updateMember,
  type Member,
  type ResponseMember,
} from "../utils/api/api";
import { OPTIONS } from "../utils/const/const";
import { emptyStringToNull, translate_ko } from "../utils/function/function";
import useBirthDateForm from "../utils/hooks/useBirthDateForm";
import useNavigater from "../utils/hooks/useNavigater";
import { SweatAlert, SweatConfirm } from "../utils/libs/sweatAlert";

export type ResponseMemberForm = Partial<ResponseMember>;

const EditUser = () => {
  const { id } = useParams();
  console.log("🚀 ~ UserDetail ~ id:", id);
  // const navigate = useNavigate();
  const { goUserDetail, goBack } = useNavigater();

  const { data, isLoading, error } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id!),
    enabled: !!id,
  });
  // console.log("🚀 ~ EditUser ~ data:", data);

  const [form, setForm] = useState<ResponseMemberForm>({});
  const [AntdForm] = Form.useForm();

  const { formatedBirthDate, onChangeBirthDate } = useBirthDateForm(
    data?.birthDate
  );
  console.log("🚀 ~ EditUser ~ formatedBirthDate:", formatedBirthDate);

  // console.log("🚀 ~ EditUser ~ form:", form);

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
      SweatAlert("회원 정보가 수정되었습니다");
      queryClient.invalidateQueries({ queryKey: ["members", id] });
      goUserDetail(id!);
    },
    onError: (error) => {
      console.log("회원 정보 수정 실패", error);
      alert(error.message || "회원 정보 수정에 실패했습니다.");
    },
  });

  const handleEditUser = async (
    id: string | undefined,
    form: ResponseMemberForm
  ) => {
    if (!id) return;
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

    const res = await SweatConfirm("수정하시겠습니까?");
    if (res) {
      // delete form.id;
      // delete form?.updatedAt;
      const { id, createdAt, updatedAt, ...rest } = form;

      const newForm = {
        ...rest,
        birthDate: formatedBirthDate,
        registeredAt:
          (form.registeredAt &&
            dayjs(form.registeredAt).format("YYYY-MM-DD")) ||
          null,
      } as Member;

      // 위에서 if 문으로 id 걸러줬으니 단언 가능
      updateUserMutate({ id: id!, form: emptyStringToNull(newForm) });
    }
  };

  const { goHome } = useNavigater();

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
      <a className="text-blue-400 cursor-pointer" onClick={() => goHome()}>
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
          <Button onClick={goBack}>취소</Button>
          <Button type="primary" htmlType="submit" form="editUserForm">
            저장
          </Button>
        </div>
      </div>

      <Form
        id="editUserForm"
        onFinish={() => handleEditUser(id, form)}
        form={AntdForm}
        initialValues={{
          ...data,
          position: translate_ko(data?.position || ""),
          birthDateYear: data?.birthDate?.split("-")[0] || "",
          birthDateMonth: data?.birthDate?.split("-")[1] || "",
          birthDateDay: data?.birthDate?.split("-")[2] || "",
          registeredAt:
            (data?.registeredAt && dayjs(data?.registeredAt)) || null,
        }}
      >
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
                    options={OPTIONS.barnabasEducation}
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
                  options={OPTIONS.position}
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
                    options={OPTIONS.baptism}
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
                    options={OPTIONS.discipleship}
                    onChange={(value) =>
                      onChangeSelect({ name: "discipleship", value })
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div className="text-xl py-3">추가 정보</div>

        <div className="flex gap-4 items-center">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div>생년월일</div>
              <div className="flex gap-1">
                <Form.Item
                  name={"birthDateYear"}
                  rules={[
                    {
                      pattern: /^[0-9]{4}$/,
                      message: "숫자 4자리 연도를 입력해주세요. (예: 1999)",
                    },
                  ]}
                >
                  <Input
                    name="birthDateYear"
                    onChange={onChangeBirthDate}
                    placeholder="YYYY"
                    maxLength={4}
                    // value={birthDateForm.birthDateYear}
                  />
                </Form.Item>
                <Form.Item
                  name={"birthDateMonth"}
                  rules={[
                    {
                      pattern: /^(1[0-2]|[1-9])$/,
                      message: "1~12 사이의 월을 입력해주세요. (예: 3)",
                    },
                  ]}
                >
                  <Input
                    name="birthDateMonth"
                    onChange={onChangeBirthDate}
                    placeholder="MM"
                    maxLength={2}
                    // value={birthDateForm.birthDateMonth}
                  />
                </Form.Item>
                <Form.Item
                  name={"birthDateDay"}
                  rules={[
                    {
                      pattern: /^(3[01]|[12][0-9]|[1-9])$/,
                      message: "1~31 사이의 일을 입력해주세요. (예: 1)",
                    },
                  ]}
                >
                  <Input
                    name="birthDateDay"
                    onChange={onChangeBirthDate}
                    maxLength={2}
                    placeholder="DD"
                    // value={birthDateForm.birthDateDay}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-r border-[#d9d9d9] h-[33px]" />

          <div className="flex-1 flex flex-col gap-2">
            <div>연락처</div>
            <Form.Item
              name="phone"
              rules={[
                {
                  pattern:
                    /^(0(1[0-9]|2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|7[0-7]|8[1-2]|9[0-8]))\d{3,8}$/,
                  message:
                    "유효한 전화번호를 입력해주세요. (예: 01012345678, 021234567)",
                },
              ]}
            >
              <Input
                name="phone"
                placeholder="ex) 01012345678"
                maxLength={11}
                onChange={onChangeInput}
              />
            </Form.Item>
          </div>
        </div>
        <div>등록일</div>
        <Form.Item name={"registeredAt"}>
          <DatePicker
            onChange={(_, dateString) =>
              setForm({ ...form, registeredAt: (dateString as string) || null })
            }
            style={{ width: "100%" }}
          />
        </Form.Item>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>소속 셀</div>
              <Form.Item name={"cellId"}>
                <Select
                  options={[
                    { value: "cellId_1", label: "셀1" },
                    { value: "cellId_2", label: "셀2" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>소속 가족</div>
                <Form.Item name={"familyId"}>
                  <Select
                    options={[
                      { value: "familyId_1", label: "가족A" },
                      { value: "familyId_2", label: "가족B" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>비고</div>
              <Form.Item name={"note"}>
                <Input.TextArea
                  rows={2}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditUser;
