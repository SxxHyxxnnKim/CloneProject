document.addEventListener("DOMContentLoaded", () => {
   // get video info(selected by user)
   let requestUrl = window.location.href;
   let url = new URL(requestUrl);
   let videoId = url.searchParams.get("videoId");
   let videoUrl = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + videoId;
   fetch(videoUrl)
     .then((response) => response.json())
     .then((data) => {
       // set video content
       const videoContainer = document.getElementById('videoContainer');
       let video = `
         <video src="${data.video_link}" id="selectedVideo" class="selectedVideo" controls autoplay muted></video>
       `;
       videoContainer.innerHTML = video;
       // set video title
       const videoTitleDiv = document.getElementById('videoTitle');
       let videoTitle = `
         <p class="videoTitle">${data.video_title}</p>
       `;
       videoTitleDiv.innerHTML = videoTitle;
       // set video info
       const videoInfoDiv = document.getElementById('videoInfo');
       let uploadDate = data.upload_date.replaceAll('/', '.');
       let videoInfo = `
         <span class="views" id="views"> ${calculateViews(data.views)}</span>
         <span class="uploadDate" id="uploadDate">. ${uploadDate}</span>
       `;
       videoInfoDiv.innerHTML = videoInfo;
 
       // set video explain
       const videoExplain = document.getElementById('videoExplain');
       let videoExplainContent = `
       <p class="videoText" id="videoText">${data.video_detail}</p>
       <a href="#" class="showMore" id="showMore">SHOW MORE</a>
       `;
       videoExplain.innerHTML = videoExplainContent;
 
 
       // get selected Video's channel info
       let channelName = data.video_channel;
       const getChannelURL = 'http://oreumi.appspot.com/channel/getChannelInfo?video_channel=' + channelName;
       fetch(getChannelURL, {
         method: "POST"
       })
         .then((responseChannel) => responseChannel.json())
         .then((channelData) => {
           // set channel profile img
           const channelImg = document.getElementById('channelimg');
           let channelProfileImg = `
           <a href="./channel.html?video_channel=${channelData.channel_name}" target="_self">
             <img src="${channelData.channel_profile}" alt="">
           </a>
           `;
           channelImg.innerHTML = channelProfileImg;
 
           // set channel name and subscribers
           const channelInfo = document.getElementById('channelInfo');
           let channelDetails = `
            <a href="./channel.html?video_channel=${channelData.channel_name}" target="_self">
               <p class="channelName" id="channelName">${channelData.channel_name}</p>
            </a>
               <p class="subscribers" id="subscribers">${channelData.subscribers} subscribers</p>
           `;
           channelInfo.innerHTML = channelDetails;
         });
     });
   // 오류 수정 
 
   // ========video Info button event=============
   // like dislike button event 
   const videoLike = document.getElementById('videoLike');
   const videoDislike = document.getElementById('videoDislike');
 
   const videoLikesCount = document.getElementsByClassName('videoLikesCount');
   const videoDisLikeCount = document.getElementsByClassName('videoDislikeCount');
 
   //count like and dislike
   let likeCount = 0;
   let dislikeCount = 0;
 
   //초기에 좋아요가 0이면 표시x
   if (likeCount === 0) {
     videoLikesCount[0].innerHTML = "";
   } else {
     videoLikesCount[0].innerHTML = likeCount;
   }
   //초기에 싫어요가 0이면 표시x
   if (dislikeCount === 0) {
     videoDisLikeCount[0].innerHTML = "";
   } else {
     videoDisLikeCount[0].innerHTML = dislikeCount;
   }
 
   //like button event
   videoLike.addEventListener('click', function () {
     if (videoLike.classList.contains('material-symbols-outlined')) {
       videoLike.classList.remove('material-symbols-outlined');
       videoLike.classList.add('material-icons');
       likeCount++;
       videoLikesCount[0].innerHTML = likeCount;
     }
     else {
       videoLike.classList.remove('material-icons');
       videoLike.classList.add('material-symbols-outlined');
       likeCount--;
       if (likeCount == 0) {
         videoLikesCount[0].innerHTML = "";
       } else {
         videoLikesCount[0].innerHTML = likeCount;
       }
     }
   });
   // dislike button event
   videoDislike.addEventListener('click', function () {
     // 버튼 초기값 변경
     if (videoDislike.classList.contains('material-symbols-outlined')) {
       videoDislike.classList.remove('material-symbols-outlined');
       videoDislike.classList.add('material-icons');
       dislikeCount++;
       videoDisLikeCount[0].innerHTML = dislikeCount;
     }
     else {
       videoDislike.classList.remove('material-icons');
       videoDislike.classList.add('material-symbols-outlined');
       dislikeCount--;
       if (dislikeCount == 0) {
         videoDisLikeCount[0].innerHTML = "";
       } else {
         videoDisLikeCount[0].innerHTML = dislikeCount;
       }
     }
   });
 
   //=======================================================
   // video modal event
   // share button modal event
   const share = document.getElementById('share');
   share.addEventListener('click', () => {
     const shareModalContainer = document.getElementById('shareModalContainer');
     shareModalContainer.style.display = "block";
 
     // set current url
     const currentUrl = document.getElementById('currentUrl');
     let getCurrentUrl = window.location.href;
     let newCurrentUrl = new URL(getCurrentUrl);
     currentUrl.innerHTML = `<p>${newCurrentUrl}</p>`;
   });
 
   // save button modal event
   const save = document.getElementById('save');
   save.addEventListener('click', () => {
     const saveModalContainer = document.getElementById('saveModalContainer');
     saveModalContainer.style.display = 'block';
   });
   //=======================================================
   //=======================================================
   // comment like and dislike button event
   const commentLike = document.getElementById('commentLike');
   const commentDislike = document.getElementById('commentDislike');
   const commentLikesCount = document.getElementById('commentLikesCount');
   const commentDislikeCount = document.getElementById('commentDislikeCount');
   // like and dislike count 변수
 
   let commentLikeCnt = 0;
   let commentDislikeCnt = 0;
 
   //초기에 좋아요가 0이면 표시x
   if (commentLikeCnt == 0) {
     commentLikesCount.textContent = "";
   } else {
     commentLikesCount.innerHTML = likeCount;
   }
   //초기에 싫어요가 0이면 표시x
   if (commentDislikeCnt === 0) {
     commentDislikeCount.textContent = "";
   } else {
     commentDislikeCount.textContent = dislikeCount;
   }
 
   commentLike.addEventListener('click', () => {
     if (commentLike.classList.contains('material-symbols-outlined')) {
       commentLike.classList.remove('material-symbols-outlined');
       commentLike.classList.add('material-icons');
       commentLikeCnt++;
       commentLikesCount.innerHTML = commentLikeCnt;
     }
     else {
       commentLike.classList.remove('material-icons');
       commentLike.classList.add('material-symbols-outlined');
       commentLikeCnt--;
       if (commentLikeCnt == 0) {
         commentLikesCount.innerHTML = "";
       } else {
         commentLikesCount.innerHTML = commentLikeCnt;
       }
     }
   });
 
   commentDislike.addEventListener('click', () => {
     if (commentDislike.classList.contains('material-symbols-outlined')) {
       commentDislike.classList.remove('material-symbols-outlined');
       commentDislike.classList.add('material-icons');
       commentDislikeCnt++;
       commentDislikeCount.innerHTML = commentDislikeCnt;
     }
     else {
       commentDislike.classList.remove('material-icons');
       commentDislike.classList.add('material-symbols-outlined');
       commentDislikeCnt--;
       if (commentDislikeCnt == 0) {
         commentDislikeCount.innerHTML = "";
       } else {
         commentDislikeCount.innerHTML = commentDislikeCnt;
       }
     }
   });
 });
 
 // alert copy
 function alertCopy() {
   alert('복사 되었습니다');
 }
 
 // close share modal
 function shareClose() {
   shareModalContainer.style.display = 'none';
 }
 // close save modal
 function saveClose() {
   saveModalContainer.style.display = 'none';
 }
 // move home main
 function goHome() {
   window.location.href = 'index.html';
 }
 
 // get ai api
 // 처음 화면 로드 시 전체 비디오 리스트 가져오기
 getVideoList().then(createVideoItem);
 
 let requestUrl = window.location.href;
 let url = new URL(requestUrl);
 let videoId = url.searchParams.get("videoId"); //비디오의 고유번호
 
 // 비디오 리스트 정보
 async function getVideoList() {
    let response = await fetch("https://oreumi.appspot.com/video/getVideoList");
    let videoListData = await response.json();
    return videoListData;
 }
 
 // 각 비디오 정보
 async function getVideoInfo(videoId) {
    let url = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
    let response = await fetch(url);
    let videoData = await response.json();
    return videoData;
 }
 
 // 채널 정보
 async function getChannelInfo(channelName) {
    let url = `https://oreumi.appspot.com/channel/getChannelInfo`;
 
    let response = await fetch(url, {
       method: "POST",
       headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify({ video_channel: channelName }),
    });
 
    let channelData = await response.json();
    return channelData;
 }
 
 // 채널 내 영상정보
 async function getChannelVideo() {
    let response = await fetch(
       `https://oreumi.appspot.com/video/getChannelVideo?video_channel=${channelName}`
    );
    let videoListData = await response.json();
    return videoListData;
 }
 
 // 피드 내용 로드
 async function createVideoItem(videoList) {
 
    // 현재 비디오 정보 가져오기
    let currentVideoInfo = await getVideoInfo(videoId);
    let tagList = currentVideoInfo.video_tag;
    let channelName = currentVideoInfo.video_channel;
    let targetTagList = currentVideoInfo.video_tag; //현재 비디오 태그
    let targetVideoId = currentVideoInfo.video_id;
 
    // 각 비디오들 정보 가져오기
    let videoInfoPromises = videoList.map((video) =>
       getVideoInfo(video.video_id)
    );
    let videoInfoList = await Promise.all(videoInfoPromises);
 
    // 유사도 측정결과 가져오기
    async function getSimilarity(firstWord, secondWord) {
       const openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/WordRel";
       const access_key = "07b3a06b-b8ed-4530-ac40-d1225526767b";
 
       let requestJson = {
          argument: {
             first_word: firstWord,
             second_word: secondWord,
          },
       };
 
       let response = await fetch(openApiURL, {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
             Authorization: access_key,
          },
          body: JSON.stringify(requestJson),
       });
       let data = await response.json();
       return data.return_object["WWN WordRelInfo"].WordRelInfo.Distance;
    }
 
    async function calculateVideoSimilarities(videoList, targetTagList) {
       let filteredVideoList = [];
 
       for (let video of videoList) {
          let totalDistance = 0;
          let promises = [];
 
          for (let videoTag of video.video_tag) {
             for (let targetTag of targetTagList) {
                if (videoTag == targetTag) {
                   promises.push(0);
                } else {
                   promises.push(getSimilarity(videoTag, targetTag));
                }
             }
          }
 
          let distances = await Promise.all(promises);
 
          for (let distance of distances) {
             if (distance !== -1) {
                totalDistance += distance;
             }
          }
 
          if (totalDistance !== 0) {
             if (targetVideoId !== video.video_id) {
                filteredVideoList.push({ ...video, score: totalDistance });
             }
          }
       }
 
       filteredVideoList.sort((a, b) => a.score - b.score);
 
       filteredVideoList = filteredVideoList.map((video) => ({
          ...video,
          score: 0,
       }));
       console.log(filteredVideoList);
       return filteredVideoList;
    }
 
    let filteredVideoList = await calculateVideoSimilarities(
       videoInfoList,
       targetTagList
    );
 
    // 비디오리스트에 추가
    const secondaryVideoList = document.getElementById('secondaryVideoList');
    for (let i = 0; i < 5; i++) {
       let secondaryVideo = document.createElement('div');
       secondaryVideo.className = "secondaryVideo";
       let videoListItems = "";
       let video = filteredVideoList[i];
 
       videoListItems += `
       <div class="videoThumbnail">
          <img src="${video.image_link}" alt="">
       </div>
       <!--video information-->
       <div class="secondaryVideoInfo">
             <p class="secondaryVideoTitle" id="secondaryVideoTitle">
                ${video.video_title}
             </p>
             <p class="videoOwner" id="videoOwner">${video.video_channel}</p>
             <p class="videoSimpleInfo" id="videoSimpleInfo">
                ${calculateViews(video.views)} .${calculateDate(video.upload_date)}
             </p>
       </div>
       `;
       secondaryVideo.innerHTML = videoListItems;
       secondaryVideoList.append(secondaryVideo);
    }
 }
 
 // calculate video views
 function calculateViews(viewsData) {
    let views = viewsData;
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
    return calcViews;
 }
 
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
 }
 