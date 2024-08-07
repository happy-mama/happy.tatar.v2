import instruments from "@/styles/pages/instruments";
import utils from "@/styles/utils";

interface InstrumentsItem {
  header: JSX.Element | string;
  content: JSX.Element | string;
  to: string;
}

const InstrumentsItem = (props: InstrumentsItem) => {
  return (
    <instruments.item to={props.to}>
      <instruments.itemHeader>
        <utils.text $color="default" $size="large">
          {props.header}
        </utils.text>
      </instruments.itemHeader>
      <instruments.itemContent>
        <utils.text $color="default" $size="lite">
          {props.content}
        </utils.text>
      </instruments.itemContent>
    </instruments.item>
  );
};

export default InstrumentsItem;
