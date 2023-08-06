import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/colors";

function App() {
  const queryClient = new QueryClient();

  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsLightMode(!isDarkMode);
  }, [isLightMode]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
