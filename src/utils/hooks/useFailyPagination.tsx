import { useSearchParams } from "react-router-dom";
import { usePaginationStore } from "../../stores/usePaginationStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFamilies, getMemers } from "../api/api";
import { PAGENATION_SIZE } from "../const/const";
import { useFamilyPaginationStore } from "../../stores/useFamilyPaginationStore";

const useFailyPagination = () => {
  const setPage = useFamilyPaginationStore((state) => state.setPage);
  const page = useFamilyPaginationStore((state) => {
    return state.page;
  });
  console.log("🚀 ~ useFailyPagination ~ page:", page);

  const [searchParams] = useSearchParams();

  const queryUrl = searchParams.get("query");

  const onChangePage = (page: number | undefined) => {
    if (!page) return;
    setPage(page);
  };

  const { data } = useQuery({
    queryKey: ["families", page, queryUrl],
    queryFn: () => getFamilies(page, PAGENATION_SIZE, queryUrl),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    onChangePage,
    page,
  };
};

export default useFailyPagination;
