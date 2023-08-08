document.addEventListener("DOMContentLoaded", ()=>{
 
  
  //get video lst
  // get div ThumbnailRowThumbnailItems
  const ThumbnailContainer = document.getElementById('ThumbnailContainer');
  fetch("http://oreumi.appspot.com/video/getVideoList")
  .then((resonse)=>resonse.json())
  .then((data) =>{
    // display home.html
    for(let i = 0; i < data.length; i++){
     const ThumbnailRow = document.getElementById('ThumbnailRow');

      let ThumbnailRowThumbnailItem = document.createElement('div');
      ThumbnailRowThumbnailItem.className = 'ThumbnailRowThumbnailItem';
      
      // create div for thumbnail image
      let thumbnailImgDiv = document.createElement('div');
      thumbnailImgDiv.className = 'ThumbnailImages';

      // url for getting video img
      let url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + data[i].video_id;
      // get video img
      fetch(url)
      .then((responseImg)=> responseImg.json())
      .then((dataImg)=>{
        let imgDiv =`
            <a href="./video.html?videoId=${data[i].video_id}" target="_self">
              <div id="ThumbnailImages">
                  <img class="Image1" src="${dataImg.image_link}">
              </div>
            </a>
          `;
          thumbnailImgDiv.innerHTML = imgDiv;
      });
      ThumbnailRowThumbnailItem.append(thumbnailImgDiv);

      //create div for thumbnail channel info
      const thumbnailDescContainer = document.createElement('div');
      thumbnailDescContainer.className = 'thumbnailDescContainer';
      let thumbnailChannel = document.createElement('div');
      thumbnailChannel.className = thumbnailChannel;

      // get video channel image
      let channelUrl = "http://oreumi.appspot.com/channel/getChannelInfo?video_channel="+data[i].video_channel;
      fetch(channelUrl, {
        method: "POST"
      })
      .then((responseChannel)=> responseChannel.json())
      .then((dataChannel)=>{
        let channelProfilePic =`
          <a href="./channel.html?video_channel=${data[i].video_channel}" target="_self">
            <div class="ThumbnailProfilePic">
              <div class="UserAvatar">
                  <img class="UserAvatar" src="${dataChannel.channel_profile}" style="width: 36px; height: 36px;">
              </div>
            </div>
          </a>
        `;
        thumbnailChannel.innerHTML = channelProfilePic;
      });
      thumbnailDescContainer.append(thumbnailChannel);

      //create div for video desc
      let thumbnailDecs = document.createElement('div');
      thumbnailDecs.className = 'ThumbnailDesc';

      // calculate views
      let views = data[i].views;
      let calcViews = "";
      if (views < 1000){
        calcViews = views + "views";
      }
      else if(views >1000 && views < 100000){
        calcViews = Math.floor(views/1000) +"K Views";
      }else if(views > 100000 && views < 10000000 ){
        calcViews = "0."+ Math.floor(views/100000) + "M Views";
      }else{
        calcViews = views/1000000 + "M Views";
      }

      // calculate dates
      let calcDate = "";
      const today = new Date();
      let upload = data[i].upload_date;
      let uploadDate = upload.split("/");
      // case: same all
      if(uploadDate[0] == today.getFullYear() &&
        uploadDate[1] == today.getMonth()+1 &&
        uploadDate[2] == today.getDay()){
        calcDate = "today";
      }
      // case: same year and month but different day
      if(uploadDate[0] == today.getFullYear() &&
        uploadDate[1] == today.getMonth()+1){
        let uploadDay = 0;
        // compare with day which is bigger
        if(uploadDate[2] > today.getDay()){
          uploadDay = uploadDate[2] - today.getDay();
        }else{
          uploadDay = today.getDay() - uploadDate[2];
        }
        // calculate weeks
        week = Math.floor(uploadDay/7);
        switch(week){
          case 0: 
            calcDate = uploadDay + " days ago";
            break;
          case 1:
          case 2:
          case 3:
            calcDate = week + " week ago";
            break;
          case 4:
            calcDate = "1 month ago";
            break;
        }
      }
      // case: same year but differnt month
      if(uploadDate[0] == today.getFullYear() &&
      uploadDate[1] != today.getMonth()+1){
        //calculate month
        let uploadMonth = 0;
        // compare with day which is bigger
        if(uploadDate[1] > today.getMonth()+1){
          uploadMonth = uploadDate[1] - today.getMonth()+1;
        }else{
          uploadMonth = today.getMonth()+1 - uploadDate[1];
        }
        calcDate = uploadMonth + " month ago";
      }
      // case: different year
      if(uploadDate[0] != today.getFullYear()){
        let uploadYear = 0;
        if(uploadDate[0] > today.getFullYear()){
          uploadYear = uploadDate[0] - today.getFullYear();
        }else{
          uploadYear = today.getFullYear() - uploadDate[0];
        }

        calcDate = uploadYear + " years ago";
      }
      //video.html, video.js에 해당 video id 값 전달
      //channel.html, channel.js에 해당 video channel 값 전달
      let thumbnailVideoDesc =`
        <a href="./video.html?videoId=${data[i].video_id}" target="_self">
          <div class="ThumbnailDescTitle">
            <div class="videoTitle">${data[i].video_title}</div>
          </div>
        </a>
        <a href="./channel.html?video_channel=${data[i].video_channel}" target="_self">
          <div class="ThumbnailDescInfo">
            <div class="ChannelName">${data[i].video_channel}</div>
            <div class="Time"> ${calcViews} .${calcDate}</div>
          </div>
        </a>
      `;
      thumbnailDecs.innerHTML = thumbnailVideoDesc;
      thumbnailDescContainer.append(thumbnailDecs);
      ThumbnailRowThumbnailItem.append(thumbnailDescContainer);
      ThumbnailRow.append(ThumbnailRowThumbnailItem);
    }


    let requestUrl = window.location.href;
    let url = new URL(requestUrl);
    //searchParam에 searchInput 파라미터 값 넣기
    let searchParam = url.searchParams.get("searchInput"); //비디오의 고유번호

    if(searchParam != null){
      fn_search(searchParam);
    }   
  });

});

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

//----------------------------------------------------------------------
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
//----------------------------------------------------------
//---------------------------search 부분-----------------------------
// enterkey로 search button 실행
function enterkey() {
   if (window.event.keyCode == 13) {
      fn_search();
    }
}

//위에서 받은 searchInput 파라미터를 
function fn_search(param){

  var searchInput = document.getElementById('searchInput');
  var searchValue = document.getElementById('searchInput').value;
  //위에서 받은 searchInput 파라미터가 있으면
  if(param != null ) {
    searchValue = param;
    //검색창에 검색 입력값 setting
    document.getElementById('searchInput').value = param;
  }
  if(searchValue == ''){
        alert("검색어를 입력해주세요.");
        return false;
  }
 
   //ThumbnailRow
   const ThumbnailRowThumbnailItem = document.getElementById('ThumbnailRowThumbnailItem');

   const ThumbnailRow = document.getElementById('ThumbnailRow');
   ThumbnailRow.innerHTML = '';
    
   var itemCnt = 0;

   const ThumbnailContainer = document.getElementById('ThumbnailContainer');
    
   fetch("http://oreumi.appspot.com/video/getVideoList")
   .then((resonse)=>resonse.json())
   .then((data) =>{
     // display home.html
     for(let i = 0; i < data.length; i++){
      const ThumbnailRow = document.getElementById('ThumbnailRow');

      /**
       * searchInput , video_title , video_channel 을 모두 대문자로 변환후
       * 표출되는 searchInput=  video_title and video_channel이 아니면 continue
       * 맞으면 itemCnt +1
       */
      
      if((data[i].video_title.toLowerCase()).indexOf((searchValue).toLowerCase()) == -1 
      && (data[i].video_channel.toLowerCase()).indexOf((searchValue).toLowerCase()) == -1){
        continue;
      } else{
        itemCnt++;
      }

       // create div for thumbnail image
       let ThumbnailRowThumbnailItem = document.createElement('div');
       ThumbnailRowThumbnailItem.className = 'ThumbnailRowThumbnailItem';
       
       // create div for thumbnail image
       let thumbnailImgDiv = document.createElement('div');
       thumbnailImgDiv.className = 'ThumbnailImages';
 
       // url for getting video img
       let url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + data[i].video_id;
       // get video img
       fetch(url)
       .then((responseImg)=> responseImg.json())
       .then((dataImg)=>{
         let imgDiv =`
           <a href="./video.html?videoId=${data[i].video_id}" target="_self">
            <div id="ThumbnailImages">
                  <img class="Image1" src="${dataImg.image_link}"> 
            </div>
           </a>
           `;
           //  <a href="${dataImg.video_link}" target="_blank"></a>
           thumbnailImgDiv.innerHTML = imgDiv;
       });
       ThumbnailRowThumbnailItem.append(thumbnailImgDiv);
 
       //create div for thumbnail channel info
       const thumbnailDescContainer = document.createElement('div');
       thumbnailDescContainer.className = 'thumbnailDescContainer';
       let thumbnailChannel = document.createElement('div');
       thumbnailChannel.className = thumbnailChannel;
 
       // get video channel image
       let channelUrl = "http://oreumi.appspot.com/channel/getChannelInfo?video_channel="+data[i].video_channel;
       fetch(channelUrl, {
         method: "POST"
       })
       .then((responseChannel)=> responseChannel.json())
       .then((dataChannel)=>{

        /** channelProfilePic을 누르면 channel.html로 이동, video_channel 파라미터 전달
         * 
         */
         let channelProfilePic =`
           <a href="./channel.html?video_channel=${data[i].video_channel}" target="_self">
           <div class="ThumbnailProfilePic">
             <div class="UserAvatar">
                 <img class="UserAvatar" src="${dataChannel.channel_profile}" style="width: 36px; height: 36px;">
             </div>
           </div>
           </a>
         `;
         thumbnailChannel.innerHTML = channelProfilePic;
       });
       //  검색결과에서 썸네일 이미지 안 보이게.
       //thumbnailDescContainer.append(thumbnailChannel);
 
       //create div for video desc
       let thumbnailDecs = document.createElement('div');
       thumbnailDecs.className = 'ThumbnailDesc';
 
       // calculate views
       let views = data[i].views;
       let calcViews = "";
       if (views < 1000){
         calcViews = views + "views";
       }
       else if(views >1000 && views < 100000){
         calcViews = Math.floor(views/1000) +"K Views";
       }else if(views > 100000 && views < 10000000 ){
         calcViews = "0."+ Math.floor(views/100000) + "M Views";
       }else{
         calcViews = views/1000000 + "M Views";
       }
 
       // calculate dates
       let calcDate = "";
       const today = new Date();
       let upload = data[i].upload_date;
       let uploadDate = upload.split("/");
       // case: same all
       if(uploadDate[0] == today.getFullYear() &&
         uploadDate[1] == today.getMonth()+1 &&
         uploadDate[2] == today.getDay()){
         calcDate = "today";
       }
       // case: same year and month but different day
       if(uploadDate[0] == today.getFullYear() &&
         uploadDate[1] == today.getMonth()+1){
         let uploadDay = 0;
         // compare with day which is bigger
         if(uploadDate[2] > today.getDay()){
           uploadDay = uploadDate[2] - today.getDay();
         }else{
           uploadDay = today.getDay() - uploadDate[2];
         }
         // calculate weeks
         week = Math.floor(uploadDay/7);
         switch(week){
           case 0: 
             calcDate = uploadDay + " days ago";
             break;
           case 1:
           case 2:
           case 3:
             calcDate = week + " week ago";
             break;
           case 4:
             calcDate = "1 month ago";
             break;
         }
       }
       // case: same year but differnt month
       if(uploadDate[0] == today.getFullYear() &&
       uploadDate[1] != today.getMonth()+1){
         //calculate month
         let uploadMonth = 0;
         // compare with day which is bigger
         if(uploadDate[1] > today.getMonth()+1){
           uploadMonth = uploadDate[1] - today.getMonth()+1;
         }else{
           uploadMonth = today.getMonth()+1 - uploadDate[1];
         }
         calcDate = uploadMonth + " month ago";
       }
       // case: different year
       if(uploadDate[0] != today.getFullYear()){
         let uploadYear = 0;
         if(uploadDate[0] > today.getFullYear()){
           uploadYear = uploadDate[0] - today.getFullYear();
         }else{
           uploadYear = today.getFullYear() - uploadDate[0];
         }
 
         calcDate = uploadYear + " years ago";
       }

       let thumbnailVideoDesc =`
         <a href="./video.html?videoId=${data[i].video_id}" target="_self">
           <div class="ThumbnailDescTitle">
              <div class="videoTitle">${data[i].video_title}</div>
           </div>
         </a>
         <a href="./channel.html?video_channel=${data[i].video_channel}" target="_self">
         <div class="ThumbnailDescInfo">
           <div class="ChannelName">${data[i].video_channel}</div>

         </div>
         </>
       `;
       thumbnailDecs.innerHTML = thumbnailVideoDesc;
       thumbnailDescContainer.append(thumbnailDecs);
       ThumbnailRowThumbnailItem.append(thumbnailDescContainer);
       ThumbnailRow.append(ThumbnailRowThumbnailItem);
     }
      if(itemCnt < 1) {
       alert("검색결과가 없습니다.");
      }
   });
}

document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById("showMore");
  const hiddenElements = document.querySelectorAll(".hidden");

  let isHidden = true;

  showMoreButton.addEventListener("click", function () {
    if (isHidden) {
      hiddenElements.forEach(function (element) {
        element.style.display = "block";
        element.style.marginTop = "10px"; 
      });
      showMoreButton.innerText = "간략하게 보기";
    } else {
      hiddenElements.forEach(function (element) {
        element.style.display = "none"
        element.style.marginTop = "0"; // 여백 제거
      });
      showMoreButton.innerText = "더보기";
    }

    isHidden = !isHidden;
  });
});

