// file : file, string : userId, string: type
const uploadFile = (file, userId, type) => {
  if(storage.ref(userId) == null){
    console.error("invalid user id for upload, please check your permissions. ")
    return
  }
  const date = new Date()
  const storageRef = storage.ref('user_files/' + userId + '/' + date + file.name);
  var collectionRef = null;
  collectionRef = db.collection(type)

  if(collectionRef == null){
    console.error("inavlid upload file type")
    return
  }

  let percentage = 0
  let url = ''
  let error = ''
  
  storageRef.put(file).on('state_changed', (snap) => {
    percentage = (snap.bytesTransferred / snap.totalBytes) * 100; // progress bar
  }, (err) => {
    console.error(err);
    error = err
  }, async () => {
    url = await storageRef.getDownloadURL();
    const createdAt = timestamp();
    await collectionRef.add({ url, createdAt, date, userId});
  });

  return { percentage, url, error };
}

const getUrl = async (userId, type) => {
  var docs = null
  await db.collection(type).where("userId", "==", userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        console.log(doc)
        documents.push(doc.data().url);
      });
      docs = documents[0]
    });
  return { docs };
}

export {getUrl , uploadFile};