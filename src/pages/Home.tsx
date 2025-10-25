import { Button, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserTable from "../components/home/UserTable";
import { usePaginationStore } from "../stores/usePaginationStore";
import useUserSearch from "../utils/hooks/useUserSearch";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="py-4 px-10 ">
      <h1 className="text-3xl font-bold pb-5">영커플 선교회 회원 관리</h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex-1 max-w-[500px] flex gap-2">
            <UserSearchInput />
            <UserSearchButton />
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

const UserSearchButton = () => {
  const { onSearch } = useUserSearch();

  return <Button onClick={onSearch}>검색</Button>;
};

const UserSearchInput = () => {
  const { query, onChangeQuery, onPressEnter } = useUserSearch();

  return (
    <Input
      placeholder={"이름으로 검색..."}
      defaultValue={query || ""}
      value={query || ""}
      onChange={onChangeQuery}
      onKeyDown={onPressEnter}
    />
  );
};
