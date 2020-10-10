import {db} from '../firebaseConfig';

export default class Opportunities{
	constructor(query){
		this.query = query;
	}

	async getOppData(){
		try{
			//const oppArr = {};
			await db.collection('Opportunities').get().then(snapshot => {
				this.opps = snapshot.docs;
				//console.log(snapshot.docs[0].id);
				this.opps.forEach(opp => {
					console.log(opp.id);
				})
			})
			
			console.log(this.opps[0].data());
		} catch (error){
			alert(error);
		}
	}
}