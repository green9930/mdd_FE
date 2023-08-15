export const MOBILE_MAX_W = 601;
export const TABLET_MAX_W = 1024;
export const WINDOW_W =
  window.innerWidth > MOBILE_MAX_W ? MOBILE_MAX_W : window.innerWidth;
export const WINDOW_H = window.innerHeight;

export const calcRem = (size: number) => `${size / 14}rem`;

export const fontTheme = {
  headline01: {
    lineHeight: `${calcRem(44)}`,
    letterSpacing: `${calcRem(0.72)}`,
    fontSize: `${calcRem(36)}`,
    fontWeight: 700,
  },
  display01: {
    lineHeight: `${calcRem(24)}`,
    letterSpacing: `${calcRem(0.15)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 500,
  },
  display02: {
    lineHeight: `${calcRem(24)}`,
    letterSpacing: `${calcRem(0.15)}`,
    fontSize: `${calcRem(20)}`,
    fontWeight: 500,
  },
  body01: {
    lineHeight: `${calcRem(28)}`,
    letterSpacing: `${calcRem(0.44)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 400,
  },
  body02: {
    lineHeight: `${calcRem(20)}`,
    letterSpacing: `${calcRem(0.25)}`,
    fontSize: `${calcRem(14)}`,
    fontWeight: 400,
  },
  subtitle02: {
    lineHeight: `${calcRem(24)}`,
    letterSpacing: `${calcRem(0.1)}`,
    fontSize: `${calcRem(14)}`,
    fontWeight: 700,
  },
  button: {
    lineHeight: `${calcRem(17)}`,
    letterSpacing: `${calcRem(1.35)}`,
    fontSize: `${calcRem(16)}`,
    fontWeight: 700,
  },
  caption: {
    lineHeight: `${calcRem(16)}`,
    letterSpacing: `${calcRem(0.24)}`,
    fontSize: `${calcRem(12)}`,
    fontWeight: 400,
  },
};
