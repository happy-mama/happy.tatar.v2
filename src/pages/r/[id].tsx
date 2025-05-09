import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import utils from "@/styles/utils";
import config from "@/config.json";
import NotFound from "../404";

type RedirectData = {
  url: string;
  key: string;
  redirected: number;
};

const RedirectById = () => {
  const [once, setOnce] = useState(true);
  const [redirectData, setRedirectData] = useState<RedirectData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();

  const redirectId = location.pathname.replace("/r/", "");

  if (once) {
    setOnce(false);

    axios
      .get(`${config.api}/r/${redirectId}`)
      .then(responce => {
        if (!responce.data) return setNotFound(true);

        if ("item" in responce.data) {
          setRedirectData(responce.data.item);

          window.location.href = responce.data.item.url;
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }

  if (notFound) return <NotFound />;

  return (
    <utils.center>
      {!redirectData && <utils.text $color="default">Loading...</utils.text>}

      {redirectData && (
        <utils.inlineElements>
          <utils.text
            $color="default"
            $size="small"
            $margin="auto 0px auto 0px"
          >
            This link redirects to
          </utils.text>

          <utils.silentLink to={redirectData.url}>
            <utils.text
              $color="link"
              $size="small"
              $elepsis
              $maxWidth="70vw"
              $maxHeight="80px"
            >
              {redirectData.url}
            </utils.text>
          </utils.silentLink>
        </utils.inlineElements>
      )}
    </utils.center>
  );
};

export default RedirectById;
