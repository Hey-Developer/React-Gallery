import React from "react";
import { motion } from "framer-motion";

const Modal = ({ selectedImg, setSelectedImg }) => {
  const handleClick = (e) => {
    // these is to prevent the closing of modal when we click on image itself, we want that modal only should be only closed when we click on the area apart from the image..
    if (e.target.classList.contains("backdrop")) setSelectedImg(null);
  };
  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged-pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
