import { Table, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { type ResponseMember } from "../../utils/api/api";
import { PAGENATION_SIZE } from "../../utils/const/const";
import { formatPhoneNumber, translate_ko } from "../../utils/function/function";
import useUserPagination from "../../utils/hooks/useUserPagination";
import useNavigater from "../../utils/hooks/useNavigater";

const UserTable = () => {
  // console.log("🚀 ~ UserTable ~ render", performance.now());
  // const navigate = useNavigate();
  const { goUserDetail } = useNavigater();
  const { data, onChangePage, page } = useUserPagination();

  const columns: TableProps<ResponseMember>["columns"] = [
    {
      key: "cellId",
      title: "셀",
      dataIndex: "cellId",
      render: (value) => <div>{value || "미셀"}</div>,
    },
    {
      key: "name",
      title: "이름",
      dataIndex: "name",
      render: (value, record) => (
        <a onClick={() => goUserDetail(record?.id)}>{value}</a>
      ),
    },
    {
      key: "gender",
      title: "성별",
      dataIndex: "gender",
      render: (value) => (value === "MALE" ? "남" : "여"),
    },
    {
      key: "position",
      title: "직분",
      dataIndex: "position",
      render: (value) => <div>{translate_ko(value)}</div>,
    },
    {
      key: "birthDate",
      title: "생년월일",
      dataIndex: "birthDate",
    },
    {
      key: "phone",
      title: "전화번호",
      dataIndex: "phone",
      render: (value) => <div>{(value && formatPhoneNumber(value)) || ""}</div>,
    },
    {
      key: "registeredAt",
      title: "등록일",
      dataIndex: "registeredAt",
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

export default UserTable;

// {
//   key: "barnabasEducation",
//   title: "바나바교육",
//   dataIndex: "barnabasEducation",
//   render: (value) => (value === "COMPLETED" ? "O" : "X"),
// },
// {
//   key: "baptism",
//   title: "세례여부",
//   dataIndex: "baptism",
//   render: (value) => (value === "RECEIVED" ? "O" : "X"),
// },
// {
//   key: "discipleship",
//   title: "제자반",
//   dataIndex: "discipleship",
//   render: (value) => (value === "COMPLETED" ? "O" : "X"),
// },
