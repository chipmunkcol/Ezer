import { DatePicker, Input, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
  });
  console.log("🚀 ~ AddUser ~ form:", form);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onChangeSelect = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={() => navigate(-1)}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">회원 상세 정보</h1>
      <div>
        <div className="flex flex-col gap-4 py-4">
          <div className="text-xl">필수 정보</div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                이름 <span className="text-red-600">*</span>
              </div>
              <Input name="name" onChange={onChangeInput} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  바나바 교육 <span className="text-red-600">*</span>
                </div>
                <Select
                  options={[
                    { value: "COMPLETED", label: "수료" },
                    { value: "NOT_COMPLETED", label: "미수료" },
                  ]}
                  onChange={(value) =>
                    onChangeSelect({ name: "barnabasEducation", value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                직분 <span className="text-red-600">*</span>
              </div>
              <Select
                options={[
                  { value: "SAINT", label: "성도" },
                  { value: "KWONSA", label: "권사" },
                  // { value: "DEACONESS", label: "집사" },
                ]}
                onChange={(value) =>
                  onChangeSelect({ name: "position", value })
                }
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  세례 여부 <span className="text-red-600">*</span>
                </div>
                <Select
                  options={[
                    { value: "RECEIVED", label: "세례 받음" },
                    { value: "NOT_RECEIVED", label: "받지 않음" },
                  ]}
                  onChange={(value) =>
                    onChangeSelect({ name: "baptism", value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>
                성별 <span className="text-red-600">*</span>
              </div>
              <Select
                options={[
                  { value: "MALE", label: "남" },
                  { value: "FEMALE", label: "여" },
                ]}
                onChange={(value) => onChangeSelect({ name: "gender", value })}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>
                  제자반 여부 <span className="text-red-600">*</span>
                </div>
                <Select
                  options={[
                    { value: "COMPLETED", label: "수료" },
                    { value: "NOT_COMPLETED", label: "미수료" },
                  ]}
                  onChange={(value) =>
                    onChangeSelect({ name: "discipleship", value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />

        <div className="flex flex-col gap-4">
          <div className="text-xl">추가 정보</div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>연락처</div>
              <Input name="phone" onChange={onChangeInput} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div>생년월일</div>
                <Input name="birthDate" onChange={onChangeInput} />
              </div>
            </div>
          </div>
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
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div>등록일</div>
              <DatePicker
                onChange={(_, dateString) =>
                  setForm({ ...form, registeredAt: dateString as string })
                }
              />
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-b border-gray-300" />
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <div>비고</div>
            <Input.TextArea
              rows={2}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
