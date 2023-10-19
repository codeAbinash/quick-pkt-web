import emoji from 'emoji-store';

export function parseEmoji(emoji: string) {
  if (!emoji) return [''];
  // @ts-ignore
  let emojis = [...new Intl.Segmenter().segment(emoji)].map((x) => x.segment);
  return emojis;
}
export default function TextEmoji({ emoji: e = '😍' }) {
  return <img src={emoji(e)} loading='lazy' className='inline-block aspect-square h-[1.2em] align-middle' />;
}
