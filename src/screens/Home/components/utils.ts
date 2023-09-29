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
export type SpotlightType = BannerType;
export type FeaturedType = BannerType;

export function getBannersLs(): BannerType[] {
  return JSON.parse(ls.get('banners') || 'null');
}

export function setBannersLs(data: BannerType[]): void {
  ls.set('banners', JSON.stringify(data));
}

export function getSpotlightsLs(): SpotlightType[] {
  return JSON.parse(ls.get('spotlights') || 'null');
}

export function setSpotlightsLs(data: SpotlightType[]): void {
  ls.set('spotlights', JSON.stringify(data));
}

export function getFeaturedLs(): FeaturedType[] {
  return JSON.parse(ls.get('featured') || 'null');
}

export function setFeaturedLs(data: FeaturedType[]): void {
  ls.set('featured', JSON.stringify(data));
}
