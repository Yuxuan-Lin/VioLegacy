export default class Opportunities{
	constructor(query){
		this.query = query;
	}

	async getOppData(){
		try{
			//const oppArr = {};
			await db.collection('NewOpportunities').get().then(snapshot => {
				this.opps = snapshot.docs;
				//console.log(snapshot.docs[0].id);
				this.opps.forEach(opp => {
				})
			})

		} catch (error){
			alert(error);
		}
	}

	async isRegistered(userId,oppId){
		try{
			this.flag = false;
			await db.collection('NewOpportunities').doc(oppId).collection("registered").get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					if(doc.data().uid == userId){
						this.flag = true;
					}
					console.log(doc.data());
				})
			})
		} catch (error){
			alert(error);
		}
	}

	async register(state,oppId){
		try{
			await db.collection('NewOpportunities').doc(oppId).collection("registered").add({
				name: state.user.name,
				status: "pending",
				uid: state.user.uid
			})
		} catch (error){
			alert(error);

		}
	}

	async unRegister(state,oppId){
		try{
			await db.collection('NewOpportunities').doc(oppId).collection("registered").where("uid", "==", state.user.uid).get().then(async docs => {
				docs.forEach(async doc => {
					await db.collection('NewOpportunities').doc(oppId).collection("registered").doc(doc.id).delete();
				})
			})
		} catch (error){
			alert(error);
		}
	}

	async getSeniorOppRegistration(oppId){
		try{
			await db.collection('NewOpportunities').doc(oppId).collection("registered").get().then(docs => {
				this.seniorOppRegistration = docs;
			})
			console.log(this.seniorOppRegistration)
			console.log("registration log acquired")
		} catch (error){
			alert(error);
		}
	}
}
