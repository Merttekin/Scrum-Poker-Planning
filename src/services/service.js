/* eslint-disable no-console */
/*eslint no-console: "error"*/
import firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);


export default {
    async fetchSprint() {
        const snapshot = await firebase.firestore().collection('sprint').get();
        return snapshot.docs.map(doc => console.log(doc.data()));
    },
    async setSprintData(data) {
        return firebase.firestore().collection('sprint').add(data)
            .then(() => {
                console.log('added db');
            })
    }
}