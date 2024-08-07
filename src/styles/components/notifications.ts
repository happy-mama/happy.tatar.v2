import styled from "styled-components";
import globals from "@/styles/globals";
import { NotificationMessage } from "@/store/notification";

type Item = {
  $hide: boolean;
  $color: NotificationMessage["type"];
};

type IconBG = {
  $color: NotificationMessage["type"];
};

const notification = {
  container: styled.div`
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;

    margin: 0px auto 0px auto;

    width: 500px;
    height: 40vh;

    pointer-events: none;
    z-index: ${globals.zIndex.notification};

    @media (max-width: 900px) {
      width: 90vw;
    }

    @keyframes show-notification {
      0% {
        transform: translate(100px);
        opacity: 0;
      }
      90% {
        transform: translate(-10px);
      }
      100% {
        transform: translate(0px);
        opacity: 1;
      }
    }

    @keyframes hide-notification {
      0% {
        opacity: 1;
      }
      10% {
        transform: translate(10px);
      }
      100% {
        transform: translate(-100px);
        opacity: 0;
      }
    }
  `,

  item: styled.div<Item>`
    display: flex;

    align-items: center;
    margin: ${props => (props.$hide ? "0px 0px 0px 0px" : "0px 0px 10px 0px")};

    overflow: hidden;

    border-bottom: ${props => (props.$hide ? "0px" : "2px")} solid
      ${props => globals.color.text[props.$color]};

    height: ${props => (props.$hide ? "0px" : "40px")};
    opacity: ${props => (props.$hide ? "0" : "1")};

    animation: ${props =>
      props.$hide ? "hide-notification 0.7s" : "show-notification 0.7s"};

    transition: height 0.3s 0.7s, margin 0.3s 0.7s, border-bottom 0.3s 0.7s;
  `,

  iconBg: styled.div<IconBG>`
    display: flex;
    align-items: center;

    padding: 0px 0px 0px 0px;
    height: 100%;

    background-color: ${props => globals.color.text[props.$color]};
  `,

  itemIcon: styled.img`
    height: 20px;
  `,

  textBg: styled.div`
    display: flex;
    align-items: center;

    padding-left: 10px;

    background-color: ${globals.color.bg.notification};

    height: 100%;
    width: 100%;
  `,
};

export default notification;
