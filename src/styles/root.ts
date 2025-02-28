import styled from "styled-components";

const root = {
  container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,

  header: styled.div`
    padding-left: 20px;
  `,

  box: styled.div`
    display: flex;
    flex-direction: column;
  `,

  footer: styled.div`
    display: flex;

    gap: 20px;

    max-width: 100vw;
    margin-top: auto;

    padding: 0px 20px 20px 20px;
  `,

  info: styled.div`
    display: flex;
    flex-direction: column;

    margin-left: auto;
    margin-top: auto;

    padding: 30px;
  `,
};

export default root;
