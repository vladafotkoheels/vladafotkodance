const heroVideo = document.querySelector(".hero__video");

document.addEventListener("visibilitychange", () => {
    if (!document.hidden && heroVideo?.paused) {
        heroVideo.play().catch(() => {});
    }
});

const reviewCards = [...document.querySelectorAll(".review-card")];
const reviewPrevious = document.querySelector('[aria-label="Previous review"]');
const reviewNext = document.querySelector('[aria-label="Next review"]');
let activeReviewIndex = 0;

const showReview = (nextIndex) => {
    activeReviewIndex = (nextIndex + reviewCards.length) % reviewCards.length;

    reviewCards.forEach((card, index) => {
        const isActive = index === activeReviewIndex;

        card.classList.toggle("is-active", isActive);
        card.hidden = !isActive;

        if (!isActive) {
            const video = card.querySelector("video");
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
};

reviewPrevious?.addEventListener("click", () => {
    showReview(activeReviewIndex - 1);
});

reviewNext?.addEventListener("click", () => {
    showReview(activeReviewIndex + 1);
});

const faqItems = [...document.querySelectorAll(".faq-item")];

faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");
    const answer = item.querySelector(".faq-item__answer");

    trigger?.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");

        faqItems.forEach((otherItem) => {
            const otherTrigger = otherItem.querySelector(".faq-item__trigger");
            const otherAnswer = otherItem.querySelector(".faq-item__answer");

            otherItem.classList.remove("is-open");
            otherTrigger?.setAttribute("aria-expanded", "false");
            if (otherAnswer) {
                otherAnswer.setAttribute("aria-hidden", "true");
                otherAnswer.inert = true;
            }
        });

        if (willOpen) {
            item.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
            answer.setAttribute("aria-hidden", "false");
            answer.inert = false;
        }
    });
});
