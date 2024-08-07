import notFound from "@/styles/pages/notFound";
import utils from "@/styles/utils";

import { useNavigate } from "react-router-dom";

import NotFoundSVG from "@/assets/svg/404.svg";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReturnToMain = () => {
    navigate("/");
  };

  return (
    <notFound.container>
      <utils.img $width="200px" src={NotFoundSVG}></utils.img>

      <div>
        <utils.text $color="default" $size="large">
          There is nothing here
        </utils.text>

        <utils.inlineElements>
          <utils.bgHoverHighLighter onClick={() => handleGoBack()}>
            <utils.cursorPointer>
              <utils.text $color="link" $size="lite">
                go back
              </utils.text>
            </utils.cursorPointer>
          </utils.bgHoverHighLighter>

          <utils.spacer $width="10px" />

          <utils.bgHoverHighLighter onClick={() => handleReturnToMain()}>
            <utils.cursorPointer>
              <utils.text $color="link" $size="lite">
                return to <utils.embedText>"/"</utils.embedText>
              </utils.text>
            </utils.cursorPointer>
          </utils.bgHoverHighLighter>
        </utils.inlineElements>
      </div>
    </notFound.container>
  );
};

export default NotFound;
