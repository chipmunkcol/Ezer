import { Table, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { type Families, type Family } from "../../utils/api/api";
import { PAGENATION_SIZE } from "../../utils/const/const";
import { formatPhoneNumber, translate_ko } from "../../utils/function/function";
import useFailyPagination from "../../utils/hooks/useFailyPagination";

const FamilyTable = () => {
  // console.log("🚀 ~ FamilyTable ~ render", performance.now());
  const navigate = useNavigate();
  const { data, onChangePage, page } = useFailyPagination();
  console.log("🚀 ~ FamilyTable ~ data:", data);

  const columns: TableProps<Family>["columns"] = [
    {
      key: "familyName",
      title: "가족 이름",
      dataIndex: "name",
    },
    // 남편 이름
    {
      key: "husbandName",
      title: "남편",
      dataIndex: "husband",
      render: (value) => <div>{value?.name}</div>,
    },
    // 아내 이름
    {
      key: "wifeName",
      title: "아내",
      dataIndex: "wife",
      render: (value) => <div>{value?.name}</div>,
    },
    // 주소
    {
      key: "address",
      title: "주소",
      dataIndex: "address",
    },
    // 자녀
    {
      key: "children",
      title: "자녀",
      dataIndex: "childrenInfo",
    },
    // 비고
    {
      key: "remarks",
      title: "비고",
      dataIndex: "notes",
    },
  ];
  return (
    <Table
      dataSource={data?.items}
      columns={columns}
      onChange={(pagination) => {
        onChangePage(pagination.current);
      }}
      pagination={{
        total: data?.total,
        pageSize: PAGENATION_SIZE,
        current: page,
      }}
    />
  );
};

export default FamilyTable;
