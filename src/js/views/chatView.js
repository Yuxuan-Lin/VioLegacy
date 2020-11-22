export const clearChat = () => {
  document.querySelector('.chat-history').innerHTML = '';
  document.querySelector('.profile').innerHTML = '';
};

export const clearChatBlock = () => {
  document.querySelector('.chat-block').innerHTML = '';
};

export const renderProfile = (profile,profilePic) => {
  if(profilePic == undefined){
    profilePic = "./images/default-avatar.png";
  }
  const markup = `
    <div class="profile-image">
      <img class="round-image" src="${profilePic}">
    </div>
    <div class="profile-info">
      <h3 class="profile-name">${profile.name}</h3>
      <h3 class="profile-major">${profile.major}</h3>
      <h3 class="profile-career">${profile.name} will refer you to the position at ${profile.company}.</h3>
    </div>
  `;
  
  document.querySelector('.profile').insertAdjacentHTML('beforeend',markup);
};

export const renderChat = (message, isRight,alumniProfilePic,profilePic) => {
  if(profilePic == undefined){
    profilePic = "./images/default-avatar.png";
  }
  let markup;
  if (isRight){
    markup = `
      <li class="message-sent">
        <div class="message-avatar"><img class="round-image" src="${profilePic}"></div>
        <div class="message-text talk-bubble tri-right right-top">
          <div class="talktext">
            <p>${message.content}</p>
          </div>
        </div>
        <div class="message-empty">&nbsp;</div>
      </li>
    `;
    
  } else {
    markup = `
      <li class="message-received">
        <div class="message-avatar"><img class="round-image" src="${alumniProfilePic}"></div>
        <div class="message-text talk-bubble tri-right left-top">
          <div class="talktext">
            <p>${message.content}</p>
          </div>
        </div>
        <div class="message-empty">&nbsp;</div>
      </li>
    `;
  }
  document.querySelector('.chat-history').insertAdjacentHTML('beforeend',markup);
  const chatField = document.querySelector('.chat-field');
  chatField.scrollTop = chatField.scrollHeight;
};

