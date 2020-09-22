import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  // let's check the progress while uploading the file..  console.log(progress, url); // u can see the progress but until  the file is fully uploaded u will see that url is null

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    >
      {/* {Math.round(progress)}% */}
    </motion.div>
  );
};

export default ProgressBar;
