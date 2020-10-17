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
		return -1;
	}

	async getContacts(){
		try{
			const snapshot = await db.collection('Messages')
							 								 .where("chatterIds", "array-contains", this.uid)
							 								 .get()
			this.contacts = snapshot.docs.map(doc => {
				const data = doc.data();
				const pos = this.getPos(data.chatterIds);
				const otherPos = (pos + 1) % 2;
				return {
					id: doc.id,
					chatterName: data.chatters[otherPos],
					chatterUid: data.chatterIds[otherPos]
				}
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
			this.unsubscribe = db.collection('Messages').doc(chatId).collection('history').orderBy('time').onSnapshot(snapshot => {
				const changes = snapshot.docChanges();
				changes.forEach(change => {
					const message = change.doc.data();
					renderChatFn(message, this.selfPos == message.senderId ? true : false);
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
				senderId: this.selfPos,
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
					arr.push(doc.data());
				});
			});
			this.searchRes = arr;
		} catch(error){
			alert(error);
		}
	}
}
