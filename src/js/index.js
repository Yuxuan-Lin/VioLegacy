import Home from './models/home';
import Opp from './models/opportunities';
import Messages from './models/messages';
import {elements} from './views/base';
import uploadFile from './firebaseStorage';


import * as homeControl from './controllers/homeController';
import * as oppControl from './controllers/oppController';
import * as messageControl from './controllers/messageController';



const collapseMenu = function(state) {
    console.log("success");
    state.menuCollapsed = true;
    const labelled = document.querySelectorAll('.collapse-label');
    labelled.forEach(labelCollapse);
    elements.navi.classList.add('collapsed-navigator');
    document.querySelector('.collapse-icon').innerHTML = `
        <ion-icon name="arrow-forward-outline" class="small-icon"></ion-icon>
    `;
};

const expandMenu = function(state){
    //console.log("success");
    state.menuCollapsed = false;
    const labelled = document.querySelectorAll('.collapse-label');
    labelled.forEach(labelExpand);
    elements.navi.classList.remove('collapsed-navigator');
    document.querySelector('.collapse-icon').innerHTML = `
        <ion-icon name="arrow-back-outline" class="small-icon"></ion-icon>
    `;
};

const labelCollapse = function(el){
    el.classList.add('invisible');
};

const labelExpand = function(el){
    el.classList.remove('invisible');
};


const tabSwitch = async function (state,tab){
    const id = parseInt(tab.parentNode.id);
    //console.log(state.user.name);
    if (id != 0 && id != 4){
        screenSwitch(state, tab);

        //clear
        let markup = tab.parentNode.parentNode.childNodes;
        //console.log(markup);
        for (let i=1; i<11; i=i+2){
            markup[i].classList = [];
            markup[i].childNodes[1].classList = ['tab'];
        }

        //above selected change
        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].classList.add('above-selected');
        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].childNodes[1].classList.add('special-tab-1');

        //selected tab change
        tab.parentNode.classList.add('selected-tab');

        //below selected change
        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].classList.add('below-selected');
        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].childNodes[1].classList.add('special-tab-2');
        console.log("tab highlighed");
    }
};


const screenSwitch = async function (state, tab){
    state.tab = tab.parentNode.id;

    clearScreen();
    
    
    if (state.tab == '1'){
        homeControl.homeScreen(state);
    }
    else if (state.tab == '2'){
        if (state.user.isSenior){
            console.log("senior decision page start");
        } else {
            oppControl.oppScreen(state);
        }        
    }
    else if (state.tab == '3'){
        messageControl.messageScreen(state);
    }
    
};

const renderAccountSettings = async function(state){
    clearScreen();
    const AccountSettingsSetUp = `
        <div class="account-settings-container">
            <div class="career-status">
                <h3 class="setting-header"><b>Your Career Status</b></h3>
                <p>The VioLegacy functions are customized for your current career status. You can always change it here and your data for each status will be saved. </p>
                <label class="checkbox-template" id="junior-btn">I’m looking for jobs.
                    <input type="radio" checked="unchecked" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="checkbox-template" id="senior-btn">I'm providing jobs.
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="account-management">
                <h3 class="setting-header">Account Management</h3>
                <button class="account-management-btn">Change Password</button>
                <label for="avatar">Choose a file:</label>
                <input type="file"
                    id="resume-input" name="avatar">
                <button class="account-management-btn" id="uploader">Upload Resume</button>
                <button class="account-management-btn">Log Out</button>
            </div>
        </div>
    `;
    
    elements.container.insertAdjacentHTML('beforeend',AccountSettingsSetUp);

    if(state.user.isSenior){
        document.querySelector("#senior-btn").childNodes[1].checked = true;
        document.querySelector("#junior-btn").childNodes[1].checked = false;
    }
}




export const clearScreen = function(){
   elements.container.innerHTML = "";
};




export const setUI = async function(state, user){
    state.home = new Home(user.uid);
    //console.log(user.uid);
    state.user = user;
    state.user.isSenior = false;
    state.opp = new Opp("Ishmael");
    state.messages = new Messages(user.uid);
    state.image = "../images/kerwin.jpg";
    state.home.collapsed = false;
    state.menuCollapsed = false;
    state.messages.firstRender = true;
    //console.log(state.user.name);
    tabSwitch(state, document.getElementById("default"));


    //cleanse existing event listeners
    const oldNavigator = document.querySelector('.tools');
    const newNavigator = oldNavigator.cloneNode(true);
    oldNavigator.parentNode.replaceChild(newNavigator, oldNavigator);
    const oldCollapse = document.querySelector('.collapse');
    const newCollapse = oldCollapse.cloneNode(true);
    oldCollapse.parentNode.replaceChild(newCollapse, oldCollapse);

    //3 main function tabs        
    document.querySelector('.tools').addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.closest('.tab');
        tabSwitch(state,tab);
    });

    //Account Settings
    document.querySelector('#account-settings').addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.closest('.tab');

        if (tab){
            renderAccountSettings(state);
            document.querySelector("#senior-btn").addEventListener('change', e => {
                e.preventDefault();
                const btn = e.target.closest('#senior-btn');

                if (btn){
                    document.querySelector("#opp-decision").textContent = 'Decision';
                    state.user.isSenior = true;
                    tabSwitch(state, document.getElementById("default"));
                }
            });
            document.querySelector("#uploader").addEventListener('click', async e => {
                e.preventDefault();
                const uploadBtn = e.target.closest('#uploader');
                const resume = document.querySelector("#resume-input").files[0]
                if(uploadBtn){
                    uploadFile(resume, new Date())
                }
            });
            
            document.querySelector("#junior-btn").addEventListener('change', e => {
                e.preventDefault();
                const btn = e.target.closest('#junior-btn');

                if (btn){
                    document.querySelector("#opp-decision").textContent = 'Opportunities';
                    state.user.isSenior = false;
                    tabSwitch(state, document.getElementById("default"));
                }
            });                                    
        }
        
    });

    //Collapse Menu
    document.querySelector('.collapse').addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.closest('.collapse');
        if (!state.menuCollapsed){
            collapseMenu(state);
        } else if (state.menuCollapsed){
            expandMenu(state);
        }
    });

};





