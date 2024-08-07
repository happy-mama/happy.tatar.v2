import header from "@/styles/components/header";
import logo from "@/assets/svg/logo.svg";
import utils from "@/styles/utils";

const Header = () => {
  return (
    <header.container>
      <header.logo>
        <header.silentLink to="/">
          <header.icon src={logo} />
        </header.silentLink>
      </header.logo>

      <header.itemList>
        <utils.silentLink to="/i">
          <header.item>
            <header.text>instruments</header.text>
          </header.item>
        </utils.silentLink>
      </header.itemList>
    </header.container>
  );
};

export default Header;
