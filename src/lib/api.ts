import app from '../../app';
import ls from './util';

export const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json', secret: app.secret };

const API_URL = app.api;

const API = {
  login: `${API_URL}/auth/login_or_signup`,
  send_otp: `${API_URL}/auth/send_otp`,
  resend_otp: `${API_URL}/auth/resend_otp`,
  get_current_user: `${API_URL}/user/get_current_user`,
};

export type apiResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export default API;

async function returnResponse(res: any): Promise<apiResponse> {
  const data = await res.json();
  console.log(data);
  if (data.status === true) {
    return { status: true, message: data.message, data: data };
  } else {
    return { status: false, message: data.message };
  }
}

function catchError(err: any) {
  console.log(err);
  return { status: false, message: 'Network Error' };
}

export async function sendOTP(phone: string): Promise<apiResponse> {
  try {
    const res = await fetch(API.send_otp, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ phone: phone }),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function checkOTP(otp: string, phone: string): Promise<apiResponse> {
  // return { status: true, message: 'OK' };
  const Data = JSON.stringify({ otp: otp, phone: phone });
  console.log(Data);
  try {
    const res = await fetch(API.login, {
      method: 'POST',
      headers: defaultHeaders,
      body: Data,
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function resendOTP(phone: string): Promise<apiResponse> {
  // return { status: true, message: 'OK' };

  try {
    const res = await fetch(API.resend_otp, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ phone: phone }),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getCurrentUser(): Promise<apiResponse> {
  const headers = { ...defaultHeaders, Authorization: `Bearer ${ls.get('token')}` };
  try {
    const res = await fetch(API.get_current_user, {
      method: 'POST',
      headers: headers,
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}
