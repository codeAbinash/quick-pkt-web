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
  return JSON.parse(ls.get('banners') || 'null');
}

export function setBannersLs(data: BannerType[]): void {
  ls.set('banners', JSON.stringify(data));
}

export type SpotlightType = {
  id: number;
  name: string;
  path: string;
  action: string;
  link: string;
  status: string;
  type: string;
};

export function getSpotlightsLs(): BannerType[] {
  return JSON.parse(ls.get('spotlights') || 'null');
}

export function setSpotlightsLs(data: BannerType[]): void {
  ls.set('spotlights', JSON.stringify(data));
}

export type FeaturedType = {
  id: number;
  name: string;
  path: string;
  action: string;
  link: string;
  status: string;
  type: string;
};

export function getFeaturedLs(): BannerType[] {
  return JSON.parse(ls.get('featured') || 'null');
}

export function setFeaturedLs(data: BannerType[]): void {
  ls.set('featured', JSON.stringify(data));
}
