import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import FamilyTable from "../../components/family/FamilyTable";
import useFamilySearch from "../../utils/hooks/family/useFamilySearch";
import useNavigater from "../../utils/hooks/useNavigater";

const Family = () => {
  const { goAddFamily } = useNavigater();

  return (
    <main className="py-4 px-10 ">
      <h1 className="text-3xl font-bold pb-5">회원 목록</h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex-1 max-w-[500px] flex gap-2">
            <FamilySearchInput />
            <FamilySearchButton />
          </div>
          <Button type="primary" onClick={goAddFamily}>
            신규 가족 등록
          </Button>
        </div>
        <div>
          <FamilyTable />
        </div>
      </div>
    </main>
  );
};

export default Family;

const FamilySearchButton = () => {
  const { onSearch } = useFamilySearch();

  return <Button onClick={onSearch}>검색</Button>;
};

const FamilySearchInput = () => {
  const { query, onChangeQuery, onPressEnter } = useFamilySearch();

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
