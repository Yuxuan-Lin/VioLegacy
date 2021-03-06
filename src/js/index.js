import Home from './models/home';
import Opp from './models/opportunities';
import Messages from './models/messages';
import {elements} from './views/base';
import {uploadFile, getUrl, deleteFiles} from './firebaseStorage';


import * as homeControl from './controllers/homeController';
import * as oppControl from './controllers/oppController';
import * as messageControl from './controllers/messageController';



const collapseMenu = function(state) {
  state.menuCollapsed = true;
  const labelled = document.querySelectorAll('.collapse-label');
  labelled.forEach(labelCollapse);
  elements.navi.classList.add('collapsed-navigator');
  document.querySelector('.collapse-icon').innerHTML = `
    <ion-icon name="arrow-forward-outline" class="small-icon"></ion-icon>
  `;
};

const expandMenu = function(state){
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
  if (id != 0 && id != 4){
    screenSwitch(state, tab);

    //clear
    let markup = tab.parentNode.parentNode.childNodes;
    for (let i=1; i<11; i=i+2){
      markup[i].classList = [];
      markup[i].childNodes[1].classList = ['tab'];
    }
    

    if (state.user.isSenior){
      document.querySelector("#opp-decision").parentNode.parentNode.classList.add("invisible");
      if (tab.parentNode.id == "1"){
        markup[1].classList.add('above-selected');
        markup[1].childNodes[1].classList.add('special-tab-1');
        tab.parentNode.classList.add('selected-tab');
        markup[7].classList.add('below-selected');
        markup[7].childNodes[1].classList.add('special-tab-2');
      } else if (tab.parentNode.id == "3"){
        markup[3].classList.add('above-selected');
        markup[3].childNodes[1].classList.add('special-tab-1');
        tab.parentNode.classList.add('selected-tab');
        markup[9].classList.add('below-selected');
        markup[9].childNodes[1].classList.add('special-tab-2');
      }
    } else {
      //UI Changes for tab above selected tab(Curve at right-bottom corner and Background Corner)
      markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].classList.add('above-selected');
      markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].childNodes[1].classList.add('special-tab-1');

      //UI Changes for selected tab(Curve at left-top and left-bottom corner and Background Corner)
      tab.parentNode.classList.add('selected-tab');

      //UI Changes for tab below selected tab(Curve at right-top corner and Background Corner)
      markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].classList.add('below-selected');
      markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].childNodes[1].classList.add('special-tab-2');
    }    
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
      oppControl.setUpOppScreen(state);
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
        <button class="account-management-btn" id="resume-uploader" clicked="false">Upload Resume</button>
        <input class="invisible" type="file" id="resume-input" name="resume">
        <button class="account-management-btn" id="profile-pic-uploader" clicked="false">Upload Profile Picture</button>
        <input class="invisible" type="file" id="profile-pic-input" name="profile-pic">
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

export const cleanseEvent = function(className){
  const oldNavigator = document.querySelector(className);
  const newNavigator = oldNavigator.cloneNode(true);
  oldNavigator.parentNode.replaceChild(newNavigator, oldNavigator);
};

export const setUI = async function(state, user){

  state.home = new Home(user.uid);
  state.user = user;
  state.user.isSenior = false;
  state.opp = new Opp("Ishmael");
  state.messages = new Messages(user.uid);
  state.image = "../images/kerwin.jpg";
  state.home.collapsed = false;
  state.menuCollapsed = false;
  state.messages.firstRender = true;
  tabSwitch(state, document.getElementById("default"));


  //cleanse existing event listeners
  cleanseEvent('.tools');
  cleanseEvent('.collapse');
  cleanseEvent('#account-settings');

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
    state.settings = {};
    state.settings.resumeUploadBtnClicked = false;
    state.settings.profilePicUploadBtnClicked = false;

    if (tab){
      renderAccountSettings(state);
      document.querySelector("#senior-btn").addEventListener('change', e => {
        e.preventDefault();
        const btn = e.target.closest('#senior-btn');

        if (btn){
          document.querySelector("#dashboard").textContent = 'Dashboard';          
          state.user.isSenior = true;
          tabSwitch(state, document.getElementById("default"));
          document.querySelector("#opp-decision").parentNode.parentNode.classList.add("invisible");
        }
      });

      document.querySelector("#resume-uploader").addEventListener('click', async e => {
        e.preventDefault();
        const resumeUploadBtn = e.target.closest('#resume-uploader');
        const resume = document.querySelector("#resume-input").files[0];
        if(resumeUploadBtn){
          if(!state.settings.resumeUploadBtnClicked){
            resumeUploadBtn.classList.remove("account-management-btn");
            resumeUploadBtn.classList.add("account-management-btn-clicked");
            document.querySelector("#resume-input").classList.remove("invisible");
            state.settings.resumeUploadBtnClicked = true;
          }else{
            if(resume){
              let status = deleteFiles(state.user.uid, 'Resumes');
              await status.promise1;
              await status.promise2;
              status = uploadFile(resume, state.user.uid, 'Resumes');
              await status.promise;
              alert("Upload Success");
            }else{
              alert("Upload Failure.");
            }
            resumeUploadBtn.classList.add("account-management-btn");
            resumeUploadBtn.classList.remove("account-management-btn-clicked");
            document.querySelector("#resume-input").classList.add("invisible");
            state.settings.resumeUploadBtnClicked = false;
          }
          
        }
      });

      document.querySelector("#profile-pic-uploader").addEventListener('click', async e => {
        e.preventDefault();
        const profilePicUploadBtn = e.target.closest('#profile-pic-uploader');
        const profilePic = document.querySelector("#profile-pic-input").files[0]
        if(profilePicUploadBtn){
          if(!state.settings.profilePicUploadBtnClicked){
            profilePicUploadBtn.classList.remove("account-management-btn");
            profilePicUploadBtn.classList.add("account-management-btn-clicked");
            document.querySelector("#profile-pic-input").classList.remove("invisible");
            state.settings.profilePicUploadBtnClicked = true;
          }else{
            if(profilePic){
              let status = deleteFiles(state.user.uid, 'Images');
              await status.deleteURLFinished;
              await status.deleteFileFinished;
              status = uploadFile(profilePic, state.user.uid, 'Images');
              await status.uploadFinished;
              alert("Upload Success");
            }else{
              alert("Upload Failure.");
            }
            profilePicUploadBtn.classList.add("account-management-btn");
            profilePicUploadBtn.classList.remove("account-management-btn-clicked");
            document.querySelector("#profile-pic-input").classList.add("invisible");
            state.settings.profilePicUploadBtnClicked = false;
          }
        }
      });

      document.querySelector("#junior-btn").addEventListener('change', e => {
        e.preventDefault();
        const btn = e.target.closest('#junior-btn');

        if (btn){
          document.querySelector("#dashboard").textContent = 'Home';

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
