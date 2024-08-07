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
  type: 0 | 1;
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
      .get(`${config.api}/FS2`, {
        params: {
          dir: curDir,
        },
      })
      .then(res => {
        setApiData(res.data);
      })
      .catch(e => {
        setApiError(e.response.data.error);
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
        <fs.button onClick={handleBack}>Back</fs.button>
        <fs.button onClick={handleRoot}>Root</fs.button>
        <fs.button onClick={handleUpload}>
          {upload ? "Hide upload" : "Show upload"}
        </fs.button>
        <fs.pathUrl>{".../public" + curDir}</fs.pathUrl>
      </fs.buttonsContainer>
    );
  }, [upload, curDir, navigate]);

  const FilesJSX = useMemo(() => {
    const Files = apiData.map((file, i) => {
      return (
        <fs.dir
          to={
            file.type
              ? config.api + curDir + "/" + file.name
              : "?dir=" + curDir + "/" + file.name
          }
          key={i}
          target={file.type ? "_blank" : ""}
        >
          {file.type ? (
            <fs.dirImg src={fileSVG} />
          ) : (
            <fs.dirImg src={folderSVG} />
          )}
          <fs.dirName>{file.name}</fs.dirName>
        </fs.dir>
      );
    });

    return <fs.files>{apiError ? apiError : Files}</fs.files>;
  }, [apiData, apiError, curDir]);

  const UploadJSX = useMemo(() => {
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      setUploadFile(e.target.files[0]);
      setUploadStatus({ type: "success", msg: "" });
    };

    const handleUploadFile = () => {
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

      axios
        .post(`${config.api}/uf/`, formData, {
          headers: {
            Uf_key: uploadKey,
            Uf_path: uploadPath || curDir,
          },
          onUploadProgress: e => {
            setUploadProgress(e);
          },
        })
        .then(responce => {
          setUploadProgress(null);
          setIsUploading(false);

          if (responce.data) {
            if (responce.data.error) {
              if (responce.data.error === "EWRONGKEY") {
                setUploadStatus({ type: "danger", msg: "Wrong upload key" });
              } else if (responce.data.error === "ENOKEY") {
                setUploadStatus({
                  type: "danger",
                  msg: "Upload key missing",
                });
              } else {
                setUploadStatus({
                  type: "danger",
                  msg: "Unknown server error",
                });
              }
            } else {
              setUploadStatus({ type: "success", msg: "Uploaded" });
            }
          } else {
            setUploadStatus({
              type: "warning",
              msg: "Unknown server responce",
            });
          }
        })
        .catch(e => {
          console.log(e);
          if (e.responce) {
            setUploadStatus({ type: "danger", msg: e.response.data.error });
          } else {
            setUploadStatus({ type: "danger", msg: "Unknown error" });
          }

          setUploadProgress(null);
          setIsUploading(false);
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
            placeholder="current path by default"
            value={uploadPath}
            onChange={e => {
              setUploadPath(e.target.value);
            }}
          />
        </fs.upload.inliner>
        <fs.upload.inliner>
          <fs.upload.buttonLabel>
            <fs.button>Select file</fs.button>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handleSelectFile}
            />
          </fs.upload.buttonLabel>
          {FileData()}
        </fs.upload.inliner>
        <fs.upload.inliner>
          <fs.button onClick={handleUploadFile}>Upload</fs.button>
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
