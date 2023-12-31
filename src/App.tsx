import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";

import Router from "./router/Router";
import { lightThemeState } from "./state/atom";
import { getLoc, setLoc } from "./utils/localStorage";
import { darkTheme, lightTheme } from "./styles/colors";

function App() {
  const queryClient = new QueryClient();

  const [isLightTheme, setIsLightTheme] = useRecoilState(lightThemeState);

  useEffect(() => {
    const currentTheme = getLoc("theme");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        getLoc("theme") === "lightMode"
          ? `${lightTheme.colors.bg}`
          : `${darkTheme.colors.bg}`
      ); // 원하는 색상으로 변경
    }

    if (currentTheme) {
      setIsLightTheme(currentTheme === "lightMode");
      document.body.style.backgroundColor =
        currentTheme === "darkMode"
          ? darkTheme.colors.bg
          : lightTheme.colors.bg;
    } else {
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setLoc("theme", isDarkMode ? "darkMode" : "lightMode");
      setIsLightTheme(!isDarkMode);
      document.body.style.backgroundColor = isDarkMode
        ? darkTheme.colors.bg
        : lightTheme.colors.bg;
    }
  }, [isLightTheme]);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
