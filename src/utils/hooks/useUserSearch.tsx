import { useSearchParams } from "react-router-dom";
import { usePaginationStore } from "../../stores/usePaginationStore";

const useUserSearch = () => {
  const { query, setPage, setQuery } = usePaginationStore();
  const [, setSearchParams] = useSearchParams();

  const onSearch = () => {
    console.log("✅ onSearch 실행");
    setPage(1);
    setQuery(query);
    // setSearchParams({ query });
    changeParams();
  };

  const changeParams = () => {
    if (query) {
      setSearchParams({ query: query });
    } else {
      setSearchParams({});
    }
  };

  // const changeQueryUrl = () => {
  //   setSearchParams({ query: query });
  // };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return {
    query,
    onSearch,
    onChangeQuery,
    onPressEnter,
    // changeQueryUrl,
  };
};

export default useUserSearch;
