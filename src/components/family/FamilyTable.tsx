import { Table, type TableProps } from "antd";
import { type Family } from "../../utils/api/api";
import { PAGENATION_SIZE } from "../../utils/const/const";
import useFamilyPagination from "../../utils/hooks/useFamilyPagination";
import useNavigater from "../../utils/hooks/useNavigater";

const FamilyTable = () => {
  // console.log("🚀 ~ FamilyTable ~ render", performance.now());
  const { goFamilyDetail, goUserDetail } = useNavigater();
  const { data, onChangePage, page } = useFamilyPagination();
  console.log("🚀 ~ FamilyTable ~ data:", data);

  const columns: TableProps<Family>["columns"] = [
    {
      key: "familyName",
      title: "가족 이름",
      dataIndex: "name",
      render: (value, record) => (
        <a onClick={() => goFamilyDetail(record?.id)}>{value}</a>
      ),
    },
    // 남편 이름
    {
      key: "husbandName",
      title: "남편",
      dataIndex: "husband",
      render: (value, record) => (
        <a onClick={() => goUserDetail(record?.id)}>{value?.name}</a>
      ),
    },
    // 아내 이름
    {
      key: "wifeName",
      title: "아내",
      dataIndex: "wife",
      render: (value, record) => (
        <a onClick={() => goUserDetail(record?.id)}>{value?.name}</a>
      ),
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
