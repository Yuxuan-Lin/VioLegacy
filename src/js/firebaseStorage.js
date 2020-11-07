

// file : file, string : date
const uploadFile = (file, date) => {
  const storageRef = storage.ref('resume/' + date + file.name);
  const collectionRef = db.collection('resume');
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
    await collectionRef.add({ url, createdAt, date});
  });

  return { percentage, url, error };
}

export default uploadFile;