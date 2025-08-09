interface LoginResponse {
  message: string;
  payload: {
    email: string;
    id: string;
  };
  token: string;
}

interface CheckAuthResponse {
  message: string;
  status: number;
}
