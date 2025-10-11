import { Table, type TableProps } from "antd";
import { userInfo, type UserInfo } from "@/data/dummy.ts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMemers } from "../../utils/api/api";

const dataSource = userInfo;

const UserTable = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: getMemers,
  });
  console.log("🚀 ~ UserTable ~ dat:", data);

  const columns: TableProps<UserInfo>["columns"] = [
    {
      key: "이름",
      title: "이름",
      dataIndex: "이름",
      render: (value, record) => (
        <a onClick={() => navigate(`/user/${record?.id}`)}>{value}</a>
      ),
    },
    {
      key: "직분",
      title: "직분",
      dataIndex: "직분",
    },
    {
      key: "성별",
      title: "성별",
      dataIndex: "성별",
    },
    {
      key: "바나바교육",
      title: "바나바교육",
      dataIndex: "바나바교육",

      render: (value) => (value ? "O" : "X"),
    },
    {
      key: "세례여부",
      title: "세례여부",
      dataIndex: "세례여부",
      render: (value) => (value === null ? "미정" : value ? "O" : "X"),
    },
    {
      key: "제자반",
      title: "제자반",
      dataIndex: "제자반",
      render: (value) => (value ? "O" : "X"),
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};

export default UserTable;
