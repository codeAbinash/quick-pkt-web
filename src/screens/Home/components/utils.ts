import ls from '../../../lib/util';

export type BannerType = {
  id: number;
  name: string;
  path: string;
  action: string;
  link: string;
  status: string;
  type: string;
};

export function getBannersLs(): BannerType[] {
  return JSON.parse(ls.get('banners') || '[]');
}

export function setBannersLs(data: BannerType[]): void {
  ls.set('banners', JSON.stringify(data));
}
