import React from "react";
import useFirestore from "../hooks/useFirestore";
//  we are going to use framer motion library to animate our components..
import { motion } from "framer-motion";
const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  // now each time we upload an image we get the latest collection contains images url because we wrote all our collection logic in use effect hook which run each time there is change in the collection.
  // if  i want to apply on framer motion on any element so i need to wrap it in motion element

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            whileHover={{ opacity: 1 }}
            layout
            onClick={() => {
              setSelectedImg(doc.url);
            }}
          >
            <motion.img
              src={doc.url}
              alt="uploaded-pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
