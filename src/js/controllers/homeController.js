import Home from '../models/home';
import {elements} from '../views/base';
import {getUrl , uploadFile} from '../firebaseStorage';
import * as homeView from '../views/homeView';
import * as oppView from '../views/oppView';


export const controlHome = async (state) => {
    //1) Get contact list(array)
    //console.log(userId);
    await state.home.getHomeData();
    await state.opp.getOppData();
    if (state.user.isSenior){
        await state.home.seniorGetOpps(state.user.uid);
    } else {
        await state.home.getMyOpps(state.user.uid);
    }
    
    state.user.name = state.home.profile.name;

    //2) Prepare UI(optional)
    homeView.clearProfile(state.user.isSenior);
    
    //3) Render UI
    homeView.renderProfile(state.home.profile,state.home.profilePic);
    homeView.renderAbout(state.home.profile);
    homeView.renderExps(state.home.profile.experience);
    if (state.user.isSenior){
        oppView.renderOpps(state.home.seniorOpps);
    } else {
        homeView.renderOpps(state.home.myOpps,state.opp.opps);
    }

    console.log('home fully rendered');
    
};


export const homeScreen = async (state) => {

    const homeSetUp = `
        <div class = "home-main">
            <div class = "home-profile">
                <div class = "home-top">
                    <div class="home-top-profile">
                    </div>
                    <div class="home-top-icon">
                        <ion-icon name="pencil-outline" class="big-icon"></ion-icon>
                    </div>
                </div>
                
                <hr class="good-line">
                
                <div class = 'about'>
                    <h3>About</h3>
                </div>
                
                <h3 class="exp-title">Experience</h3>
                <ul class="experience">
                </ul>
                
                <hr class="good-line">
                
                <div class = "expand-collapse">
                    <div>
                        <ion-icon name="chevron-up-outline" class="up-down big-icon"></ion-icon>
                    </div>
                    <h4 class="more-less">Show less profile information</h4>
                </div>
                
            </div>
            
            
            <!-- ----------------------------------------- -->
            <div class = "home-opp">                
            </div>
        </div>
    `;

    const juniorSetUp = `
        <h2 class="opp-title">My Opportunity Updates</h2>
        <div class = "opp-bar">
            <ul class = "opp-bar-list">
            </ul>
            <div class="search-bar opp-search-bar">
                <div>
                    <ion-icon name="search-outline" class="small-icon"></ion-icon>
                </div>
                <input type="text" name="search" placeholder="Search job title, companies, etc.">
            </div>
        </div>
        <ul class = "opp-column">
        </ul>
    `;

    const seniorSetUp = `
        <div class="alumni-opp-container">
            <div class="alumni-opp-top-bar">
                <h2>Posted Opporunities</h2>
                <h4>Manage Posted Opportunities</h4>
            </div>
            <div class="referral-box">
                <ul class="referral-row" id="row-0">
                    <li class="referral" id='asdf' value="asdf">
                        <h3 class='opp-category'>CS</h3>
                        <div>
                            <h2>title</h2>
                            <h3>company</h3>
                            <h3 class="opp-alumni">from alumni.name</h3>
                        </div>
                    </li>
                    <li class="add-referral-template" id='asdf' value="asdf">
                        <div>
                            <ion-icon name="add-outline"></ion-icon>
                        </div>
                        <h4>Post A New Opportunity</h4>
                    </li>
                </ul>
            </div>
        </div>
    `;
    
    elements.container.insertAdjacentHTML('beforeend',homeSetUp);
    if (state.user.isSenior){
        document.querySelector(".home-opp").insertAdjacentHTML('beforeend',seniorSetUp);
        await controlHome(state);
    } else {
        document.querySelector(".home-opp").insertAdjacentHTML('beforeend',juniorSetUp);
        await controlHome(state);
        state.home.pending = homeView.oppStatus[0];
        state.home.accepted = homeView.oppStatus[1];
        state.home.declined = homeView.oppStatus[2];
        //set up junior opp bar
        const oppBarSetUp = `
            <li class = "opp-bar-button">
                <h4>All(${state.home.pending + state.home.accepted + state.home.declined})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Pending(${state.home.pending})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Accepted(${state.home.accepted})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Declined(${state.home.declined})</h4>
            </li>
        `;
        document.querySelector('.opp-bar').insertAdjacentHTML('afterbegin',oppBarSetUp);
    }
    
    
    console.log(homeView.oppStatus);
    
    
    
    
    document.querySelector('.expand-collapse').addEventListener('click', e => {
        const btn = e.target.closest('.expand-collapse');
        if (btn) {
            if (state.home.collapsed){
                homeView.expand();
                state.home.collapsed = false;
            }
            else{
                homeView.collapse();
                state.home.collapsed = true;
            }
        }
    });

    document.querySelector(".home-top-icon").addEventListener('click',(e)=>{
        e.preventDefault();
        document.querySelector('.laputa').classList.remove('invisible');

        homeView.setEditUI(state);

        state.home.finishBtn.addEventListener('click',e => {
            e.preventDefault();
            state.home.sendEditedProfile(state);
            state.home.laputa.classList.add("invisible");
            controlHome(state);
        });
    });
    
}