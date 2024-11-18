import firestore from '@react-native-firebase/firestore';
import { apiKey } from '../contants/common';
import { baseUrl } from './configApi';

export const storeData = async (collectionName, data) => {
    await firestore().collection(collectionName).add(data);
}

export const getData = async (collectionName) => {
    try {
        const snapshot = await firestore().collection(collectionName).get();
        if (snapshot.empty) {
            return []
        }
        const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return docData ? { id: doc.id, ...docData } : null;
        });
        return data;
    } catch (err) {
        console.error("getData_Firebase_Error_fetching_data:", err);
        return [];
    }
}

export const updateData = async (collectionName, id, data) => {
    try {
        await firestore().collection(collectionName).doc(id).update(data);
    } catch (err) {
        console.log("updateData_Firebase_Updating_document_Failed", err);
    }
}

export const filterData = async (collectionName, filterValue, fieldValue) => {
    try {
        const snapshot = await firestore().collection(collectionName).where(filterValue, '==', fieldValue).get();
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return data;
    } catch (err) {
        console.log("filterData_Firebase_Failed_to_filterData", err);
    }
}


const sendPushNotification = async (token, title, body) => {
    const message = {
        token,
        notification: {
            title,
            body
        }
    }
    try {
        const response = await axios.post(baseUrl, message, {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json',
            },
        });
        console.log("response", response);

    } catch (err) {
        console.log(err);

    }


}


