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
				changes.forEach(change => {
					const data = change.doc.data();
					const pos = this.getPos(data.chatterIds);
					const otherPos = (pos + 1) % 2;
					const contact = {
						id: change.doc.id,
						chatterName: data.chatters[otherPos],
						chatterUid: data.chatterIds[otherPos] 
					}
					renderContactFn(contact);
				});
			})
		} catch (error){
			alert(error);
		}
	}

	async getMessages(chatId, renderChatFn) {
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
					renderChatFn(message, this.selfPos == message.senderID);
					console.log('111');
					console.log('222');
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
					console.log(chat.data());
					this.chatExists = true;
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
