import root from "@/styles/root";
import EmbedLink from "@/widgets/EmbedLink";
import utils from "@/styles/utils";

import githubSVG from "@/assets/svg/github.svg";
import telegramSVG from "@/assets/svg/telegram.svg";
import useNotificationStore from "@/store/notification";
import Wave from "@/components/wave";

const Home = () => {
  const { addMessage } = useNotificationStore(({ addMessage }) => ({
    addMessage,
  }));

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    addMessage({
      expiresIn: 5000,
      text: "Copied!",
      type: "success",
    });
  };

  return (
    <root.container>
      <root.header>
        <utils.text $color="default" $size="large">
          I am a fullstack dev
        </utils.text>
      </root.header>

      <root.footer>
        <Wave />
        <root.box>
          <utils.inlineElements>
            <EmbedLink
              url="https://github.com/happy-mama"
              name="GitHub"
              img={githubSVG}
              target="_blank"
            />

            <EmbedLink
              url="https://t.me/rod1ck"
              name="Telegram"
              img={telegramSVG}
              target="_blank"
            />
          </utils.inlineElements>

          <utils.spacer $height="15px" />
          <utils.bgHoverHighLighter onClick={() => handleCopy("nan_aaa")}>
            <utils.cursorPointer>
              <utils.inlineElements>
                <utils.text $size="small" $color="dark">
                  Discord:
                </utils.text>
                <utils.text $size="small" $color="link">
                  nan_aaa
                </utils.text>
              </utils.inlineElements>
            </utils.cursorPointer>
          </utils.bgHoverHighLighter>

          <utils.spacer $height="15px" />
          <utils.bgHoverHighLighter
            onClick={() => handleCopy("any@happy.tatar")}
          >
            <utils.cursorPointer>
              <utils.inlineElements>
                <utils.text $size="small" $color="dark">
                  eMail:
                </utils.text>
                <utils.text $size="small" $color="link">
                  any@happy.tatar
                </utils.text>
              </utils.inlineElements>
            </utils.cursorPointer>
          </utils.bgHoverHighLighter>
        </root.box>
      </root.footer>
    </root.container>
  );
};

export default Home;
