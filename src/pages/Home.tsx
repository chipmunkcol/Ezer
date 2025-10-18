import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserTable from "../components/home/UserTable";
import { getMemers } from "../utils/api/api";

const Home = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryUrl = searchParams.get("query");

  const { data, refetch } = useQuery({
    queryKey: ["members", queryUrl],
    queryFn: () => getMemers(currentPage, 10, queryUrl),
  });

  useEffect(() => {
    if (queryUrl) {
      setQuery(queryUrl);
      refetch();
    }
  }, [queryUrl]);

  console.log("🚀 ~ Home ~ currentPage:", currentPage);
  console.log("🚀 ~ Home ~ data:", data);
  console.log("🚀 ~ Home ~ queryUrl:", queryUrl);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSearch = () => {
    setCurrentPage(1);
    setSearchParams({ query });
  };

  const onClickSearch = () => {
    onSearch();
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <main className="py-4 px-10 ">
      <h1 className="text-3xl font-bold pb-5">영커플 선교회 회원 관리</h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex-1 max-w-[500px] flex gap-2">
            <Input
              placeholder={"이름으로 검색..."}
              defaultValue={queryUrl || ""}
              value={query || ""}
              onChange={onChangeQuery}
              onKeyDown={onPressEnter}
            />
            <Button onClick={onClickSearch}>검색</Button>
          </div>
          <Button type="primary" onClick={() => navigate("/add/user")}>
            신규 회원 등록
          </Button>
        </div>
        <div>
          <UserTable data={data} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
};

export default Home;
