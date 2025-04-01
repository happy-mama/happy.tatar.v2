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
    border: 1px solid ${globals.color.bg.darkLite};

    background-color: ${globals.color.bg.transparent20};

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.large};
    line-height: ${globals.size.text.large};
  `,
  content: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    border-radius: 0px 0px 4px 4px;
    border: 1px solid ${globals.color.bg.darkLite};
    border-top: none;

    overflow: hidden;
  `,
  litHeader: styled.div`
    display: flex;
    align-items: center;

    padding-left: 14px;

    height: 40px;
    border-bottom: 1px solid ${globals.color.bg.darkMiddle};

    color: ${globals.color.text.default};
    font-size: ${globals.size.text.normal};
    font-family: ${globals.fonts.Inter.default};
  `,
  checkBox: styled.input`
    accent-color: ${globals.color.bg.darkLite};
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

    background: ${globals.color.bg.darkStrong};
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
  footer: styled.div`
    padding-left: 10px;
    padding-bottom: 10px;
  `,
};

export default passgen;
