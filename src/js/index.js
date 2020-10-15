import Home from './models/home';
import Opp from './models/opportunities';
import Messages from './models/messages';
import {elements} from './views/base';
import * as contactsView from './views/contactsView'; 
import * as chatView from './views/chatView';
import * as homeView from './views/homeView';
import * as oppView from './views/oppView';

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
        .
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
        oppControl.oppScreen(state);
    }
    else if (state.tab == '3'){
        messageControl.messageScreen(state);
    }
    
};



const clearScreen = function(){
   elements.container.innerHTML = "";
};




export const setUI = async function(state, user){
    state.home = new Home(user.uid);
    //console.log(user.uid);
    state.user = user;
    state.opp = new Opp("Ishmael");
    state.messages = new Messages(user.uid);
    state.image = "../images/kerwin.jpg";
    state.home.collapsed = false;
    state.menuCollapsed = false;
    //console.log(state.user.name);
    tabSwitch(state, document.getElementById("default"));

    //3 main function tabs
    elements.tools.addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.closest('.tab');
        console.log(tab);
        tabSwitch(state,tab);
    });

    //Collapse Menu
    elements.collapse.addEventListener('click', e => {
        e.preventDefault();
        const tab = e.target.closest('.collapse');
        if (!state.menuCollapsed){
            collapseMenu(state);
        } else if (state.menuCollapsed){
            expandMenu(state);
        }
    });
};














