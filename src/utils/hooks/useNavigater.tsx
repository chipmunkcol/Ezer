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

  // family
  const goAddFamily = () => {
    navigate("/family/add");
  };

  const goEditFamily = (familyId: number) => {
    navigate(`/family/edit/${familyId}`);
  };

  const goFamilyDetail = (familyId: number) => navigate(`/family/${familyId}`);

  return {
    goHome,
    goAddFamily,
    goEditFamily,
    goFamilyDetail,
  };
};

export default useNavigater;
