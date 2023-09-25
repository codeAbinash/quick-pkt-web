import ls from '../../lib/util';

export type userProfile = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    profile_pic: string;
  };
} | null;

export function getProfileInfo(): userProfile {
  // console.log('Getting profile info');
  return JSON.parse(ls.get('userProfile') || 'null');
}

export function setProfileInfo(data: userProfile): void {
  // console.log('Setting profile info');
  ls.set('userProfile', JSON.stringify(data));
}
