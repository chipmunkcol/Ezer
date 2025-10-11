import axios from "axios";

// 에러 응답 타입
export interface ErrorRes {
  success: false;
  error: {
    code: string; // "INTERNAL_SERVER_ERROR";
    message: string; // "API is not implemented";
    status: number; // 500;
    timestamp: string; // "2025-10-11T04:34:54.466Z";
    path: string; // "/admin/members";
    details: null;
  };
}

const api = axios.create({
  baseURL: "/",
  // maxRedirects: 3,
});

// 요청 인터셉터 추가하기
axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    const err: ErrorRes = error;
    console.error("API Error:", err);
    return Promise.reject(err);
  }
);

export default api;
