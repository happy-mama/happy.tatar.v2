import styled from "styled-components";
import globals from "../globals";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 50px;

  padding: 50px 100px 50px 100px;
`;

export const ItemHeader = styled.div`
  display: flex;
  height: 30%;

  align-items: center;

  padding: 0px 10px 0px 10px;

  border-bottom: 1px solid ${globals.color.bg.darkMiddle};

  transition: inherit;
`;

export const Item = styled(Link)`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: fit-content;

  border: 1px solid ${globals.color.bg.darkMiddle};
  border-radius: 5px;

  background: ${globals.color.bg.transparent20};

  text-decoration: none;
  transition: all 0.5s;
  cursor: pointer;

  &:hover {
    border: 1px solid ${globals.color.bg.darkLite};

    transform: translate(-5px);

    ${ItemHeader} {
      border-bottom: 1px solid ${globals.color.bg.darkLite};
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  flex: 1;

  padding: 10px;
`;
