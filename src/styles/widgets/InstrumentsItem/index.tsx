import { Item, ItemContent, ItemHeader } from "@/styles/pages/instruments";
import utils from "@/styles/utils";

interface InstrumentsItem {
  header: JSX.Element | string;
  content: JSX.Element | string;
  to: string;
}

const InstrumentsItem = (props: InstrumentsItem) => {
  return (
    <Item to={props.to}>
      <ItemHeader>
        <utils.text $color="default" $size="large">
          {props.header}
        </utils.text>
      </ItemHeader>
      <ItemContent>
        <utils.text $color="default" $size="lite">
          {props.content}
        </utils.text>
      </ItemContent>
    </Item>
  );
};

export default InstrumentsItem;
