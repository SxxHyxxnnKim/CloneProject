//mic modal
const openMic = document.querySelector('.micButton');
const closeMic = document.querySelector('.closeMic');

let micContent = "";
const micContainer = document.getElementById('micContainer');
openMic.addEventListener('click', () => {
    micContainer.style.display = 'block';
    if (!confirm("마이크에 대한 엑세스를 허용하시겠습니까?")) {
        //허용 안할 경우
        micContent = `
                <div class="micModal">
                    <div class="micModalClose">
                        <button class="closeMic" id="closeMic" onclick="micClose()">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="micModalContent" id="micModalContent">
                        <div class="micModalText">
                            <h2>승인대기중...</h2>
                            <p>음성으로 검색하려면 마이크에 대한 액세스를 허용하세요.</p>
                        </div>
                        <div class"micModalBtn">
                            <button class="checkMic" id="checkMic" onclick="micClose()">확인</button>
                        </div>
                    </div>
                </div>
        `;
        micContainer.innerHTML = micContent;
    } else {
        micContent = `
                <div class="micModal">
                    <div class="micModalClose">
                        <button class="closeMic" id="closeMic" onclick="micClose()">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div class="micModalContent" id="micModalContent">
                        <div class="micModalText">
                            <h2>듣는중...</h2>
                        </div>
                        <div class"micModalBtn">
                            <button class="record" id="record">
                                <img class="mic" id="mic" src="imgHome/mic.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
        `;
        micContainer.innerHTML = micContent;
    }
});

function micClose(){
    micContainer.style.display = 'none';
}

//------------------------------------------------------------------------------------------------------------------
//profile modal event
const create = document.getElementById('create');

let createContent = "";
// create button event
const createContainer = document.getElementById('createContainer');
create.addEventListener('click', ()=>{
    createContainer.style.display = 'block';
    createContent =`
        <div class="createList">
            <div class = "videoUpload" >
                <span class="material-symbols-outlined">smart_display</span>
                <span class="createListContent">동영상 업로드</span>
            </div>
            <div class = "videoLive">
            <span class="material-symbols-outlined">settings_input_antenna</span>
                <span class="createListContent">라이브 스트리밍</span>
            </div>
        </div>
    `;
    createContainer.innerHTML = createContent;
});

// notification button event
let notiContent = "";
const notifications = document.getElementById('notifications');
const notiContainer = document.getElementById('notiContainer');
notifications.addEventListener('click',()=>{
    notiContainer.style.display = 'block';
    if(notifications.classList.contains('material-symbols-outlined')){
        notifications.classList.remove('material-symbols-outlined');
        notifications.classList.add('material-icons');
        notiContent =`
        <div class="notiHeader">
            <p class="notiTitle">NOTIFICATIONS</p>
            <span class="material-symbols-outlined">settings</span>
        </div>
        <div class="notiContent" id="notiContent">
        <ul class="notifications">
            <li>
                <div class="notiChannelImg">
                    <img class="notiChannelImg" src="imgHome/channelPic.svg" alt="">
                </div>
                <div class="notiVideoContent">
                    <p class="videoInfo">video information</p>
                    <p class="notiDate"> 2 weeks ago</p>
                </div>
            </li>
        </ul>
        </div>
        `;
        notiContainer.innerHTML = notiContent;
      }else{
        notifications.classList.remove('material-icons');
        notifications.classList.add('material-symbols-outlined');
        notiContainer.style.display = 'none';
      }
});

//page click -> modal close
window.onclick = function (event){
    if(event.target == createContainer){
        createContainer.style.display = "none";
    }else if(event.target == notiContainer){
        notiContainer.style.display = "none";
    }
};
// profile button event
let profileContent = "";
const profile = document.getElementById('profileButton');
const profileContainer = document.getElementById('profileContainer');
profile.addEventListener('click', ()=>{
    profileContainer.style.display = 'block';
    profileContent =`
        <div class="profileList">
            <div class="userName">
                <h3> Oreumi님!</h3>
            </div>
            <div class="myPage">
                <h3>마이 페이지 </h3>
            </div>
            <div class="logOutDiv">
                <span class="material-symbols-outlined">logout</span>
                <span class="logout">logout</span>
            </div>
        </div>
    `;
    profileContainer.innerHTML = profileContent;
});

window.onclick = function (event){
    if(event.target == createContainer){
        createContainer.style.display = "none";
    }
    if(event.target == notiContainer){
        notiContainer.style.display = "none";
    }
    if(event.target == profileContainer){
        profileContainer.style.display = "none";
    }
};