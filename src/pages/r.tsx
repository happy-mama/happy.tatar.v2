import { useState } from "react";
import axios from "axios";

import utils from "@/styles/utils";
import config from "@/config.json";
import useNotificationStore from "@/store/notification";

type RedirectData = {
  url: string;
  key: string;
  redirected: number;
};

const Redirect = () => {
  const { addMessage } = useNotificationStore(({ addMessage }) => ({
    addMessage,
  }));

  const [inputValueKey, setInputValueKey] = useState("");
  const [inputValueUrl, setInputValueUrl] = useState("");

  const [redirectData, setRedirectData] = useState<RedirectData | null>(null);

  const createLink = () => {
    axios
      .post(`${config.api}/r`, {
        key: inputValueKey,
        url: inputValueUrl,
      })
      .then(response => {
        if (response.data) {
          if ("type" in response.data && response.data.type == "item") {
            setRedirectData(response.data.item);
            return addMessage({
              text: "Success",
              type: "success",
            });
          }
        }
        return addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      })
      .catch(e => {
        if (
          e.response &&
          e.response.data &&
          "type" in e.response.data &&
          e.response.data.type == "error"
        ) {
          if (e.response.data.message == "url:required:true")
            return addMessage({
              text: "URL is missing",
              type: "danger",
            });

          if (e.response.data.message.startsWith("url:minlength:"))
            return addMessage({
              text: "Url length invalid",
              type: "danger",
            });

          if (e.response.data.message.startsWith("url:maxlength:"))
            return addMessage({
              text: "Key length invalid",
              type: "danger",
            });

          if (e.response.data.message == "url:required:true")
            return addMessage({
              text: "Url is missing",
              type: "danger",
            });

          if (e.response.data.message == "url:validate:URL")
            return addMessage({
              text: "URL is invalid or does not start with https://",
              type: "danger",
            });

          if (e.response.data.message.startsWith("key:maxlength:"))
            return addMessage({
              text: "Key length invalid",
            });

          if (e.response.data.message.startsWith("key:minlength:"))
            return addMessage({
              text: "Key length invalid",
            });

          if (e.response.data.message == "key:required:true")
            return addMessage({
              text: "Key is missing",
              type: "danger",
            });

          if (e.response.data.message == "key:unique:true")
            return addMessage({
              text: "Link key already exists",
              type: "danger",
            });
        }

        addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      });
  };

  const findLink = () => {
    axios
      .get(`${config.api}/r/${inputValueKey}?notCount=1`)
      .then(response => {
        if (response.data) {
          if ("type" in response.data && response.data.type == "item") {
            setRedirectData(response.data.item);
            return addMessage({
              text: "Success",
              type: "success",
            });
          }
        }
        return addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      })
      .catch(e => {
        if (
          e.response &&
          e.response.data &&
          "type" in e.response.data &&
          e.response.data.type == "error"
        ) {
          if (e.response.data.error == "NOT_FOUND")
            return addMessage({
              text: "Link with such key does not exist",
              type: "danger",
            });
        }

        addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      });
  };

  const deleteLink = () => {
    if (!redirectData) return;

    axios
      .delete(`${config.api}/r/${redirectData.key}`)
      .then(response => {
        if (response.data) {
          if ("type" in response.data && response.data.type == "success") {
            setRedirectData(null);
            return addMessage({
              text: "Success",
              type: "success",
            });
          }
        }
        return addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      })
      .catch(e => {
        if (
          e.response &&
          e.response.data &&
          "type" in e.response.data &&
          e.response.data.type == "error"
        ) {
          if (e.response.data.error == "NOT_FOUND")
            return addMessage({
              text: "Link with such key does not exist",
              type: "danger",
            });
        }

        addMessage({
          text: "Unknown server error",
          type: "danger",
        });
      });
  };

  return (
    <utils.center>
      <utils.block $pos="top">
        <utils.button onClick={createLink}>Create new link</utils.button>

        <utils.JustifySpaceAlign>
          <utils.text $size="small" $color="default" $minWidth="fit-content">
            Key
          </utils.text>
          <utils.textInput
            value={inputValueKey}
            onChange={e => setInputValueKey(e.currentTarget.value)}
          />
        </utils.JustifySpaceAlign>

        <utils.JustifySpaceAlign>
          <utils.text $size="small" $color="default" $minWidth="fit-content">
            url
          </utils.text>
          <utils.textInput
            value={inputValueUrl}
            onChange={e => setInputValueUrl(e.currentTarget.value)}
          />
        </utils.JustifySpaceAlign>
      </utils.block>

      <utils.block $pos="bottom">
        <utils.button onClick={findLink}>Find link</utils.button>

        <utils.JustifySpaceAlign>
          <utils.text $size="small" $color="default" $minWidth="fit-content">
            Key
          </utils.text>
          <utils.textInput
            value={inputValueKey}
            onChange={e => setInputValueKey(e.currentTarget.value)}
          />
        </utils.JustifySpaceAlign>
        {redirectData && (
          <>
            <utils.spacer $height="20px" />
            <utils.JustifySpaceAlign>
              <utils.text $color="default" $size="small">
                key
              </utils.text>
              <utils.text $color="default" $size="small">
                {redirectData.key}
              </utils.text>
            </utils.JustifySpaceAlign>
            <utils.JustifySpaceAlign>
              <utils.text $color="default" $size="small">
                url
              </utils.text>
              <utils.silentLink to={redirectData.url}>
                <utils.text
                  $color="link"
                  $size="small"
                  $elepsis
                  $maxWidth="80vw"
                  $maxHeight="80px"
                >
                  {redirectData.url}
                </utils.text>
              </utils.silentLink>
            </utils.JustifySpaceAlign>
            <utils.JustifySpaceAlign>
              <utils.text $color="default" $size="small">
                redirected
              </utils.text>
              <utils.text $color="default" $size="small">
                {redirectData.redirected}
              </utils.text>
            </utils.JustifySpaceAlign>
            <utils.button onClick={deleteLink}>delete</utils.button>
          </>
        )}
      </utils.block>

      <utils.spacer $height="20px" />

      {redirectData && (
        <utils.inlineElements>
          <utils.text $color="default">Navigate to</utils.text>

          <utils.silentLink to={`/r/${redirectData.key}`}>
            <utils.text $color="link">{`/r/${redirectData.key}`}</utils.text>
          </utils.silentLink>

          <utils.text $color="default">to check link</utils.text>
        </utils.inlineElements>
      )}
    </utils.center>
  );
};

export default Redirect;
