import Home from '../models/home';
import {elements} from '../views/base';
import * as homeView from '../views/homeView';


export const controlHome = async (state) => {
    //1) Get contact list(array)
    //console.log(userId);
    await state.home.getHomeData();
    await state.opp.getOppData();

    //2) Prepare UI(optional)
    homeView.clearProfile();
    
    //3) Render UI
    homeView.renderProfile(state.home.profile);
    homeView.renderAbout(state.home.profile);
    //homeView.renderExps(state.home.profile.experience);
    homeView.renderOpps(state.home.profile,state.opp.opps);
    console.log('home fully rendered');
    
    //1) Get chatHistory(array) and profile

    //2) Prepare UI(clear field)

    //3) Render chatHistroy and profile on UI    
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
            </div>
        </div>
    `;
    
    elements.container.insertAdjacentHTML('beforeend',homeSetUp);
    controlHome(state);
    state.home.pending = homeView.oppStatus[0];
    state.home.accepted = homeView.oppStatus[1];
    state.home.declined = homeView.oppStatus[2];
    
    
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
    
    document.querySelector('.expand-collapse').addEventListener('click', e => {
        const btn = e.target.closest('.expand-collapse');
        if(btn) {
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