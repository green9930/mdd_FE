import { DiskBtnType } from "../../types/diskTypes";
import { lightTheme } from "../../styles/colors";

import { ReactComponent as Like } from "../../assets/svg/like.svg";
import { ReactComponent as Pen } from "../../assets/svg/pen.svg";
import { ReactComponent as BookmarkEmpty } from "../../assets/svg/bookmark_empty.svg";
import { ReactComponent as BookmarkFilled } from "../../assets/svg/bookmark_filled.svg";
import { ReactComponent as Text } from "../../assets/svg/text.svg";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";

const IconConverter = (name: DiskBtnType, isBookmark: boolean) => {
  switch (name) {
    case "like":
      return <Like fill={lightTheme.colors.white} />;
    case "edit":
      return <Pen fill={lightTheme.colors.white} />;
    case "delete":
      return <Trash fill={lightTheme.colors.white} />;
    case "bookmark":
      return isBookmark ? (
        <BookmarkFilled fill={lightTheme.colors.white} />
      ) : (
        <BookmarkEmpty stroke={lightTheme.colors.white} />
      );
    case "mode":
      return <Text fill={lightTheme.colors.white} />;
    default:
      return;
  }
};

export default IconConverter;
