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

	async getMessages(chatId) {
		try{
			let snapshot = await db.collection('Messages').doc(chatId).get();
			this.selfPos = this.getPos(snapshot.data().chatterIds);
			
			snapshot = await db.collection('Messages').doc(chatId)
														 .collection('history').orderBy('time').get()
			this.history = snapshot.docs.map(doc => {
				const message = doc.data();
				return message.senderId == this.selfPos ? Object.assign(message, {mine: true}) : message
			})
		} catch (error){
			alert(error);
		}
	}

	async getAlumniProfile(uid){
		try{
			console.log(uid);
			await db.collection('Profiles').doc(uid).get().then(doc => {
				this.alumniProfile = doc.data();
				console.log(doc.data());
			})
		} catch (error){
			alert(error);
		}
	}

	async sendMessage(message, chatId, sender, now){
		try{
			
			await db.collection('Messages').doc(chatId).collection('history').add({
				content: message,
				senderID: sender,
				time: now
			});
			console.log("update success")
		} catch (error) {
			alert(error);
		}
	}
}