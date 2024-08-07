import { NotificationMessage, NotificationStore } from "@/store/notification";

export const expireMessage = (
  message: NotificationMessage,
  setMessages: NotificationStore["setMessages"]
) => {
  setMessages([], messages => {
    return messages.map(msg => {
      if (msg.uuid == message.uuid) {
        msg.isExpired = true;
        msg.timeout = setTimeout(() => {
          makeMessageRemovable(message, setMessages);
        }, 1000);
      }

      return msg;
    });
  });
};

export const makeMessageRemovable = (
  message: NotificationMessage,
  setMessages: NotificationStore["setMessages"]
) => {
  let currentMessages: NotificationMessage[] = [];

  setMessages([], messages => {
    currentMessages = messages.map(msg => {
      if (msg.uuid == message.uuid) {
        msg.isHided = true;
      }

      return msg;
    });

    return currentMessages;
  });

  tryToClearNotifications(currentMessages, setMessages);
};

export const tryToClearNotifications = (
  messages: NotificationMessage[],
  setMessages: NotificationStore["setMessages"]
) => {
  let canClear = true;

  for (const message of messages) {
    if (!message.isHided) {
      canClear = false;
    }
  }

  if (canClear) {
    setMessages([], () => {
      return [];
    });
  }
};
