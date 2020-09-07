export default class Opportunities{
	constructor(query){
		this.query = query;
	}

	async getOppData(){
		// const proxy = 'https://cors-anywhere.herokuapp.com/';
		try{
			const res = await fetch('http://localhost:5000/opportunities').then((res) => res.json());
			this.result = res;
            //console.log(this.result);
		} catch (error){
			alert(error);
		}
	}
}