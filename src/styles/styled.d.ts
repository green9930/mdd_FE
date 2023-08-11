import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary01: string;
      primary02: string;
      primary03: string;
      primary04: string;
      text01: string;
      text02: string;
      text03: string;
      bg: string;
      error: string;
      transparent01: string;
      transparent02: string;
      transparent03: string;
      white: string;
      blue: string;
    };
  }
}
