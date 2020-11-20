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
  
  let promise = new Promise(function(resolve, reject){
    storageRef.put(file).on('state_changed', (snap) => {
      percentage = (snap.bytesTransferred / snap.totalBytes) * 100; // progress bar
    }, (err) => {
      console.error(err);
      error = err
    }, async () => {
      url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt, date, userId});
      resolve();
    })
  });

  return { percentage, url, error, promise };
}

const deleteFiles = (userId, type) => {
  if(storage.ref(userId) == null){
    console.error("invalid user id for upload, please check your permissions. ")
    return
  }
  const storageRef = storage.ref('user_files/' + userId);
  var collectionRef = null;
  collectionRef = db.collection(type)

  if(collectionRef == null){
    console.error("inavlid upload file type")
    return
  }

  let percentage = 0
  let url = ''
  let error = ''

  let promise1 = collectionRef.where("userId", "==", userId).get().then(async docs => {
    let promises = []
    docs.forEach(doc => {
      promises.push(collectionRef.doc(doc.id).delete());
    })
    return Promise.all(promises)
  });
  
  let promise2 = storageRef.listAll().then(dir => {
    let promises = []
    dir.items.forEach(fileRef => {
      promises.push(deleteFile(storageRef.fullPath, fileRef.name));
    })
    return Promise.all(promises)
  })

  const deleteFile = (pathToFile, fileName) => {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    return childRef.delete();
  }

  return { percentage, url, error, promise1, promise2 };
}

const getUrl = async (userId, type) => {
  let docs = null
  await db.collection(type).where("userId", "==", userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      let documents = [];
      snap.forEach(doc => {
        documents.push(doc.data().url);
      });
      docs = documents[0]
    });
  return { docs };
}



export {getUrl , uploadFile, deleteFiles};