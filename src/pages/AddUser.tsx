import { Button, DatePicker, Form, Input, Select } from "antd";
import { type Member } from "../utils/api/api";
import { OPTIONS } from "../utils/const/const";
import useAddUser from "../utils/hooks/addUser/useAddUser";
import useBirthDateForm from "../utils/hooks/useBirthDateForm";
import { useInputForm } from "../utils/hooks/useInputForm";
import useNavigater from "../utils/hooks/useNavigater";

export type MemberForm = Partial<Member>;
// eslint-disable-next-line react-refresh/only-export-components
export const initForm: MemberForm = {
  name: undefined,
  position: undefined,
  barnabasEducation: undefined,
  baptism: undefined,
  discipleship: undefined,
  gender: undefined,
  phone: null,
  birthDate: null, // "1990-01-01"
  cellId: null,
  familyId: null,
  barnabasName: null,
  registeredAt: null,
  note: null,
};

const AddUser = () => {
  // const navigate = useNavigate();
  const { goBack } = useNavigater();
  //
  const { form, onChange, resetForm } = useInputForm(initForm);

  const [AntdForm] = Form.useForm();
  // const [form, setForm] = useState<MemberForm>(initForm);
  console.log("🚀 ~ AddUser ~ form:", form);

  const { formatedBirthDate, onChangeBirthDate, resetBirthDateForm } =
    useBirthDateForm();

  const initController = () => {
    AntdForm.resetFields();
    resetForm();
    resetBirthDateForm();
  };

  const { onSubmit } = useAddUser(initController);

  const { goHome } = useNavigater();

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={goHome}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">회원 등록 정보</h1>

      <Form
        onFinish={() => onSubmit(form, formatedBirthDate)}
        form={AntdForm}
        // initialValues={form}
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
                <Input
                  name="name"
                  onChange={(e) => onChange("name", e.target.value)}
                />
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
                    onChange={(value) => onChange("barnabasEducation", value)}
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
                  onChange={(value) => onChange("position", value)}
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
                    onChange={(value) => onChange("baptism", value)}
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
                  onChange={(value) => onChange("gender", value)}
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
                    onChange={(value) => onChange("discipleship", value)}
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
                onChange={(e) => onChange("phone", e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
        <div>등록일</div>
        <Form.Item name={"registeredAt"}>
          <DatePicker
            onChange={(_, dateString) =>
              // setForm({ ...form, registeredAt: (dateString as string) || null })
              onChange("registeredAt", (dateString as string) || null)
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
                  // onChange={(e) => setForm({ ...form, note: e.target.value })}
                  onChange={(e) => onChange("note", e.target.value)}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex gap-4"></div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div className="flex justify-end gap-4">
          <Button onClick={goBack}>취소</Button>
          <Button htmlType="submit" type="primary">
            등록하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddUser;
