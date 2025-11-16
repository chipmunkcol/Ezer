import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getFamilyById,
  updateFamily,
  type FamilyPayload,
} from "../../utils/api/api";
import useNavigater from "../../utils/hooks/useNavigater";
import { Users } from "lucide-react";
import { Button, Form, Input } from "antd";
import { SweatAlert } from "../../utils/libs/sweatAlert";
import HusbandInput from "./components/HusbandInput";
import WifeInput from "./components/WifeInput";

const EditFamily = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { goFamily, goBack, goFamilyDetail } = useNavigater();

  const { data, isLoading, error } = useQuery({
    queryKey: ["family", id],
    queryFn: () => getFamilyById(id!),
    enabled: !!id,
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // 수정 API 호출 로직 추가 필요

    const payload = {
      name: values.name,
      address: values.address || null,
      husbandId: values.husbandId || null,
      wifeId: values.wifeId || null,
      childrenInfo: values.childrenInfo || null,
      notes: values.notes || null,
    };
    updateFamilyMutate({ id: id!, payload: payload });
  };

  const { mutate: updateFamilyMutate } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FamilyPayload }) =>
      updateFamily(id, payload),
    onSuccess: (data) => {
      console.log("🚀 ~ EditFamily ~ data:", data);
      SweatAlert("가족 정보가 수정되었습니다.");
      goFamilyDetail(id!);
    },
    onError: (error) => {
      console.log("가족 정보 수정 실패", error);
      alert(error.message || "가족 정보 수정에 실패했습니다.");
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-4 px-10">
      <a className="text-blue-400 cursor-pointer" onClick={goFamily}>
        ← 목록으로 돌아가기
      </a>
      <h1 className="text-2xl font-bold pt-4">가족 상세 정보</h1>
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center rounded-full bg-gray-200 w-10 h-10 justify-center ">
            <Users size={24} />
          </div>
          <div>{data?.name}</div>
          {/* <Form.Item style={{ margin: 0, display: "flex" }} name="name">
              <Input />
            </Form.Item> */}
        </div>
        <div className="flex gap-2">
          <Button onClick={goBack}>취소</Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
          >
            저장
          </Button>
        </div>
      </div>
      <div>
        <Form
          form={form}
          initialValues={{
            name: data?.name,
            husbandLabel: data?.husband?.name,
            husbandId: data?.husband?.id,
            wifeLabel: data?.wife?.name,
            wifeId: data?.wife?.id,
            address: data?.address,
            childrenInfo: data?.childrenInfo,
            notes: data?.notes,
          }}
          onFinish={onFinish}
          style={{
            fontSize: "16px",
          }}
        >
          <div className="flex flex-col gap-4">
            {/* <div className="">가족 이름(별칭): {data?.name}</div> */}
            <Form.Item
              label="가족 이름(별칭)"
              rules={[{ required: true, message: "가족 이름을 입력해주세요." }]}
              style={{ margin: 0 }}
              name="name"
            >
              <Input />
            </Form.Item>
            <div className="flex gap-4">
              <HusbandInput form={form} label="남편" marginBottom="none" />
              <WifeInput form={form} label="아내" marginBottom="none" />
            </div>
            <div className="flex">
              {/* <div className="flex-1">주소: {data?.address}</div> */}
              <Form.Item
                label="주소"
                style={{ margin: 0, flex: 1 }}
                name="address"
              >
                <Input />
              </Form.Item>
            </div>

            <div className="flex">
              {/* <div className="flex-1">자녀: {data?.childrenInfo}</div> */}
              <Form.Item
                label="자녀"
                style={{ margin: 0, flex: 1 }}
                name="childrenInfo"
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* 구분선 */}
          <div className="my-6 border-b border-gray-300" />
          {/* <div>비고</div>
          {data?.notes || "없음"} */}
          <Form.Item label="비고" style={{ margin: 0 }} name="notes">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default EditFamily;
