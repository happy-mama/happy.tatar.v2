import header from "@/styles/components/header";
import utils from "@/styles/utils";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header.container>
      <header.silentLink to="/">
        <header.item>
          {location.pathname !== "/" && <header.text>Home</header.text>}
        </header.item>
      </header.silentLink>

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
