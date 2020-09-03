//import axios from 'axios';

export default class Contacts{
	constructor(query){
		this.query = query;
	}

	async getContacts(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			const res = await fetch('http://localhost:5000/message').then((res) => res.json());
			this.result = res.data;
		} catch (error){
			alert(error);
		}
	}
}