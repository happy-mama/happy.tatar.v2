import header from "@/styles/components/header";
import utils from "@/styles/utils";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header.container>
      {location.pathname !== "/" ? (
        <utils.silentLink to="/">
          <header.item>
            <header.text>Home</header.text>
          </header.item>
        </utils.silentLink>
      ) : (
        <div></div>
      )}

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
