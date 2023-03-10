import { getFirestore, collection, getDocs, where, query, deleteDoc, doc } from 'firebase/firestore';
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
    clicks_count: data.clicks_count ?? 0
  }
}

export async function getLinks() {
  const db = getFirestore(app)
  const urlsRef = collection(db, 'url');

  const q = query(urlsRef, where('user', '==', auth.currentUser.uid));

  let urlsSnapshot = await getDocs(q);

  return urlsSnapshot.docs.map(resultCleaner);
}

export async function deleteLink(id){
  const db = getFirestore(app)
  const docRef = doc(db, 'url', id);
  await deleteDoc(docRef);
}

export async function getClicks(linkId){
  const db = getFirestore(app)
  const linksRef = collection(db, 'url');
  const q = query(linksRef, where('short_link', '==', linkId));

  let urlsSnapshot = await getDocs(q);

  const clicksRef = collection(db, 'url', urlsSnapshot.docs[0].id, 'clicks');
  const clicksSnapshot = await getDocs(query(clicksRef));
  return clicksSnapshot.docs.map(doc=>doc.data())

}

