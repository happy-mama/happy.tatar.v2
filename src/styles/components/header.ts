import styled from "styled-components";
import globals from "@/styles/globals";

const header = {
  container: styled.div`
    display: flex;
    justify-content: space-between;

    max-height: ${globals.size.height.header};

    padding: 0px 30px 0px 30px;

    z-index: ${globals.zIndex.header};
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

  text: styled.h5`
    margin: 0;

    color: ${globals.color.text.default};
    font-family: ${globals.fonts.Zain.extraLight};
    font-size: ${globals.size.text.big};

    transition: color 0.2s;

    cursor: pointer;
  `,
};

export default header;
