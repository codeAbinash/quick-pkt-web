import ls from '../../lib/util';

export type UserProfile = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    profile_pic: string;
    available_balance: string;
  };
} | null;

export function getProfileInfoLs(): UserProfile {
  return JSON.parse(ls.get('userProfile') || 'null');
}

export function setProfileInfoLs(data: UserProfile): void {
  ls.set('userProfile', JSON.stringify(data));
}
