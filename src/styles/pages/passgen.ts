import styled from "styled-components";
import globals from "../globals";

const passgen = {
  container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    max-height: calc(100vh - 142px);
    margin: 10px 40px 0px 40px;

    border-radius: 4px;

    transition: 0.2s;
  `,
  header: styled.div`
    padding: 5px 0px 5px 20px;
    border-radius: 4px 4px 0px 0px;

    background: linear-gradient(
      30deg,
      ${globals.color.bg.blueNuclear},
      ${globals.color.bg.blueStrong}
    );

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.large};
    line-height: ${globals.size.text.large};
  `,
  content: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    overflow: hidden;
  `,
  litHeader: styled.div`
    display: flex;
    align-items: center;

    height: 40px;
    border-bottom: 1px solid ${globals.color.bg.blueNuclear};

    color: ${globals.color.text.default};
    font-size: ${globals.size.text.normal};
    font-family: ${globals.fonts.Inter.default};
  `,
  checkboxBody: styled.label`
    display: flex;

    margin-left: 10px;
  `,
  checkboxText: styled.div`
    margin-left: 10px;

    color: ${globals.color.text.default};
    font-size: ${globals.size.text.lite};
    font-family: ${globals.fonts.Inter.default};
  `,
  select: styled.select`
    border: none;
    border-radius: 4px;

    margin-left: 4px;

    color: ${globals.color.text.default};

    background: ${globals.color.bg.blueStrong};
  `,
  button: styled.div`
    display: flex;
    align-items: center;

    padding: 0px 4px 0px 4px;
    min-height: 24px;
    width: fit-content;

    border: 1px solid ${globals.color.bg.blueStrong};
    border-radius: 4px;
    background: linear-gradient(
      50deg,
      ${globals.color.bg.blueNuclear},
      ${globals.color.bg.blueLite}
    );

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.small};
    line-height: ${globals.size.text.small};

    transition: 0.5s;
    cursor: pointer;

    &:hover {
      border: 1px solid ${globals.color.bg.blueNuclear};
    }
  `,
  password: styled.div`
    display: flex;

    height: 20px;
    margin: 20px 0px 20px 10px;

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.lite};
    line-height: ${globals.size.text.small};
  `,
};

export default passgen;
