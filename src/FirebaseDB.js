import { getFirestore, collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
import { app } from './firebase';
import { HOST } from './config'
import { getAuth } from 'firebase/auth'
const auth = getAuth(app);

const resultCleaner = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    original_link: data.original_link,
    short_link: `${HOST}/${data.short_link}`,
    created_at: data.created_at,
  }
}

export async function getLinks() {
  const db = getFirestore(app)
  const urlsRef = collection(db, 'url');

  const q = query(urlsRef, where('user', '==', auth.currentUser.uid));

  let urlsSnapshot = await getDocs(q);

  return urlsSnapshot.docs.map(resultCleaner);
}

