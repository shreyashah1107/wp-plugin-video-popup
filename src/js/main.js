// Import our custom CSS
// import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

const videoPlayer = document.querySelector(".video-player");
const video = videoPlayer.querySelector(".video");
const progress = videoPlayer.querySelector(".video-progress");
const progressBar = videoPlayer.querySelector(".video-progress__filled");

//Progress bar
video.addEventListener("timeupdate", () => {
	const percentage = (video.currentTime / video.duration) * 100;
	progressBar.style.width = `${percentage}%`;
});

//change progress bar on click
progress.addEventListener("click", (e) => {
	const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = progressTime;
});

// const progressCircle = document.querySelector(".autoplay-progress svg");
// const progressContent = document.querySelector(".autoplay-progress span");
// var swiper = new Swiper(".mySwiper", {
// 	spaceBetween: 30,
// 	slidesPerView: 2,
// 	centeredSlides: true,
// 	autoplay: {
// 		delay: 2500,
// 		disableOnInteraction: false,
// 	},
// 	pagination: {
// 		el: ".swiper-pagination",
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: ".swiper-button-next",
// 		prevEl: ".swiper-button-prev",
// 	},
// 	on: {
// 		autoplayTimeLeft(s, time, progress) {
// 			progressCircle.style.setProperty("--progress", 1 - progress);
// 			progressContent.textContent = `${Math.ceil(time / 1000)}s`;
// 		},
// 	},
// });
