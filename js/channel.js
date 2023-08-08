// enterkey로 search button 실행
function enterkey() {
  if (window.event.keyCode == 13) {
     fn_search();
   }
}

//search 기능
function fn_search(){
  const searchInput = document.getElementById('searchInput');
  location.href='./index.html?searchInput='+searchInput.value;
}

// 0804 getChannelVideoList KimSeoHyun
document.addEventListener('DOMContentLoaded', () => {
  // get channel info
  const channelProfile = document.getElementsByClassName('channelProfile');

  //현재 channel.html의 url 가져오기
  let requestUrl = window.location.href;
  let url = new URL(requestUrl);

  //channel_name에 video_channel 파라미터 값 넣기
  let channel_name = url.searchParams.get("video_channel");
  let channelUrl = "https://oreumi.appspot.com/channel/getChannelInfo?video_channel=" + channel_name;
  fetch(channelUrl, {
    method: "POST"
  })
    .then((responseChannel) => responseChannel.json())
    .then((data) => {
      let subPeople = data.subscribers;
      let calcsubPeople = "";
      if (subPeople < 1000) {
        calcsubPeople = subPeople + "subscribers";
      } else if (subPeople > 1000 && subPeople < 100000) {
        calcsubPeople = Math.floor(subPeople / 1000) + "K subscribers";
      } else if (subPeople > 100000 && subPeople < 10000000) {
        calcsubPeople = "0." + Math.floor(subPeople / 100000) + "M subscribers";
      } else {
        calcsubPeople = Math.floor(subPeople / 1000000) + "M subscribers";
      }
      let channelInfo = `
          <div class="channelProfilePic">
            <img src="${data.channel_profile}" class="profileImg">
          </div>
          <div class="channelProfileName">
            <span id="channelName" class="channelName">${data.channel_name}</span>
            <span id="subscribers" class="subscribers">${calcsubPeople}</span>
          </div>
        `;
      channelProfile[0].innerHTML = channelInfo;

        let channelContainerInfo = `
          <div class="channelBanner">
            <img src='${data.channel_banner}' class="bannerImg">
          </div>
        `;
 

      const channelBanner = document.getElementById('banner');
      channelBanner.innerHTML = channelContainerInfo;
      
// --------------------------------------------







    });
  // ==========================================
  // show channel video
  let channelVideoList = "http://oreumi.appspot.com/channel/getChannelVideo?video_channel=" + channel_name;
  fetch(channelVideoList, {
    method: "POST"
  })
    .then((responseVideo) => responseVideo.json())
    .then((videodata) => {
      // channel main video(best views)
      // mainVideoContainer => main video div
      const mainVideoContainer = document.getElementById('mainVideoContainer');
      let bestContent = "";
      let bestViews = videodata[0].views;
      for (let i = 1; i < videodata.length; i++) {
        if (videodata[i].views > bestViews) {
          bestViews = videodata[i].views;
          bestContent = videodata[i];
        }
      }
      // get videoLink
      let videoId = bestContent.video_id;
      let getvideoLink = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + videoId;
      let mainVideo = "";
      fetch(getvideoLink)
        .then((responseVideoLink) => responseVideoLink.json())
        .then((videoData) => {
          // calculate dates
          let calcDate = calculateDate(videoData.upload_date);
          mainVideo += `
          <a href="./video.html?videoId=${videoData.video_id}" target="_self">
            <div class="videoPart" id="videoPart">
              <video src="${videoData.video_link}" controls autoplay muted></video>
            </div>
          </a>
          <div class="videoDescPart" id="videoDescPart">
          <a href="./video.html?videoId=${videoData.video_id}" target="_self">
            <div class="mainVideoTitle" id="mainVideoTitle">
              <p>${videoData.video_title}</p>
            </div>
          </a>
          <div class="mainVideoInfo" id="mainVideoInfo">
              <span class="mainVideoViews" id="mainVideoViews">
                  ${videoData.views} views
              </span>
              <span class="mainVideoUploadDates" id="mainVideoUploadDates">
                  . ${calcDate}
              </span>
          </div>
          <div class="mainVideoDesc" id="mainVideoDesc">
              ${videoData.video_detail}
          </div>
        </div>
      `;
          mainVideoContainer.innerHTML = mainVideo;
        });
      //======================================== 
      // show video play list
      // sort by views
      const contentsListFavorite = document.getElementById('contentsListFavorite');
      let sortVideoViews = videodata.sort((a, b) => {
        if (a.views > b.views) {
          return -1;
        }
      });

      for (let i = 0; i < 5; i++) {
        let getFavoriteVideo = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + sortVideoViews[i].video_id;
        let playList = "";
        // create div for playlist
        let playlistVideo = document.createElement('div');
        playlistVideo.className = 'playlistVideo'
        fetch(getFavoriteVideo)
          .then((responseVideoInfo) => responseVideoInfo.json())
          .then((dataVideoInfo) => {
            let views = dataVideoInfo.views;
            let calcViews = "";
            if (views < 1000) {
              calcViews = views + "views";
            }
            else if (views > 1000 && views < 100000) {
              calcViews = Math.floor(views / 1000) + "K Views";
            } else if (views > 100000 && views < 10000000) {
              calcViews = "0." + Math.floor(views / 100000) + "M Views";
            } else {
              calcViews = views / 1000000 + "M Views";
            }
            playList = `
            <a href="./video.html?videoId=${dataVideoInfo.video_id}" target="_self">
              <img class="playThumbnail" src="${dataVideoInfo.image_link}"
                alt="썸네일">
            </a>
              <div class="playlistDesc">
                <a href="./video.html?videoId=${dataVideoInfo.video_id}" target="_self">
                  <span class="plVideoName">${dataVideoInfo.video_title}</span>
                </a>
                <a href="#banner">
                  <span class="plVideoInfo" id="plVideoChannel">${dataVideoInfo.video_channel}</span>
                  <span class="plVideoInfo" id="plVideoViews">${calcViews} views. ${calculateDate(dataVideoInfo.upload_date)} </span>
                </a>
              </div>
        `;
            playlistVideo.innerHTML = playList;
          });
        contentsListFavorite.append(playlistVideo);
      }
      // sort by dates
      const contentsListDate = document.getElementById('contentsListDate');
      let sortVideoDate = videodata.sort((a, b) => {
        if (a.upload_date > b.upload_date) {
          return -1;
        }
      });

      for (let i = 0; i < 5; i++) {
        let getRecentVideo = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + sortVideoDate[i].video_id;
        let playList = "";
        // create div for playlist
        let playlistVideo = document.createElement('div');
        playlistVideo.className = 'playlistVideo'
        fetch(getRecentVideo)
          .then((responseVideoInfo) => responseVideoInfo.json())
          .then((dataVideoInfo) => {
            let views = dataVideoInfo.views;
            let calcViews = "";
            if (views < 1000) {
              calcViews = views + "views";
            }
            else if (views > 1000 && views < 100000) {
              calcViews = Math.floor(views / 1000) + "K Views";
            } else if (views > 100000 && views < 10000000) {
              calcViews = "0." + Math.floor(views / 100000) + "M Views";
            } else {
              calcViews = views / 1000000 + "M Views";
            }
            playList = `
            <a href="./video.html?videoId=${dataVideoInfo.video_id}" target="_self">
              <img class="playThumbnail" src="${dataVideoInfo.image_link}"
                alt="썸네일">
            </a>
              <div class="playlistDesc">
                <a href="./video.html?videoId=${dataVideoInfo.video_id}" target="_self">
                  <span class="plVideoName">${dataVideoInfo.video_title}</span>
                </a>
                <a href="#banner">
                  <span class="plVideoInfo" id="plVideoChannel">${dataVideoInfo.video_channel}</span>
                  <span class="plVideoInfo" id="plVideoViews">${calcViews} views. ${calculateDate(dataVideoInfo.upload_date)} </span>
                </a>
              </div>
        `;
            playlistVideo.innerHTML = playList;
          });
        contentsListDate.append(playlistVideo);
      }
    });
});

// function for calculating date
function calculateDate(date) {
  let calcDate = "";
  const today = new Date();
  let uploadDate = date.split("/");
  // case: same all
  if (uploadDate[0] == today.getFullYear() &&
    uploadDate[1] == today.getMonth() + 1 &&
    uploadDate[2] == today.getDay()) {
    calcDate = "today";
  }
  // case: same year and month but different day
  if (uploadDate[0] == today.getFullYear() &&
    uploadDate[1] == today.getMonth() + 1) {
    let uploadDay = 0;
    // compare with day which is bigger
    if (uploadDate[2] > today.getDay()) {
      uploadDay = uploadDate[2] - today.getDay();
    } else {
      uploadDay = today.getDay() - uploadDate[2];
    }
    // calculate weeks
    week = Math.floor(uploadDay / 7);
    switch (week) {
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
  if (uploadDate[0] == today.getFullYear() &&
    uploadDate[1] != today.getMonth() + 1) {
    //calculate month
    let uploadMonth = 0;
    // compare with day which is bigger
    if (uploadDate[1] > today.getMonth() + 1) {
      uploadMonth = uploadDate[1] - today.getMonth() + 1;
    } else {
      uploadMonth = today.getMonth() + 1 - uploadDate[1];
    }
    calcDate = uploadMonth + " month ago";
  }
  // case: different year
  if (uploadDate[0] != today.getFullYear()) {
    let uploadYear = 0;
    if (uploadDate[0] > today.getFullYear()) {
      uploadYear = uploadDate[0] - today.getFullYear();
    } else {
      uploadYear = today.getFullYear() - uploadDate[0];
    }

    calcDate = uploadYear + " years ago";
  }
  return calcDate;

  

};

// ------------------------------------------------------------------
// channel subscribe
let click = 0;
let isIconAdded = false;
function changeImg() {
  let options = document.getElementById("options");
  let btn = document.getElementById("subscribe");

  // 구독 - 구독중, 색상 변경
  if (btn.textContent == "구독") {
    btn.innerText = "구독중";
    btn.style.backgroundColor = "#4e4c4c"

    // prepend notification
    let notiIcon = document.createElement("img");
    notiIcon.setAttribute("src", "imgChannel/notifications.svg");
    btn.prepend(notiIcon);

    // append expand
    let dropDownIcon = document.createElement("img");
    dropDownIcon.setAttribute("src", "imgChannel/dropDownArrow.svg");
    btn.append(dropDownIcon);

    // 다시 클릭하면 드롭다운
    click++;
    isIconAdded = true;
    return;
  }

  // option dropdown
  if (options.style.display == "none") {
    options.style.display = "block";
  }
  else {
    options.style.display = "none";
  }

}
function selectOption(option) {
  let btn = document.getElementById("subscribe");
  let notiIcon = btn.querySelector("img");
  switch (option) {
    case "all":
      notiIcon.setAttribute("src", "imgChannel/notifications_active.svg");
      break;
    case "custom":
      notiIcon.setAttribute("src", "imgChannel/notifications.svg");
      break;
    case "none":
      notiIcon.setAttribute("src", "imgChannel/notifications_off.svg");
      break;
    default:
      break;
  }
}
// 취소시 원래상태로
function subCancle() {
  if (confirm("구독을 취소하시겠습니까?")) {
    restoreState();
  }
}
function restoreState() {
  let options = document.getElementById("options");
  let btn = document.getElementById("subscribe");
  clickCount = 0;
  options.style.display = "none";
  btn.innerText = "구독";
  btn.style.backgroundColor = "white"
}

//----------0803 배영덕 측 사이드바 더 보기 버튼 활성화 ------------------
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

// move home main
function goHome(){
  window.location.href = 'index.html';
}