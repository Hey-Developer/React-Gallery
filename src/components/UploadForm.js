import React, { useState } from "react";
import ProgressBar from "./Progress";
import { BsFillPlusCircleFill } from "react-icons/bs";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Array for allowed types.. to be upload
  const types = ["image/png", "image/jpeg", "image/gif"];

  // Handler for file upload
  const changeHandler = (e) => {
    //  we use index 0 here because we are uploading one file at a time..
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("please select an image file(png/jpeg/gif)");
    }
  };
  return (
    <form action="#">
      <div className="upload-div">
        <input type="file" onChange={changeHandler} id="file-input" hidden />
        <label htmlFor="file-input" id="upload-btn">
          <BsFillPlusCircleFill size="3rem" />
        </label>
      </div>
      <div className="output" style={{ textAlign: "center" }}>
        {error && <div className="error">{error}</div>}
        {file && <div>You have Selected {`"${file.name}"`}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
