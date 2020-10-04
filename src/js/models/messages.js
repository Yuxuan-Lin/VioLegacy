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
}