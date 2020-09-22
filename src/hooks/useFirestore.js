import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  // our firestore collection contains all the images url so we will use to map through all the url and display them as image using src attribute.
  const [docs, setDocs] = useState([]);

  // all our communication will be in useEffect hook as we want that whenever oru collection updated our doc will also be update
  useEffect(() => {
    //--this methods return a function which can be use to unsubscribe from the collection that if u no longer wanted to retrieve the data from the collection just execute this function  i.e in case if we unmount the imageGrid component
    const unsubscribe = projectFirestore
      .collection(collection) // the collection eventually has a string which will be the name of the collection.. in firestore
      .orderBy("createdAt", "desc") // this is to sort the images url in descending order such that we can see the newest first..
      .onSnapshot((snap) => {
        // this method will call this callback function each time when there is change in collection.. and it also fire the callback function once initially..
        // this callback function contains a snapshot object which represent a snapshot at that moment in time of the database collection so its gonna look at all the document inside the collection at that moment in time .
        //  every time a new image is uploaded, it's going to add in our collection in the form of url and this snapshot object will notify us for this.
        let documents = [];
        snap.forEach((doc) => {
          // this will cycle through all the document that are currently available in the database collection at that moment in time..where we get the snapshot..
          // this doc object or we can say snap object have access to the unique id of each file in the collection and the content which we store inside that collection..
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    //cleanUp
    return () => {
      unsubscribe();
    };
  }, [collection]);

  return { docs };
};

export default useFirestore;
