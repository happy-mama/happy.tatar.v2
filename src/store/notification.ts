import { create } from "zustand";
import { v4 as uuid } from "uuid";

export type NotificationMessage = {
  type: "success" | "warning" | "danger";
  position: "topMiddle";
  text: string;
  isExpired: boolean;
  isHided: boolean;
  expiresIn: number; // time in ms
  timeout?: NodeJS.Timeout;
  uuid: string;
};

// STORE

// values that can be reseted
export type NotificationResetableValues = {
  messages: NotificationMessage[];
};
// values that can't be reseted
export type NotificationUnResetableValues = object;
// all values
export interface NotificationValues
  extends NotificationResetableValues,
    NotificationUnResetableValues {}
// store mutators
export type NotificationMutators = {
  setMessages: (
    e: NotificationMessage[] | null,
    todo?: (e: NotificationMessage[]) => NotificationMessage[] | null
  ) => void;
  addMessage: (e: {
    expiresIn?: NotificationMessage["expiresIn"];
    type?: NotificationMessage["type"];
    position?: NotificationMessage["position"];
    text?: NotificationMessage["text"];
  }) => void;
};
// all in one
export interface NotificationStore
  extends NotificationValues,
    NotificationMutators {
  Set: (
    partial:
      | NotificationStore
      | Partial<NotificationStore>
      | ((
          state: NotificationStore
        ) => NotificationStore | Partial<NotificationStore>),
    replace?: boolean | undefined
  ) => void;
  Get: () => NotificationStore;

  reset: () => void;
}

// store resetable values
const resetable_values: NotificationResetableValues = {
  messages: [],
};

const useNotificationStore = create<NotificationStore>((set, get) => ({
  ...structuredClone(resetable_values),

  setMessages: (e, todo) => {
    if (todo) {
      e = todo(get().messages);
    }

    if (e) {
      set({ messages: [...e] });
    }
  },
  addMessage: e => {
    const m: NotificationMessage = {
      expiresIn: 5000,
      position: "topMiddle",
      text: "",
      type: "warning",
      isExpired: false,
      isHided: false,
      uuid: uuid(),
      ...e,
    };

    set({ messages: [...get().messages, m] });
  },

  Set: set,
  Get: get,

  reset: () => {
    set(structuredClone(resetable_values));
  },
}));

export default useNotificationStore;
