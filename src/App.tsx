import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import { useRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/colors";
import { lightThemeState } from "./state/atom";

function App() {
  const queryClient = new QueryClient();

  const [isLightTheme, setIsLightTheme] = useRecoilState(lightThemeState);

  useEffect(() => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    // setIsLightTheme(!isDarkMode);
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
