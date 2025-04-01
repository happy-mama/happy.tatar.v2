import axios, { AxiosProgressEvent } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "@/config.json";

import fs from "@/styles/pages/fs";
import utils from "@/styles/utils";

import fileSVG from "@/assets/svg/file.svg";
import folderSVG from "@/assets/svg/folder.svg";

interface apiData {
  name: string;
  type: "file" | "dir";
}

interface uploadStatus {
  msg: string;
  type: "danger" | "success" | "warning";
}

const FSpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<apiData[]>([]);
  const [curDir, setCurDir] = useState(location.search.slice(5));
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [upload, setUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadKey, setUploadKey] = useState("");
  const [uploadPath, setUploadPath] = useState("");
  const [uploadProgress, setUploadProgress] =
    useState<AxiosProgressEvent | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<uploadStatus>({
    msg: "",
    type: "success",
  });

  useEffect(() => {
    setCurDir(location.search.slice(5));
  }, [location]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${config.api}/fs`, {
        params: {
          dir: curDir.startsWith(".") ? curDir : "." + curDir,
        },
      })
      .then(res => {
        if (res.data) {
          if ("type" in res.data) {
            if (res.data.type == "items") {
              setApiError("");
              return setApiData(res.data.items);
            }
          }
        }
        setApiError("Unknown error");
      })
      .catch(e => {
        if (e.response) {
          if ("data" in e.response) {
            if (e.response.data.error) {
              return setApiError(e.response.data.error);
            }
          }
        }
        setApiError("UNKNOWN ERROR");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curDir]);

  const ButtonsJSX = useMemo(() => {
    const handleBack = () => {
      navigate("?dir=" + curDir.split("/").slice(0, -1).join("/"));
    };

    const handleRoot = () => {
      navigate("?dir=");
    };

    const handleUpload = () => {
      setUpload(e => {
        return !e;
      });
    };

    return (
      <fs.buttonsContainer>
        <utils.button onClick={handleBack}>Back</utils.button>
        <utils.button onClick={handleRoot}>Root</utils.button>
        <utils.button onClick={handleUpload}>
          {upload ? "Hide upload" : "Show upload"}
        </utils.button>
        <fs.pathUrl>{".../public" + curDir}</fs.pathUrl>
      </fs.buttonsContainer>
    );
  }, [upload, curDir, navigate]);

  const FilesJSX = useMemo(() => {
    const Files = apiData.map((file, i) => {
      return (
        <fs.dir
          to={
            file.type == "file"
              ? config.api + "/fs?dir=." + curDir + "/" + file.name
              : "?dir=" + curDir + "/" + file.name
          }
          key={i}
          target={file.type == "file" ? "_blank" : ""}
        >
          {file.type == "file" ? (
            <fs.dirImg src={fileSVG} />
          ) : (
            <fs.dirImg src={folderSVG} />
          )}
          <fs.dirName>{file.name}</fs.dirName>
        </fs.dir>
      );
    });

    if (apiError) {
      return <utils.text $color="danger">{apiError}</utils.text>;
    } else {
      return <fs.files>{Files}</fs.files>;
    }
  }, [apiData, apiError, curDir]);

  const UploadJSX = useMemo(() => {
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      setUploadFile(e.target.files[0]);
      setUploadStatus({ type: "success", msg: "" });
    };

    const handleUploadFile = async () => {
      if (!uploadFile || isUploading) {
        return;
      }

      if (!uploadKey) {
        return setUploadStatus({ type: "danger", msg: "Upload key missing" });
      }

      setUploadStatus({ msg: "", type: "success" });
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", uploadFile);

      const uploadDir = uploadPath ? curDir + "/" + uploadPath : curDir;

      const fileData = await uploadFile.arrayBuffer();

      axios
        .post(`${config.api}/fs`, fileData, {
          params: {
            dir: uploadDir.startsWith(".") ? uploadDir : "." + uploadDir,
          },
          headers: {
            "Content-Type": uploadFile.type,
            "fs-key": uploadKey,
            "fs-name": uploadFile.name,
          },
          onUploadProgress: e => {
            setUploadProgress(e);
          },
        })
        .then(() => {
          setUploadStatus({ type: "success", msg: "Uploaded" });

          setUploadProgress(null);
          setIsUploading(false);
        })
        .catch(e => {
          setUploadProgress(null);
          setIsUploading(false);

          if (e.response) {
            if ("data" in e.response) {
              if (e.response.data.type && e.response.data.type == "error") {
                if (e.response.data.message == "fs-key:invalid:secret") {
                  return setUploadStatus({
                    type: "danger",
                    msg: "Wrong upload key",
                  });
                } else if (e.response.data.message == "fs-key:reqired:secret") {
                  return setUploadStatus({
                    type: "danger",
                    msg: "Upload key missing",
                  });
                } else {
                  return setUploadStatus({
                    type: "danger",
                    msg: "Unknown server error",
                  });
                }
              }
            }
          }

          setUploadStatus({
            type: "danger",
            msg: "Unknown server error",
          });
        });
    };

    const FileData = () => {
      if (!uploadFile) {
        return <div></div>;
      }

      const labels = ["Bytes", "KB", "MB", "GB", "PB", "YB"];
      let key = 0;
      let fileSize = uploadFile.size;

      while (fileSize > 1024) {
        fileSize = fileSize / 1024;
        key++;
      }

      const fileSizeStr = fileSize.toFixed(2).replace(".00", "");

      return (
        <fs.upload.fileData>
          <fs.upload.statusName>{uploadFile.name}</fs.upload.statusName>
          <fs.upload.statusSize>{fileSizeStr}</fs.upload.statusSize>
          <fs.upload.statusLabel>{labels[key]}</fs.upload.statusLabel>
        </fs.upload.fileData>
      );
    };

    const UploadData = () => {
      if (!isUploading) {
        return (
          <fs.upload.status $type={uploadStatus.type}>
            {uploadStatus.msg}
          </fs.upload.status>
        );
      }

      const procents = uploadProgress?.progress
        ? `${(uploadProgress.progress! * 100).toFixed(0)}%`
        : "0%";

      const time = uploadProgress?.estimated
        ? `${uploadProgress.estimated.toFixed(0)} seconds`
        : "...";

      return (
        <fs.upload.fileData>
          {procents} {time}
        </fs.upload.fileData>
      );
    };

    return (
      <fs.upload.container $show={upload}>
        <fs.upload.inliner>
          <utils.text $width="fit-content" $color="default" $size="small">
            Upload key:
          </utils.text>
          <fs.upload.inputText
            type="text"
            placeholder="required for uploading"
            value={uploadKey}
            onChange={e => {
              setUploadKey(e.target.value);
            }}
          />
        </fs.upload.inliner>
        <fs.upload.inliner>
          <utils.text $width="fit-content" $color="default" $size="small">
            File path:
          </utils.text>
          <fs.upload.inputText
            type="text"
            placeholder="current path by default or current path + file path"
            value={uploadPath}
            onChange={e => {
              setUploadPath(e.target.value);
            }}
          />
        </fs.upload.inliner>
        <fs.upload.inliner>
          <fs.upload.buttonLabel>
            <utils.button>Select file</utils.button>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handleSelectFile}
            />
          </fs.upload.buttonLabel>
          {FileData()}
        </fs.upload.inliner>
        <fs.upload.inliner>
          <utils.button onClick={handleUploadFile}>Upload</utils.button>
          {UploadData()}
        </fs.upload.inliner>
      </fs.upload.container>
    );
  }, [
    upload,
    uploadFile,
    uploadKey,
    uploadPath,
    uploadProgress,
    isUploading,
    uploadStatus,
    curDir,
  ]);

  return (
    <fs.container>
      <fs.header>FS</fs.header>
      <fs.content>
        <fs.loading $show={loading}>Api data loading...</fs.loading>
        {ButtonsJSX}
        {UploadJSX}
        {FilesJSX}
      </fs.content>
    </fs.container>
  );
};

export default FSpage;
