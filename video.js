//video custim control
const video =document.querySelector("video")
const wrapper =document.querySelector(".wrapper")
const pause_play =document.querySelector(".pause_play")
const stopBtn =document.querySelector(".stopDiv");
const progressBar = document.querySelector(".time_range");
let cover = document.querySelector(".cover");

const time_gone = document.querySelector(".time_gone");
const time_rem = document.querySelector(".time_rem");
const time_range = document.querySelector(".time_range");
const rewind = document.querySelector(".rewind");
const forward = document.querySelector(".forward");
const playBtn = document.querySelector(".playDiv");

 // playDiv.addEventListener("click", togglePlayPause)
 // stopDiv.addEventListener("click", stopVideo)
 video.addEventListener("click", ()=>{
 	togglePlayPauseIconOnVideo();
 	togglePlayPauseStatus();
 	hideMenu()
 })
 video.addEventListener("play", playVideo)
 video.addEventListener("pause", pauseVideo)
 video.addEventListener("timeupdate", updateProgress)

playBtn.addEventListener("click", togglePlayPause)
stopBtn.addEventListener("click", stopVideo)
progressBar.addEventListener("change", setVideoProgress)


function playVideo(){
	playBtn.classList.remove("pauseActive");
	playBtn.classList.add("playActive");
}
function pauseVideo(){
	playBtn.classList.add("pauseActive");
	playBtn.classList.remove("playActive");
}
function stopVideo(){
	video.pause();
	video.currentTime = 0;
}

function togglePlayPause(){
	if(video.paused){video.play()}
	else{video.pause();}
}
function togglePlayPauseStatus(){
	if(video.paused){video.play()}
	else{video.pause()}
}

 pause_play.addEventListener("click", ()=>{
 	togglePlayPauseIconOnVideo()
 	togglePlayPause()
 })
function togglePlayPauseIconOnVideo(){
	if(video.paused){
			pause_play.classList.remove("pauseVideoActive");
			pause_play.classList.add("playVideoActive");
		setTimeout(()=>{
			pause_play.classList.remove("pauseVideoActive");
			pause_play.classList.remove("playVideoActive");
		}, 4000)
	}else{
			pause_play.classList.add("pauseVideoActive");
			pause_play.classList.remove("playVideoActive");
		setTimeout(()=>{
			pause_play.classList.remove("pauseVideoActive");
			pause_play.classList.remove("playVideoActive");
		}, 4000)
	}
}
function updateProgress(){
	progressBar.value = (video.currentTime / video.duration) * 100
// time_gone
	let hour_gone = Math.floor(video.currentTime / (60*60))
	if(hour_gone < 10){hour_gone = "0" + hour_gone}

	let min_gone = Math.floor(video.currentTime / 60);
	if(min_gone < 10){min_gone = "0" + min_gone}
	
	let sec_gone = Math.floor(video.currentTime % 60);
	if(sec_gone < 10){sec_gone = "0" + sec_gone}
		time_gone.innerHTML = `${hour_gone}:${min_gone}:${sec_gone}`

//time_rem 
	let hour_rem = (String(Math.floor((video.currentTime - video.duration) / (60*60)))).slice(1);
	if(hour_rem < 10){hour_rem = "0" + hour_rem}

	let min_rem = (String(Math.floor((video.currentTime - video.duration) / 60))).slice(1);
	if(min_rem < 10){min_rem = "0" + min_rem}

	let sec_rem = (String(Math.floor((video.currentTime - video.duration) % 60))).slice(1);
	if(sec_rem < 10){sec_rem = "0" + sec_rem}
		time_rem.innerHTML = `-${hour_rem}:${min_rem}:${sec_rem}`

}

function setVideoProgress(){
	video.currentTime = (+progressBar.value * video.duration) / 100;
}

function spaceBarToggleVideoPlayPauseStatus(e){
	
}




////////////////////////////////////////////////////////////////////////
//video info
let toggle_full_name_btn = document.querySelector(".toggle_full_name");
let toggle_hide_name_btn = document.querySelector(".toggle_hide_name");
let video_name = document.querySelector(".video_name");

let videoName = video_name.innerHTML;
let textStatus = "full";

function truncateText(){
	if(videoName.length > 10){
		 video_name.innerHTML = videoName.slice(0, 10) + "..."
		textStatus = "truncated"
	}
}
truncateText()

 toggle_full_name_btn.addEventListener("click", toggleTruncateText)
function toggleTruncateText(){
	if(textStatus === "truncated"){
		video_name.innerHTML = videoName;
		textStatus = "full"
	}else{
		truncateText()
	}
}

//toggle to hide/show video name
let videoNameDisplayStatus = "show"
function hideVideoName(){
	if(videoNameDisplayStatus === "show"){
		video_name.style.display = "none"
		toggle_full_name_btn.style.display = "none"
		videoNameDisplayStatus = "hidden"
	}
}
toggle_hide_name_btn.addEventListener("click", toggleVideoNameDisplay);

function toggleVideoNameDisplay(){
	if(videoNameDisplayStatus === "hidden"){
		video_name.style.display = "block"
		toggle_full_name_btn.style.display = "block"
		videoNameDisplayStatus = "show"
	}else{
		hideVideoName()
	}
}

//menu_wrapper toggle
let close_menu = document.querySelector(".close_menu")
let show_menu = document.querySelector(".show_menu")
let menu_wrapper = document.querySelector(".menu_wrapper")
let li = document.querySelectorAll(".menu_wrapper ul li")
let liArray = [...li]

show_menu.addEventListener("click", showMenu)
close_menu.addEventListener("click", hideMenu)

//add transition to the li nodelist
for(let i=0; i<liArray.length; i++){
	liArray[i].style.transition = (1 + (i*0.2) + `s`)
}
function showMenu(){
	menu_wrapper.className += " menu_wrapper_active active";
	close_menu.className = "close_menu"
}
function hideMenu(){
	menu_wrapper.className = " menu_wrapper";
	menu_wrapper.className = "menu_wrapper"
	close_menu.className += " close_menu_active"
}


//Drag and drop a video
let videoFile = document.querySelector("#videoFile")
let video_panel = document.querySelector(".video_panel")
let video_icon = document.querySelector(".video_icon")

videoFile.addEventListener("change", getsettings_clickToAdd);
video_panel.addEventListener("dragover", getsettings_dragover);
video_panel.addEventListener("drop", getSettings_drop);

wrapper.addEventListener("dragover", removeCover)

function removeCover(e){
	e.preventDefault()
	cover.className += " cover_remove"
}
function getsettings_dragover(e){
	e.preventDefault();
	cover.style.display = "none"
	video_panel.className += " active_drag_over"
}

function getSettings_drop(e){
	e.preventDefault();
	video_icon.style.display="none"
	video_panel.className = "video_panel";
	videoName = e.dataTransfer.files[0].name;

	let reader = new FileReader();
	reader.readAsDataURL(e.dataTransfer.files[0])
	reader.addEventListener("load", ()=>{
		video.src = reader.result
	})
}

////clikc to add a video
function getsettings_clickToAdd(e){
	e.preventDefault();
	removeCover(e)
	video_icon.style.display="none"
	videoName = videoFile.files[0].name;

	let reader = new FileReader();
	reader.readAsDataURL(videoFile.files[0])
	reader.addEventListener("load", ()=>{
		video.src = reader.result;
	})
}


//date time and copy right
let year = document.querySelector("#year");
let date = new Date()
year.innerHTML = date.getFullYear();

let dig_time = document.querySelector(".dig_time");
let dig_date = document.querySelector(".date");
let day = document.querySelector(".day");

function getTime(){	
	let meridian;
	let date = new Date()
	let hour = date.getHours();
	let min = date.getMinutes()
	let sec = date.getSeconds();
	
	if(hour >= 12){meridian = "PM"}
		else{meridian = "AM"}

	if(hour < 10){hour = "0" + hour}
	if(min < 10){min = "0" + min}
	if(sec < 10){sec = "0" + sec}
	if(hour > 12){hour = hour - 12}
	if(hour === "00"){hour = 12}

	dig_time.innerHTML = `${hour}: ${min}: ${sec} ${meridian}`

	setTimeout(getTime, 500)
}getTime()

 setDate()
function setDate(){
	let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Sat"]
	let dayW = days[date.getDay()]
	day.innerHTML = dayW
	dig_date.innerHTML = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}


