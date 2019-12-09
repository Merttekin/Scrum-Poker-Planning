/* eslint-disable no-console */
/*eslint no-console: "error"*/
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const createSprint = async sprint => {
  try {
    const data = {
      numberOfVoters: sprint.numberOfVoters,
      sessionName: sprint.sessionName,
      storyList: sprint.storyList[0]
    };

    const firebaseRef = await firebase
      .firestore()
      .collection("sprint")
      .add(data);

    return firebaseRef.id;
  } catch (error) {
    console.log("error :", error);
  }
};

export const getSprint = async key => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("sprint")
      .doc(key)
      .get();

    return snapshot.data();
  } catch (error) {
    console.log("error :", error);
  }
};

export const updateStoryList = async (key, storyList) => {
  try {
    await firebase
      .firestore()
      .collection("sprint")
      .doc(key)
      .update({ storyList });

    return true;
  } catch (error) {
    console.log("error :", error);
  }
};