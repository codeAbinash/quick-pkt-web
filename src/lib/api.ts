import app from '../../app';

const API_URL = app.api;
const API = {
  login: `${API_URL}/auth/login_or_signup`,
  send_otp: `${API_URL}/auth/send_otp`,
};
export type apiResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export default API;
