import { styled } from "styled-components";
import { Link } from "react-router-dom";

import globals from "@/styles/globals";

const embedLink = {
  container: styled(Link)`
    display: flex;

    background-color: ${globals.color.bg.embedLink};
    text-decoration: none;

    color: var(--color-Header-Text);

    width: fit-content;
    height: fit-content;

    padding: 10px;
    border-radius: 6px;

    &:hover {
      filter: invert();
    }
  `,
  name: styled.div`
    color: ${globals.color.text.defaultInverted};

    font-family: ${globals.fonts.Inter.default};

    justify-self: center;
    align-self: center;
  `,
  img: styled.img`
    height: 25px;
    width: 25px;
  `,
};

export default embedLink;
