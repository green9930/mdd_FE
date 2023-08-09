export const MOBILE_MAX_W = 601;
export const TABLET_MAX_W = 1024;
export const WINDOW_W =
  window.innerWidth > MOBILE_MAX_W ? MOBILE_MAX_W : window.innerWidth;
export const WINDOW_H = window.innerHeight;

export const calcRem = (size: number) => `${size / 14}rem`;

export const fontTheme = {
  headline01: {
    letterSpacing: "0.72px",
    lineHeight: `${calcRem(44)}`,
    fontSize: `${calcRem(36)}`,
    fontWeight: 700,
  },
  display01: {
    letterSpacing: `${calcRem(0.15)}`,
    lineHeight: `${calcRem(24)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 500,
  },
  body01: {
    letterSpacing: `${calcRem(0.44)}`,
    lineHeight: `${calcRem(28)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 400,
  },
  body02: {
    letterSpacing: `${calcRem(0.25)}`,
    lineHeight: `${calcRem(20)}`,
    fontSize: `${calcRem(14)}`,
    fontWeight: 400,
  },
  button: {
    letterSpacing: `${calcRem(1.35)}`,
    lineHeight: `${calcRem(17)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 700,
  },
  caption: {
    letterSpacing: `${calcRem(0.24)}`,
    lineHeight: `${calcRem(16)}`,
    fontSize: `${calcRem(12)}`,
    fontWeight: 400,
  },
};
