// husbandId, wiffeId 를 받아서 새로운 가족을 추가하는 페이지
// /admin/families & 쿼리 검색을 통해 id 를 받아오는 구조
// debounce 적용된 검색 Input 필요

const commonRule = (message: string) => ({
  required: true,
  message,
});

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, type FormInstance } from "antd";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { getMemers, postFamily } from "../../utils/api/api";
import { GET_FAMILY_SIZE } from "../../utils/const/const";
import { debounce } from "../../utils/function/function";
import useNavigater from "../../utils/hooks/useNavigater";
import { SweatConfirm } from "../../utils/libs/sweatAlert";
import HusbandInput from "./components/HusbandInput";
import WifeInput from "./components/WifeInput";

const AddFamily = () => {
  const { goFamily } = useNavigater();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const payload = {
      name: values.name,
      address: values.address || null,
      husbandId: values.husbandId || null,
      wifeId: values.wifeId || null,
      childrenInfo: values.childrenInfo || null,
      notes: values.notes || null,
    };

    addFamilyMutate(payload);
  };

  const { mutate: addFamilyMutate } = useMutation({
    mutationFn: postFamily,
    onSuccess: async (data) => {
      console.log("🚀 ~ AddFamily ~ data:", data);

      const res = await SweatConfirm(
        "가족 등록이 완료되었습니다.",
        "가족 관리 페이지로 돌아가시겠습니까?"
      );
      if (res) {
        goFamily();
      }
    },
    onError: (error) => {
      console.log("가족 등록 실패", error);
      alert(error.message || "가족 등록에 실패했습니다.");
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={goFamily}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">가족 등록</h1>

      <div>
        <Form form={form} onFinish={onFinish}>
          <div className="py-4">
            <div className="flex flex-col gap-2">
              <div className="">
                가족 이름(별칭) <RequiredSymbol />
              </div>
              <Form.Item
                name="name"
                rules={[commonRule("가족 이름을 입력해주세요.")]}
              >
                <Input placeholder="예) 철수&영희 가정" />
              </Form.Item>
            </div>

            {/* 남편 & 아내 */}
            <div className="flex gap-2">
              {/* 남편쪽 컴포넌트 */}
              <HusbandInput form={form} />

              {/* 아내쪽 컴포넌트 */}
              <WifeInput form={form} />
            </div>

            {/* 주소 */}
            <div className="flex flex-col gap-2">
              <div className="">주소</div>
              <Form.Item name="address">
                <Input placeholder="예) 중랑구 면목동" />
              </Form.Item>
            </div>

            {/* 자녀 */}
            <div className="flex flex-col gap-2">
              <div className="">자녀</div>
              <Form.Item name="childrenInfo">
                <Input placeholder="예) 26년 3월 출산 예정" />
              </Form.Item>
            </div>

            {/* 비고 */}
            <div className="flex flex-col gap-2">
              <div className="">비고</div>
              <Form.Item name="notes">
                <Input.TextArea
                  rows={4}
                  placeholder="예) 결혼: 24.05.11, 담임 목사님 주례"
                />
              </Form.Item>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4">
              <Button htmlType="button">취소</Button>
              <Button type="primary" htmlType="submit">
                등록하기
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddFamily;

const RequiredSymbol = () => <span className="text-red-600">*</span>;
