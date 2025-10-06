import { Button, Input } from "antd";
import UserTable from "../components/home/UserTable";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="py-4 px-10 ">
      <h1 className="text-3xl font-bold pb-5">영커플 선교회 회원 관리</h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input placeholder={"셀 or 이름으로 검색..."} />
            <Button>검색</Button>
          </div>
          <Button type="primary" onClick={() => navigate("/add/user")}>
            신규 회원 등록
          </Button>
        </div>
        <div>
          <UserTable />
        </div>
      </div>
    </main>
  );
};

export default Home;
