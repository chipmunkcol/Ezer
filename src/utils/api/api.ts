import api, { type ErrorRes } from "./instance";

export const getMemers = async (): Promise<Members> => {
  try {
    const response = await api.get("/admin/members");
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
  try {
    const response = await api.post("/admin/members", Member);
    return response.data;
  } catch (error) {
    const err = error as ErrorRes;
    throw {
      status: err.error.status,
      message: err.error.message,
    };
  }
};

export const updateMember = async ({
  id,
  member,
}: {
  id: string;
  member: Member;
}): Promise<ResponseMember> => {
  try {
    const response = await api.put(`/admin/members/${id}`, member);
    return response.data;
  } catch (error) {
    const err = error as ErrorRes;
    throw {
      status: err.error.status,
      message: err.error.message,
    };
  }
};

export const deleteMember = async (id: string): Promise<void> => {
  try {
    await api.delete(`/admin/members/${id}`);
  } catch (error) {
    const err = error as ErrorRes;
    throw {
      status: err.error.status,
      message: err.error.message,
    };
  }
};

interface Member {
  name: string;
  position: "SAINT"; // | 'KWONSA' | 'DEACONESS' | 'MEMBER'
  barnabasEducation: "COMPLETED"; // | 'NOT_COMPLETED'
  baptism: "RECEIVED"; // | 'NOT_RECEIVED' | 'UNDECIDED'
  discipleship: "COMPLETED"; // | 'NOT_COMPLETED'
  gender: "MALE"; // | 'FEMALE'
  phone: string;
  birthDate: string; // YYYY-MM-DD
  cellId: null; // | number
  familyId: null; // | number
  barnabasName: string;
  registeredAt: string; // YYYY-MM-DD
  note: string;
}

export interface ResponseMember extends Member {
  id: string;
  createdAt: string; //"2025-01-01T10:00:00.000Z",
  updatedAt: string; // "2025-01-01T10:00:00.000Z"
}

interface Members {
  items: ResponseMember[];
  total: number;
  page: number;
  size: number;
}
