// These custom hook is created to keep the firebase logic separate from the components

import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0); // progress fo uploads
  const [error, setError] = useState(null); // error from the uploads
  const [url, setUrl] = useState(null); //image url that we get back from storage after the image has been successfully uploaded..

  // here we will use the useEffect hooks coz all our logic to be implemented after the dom is rendered or updated hence we use useEffect hook
  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name); //> we are creating here a ref to the our uploaded file in our default firebase storage.
    const collectionRef = projectFirestore.collection("images"); //> we are creating here a ref to the collection named "images" in the firebase database

    // uploading the file to the reference: Everything below is asynchronous and we can attach functions that fire when certain event happened.("on" function takes up 4 argument one us the event_name, the other are three are functions for during event, error in event and after success of event )
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // this function fires when the event i.e state changed run, inside this function there is snapshot object which is the snapshot of the upload in time at that moment in time..

        // we will figure out the progress of the upload: by using predefined properties of the snap object snap.bytesTransferred give us the number of bytes transferred at the moment when this function is fired..
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        // this is the third argument of the "on" function which is a function with a object error that gives us the any error during the file upload process..
        setError(err);
      },
      async () => {
        // getting the url of the image uploaded to the firebase storage
        const url = await storageRef.getDownloadURL();
        setUrl(url);
        // now with this url we will show our images so basically we need to create a doc in which all these images url will get stored and then we will fetch all the url from that doc.. for that we have to put all these url in firestore database.
        // we will add a object in our collection which store all url and the time at which they are added i.e a timestamp for this we need to create a timestamp from firebase server.. go in config file
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
      }
    );
  }, [file]);
  // we write file as dependencies because each time our file will upload we want that our uploading logic should be run..
  return { progress, url, error };
};

export default useStorage;
