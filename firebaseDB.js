import admin from "firebase-admin";

let db = null;
const temp = {};
const COLLECTION_USERINFO = 'user_crawler_info';

try {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.DB_KEY))
    });
    db = admin.firestore();
} catch (e) {
    console.log(`[DB] ERROR CREATE DB INSTANCE. cause: ${e}`);

}

const getObject = async (id) => {
    if (db) {
        try {
            const object = await db.collection(COLLECTION_USERINFO).doc(id).get();
            if (object.exists) {
                return {
                    id: object.id,
                    ...object.data()
                }
            }
        } catch (e) {
            console.log(`[DB] Exception getObject. cause: ${e}`);
        }
        return null;
    }
    return temp[id];
}

const getAllObject = async () => {
    if (db) {
        try {
            const snapshot = await db.collection(COLLECTION_USERINFO).get();
            const result = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return result;
        } catch (e) {
            console.log(`[DB] getAllObject Exception. cause: ${e}`);
        }
        return null;
    }
    return Object.values(temp);
};

const putObject = async (id, value) => {
    if (db) {
        try {
            await db.collection(COLLECTION_USERINFO).doc(id).set(value, { merge: true });
        } catch (e) {
            console.log(`[DB] putObject Exception. cause: ${e}`);
            temp[id] = value;
        }
    } else {
        temp[id] = value;
    }
};

export { getObject, putObject, getAllObject };