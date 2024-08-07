export type Globals = {
  color: {
    text: {
      default: string;
      defaultInverted: string;
      success: string;
      warning: string;
      danger: string;
      link: string;
      dark: string;
    };
    bg: {
      blueLite: string;
      blueStrong: string;
      blueHard: string;
      blueNuclear: string;
      highlite: string;
      embedText: string;
      embedLink: string;
      notification: string;
      fsInput: string;
    };
  };
  fonts: {
    Zain: {
      extraBold: string;
      light: string;
      extraLight: string;
    };
    Inter: {
      default: string;
    };
  };

  size: {
    text: {
      small: string;
      lite: string;
      normal: string;
      big: string;
      large: string;
    };
  };

  zIndex: {
    header: string;
    notification: string;
  };
};

const globals: Globals = {
  color: {
    text: {
      default: "rgba(239, 246, 255, 0.9)",
      defaultInverted: "rgba(16, 9, 0, 0.9)",
      success: "rgba(77, 208, 37, 0.9)",
      warning: "rgba(255, 218, 31, 0.9)",
      danger: "rgba(255, 35, 35, 0.9)",
      link: "rgba(73, 185, 255, 0.9)",
      dark: "rgba(93, 93, 93, 0.9)",
    },
    bg: {
      blueLite: "rgba(0, 66, 220, 0.9)",
      blueStrong: "rgba(15, 67, 180, 0.9)",
      blueHard: "rgba(0, 27, 126, 0.9)",
      blueNuclear: "rgba(0, 123, 255, 0.9)",
      highlite: "rgba(0, 8, 56, 0.9)",
      embedText: "rgba(63, 63, 63, 0.85)",
      embedLink: "rgba(255, 255, 255, 0.85)",
      notification: "rgba(54, 54, 54, 0.9)",
      fsInput: "rgba(47, 47, 47, 0.2)",
    },
  },

  fonts: {
    Zain: {
      extraBold: `"Zain/ExtraBold"`,
      light: `"Zain/Light"`,
      extraLight: `"Zain/ExtraLight"`,
    },
    Inter: {
      default: `"Inter"`,
    },
  },

  size: {
    text: {
      small: "16px",
      lite: "20px",
      normal: "24px",
      big: "30px",
      large: "38px",
    },
  },

  zIndex: {
    header: "1000",
    notification: "1500",
  },
};

export default globals;
