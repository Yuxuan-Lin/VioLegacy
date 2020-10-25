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

}

