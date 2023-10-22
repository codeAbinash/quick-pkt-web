import app from '../../app';
import ls from './util';

const API_URL = app.api;

const API = {
  login: `${API_URL}/auth/login_or_signup`,
  logout: `${API_URL}/auth/logout`,
  otp: {
    send: `${API_URL}/auth/send_otp`,
    resend: `${API_URL}/auth/resend_otp`,
  },
  user: {
    current: {
      get: `${API_URL}/user/get_current_user`,
      update: `${API_URL}/user/update_user`,
    },
  },
  privacy_policy: `${API_URL}/pages/privacy_policy`,
  terms_and_conditions: `${API_URL}/pages/terms_and_conditions`,
  banners: `${API_URL}/banner/get_banners/main`,
  spotlights: `${API_URL}/banner/get_banners/spotlight`,
  featured: `${API_URL}/banner/get_banners/featured`,
  recharge: {
    mobile: {
      operators: {
        get: `${API_URL}/operators/get_operators/mobile_recharge`,
      },
      plans: {
        get: `${API_URL}/mobile_recharge/get_plans/`,
      },
    },
  },
  wallet: {
    transactions: {
      history: {
        all: `${API_URL}/wallet/get_all_transaction`,
      },
    },
  },
  notifications: {
    get_all: `${API_URL}/alert/get_notification`,
    mark_read: `${API_URL}/alert/mark_read`,
  },
};

type defaultHeaders = {
  'Content-Type': 'application/json';
  Accept: 'application/json';
  secret: string;
};
export const defaultHeaders: defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  secret: app.secret,
};

type formDataHeaders = {
  ContentType: 'multipart/form-data';
  Accept: 'application/json';
  secret: string;
};
export const formDataHeaders: formDataHeaders = {
  secret: app.secret,
  Accept: 'application/json',
  ContentType: 'multipart/form-data',
};

export function authorizedHeader(header: formDataHeaders | defaultHeaders) {
  return { ...header, Authorization: `Bearer ${ls.get('token')}` };
}

export type apiResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export default API;

type errors = {
  [key: string]: string[];
};
export function getError(errors: errors) {
  const key = Object.keys(errors)[0];
  const value = errors[key][0];
  return value;
}

async function returnResponse(res: any): Promise<apiResponse> {
  const data = await res.json();
  if (data.status === true) return { status: true, message: data.message, data: data };
  else if (!data.errors) return { status: false, message: data.message || 'Network Error' };
  return { status: false, message: getError(data.errors) || data.message || 'Network Error' };
}

function catchError(err: any): apiResponse {
  console.log(err);
  return { status: false, message: 'Network Error' };
}

// Write your API functions below this line:
export async function markNotificationRead(): Promise<apiResponse> {
  try {
    const res = await fetch(API.notifications.mark_read, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getNotifications(): Promise<apiResponse> {
  try {
    const res = await fetch(API.notifications.get_all, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getTransactionsHistory(page: number): Promise<apiResponse> {
  try {
    const res = await fetch(API.wallet.transactions.history.all + '?page=' + page, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getPlansMobile(operator: string) {
  try {
    const fetchStr = API.recharge.mobile.plans.get + operator;

    const res = await fetch(fetchStr, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getOperators(): Promise<apiResponse> {
  try {
    const res = await fetch(API.recharge.mobile.operators.get, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function sendOTP(phone: string): Promise<apiResponse> {
  try {
    const res = await fetch(API.otp.send, {
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
    const res = await fetch(API.otp.resend, {
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
  const headers = authorizedHeader(defaultHeaders);
  try {
    const res = await fetch(API.user.current.get, {
      method: 'POST',
      headers: headers,
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

// export async function logOutUser(): Promise<apiResponse> {
//   const headers = authorizedHeader(defaultHeaders);
//   try {
//     const res = await fetch(API.logout, {
//       method: 'POST',
//       headers: headers,
//     });
//     return await returnResponse(res);
//   } catch (err) {
//     return catchError(err);
//   }
// }

// async function updateUser(data: any): Promise<apiResponse> {
//   const headers = authorizedHeader(defaultHeaders);
//   try {
//     const res = await fetch(API.update_user, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data),
//     });
//     return await returnResponse(res);
//   } catch (err) {
//     return catchError(err);
//   }
// }

export async function privacy_policy(): Promise<apiResponse> {
  try {
    const res = await fetch(API.privacy_policy, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function terms_and_conditions(): Promise<apiResponse> {
  try {
    const res = await fetch(API.terms_and_conditions, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getBanners(): Promise<apiResponse> {
  try {
    const res = await fetch(API.banners, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getSpotlights(): Promise<apiResponse> {
  try {
    const res = await fetch(API.spotlights, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}

export async function getFeatured(): Promise<apiResponse> {
  try {
    const res = await fetch(API.featured, {
      method: 'POST',
      headers: authorizedHeader(defaultHeaders),
    });
    return await returnResponse(res);
  } catch (err) {
    return catchError(err);
  }
}
