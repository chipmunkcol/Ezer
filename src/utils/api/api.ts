import api, { type ErrorRes } from "./instance";

export const getMemers = async (
  page: number,
  size: number,
  name: string | null
): Promise<Members> => {
  try {
    const response = await api.get(`/admin/members`, {
      params: name ? { page, size, name } : { page, size },
    });
    return response.data;
  } catch (error) {
    const err = error as ErrorRes;
    throw {
      status: err.error.status,
      message: err.error.message,
    };
  }
};

export const getMemberById = async (id: string): Promise<ResponseMember> => {
  try {
    const response = await api.get(`/admin/members/${id}`);

    return response.data;
  } catch (error) {
    const err = error as ErrorRes;
    throw {
      status: err.error.status,
      message: err.error.message,
    };
  }
};

/**
 *
 * @param Member 등록할 멤버 정보
 * @returns 생성된 멤버 데이터
 */
export const postMember = async (Member: Member): Promise<ResponseMember> => {
  const response = await api.post("/admin/members", Member);
  return response.data;

  // interceptor에서 에러 처리 해주니까 그냥 이렇게만 해도 되는거아님?
  // try {
  // } catch (error) {
  //   const err = error as ErrorRes;
  //   throw err;
  // }
};

export const updateMember = async (
  id: string,
  member: Member
): Promise<Member> => {
  const response = await api.put(`/admin/members/${id}`, member);
  return response.data;
  // try {
  //   const response = await api.put(`/admin/members/${id}`, member);
  //   return response.data;
  // } catch (error) {
  //   const err = error as ErrorRes;
  //   throw {
  //     status: err.error.status,
  //     message: err.error.message,
  //   };
  // }
};

export const deleteMember = async (id: string): Promise<void> => {
  return await api.delete(`/admin/members/${id}`);
  // try {
  // } catch (error) {
  //   // const err = error as ErrorRes;
  //   throw {
  //     message: error,
  //   };
  // }
};

export interface Member {
  name: string;
  position: "SAINT" | "DEACON" | "KWONSA" | "GANSA" | "EDUCATOR"; // |  | 'DEACONESS' | 'MEMBER'
  barnabasEducation: "COMPLETED" | "NOT_COMPLETED";
  baptism: "RECEIVED" | "NOT_RECEIVED" | "UNKNOWN";
  discipleship: "COMPLETED" | "NOT_COMPLETED";
  gender: "MALE" | "FEMALE";
  phone: string | null;
  birthDate: string | null; // YYYY-MM-DD
  cellId: string | null; //
  familyId: string | null; //
  barnabasName: string | null;
  registeredAt: string | null; // YYYY-MM-DD
  note: string | null;
}

export interface ResponseMember extends Member {
  id: string;
  createdAt: string; //"2025-01-01T10:00:00.000Z",
  updatedAt: string; // "2025-01-01T10:00:00.000Z"
}

export interface Members {
  items: ResponseMember[];
  total: number;
  page: number;
  size: number;
}
