import useNotificationStore, {
  NotificationMessage,
} from "@/store/notification";
import { useEffect } from "react";
import { expireMessage } from "./kit";

import notification from "@/styles/components/notifications";
import utils from "@/styles/utils";

import successSVG from "@/assets/svg/success.svg";
import warningSVG from "@/assets/svg/warning.svg";
import dangerSVG from "@/assets/svg/danger.svg";

const SVG = {
  success: successSVG,
  warning: warningSVG,
  danger: dangerSVG,
};

const Notifications = () => {
  const { messages, setMessages } = useNotificationStore(
    ({ messages, setMessages }) => ({ messages, setMessages })
  );

  useEffect(() => {
    let changed = false;
    const newMessages: NotificationMessage[] = [];

    for (const message of messages) {
      if (!message.timeout && !message.isExpired) {
        changed = true;
        newMessages.push({
          ...message,
          timeout: setTimeout(() => {
            expireMessage(message, setMessages);
          }, message.expiresIn),
        });
      } else {
        newMessages.push(message);
      }
    }

    if (changed) {
      setMessages(newMessages);
    }
  }, [messages, setMessages]);

  return (
    <notification.container>
      {messages.map((message, i) => {
        return (
          <notification.item
            $hide={message.isExpired}
            $color={message.type}
            key={i}
          >
            <notification.iconBg $color={message.type}>
              <notification.itemIcon src={SVG[message.type]} />
            </notification.iconBg>
            <notification.textBg>
              <utils.text $color="default" $size="lite">
                {message.text}
              </utils.text>
            </notification.textBg>
          </notification.item>
        );
      })}
    </notification.container>
  );
};

export default Notifications;
