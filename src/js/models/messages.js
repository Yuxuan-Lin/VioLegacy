//import axios from 'axios';

export default class Messages{
	constructor(query){
		this.query = query;
	}

	async getMessages(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			await db.collection('Messages').get().then(snapshot => {
				this.chatData = snapshot.docs;
				//console.log(snapshot.docs[0].id);
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

	async sendMessage(message, chatId, sender){
		try{
			await db.collection('Messages').doc(chatId).updateData({
				history: firebase.firestore.FieldValue.arrayUnion({
					content: message,
					senderID: sender,
					time: "I am the best"
				})
			})

		} catch (error) {
			alert(error);
		}
	}
}