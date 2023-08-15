import { SettingIconType } from "./Settings";

import { ReactComponent as Letter } from "../../assets/svg/letter.svg";
import { ReactComponent as Heart } from "../../assets/svg/heart.svg";
import { ReactComponent as Candles } from "../../assets/svg/candles.svg";
import { ReactComponent as Logout } from "../../assets/svg/logout.svg";

const IconConverter = (name: SettingIconType) => {
  switch (name) {
    case "letter":
      return <Letter />;
    case "heart":
      return <Heart />;
    case "candles":
      return <Candles />;
    case "logout":
      return <Logout />;
    default:
      return;
  }
};

export default IconConverter;
