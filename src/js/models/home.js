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
      await db.collection('Images').where("userId","==",this.query).onSnapshot(docs => {
        docs.forEach(doc => {
          this.profilePic = doc.data().url;
        })
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
        let promises = []
        docs.forEach(doc => {
          promises.push(doc.ref.delete())
        })
        return Promise.all(promises)
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
    try{
      await db.collection('NewOpportunities').where("alumniId", "==", userId).get().then(docs => {
        this.seniorOpps = docs;
      });
    } catch (error) {
      alert("seniorGetOpps: " + error);
    }
  }

  async getAndRenderJunior(juniorUid, renderSeniorOppDetail,juniorStatus,info){
    try{
      let juniorInfo,juniorPic;
      //console.log(juniorUid);
      await db.collection('Profiles').doc(juniorUid).get().then(doc => {
        juniorInfo = doc;
      });
      await db.collection('Images').where("userId","==",juniorUid).get().then(docs => {
        docs.forEach(doc => {
          juniorPic = doc.data().url;
          console.log()
        })
      });
      renderSeniorOppDetail(juniorStatus, juniorUid, info, juniorInfo, juniorPic);
    } catch (error) {
      alert("getAndRenderJunior: " + error);
    }
  }

  async getJuniorInfo(juniorUid){
    try{
      //console.log(juniorUid);
      await db.collection('Profiles').doc(juniorUid).get().then(doc => {
        this.juniorInfo = doc;
      });
    } catch (error) {
      alert("getJuniorInfo: " + error);
    }
  }
}
