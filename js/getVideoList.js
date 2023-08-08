document.addEventListener("DOMContentLoaded", ()=>{

  //get video lst
  // get div ThumbnailRowThumbnailItems
  const ThumbnailRowThumbnailItem = document.getElementById('ThumbnailRowThumbnailItem');
  
  fetch("http://oreumi.appspot.com/video/getVideoList")
  .then((resonse)=>resonse.json())
  .then((data) =>{
    // display home.html
    for(let i = 0; i < data.length; i++){
      // create div for thumbnail image
      let thumbnailImgDiv = document.createElement('div');
      thumbnailImgDiv.className = 'ThumbnailImages';

      document.addEventListener("DOMContentLoaded", ()=>{

  //get video lst
  // get div ThumbnailRowThumbnailItems
  const ThumbnailRowThumbnailItem = document.getElementById('ThumbnailRowThumbnailItem');
  
  fetch("http://oreumi.appspot.com/video/getVideoList")
  .then((resonse)=>resonse.json())
  .then((data) =>{
    // display home.html
    for(let i = 0; i < data.length; i++){
      // create div for thumbnail image
      let thumbnailImgDiv = document.createElement('div');
      thumbnailImgDiv.className = 'ThumbnailImages';

      // append thumbnailImgDiv to ThumbnailRowThumbnailItem
      ThumbnailRowThumbnailItem.append(thumbnailImgDiv);

      // url for getting video img
      let url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + data[i].video_id;
      // get video img
      fetch(url)
      .then((responseImg)=> responseImg.json())
      .then((dataImg)=>{
        let imgDiv =`
          <div id="ThumbnailImages">
            <img class="Image1" src="${dataImg.image_link}">
          </div>
          `;
          thumbnailImgDiv.innerHTML = imgDiv;
      });
      ThumbnailRowThumbnailItem.append(thumbnailImgDiv);

      //create div for thumbnail channel info
      const thumbnailDescContainer = document.getElementById('ThumbnailRowThumbnailItem');
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
          <div class="ThumbnailProfilePic">
            <div class="UserAvatar">
                <img class="UserAvatar" src="${dataChannel.channel_profile}" style="width: 36px; height: 36px;">
            </div>
          </div>
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

      let thumbnailVideoDesc =`
        <div class="ThumbnailDescTitle">
          <div class="videoTitle">${data[i].video_title}</div>
        </div>
        <div class="ThumbnailDescInfo">
          <div class="ChannelName">${data[i].video_channel}</div>
          <div class="Time"> ${calcViews} .${calcDate}</div>
        </div>
      `;
      thumbnailDecs.innerHTML = thumbnailVideoDesc;
      thumbnailDescContainer.append(thumbnailDecs);
    }
  });

});
      // url for getting video img
      let url = "http://oreumi.appspot.com/video/getVideoInfo?video_id=" + data[i].video_id;
      // get video img
      fetch(url)
      .then((responseImg)=> responseImg.json())
      .then((dataImg)=>{
        let imgDiv =`
          <div id="ThumbnailImages">
            <img class="Image1" src="${dataImg.image_link}">
          </div>
          `;
          thumbnailImgDiv.innerHTML = imgDiv;
      });
      ThumbnailRowThumbnailItem.append(thumbnailImgDiv);

      //create div for thumbnail channel info
      const thumbnailDescContainer = document.getElementById('ThumbnailRowThumbnailItem');
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
          <div class="ThumbnailProfilePic">
            <div class="UserAvatar">
                <img class="UserAvatar" src="${dataChannel.channel_profile}" style="width: 36px; height: 36px;">
            </div>
          </div>
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

      let thumbnailVideoDesc =`
        <div class="ThumbnailDescTitle">
          <div class="videoTitle">${data[i].video_title}</div>
        </div>
        <div class="ThumbnailDescInfo">
          <div class="ChannelName">${data[i].video_channel}</div>
          <div class="Time"> ${calcViews} .${calcDate}</div>
        </div>
      `;
      thumbnailDecs.innerHTML = thumbnailVideoDesc;
      thumbnailDescContainer.append(thumbnailDecs);
    }
  });

});