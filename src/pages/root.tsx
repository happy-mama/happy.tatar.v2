import { useEffect, useState } from "react";

import root from "@/styles/root";
import EmbedLink from "@/widgets/EmbedLink";
import utils from "@/styles/utils";
import githubSVG from "@/assets/svg/github.svg";
import telegramSVG from "@/assets/svg/telegram.svg";
import useNotificationStore from "@/store/notification";
import Wave from "@/components/wave";

const SPLASHES = [
  "Now with 0% sugar!",
  "Also try guzlik.ru",
  "Touch the grass",
  "Reactive!",
  "GODMODE!",
  "PHP not detected",
  "Random splash... omg",
  "Rodik was here",
  "0% brainrot!",
  "Seeeeeecret Friday update!",
  "Zustand forever!",
  "Internet enabled!",
  "BOO! sory :)",
  "Haha, LOL!",
  "So fresh, so clean!",
  "Check out the far lands!",
  "Plants vs zombies!",
  "Water proof!",
  "Rerender safe!",
  "Why am I here?",
  "nginx bro",
  "cloudflare bro",
  "Instruments page is above me",
  "Try click me!",
];

const Home = () => {
  const { addMessage } = useNotificationStore(({ addMessage }) => ({
    addMessage,
  }));

  const [curSplash, setSplash] = useState("");

  const handleSplashChange = () => {
    setSplash(SPLASHES[Math.floor(Math.random() * SPLASHES.length)]);
  };

  useEffect(() => {
    handleSplashChange();
  }, []);

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
        <root.splash onClick={handleSplashChange}>{curSplash}</root.splash>
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
                <utils.text $size="small" $color="default">
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
                <utils.text $size="small" $color="default">
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
