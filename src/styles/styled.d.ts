import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      backgroundLight: string;
      backgroundGray: string;
      textPrimary: string;
      backgroundOffWhite: string;
      white: string;
      lightBlue: string;
      lightBlueBorder: string;
      backdrop: string;
      lightPrimary: string;
      lightAccent: string;
    };
    media: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
