export default class Messages{
  constructor(uid){
    this.uid = uid;
  }

  getPos(chatterIds) {
    for (let i = 0; i < chatterIds.length; ++i) {
      if (chatterIds[i] == this.uid) {
        return i;
      }
    }
    throw Error("Cannot get position in a chat that I am not part of")
  }

  async getContacts(renderContactFn){
    try{
      await db.collection('Messages').where("chatterIds", "array-contains", this.uid).onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        let promises = []
        changes.forEach(change => {
          const data = change.doc.data();
          const pos = this.getPos(data.chatterIds);
          const otherPos = (pos + 1) % 2;
          const contact = {
            id: change.doc.id,
            chatterName: data.chatters[otherPos],
            chatterUid: data.chatterIds[otherPos] 
          }
          promises.push(
            db.collection("Images").where("userId","==",contact.chatterUid).get().then(snapshots => {
              let counter=0;
              snapshots.forEach(doc => {
                this.profilePic = doc.data().url;
                counter++;
              })
              if (counter == 0){
                this.profilePic = null;
              }
            }).then(() => {
              renderContactFn(contact,this.profilePic)
            })
          )
        })
        return Promise.all(promises)
      })
    } catch (error){
      alert(error);
    }
  }

  async getMessages(chatId, renderChatFn,profilePic) {
    try{
      const snapshot = await db.collection('Messages').doc(chatId).get();
      this.selfPos = this.getPos(snapshot.data().chatterIds);
      
      
      // Detaches update listener when opening new chat
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      
      this.unsubscribe = null;
      this.unsubscribe = db.collection('Messages').doc(chatId).collection('history').orderBy('time').onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
          const message = change.doc.data();
          renderChatFn(message, this.selfPos == message.senderID,this.alumniProfilePic,profilePic);
        });
      })

    } catch (error){
      alert(error);
    }
  }

  async getAlumniProfile(uid){
    try{
      await db.collection('Profiles').doc(uid).get().then(doc => {
        this.alumniProfile = doc.data();
      })
      await db.collection("Images").where("userId", "==", uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          this.alumniProfilePic = doc.data().url;
        })
      })
    } catch (error){
      alert(error);
    }
  }

  async sendMessage(message, chatId, now){
    try{
      await db.collection('Messages').doc(chatId).collection('history').add({
        content: message,
        senderID: this.selfPos,
        time: now
      });
    } catch (error) {
      alert(error);
    }
  }

  async getSearchResults(searchContent) {
    let arr = [];
    try{
      await db.collection("Profiles").where("name", "==", searchContent).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          arr.push({
            data:doc.data(),
            id: doc.id
          });
        });
      });
      this.searchRes = arr;
    } catch(error){
      alert(error);
    }
  }

  async doesChatExists(targetUid,selfUid){
    try{
      const chats = await db.collection("Messages").where("chatterIds","array-contains",selfUid).get();
      chats.forEach(chat => {
        if(chat.data().chatterIds[0] == targetUid || chat.data().chatterIds[1] == targetUid){
          this.chatExists = true;
          this.searchChatId = chat.id;
        }
      });
    } catch(error){
      alert(error);
    }
  }

  async createNewChat(chatterId,chatter,myName){
    try{
      await db.collection('Messages').add({
        chatterIds:[this.uid,chatterId],
        chatters:[myName,chatter]
      });
    } catch(error){
      alert(error);
    }
  }
}
