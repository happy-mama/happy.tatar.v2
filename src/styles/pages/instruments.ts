import styled from "styled-components";
import globals from "../globals";
import { Link } from "react-router-dom";

const instruments = {
  container: styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: 50px;

    padding: 50px 100px 50px 100px;
  `,

  item: styled(Link)`
    display: flex;
    flex-direction: column;

    width: 300px;
    height: fit-content;

    border: 1px solid ${globals.color.bg.blueLite};
    border-radius: 5px;

    background: linear-gradient(
      60deg,
      ${globals.color.bg.blueHard},
      ${globals.color.bg.blueStrong}
    );

    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      border: 1px solid ${globals.color.bg.blueNuclear};

      transform: translate(-5px);
    }
  `,

  itemHeader: styled.div`
    display: flex;
    height: 30%;

    align-items: center;

    padding: 0px 10px 0px 10px;
  `,
  itemContent: styled.div`
    display: flex;
    flex: 1;

    padding: 10px;
  `,
};

export default instruments;
