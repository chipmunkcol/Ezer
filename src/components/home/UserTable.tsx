import { useQuery } from "@tanstack/react-query";
import { Table, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { getMemers, type ResponseMember } from "../../utils/api/api";

const UserTable = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: getMemers,
  });
  console.log("🚀 ~ UserTable ~ dat:", data);

  const columns: TableProps<ResponseMember>["columns"] = [
    {
      key: "name",
      title: "이름",
      dataIndex: "name",
      render: (value, record) => (
        <a onClick={() => navigate(`/user/${record?.id}`)}>{value}</a>
      ),
    },
    {
      key: "position",
      title: "직분",
      dataIndex: "position",
      render: (value) => (
        <div>
          {value === "SAINT"
            ? "성도"
            : value === "KWONSA"
            ? "권사"
            : value === "DEACONESS"
            ? "집사"
            : "회원"}
        </div>
      ),
    },
    {
      key: "gender",
      title: "성별",
      dataIndex: "gender",
      render: (value) => (value === "MALE" ? "남" : "여"),
    },
    {
      key: "barnabasEducation",
      title: "바나바교육",
      dataIndex: "barnabasEducation",
      render: (value) => (value === "COMPLETED" ? "O" : "X"),
    },
    {
      key: "baptism",
      title: "세례여부",
      dataIndex: "baptism",
      render: (value) => (value === "RECEIVED" ? "O" : "X"),
    },
    {
      key: "discipleship",
      title: "제자반",
      dataIndex: "discipleship",
      render: (value) => (value === "COMPLETED" ? "O" : "X"),
    },
    {
      key: "",
    },
  ];
  return <Table dataSource={data?.items} columns={columns} />;
};

export default UserTable;
