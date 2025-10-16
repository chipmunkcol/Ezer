import { Button, Input } from "antd";
import UserTable from "../components/home/UserTable";
import { useNavigate } from "react-router-dom";
import { getMemers } from "../utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import debounce from "lodash.debounce";

const Home = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Home ~ currentPage:", currentPage);
  const [query, setQuery] = useState("");

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const { data } = useQuery({
    queryKey: ["members", currentPage, query],
    queryFn: () => getMemers(currentPage, 10, query),
  });
  console.log("🚀 ~ Home ~ data:", data);

  // 디바운스된 setter를 useMemo로 캐싱
  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 300),
    []
  );

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <main className="py-4 px-10 ">
      <h1 className="text-3xl font-bold pb-5">영커플 선교회 회원 관리</h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Input
              placeholder={"이름으로 검색..."}
              // value={query}
              onChange={onChangeQuery}
            />
            <Button>검색</Button>
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
