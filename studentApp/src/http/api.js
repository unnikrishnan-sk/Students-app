import firestore from '@react-native-firebase/firestore';

export const storeData = async (collectionName, data) => {
    await firestore().collection(collectionName).add(data);
}

export const getData = async (collectionName) => {
    try {
        const snapshot = await firestore().collection(collectionName).get();
        // console.log("snapshot", snapshot);

        if (snapshot.empty) {
            // console.log("No documents in colletion");
            return []
        }

        const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return docData ? { id: doc.id, ...docData } : null;
        });
        // console.log("data_here", data);

        return data;
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];
    }

}

export const updateData = async (collectionName, id, data) => {
    try {
        // console.log("inside updateData", collectionName, id, data);

        await firestore().collection(collectionName).doc(id).update(data);
    } catch (err) {
        console.log("Updating document Failed", err);

    }
}

export const filterData = async (collectionName, filterValue, fieldValue) => {
    try {
        const snapshot = await firestore().collection(collectionName).where(filterValue, '==', fieldValue).get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        // console.log("data_filterData", data);

        return data;

    } catch (err) {
        console.log("Failed to filterData", err);
    }
}