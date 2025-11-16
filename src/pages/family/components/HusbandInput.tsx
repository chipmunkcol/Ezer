import { useQuery } from "@tanstack/react-query";
import { Form, Input, type FormInstance } from "antd";
import { useMemo, useState } from "react";
import { getMemers } from "../../../utils/api/api";
import { GET_FAMILY_SIZE } from "../../../utils/const/const";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";

interface Props {
  form: FormInstance<any>;
  label?: string;
  marginBottom?: "none";
}

const HusbandInput = ({ form, label, marginBottom }: Props) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const closeOption = () => setIsOptionOpen(false);
  const openOption = () => setIsOptionOpen(true);

  const selectHusband = (option: { label: string; value: string }) => {
    // console.log("🚀 ~ selectHusband ~ value:", value);
    form.setFieldsValue({
      husbandId: option.value,
      husbandLabel: option.label,
    });
  };

  const [husbandQuery, sethusbandQuery] = useState("");
  const { data } = useQuery({
    queryKey: ["members-getIds-male", 1, husbandQuery],
    queryFn: () => getMemers(1, GET_FAMILY_SIZE, husbandQuery, "MALE"),
    select: (data) => data?.items,
    enabled: !!husbandQuery,
  });

  const options = data?.map((member) => ({
    label: member.name,
    value: member.id,
  }));

  const onChange = (value: string) => {
    sethusbandQuery(value);
  };

  const debouncedOnChange = debounce(onChange, 300);

  console.log("🚀 ~ AddFamily ~ data:", data);
  return (
    <div className="flex flex-col gap-2">
      {!label && <div className="">남편</div>}
      <div className="relative">
        <Form.Item
          name="husbandLabel"
          label={label}
          style={marginBottom === "none" ? { marginBottom: 0 } : {}}
        >
          <Input
            suffix={<Search size={16} className="text-gray-400" />}
            placeholder="예)  김철수"
            onChange={(e) => debouncedOnChange(e.target.value)}
            onClick={openOption}
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item name="husbandId" hidden>
          <Input />
        </Form.Item>
        <div className="z-10 absolute top-[38px] w-full bg-white">
          {options && isOptionOpen && (
            <ul
              onClick={closeOption}
              className="border border-gray-300 rounded-md"
            >
              {options.length === 0 && (
                <li className="py-3 px-3 ">검색 결과가 없습니다.</li>
              )}
              {options?.map((option) => (
                <li
                  key={option.value}
                  className="py-1 px-1 "
                  onClick={() => selectHusband(option)}
                >
                  <div className="px-2 rounded-md hover:bg-blue-100 cursor-pointer">
                    {option.label}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HusbandInput;
