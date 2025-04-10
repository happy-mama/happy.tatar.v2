import { Container } from "@/styles/pages/instruments";
import utils from "@/styles/utils";
import InstrumentsItem from "@/styles/widgets/InstrumentsItem";

const Instruments = () => {
  return (
    <Container>
      <InstrumentsItem
        header="FS"
        to="/i/fs"
        content={
          <>
            Find, download, upload... this is a{" "}
            <utils.embedText>file server</utils.embedText>
          </>
        }
      />

      <InstrumentsItem
        to="/i/passgen"
        header="PassGen"
        content="Genereate a strong password"
      />

      <InstrumentsItem
        to="/i/calc"
        header="Calculator"
        content="Calculate numbers..."
      />

      <InstrumentsItem
        to="/i/canvas"
        header="Canvas drawer"
        content="A small canvas on which you can draw and edit shapes"
      />

      <InstrumentsItem
        to="/r"
        header="Link shortener"
        content="Create a short link for a long URL"
      />

      <InstrumentsItem
        to="/i/clicker"
        header="Clicker"
        content="Just a 1 min game"
      />
    </Container>
  );
};

export default Instruments;
