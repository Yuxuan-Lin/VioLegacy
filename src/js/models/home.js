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

	async seniorPostNewOpp(state){
		try{
			const dateArr = state.home.seniorPostDeadline.value.split("-");
			const deadline = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

			await db.collection('NewOpportunities').add({
				alumni: state.user.name,
				alumniId: state.user.uid,
				category: state.home.seniorPostCategory.value,
				company: state.home.seniorPostCompany.value,
				title: state.home.seniorPostTitle.value,
				limit: state.home.seniorPostLimit.value,
				deadline: new firebase.firestore.Timestamp.fromDate(deadline).toDate(),
				description: state.home.seniorPostDescription.value
			});
			console.log("New Opp Posted.")
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

	async getJuniorInfo(juniorUid){
		try{			
			await db.collection('Profiles').doc(juniorUid).get().then(doc => {
				this.juniorInfo = doc;
			});
		} catch (error) {
			alert("seniorGetOpps: " + error);
		}
	}
}

