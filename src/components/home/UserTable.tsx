import { Table, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { type Members, type ResponseMember } from "../../utils/api/api";

const UserTable = ({
  data,
  setCurrentPage,
}: {
  data: Members | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();

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
      key: "gender",
      title: "성별",
      dataIndex: "gender",
      render: (value) => (value === "MALE" ? "남" : "여"),
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
        if (pagination.current) {
          setCurrentPage(pagination.current);
        }
      }}
      pagination={{
        total: data?.total,
        pageSize: 10,
      }}
    />
  );
};

export default UserTable;
