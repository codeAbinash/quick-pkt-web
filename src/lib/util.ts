// LocalStorage related functions
const ls = {
  get: (item: string) => {
    return localStorage.getItem(item);
  },
  set: (item: string, data: string) => {
    return localStorage.setItem(item, data);
  },
  clear: () => {
    localStorage.clear();
  },
  getJsonFn: (item: string) => {
    return function () {
      return JSON.parse(ls.get(item) || '{}');
    };
  },
};

export default ls;

export function blank_fn() {}

export function delay(callback: Function, time = 150) {
  setTimeout(callback, time);
}

export function delayFn(callback: Function, time = 150) {
  return function () {
    setTimeout(callback, time);
  };
}

export function phoneNumberValidation(phone: string) {
  if (phone.length === 0)
    return {
      status: false,
      message: 'Phone number is required',
    };
  if (phone.length !== 10)
    return {
      status: false,
      message: 'Phone number must be 10 digits long',
    };
  const regex = /^[6-9]\d{9}$/;
  return {
    status: regex.test(phone),
    message: 'Invalid phone number',
  };
}

export function phoneNumberParser(phone: string) {
  // Remove all non numeric characters
  phone = phone.replace(/\D/g, '');
  // If the length is greater than 10, remove the first digits
  if (phone.length > 10) phone = phone.slice(phone.length - 10);

  return phone;
}

export type userMessage = {
  message: string;
  error: boolean;
};
export const blank_user_message: userMessage = { message: '', error: false };
