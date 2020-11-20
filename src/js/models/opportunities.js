export default class Opportunities{
	constructor(query){
		this.query = query;
	}

	async getOppData(){
		try{
			//const oppArr = {};
			await db.collection('NewOpportunities').get().then(snapshot => {
				this.opps = snapshot.docs;
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
				await Promise.all(docs.map(async doc => {
					await db.collection('NewOpportunities').doc(oppId).collection("registered").doc(doc.id).delete();
				}))
			})
		} catch (error){
			alert(error);
		}
	}

	async getSeniorOppRegistration(oppId){
		let docCounter = 0;
		try{
			await db.collection('NewOpportunities').doc(oppId).collection("registered").get().then(docs => {
				this.seniorOppRegistration = docs;
				docs.forEach(doc => docCounter++);
				this.docsLength = docCounter;
			})
			
		} catch (error){
			alert(error);
		}
	}

	async updateJuniorStatus(oppId,juniorId,decision){
		try{
			//update firebase NewOpportunities register status
			await db.collection('NewOpportunities').doc(oppId).collection("registered").where("uid","==",juniorId).get().then(docs => {
				await Promise.all(docs.map(doc => {
					return doc.ref.update({
						status: decision
					})
				}))
			})

			//update firebase Profile myOpps status
			await db.collection('Profiles').doc(juniorId).collection("myOpps").where("oppId","==",oppId).get().then(docs => {
				await Promise.all(docs.map(doc => {
					return doc.ref.update({
						status: decision
					})
				}))
			})

		} catch (error){
			alert(error);
		}
	}
}
