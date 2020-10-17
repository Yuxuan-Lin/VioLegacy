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
			});
		} catch (error){
			alert(error);
		}
	}

	async getConversation(chatId){
		try{
			await db.collection('Messages').doc(chatId).collection('history').onSnapshot(snapshot => {
				let changes = snapshot.docChanges();
        		console.log(changes[0].doc.data());
			});
		} catch (error) {
			alert(error);
		}
	};

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
			
			await db.collection('Messages').doc(chatId).update({
				history: firebase.firestore.FieldValue.arrayUnion({
					content: message,
					senderID: sender,
					time: now
				})
			});
			console.log("update success")
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