import { useEffect, useState } from "react";

import { activateUpgrade, Upgrade, UpgradeNames } from "./slices/upgrades";

import {
  Body,
  Container,
  BackgroundImg,
  CoinsContainer,
  FieldContainer,
  FieldImg,
  UpgradesContainer,
  UpgradeItem,
  UpgradeImg,
  FieldUpgradeImg,
  WinContainer,
} from "@/styles/pages/clicker";
import utils from "@/styles/utils";

import { useAppDispatch, useAppSelector } from "./store";
import { addCoins, setCoins } from "./slices/coins";

import mainIMG from "./assets/main.webp";
import coinsIMG from "./assets/coins.webp";
import fieldIMG from "./assets/field.webp";

import mouseIMG from "./assets/upgrade_mouse.webp";
import rocketIMG from "./assets/upgrade_rocket.webp";
import wormIMG from "./assets/upgrade_worm.webp";
import ptenecIMG from "./assets/upgrade_ptenec.webp";
import windmillIMG from "./assets/upgrade_windmill.webp";

const UPGRADESIMG: {
  [key in UpgradeNames]: string;
} = {
  mouse: mouseIMG,
  rocket: rocketIMG,
  worm: wormIMG,
  ptenec: ptenecIMG,
  windmill: windmillIMG,
};

const ClickerRender = () => {
  const coins = useAppSelector(state => state.coins.value);
  const upgrades = useAppSelector(state => state.upgrades);
  const dispatch = useAppDispatch();

  const [win, setWin] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addCoins(upgrades.result.cps));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [upgrades.result.cps]);

  const handleBuyUpgrade = (upgrade: Upgrade) => {
    if (coins >= upgrade.price) {
      dispatch(setCoins(coins - upgrade.price));
      dispatch(activateUpgrade(upgrade.name));

      if (upgrade.name == "windmill") setWin(true);
    }
  };

  let count = 0;

  return (
    <Container>
      <BackgroundImg
        src={mainIMG}
        onClick={() => dispatch(addCoins(1))}
        draggable={false}
      />
      <Body>
        <CoinsContainer>
          <utils.img $height="50px" src={coinsIMG} draggable={false} />
          <utils.text $size="large">{coins}</utils.text>
        </CoinsContainer>
        <UpgradesContainer>
          {Object.values(upgrades.all)
            .filter(upgrade => {
              if (upgrade.active) return false;
              count++;
              if (count > 4) return false;
              return true;
            })
            .map((upgrade, i) => {
              return (
                <UpgradeItem key={i} onClick={() => handleBuyUpgrade(upgrade)}>
                  <UpgradeImg src={UPGRADESIMG[upgrade.name]} />
                  <utils.text $size="small">{upgrade.name}</utils.text>
                  <utils.spacer $height="5px" />
                  <utils.text $size="small">{upgrade.price} coins</utils.text>
                </UpgradeItem>
              );
            })}
        </UpgradesContainer>
        {win && (
          <WinContainer>
            <utils.block>
              <utils.text>You won!!!</utils.text>
              <utils.text>Thanks for playing :)</utils.text>
            </utils.block>
          </WinContainer>
        )}
      </Body>
      <FieldContainer>
        <FieldImg src={fieldIMG} draggable={false} />
        {Object.values(upgrades.all)
          .filter(upgrade => upgrade.active)
          .map((upgrade, i) => (
            <FieldUpgradeImg
              key={i}
              $name={upgrade.name}
              $time={upgrade.animationTime}
              src={UPGRADESIMG[upgrade.name]}
              $x={upgrade.position.x}
              $y={upgrade.position.y}
              draggable={false}
            />
          ))}
      </FieldContainer>
    </Container>
  );
};

export default ClickerRender;
