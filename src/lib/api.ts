import app from '../../app';

export const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

const API_URL = app.api;

const API = {
  login: `${API_URL}/auth/login_or_signup`,
  send_otp: `${API_URL}/auth/send_otp`,
  resend_otp: `${API_URL}/auth/resend_otp`,
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
    console.log(data.message);
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
  try {
    const res = await fetch(API.login, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ otp: otp, phone: phone }),
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
