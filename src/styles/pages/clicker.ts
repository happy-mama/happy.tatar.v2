import styled from "styled-components";
import globals from "../globals";

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: calc(100vh - ${globals.size.height.header});

  transition: all 0.1s;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const BackgroundImg = styled.img`
  position: absolute;

  width: 80%;
  max-width: 900px;
  padding-inline: 10%;

  cursor: pointer;
`;

const FieldContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;

  width: 100%;

  @keyframes mouse {
    0% {
      transform: rotate(0deg);
    }

    10% {
      transform: rotate(10deg);
    }

    20% {
      transform: rotate(0deg);
    }
  }

  @keyframes rocket {
    0% {
      rotate: 5deg;
    }

    5% {
      top: -150px;
    }

    7% {
      rotate: 180deg;
      top: -150px;
    }

    8% {
      rotate: 360deg;
      top: -150px;
    }

    9% {
      rotate: 180deg;
    }

    10% {
      rotate: 360deg;
    }

    11% {
      rotate: 0deg;
      top: -150px;
    }

    15% {
      top: 0px;
    }
  }

  @keyframes worm {
    0% {
      transform: translate(0px);
    }

    50% {
      transform: translate(100px);
    }

    100% {
      transform: translate(0px);
    }
  }

  @keyframes ptenec {
    0% {
      transform: scaleX(1);
    }

    40% {
      transform: scaleX(1);
    }

    50% {
      transform: scaleX(-1);
    }

    90% {
      transform: scaleX(-1);
    }

    100% {
      transform: scaleX(1);
    }
  }

  @keyframes windmill {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const FieldUpgradeImg = styled.img<{
  $x: number;
  $y: number;
  $name: string;
  $time: number;
}>`
  position: absolute;

  width: 5%;

  top: ${props => props.$y}px;
  left: ${props => props.$x}px;

  animation: ${props => props.$name} ${props => props.$time}s infinite
    ease-in-out;
`;

const FieldImg = styled.img`
  width: 100%;
`;

const CoinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  align-items: center;
  justify-content: center;
  margin-inline: auto;

  height: fit-content;
  width: 250px;
`;

const UpgradesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  align-items: center;
  justify-content: center;

  margin-right: auto;

  height: fit-content;

  background-color: ${globals.color.bg.darkStrong};
  border-radius: 4px;
  border: 1px solid ${globals.color.bg.darkMiddle};

  z-index: +1;
`;

const UpgradeItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin: 10px;

  background-color: ${globals.color.bg.darkMiddle};
  border-radius: 4px;

  width: 100px;

  cursor: pointer;

  &:hover {
    background-color: ${globals.color.bg.darkLite};
  }
`;

const UpgradeImg = styled.img`
  width: 80px;
`;

const WinContainer = styled.div`
  width: 300px;

  margin-inline: auto;
`;

export {
  Container,
  BackgroundImg,
  Body,
  CoinsContainer,
  FieldContainer,
  FieldUpgradeImg,
  FieldImg,
  UpgradesContainer,
  UpgradeImg,
  UpgradeItem,
  WinContainer,
};
