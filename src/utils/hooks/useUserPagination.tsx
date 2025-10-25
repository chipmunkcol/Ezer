import { useSearchParams } from "react-router-dom";
import { usePaginationStore } from "../../stores/usePaginationStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMemers } from "../api/api";
import { PAGENATION_SIZE } from "../const/const";

const useUserPagination = () => {
  const setPage = usePaginationStore((state) => state.setPage);
  const page = usePaginationStore((state) => {
    return state.page;
  });
  console.log("🚀 ~ useUserPagination ~ page:", page);

  const [searchParams] = useSearchParams();

  const queryUrl = searchParams.get("query");

  const onChangePage = (page: number | undefined) => {
    if (!page) return;
    setPage(page);
  };

  const { data } = useQuery({
    queryKey: ["members", page, queryUrl],
    queryFn: () => getMemers(page, PAGENATION_SIZE, queryUrl),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    onChangePage,
    page,
  };
};

export default useUserPagination;
