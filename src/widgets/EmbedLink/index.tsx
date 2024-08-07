import embedLink from "@/styles/widgets/EmbedLink";
import utils from "@/styles/utils";

interface input {
  name?: string;
  url: string;
  img?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export default function EmbedLink(input: input) {
  return (
    <utils.ttMagic>
      <embedLink.container to={input.url} target={input.target || ""}>
        <embedLink.img src={input.img} />
        {input.img ? <utils.spacer $width="5px" /> : <></>}
        <embedLink.name>{input.name}</embedLink.name>
      </embedLink.container>
    </utils.ttMagic>
  );
}
