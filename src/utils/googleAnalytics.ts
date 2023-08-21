import ReactGA from "react-ga4";

type LogType = {
  action: string;
  category: string;
  label: string;
};

export const initGA = () => {
  ReactGA.initialize(`${process.env.REACT_APP_GA_TRACKING_ID}`);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname.split("/")[1] });
  // ReactGA.set({ page: window.location.pathname });
  ReactGA.send("pageview");
};

export const logClickEvent = (target: LogType) => {
  ReactGA.event({
    action: target.action, // 이벤트명
    category: target.category, // event_category
    label: target.label, // event_label
  });
};
