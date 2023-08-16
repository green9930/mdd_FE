export const RANDOM_DISK_NAME_LIST = [
  `상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡`,
  `내가 좋아한 음악 앨범 Top4 (๑′ᴗ‵๑)`,
  `이번달 네컷사진 Top4 ✌(‘ω’✌)`,
  `내가 가장 좋아했던 하늘 ☁️`,
  `우리집 고양이 자랑할래 |• - '•)و✧`,
  `이번 달 문화생활 (๓° ˘ °๓)`,
  `내 베스트 프랜드 Top4 (*˘◡˘*)`,
  `이번 주 베스트 소비 💸`,
  `또 먹고싶은 음식 Top4 🍽`,
];

export const getRandomName = () => {
  const randomNum = Math.floor(Math.random() * RANDOM_DISK_NAME_LIST.length);
  return RANDOM_DISK_NAME_LIST[randomNum];
};
