export default class Home{
	constructor(query){
		this.query = query;
		console.log("home created")
	}

	async getHomeData(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			await db.collection('Profiles').doc(this.query).get().then(doc => {
				this.profile = doc.data();
				console.log(this.profile);
				
			});
			
		} catch (error){
			alert(error);
		}
	}
}