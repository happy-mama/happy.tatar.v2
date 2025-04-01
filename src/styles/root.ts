import styled from "styled-components";
import globals from "./globals";

const root = {
  container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,

  header: styled.div`
    padding-left: 20px;
  `,

  box: styled.div`
    display: flex;
    flex-direction: column;
  `,

  footer: styled.div`
    display: flex;

    gap: 20px;

    max-width: 100vw;
    margin-top: auto;

    padding: 0px 20px 20px 20px;
  `,

  info: styled.div`
    display: flex;
    flex-direction: column;

    margin-left: auto;
    margin-top: auto;

    padding: 30px;
  `,

  splash: styled.div`
    display: flex;
    position: fixed;

    top: 130px;
    right: 60px;

    color: ${globals.color.text.default};
    font-size: 30px;
    font-family: ${globals.fonts.Zain.extraBold};

    rotate: 10deg;

    animation: splash-rotate 4s infinite ease-in-out,
      splash-size 6s infinite ease-in-out;

    cursor: pointer;

    @keyframes splash-size {
      0% {
        font-size: 32px;
      }
      50% {
        font-size: 30px;
      }
      100% {
        font-size: 32px;
      }
    }

    @keyframes splash-rotate {
      0% {
        transform: rotate(5deg);
      }

      50% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(5deg);
      }
    }
  `,
};

export default root;
