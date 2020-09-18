export default class Home{
	constructor(query){
		this.query = query;
	}

	async getHomeData(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
            const theQuery = `?name=${this.query}`;
            console.log(`http://localhost:5000/home${theQuery}`);
			const profile = await fetch(`http://localhost:5000/home${theQuery}`).then((res) => res.json());
            const opp = await fetch(`http://localhost:5000/myOpp`).then((res) => res.json());
			this.profile = profile;
            this.opp = opp;
            
            console.log(this.profile);
            console.log(this.opp);
		} catch (error){
			alert(error);
		}
	}
}