import { useNavigate } from "react-router-dom";
import { usePaginationStore } from "../../stores/usePaginationStore";

const useNavigater = () => {
  const navigate = useNavigate();
  const { query } = usePaginationStore();
  // const { changeQueryUrl } = useUserSearch()
  const goHome = () => {
    if (query) {
      navigate(`/?query=${query}`);
    } else {
      navigate("/");
    }
  };

  return {
    goHome,
  };
};

export default useNavigater;
