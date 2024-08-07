import styled from "styled-components";
import globals from "@/styles/globals";
import { Link } from "react-router-dom";

const header = {
  container: styled.div`
    padding: 20px 30px 20px 30px;

    display: flex;
    justify-content: space-between;

    z-index: ${globals.zIndex.header};
  `,

  silentLink: styled(Link)`
    text-decoration: none;
    height: 26px;

    :hover {
      color: ${globals.color.text.link};

      * {
        color: ${globals.color.text.link};
      }
    }
  `,

  logo: styled.div`
    display: flex;
    align-items: center;
  `,

  itemList: styled.div`
    display: flex;
    gap: 30px;

    @media (max-width: 900px) {
      gap: 10px;
    }
  `,

  item: styled.div`
    padding: 10px 10px 10px 10px;
  `,

  icon: styled.img`
    height: 30px;
  `,

  text: styled.h5`
    cursor: pointer;

    font-family: ${globals.fonts.Zain.extraLight};
    font-size: ${globals.size.text.big};
    margin: 0;

    color: ${globals.color.text.default};
  `,
};

export default header;
