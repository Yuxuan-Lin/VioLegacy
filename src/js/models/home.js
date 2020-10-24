import {db} from '../firebaseConfig';

export default class Home{
	constructor(query){
		this.query = query;
		console.log("home created")
	}

	async getHomeData(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			await db.collection('Profiles').doc(this.query).onSnapshot(doc => {
				this.profile = doc.data();
				console.log("Profile data got.");				
			});
			
		} catch (error){
			alert(error);
		}
	}

	async sendEditedProfile(state){
		try{
			await db.collection('Profiles').doc(state.user.uid).update({
				name: state.home.firstName.value + " " + state.home.lastName.value,
				major: state.home.major.value,
				about: state.home.about.value,
				year: state.home.year.value
			});
			console.log("Profile Edited.")
		} catch (error) {
			alert(error);
		}
	}

	async registerOpp(userId,oppId){
		try{
			await db.collection('Profiles').doc(userId).collection("myOpps").add({
				status: "pending",
				oppId: oppId
			})
		} catch (error) {
			alert(error);
		}
	}

	async unRegisterOpp(userId,oppId){
		try{
			await db.collection('Profiles').doc(userId).collection("myOpps").where("oppId", "==", oppId).get().then(async docs => {
				docs.forEach(async doc => {
					await db.collection('Profiles').doc(userId).collection("myOpps").doc(doc.id).delete();
				})
			})
		} catch (error) {
			alert(error);
		}
	}



	async getMyOpps(userId) {
		try{
			await db.collection('Profiles').doc(userId).collection("myOpps").get().then(docs => {
				this.myOpps = docs;
			});
		} catch (error) {
			alert("getMyOpps: " + error);
		}
	}

	async seniorGetOpps(userId){
		//console.log(userId);
		try{			
			await db.collection('NewOpportunities').where("alumniId", "==", userId).get().then(docs => {
				this.seniorOpps = docs;
			});			
		} catch (error) {
			alert("seniorGetOpps: " + error);
		}
	}
}

