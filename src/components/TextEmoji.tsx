import emoji from 'emoji-store';

export function parseEmoji(emoji: string) {
  if (!emoji) return [''];
  // @ts-ignore
  let emojis = [...new Intl.Segmenter().segment(emoji)].map((x) => x.segment);
  return emojis;
}
export default function Emoji({ emoji: e = '😍' }) {
  return <img src={emoji(e)} loading='lazy' className='inline-block h-[1.3em] align-middle' />;
}
