// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Set video duration
const videos = document.querySelectorAll(".story__slide video");
videos.forEach((video) => {
	$(video)
		.parent(".story__slide")
		.attr("data-swiper-autoplay", video.duration * 1000);
});

const slider = new Swiper(".story__slider", {
	speed: 1,
	watchSlidesProgress: true,
	slidesPerView: 1,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
		stopOnLastSlide: true,
	},
	navigation: {
		nextEl: ".story__next",
		prevEl: ".story__prev",
	},
	pagination: {
		el: ".story__pagination",
		renderBullet: function (index, className) {
			return '<div class="' + className + '"><div class="swiper-pagination-progress"></div> </div>';
		},
	},
	on: {
		autoplayTimeLeft(swiper, time, progress) {
			let currentSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.activeIndex];
			let currentBullet = document.querySelectorAll(".story__slider .swiper-pagination-progress")[
				swiper.realIndex
			];
			let fullTime = currentSlide.dataset.swiperAutoplay
				? parseInt(currentSlide.dataset.swiperAutoplay)
				: swiper.params.autoplay.delay;

			let percentage =
				Math.min(Math.max(parseFloat((((fullTime - time) * 100) / fullTime).toFixed(1)), 0), 100) + "%";

			gsap.set(currentBullet, { width: percentage });
		},
		transitionEnd(swiper) {
			let allBullets = $(".story__slider .swiper-pagination-progress");
			let bulletsBefore = allBullets.slice(0, swiper.realIndex);
			let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
			if (bulletsBefore.length) {
				gsap.set(bulletsBefore, { width: "100%" });
			}
			if (bulletsAfter.length) {
				gsap.set(bulletsAfter, { width: "0%" });
			}

			let activeSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.realIndex];
			if (activeSlide.querySelector("video")) {
				activeSlide.querySelector("video").currentTime = 0;
			}
		},
	},
});

// Slide to 1st slide when modal hide
$("#videoModal").on("hide.bs.modal", function (e) {
	slider.update();
	var $invoker = $(e.relatedTarget);
	slider.slideTo($invoker.data("slider"));
	slider.update();
});
