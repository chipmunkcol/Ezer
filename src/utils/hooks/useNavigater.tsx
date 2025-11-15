import { useNavigate } from "react-router-dom";
import { usePaginationStore } from "../../stores/usePaginationStore";
import { useFamilyPaginationStore } from "../../stores/useFamilyPaginationStore";

const useNavigater = () => {
  const navigate = useNavigate();
  const query = usePaginationStore((state) => state.query);
  const familyQuery = useFamilyPaginationStore((state) => state.query);
  // const { changeQueryUrl } = useUserSearch()
  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    // if (query) {
    //   navigate(`/user?query=${query}`);
    // } else {
    //   navigate("/user");
    // }
    if (query) {
      navigate(`/?query=${query}`);
    } else {
      navigate("/");
    }
  };

  const goUserDetail = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const goAddUser = () => {
    navigate("/user/add");
  };

  const goEditUser = (userId: string) => {
    navigate(`/user/edit/${userId}`);
  };

  // family
  // family
  // family
  const goFamily = () => {
    if (familyQuery) {
      navigate(`/family?query=${familyQuery}`);
    } else {
      navigate("/family");
    }
  };

  const goAddFamily = () => {
    navigate("/family/add");
  };

  const goEditFamily = (familyId: string) => {
    navigate(`/family/edit/${familyId}`);
  };

  const goFamilyDetail = (familyId: string) => navigate(`/family/${familyId}`);

  return {
    goHome,
    goUserDetail,
    goAddUser,
    goEditUser,

    // family
    goFamily,
    goAddFamily,
    goEditFamily,
    goFamilyDetail,

    goBack,
  };
};

export default useNavigater;
