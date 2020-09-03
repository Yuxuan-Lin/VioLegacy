export default class Home{
	constructor(query){
		this.query = query;
	}

	async getHomeData(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			const res = await fetch('http://localhost:5000/home').then((res) => res.json());
			this.result = res;
            console.log(this.result);
		} catch (error){
			alert(error);
		}
	}
}