import { Table, type TableProps } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getMemers,
  type Members,
  type ResponseMember,
} from "../../utils/api/api";
import { translate_ko } from "../../utils/function/function";
import { PAGENATION_SIZE } from "../../utils/const/const";
import { usePaginationStore } from "../../stores/usePaginationStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useUserPagination from "../../utils/hooks/useUserPagination";

const UserTable = () => {
  console.log("🚀 ~ UserTable ~ render", performance.now());
  const navigate = useNavigate();
  const { data, onChangePage } = useUserPagination();

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
        <a onClick={() => navigate(`/user/${record?.id}`)}>{value}</a>
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
    {
      key: "birthDate",
      title: "생년월일",
      dataIndex: "birthDate",
    },
    {
      key: "phone",
      title: "전화번호",
      dataIndex: "phone",
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
      }}
    />
  );
};

export default UserTable;
