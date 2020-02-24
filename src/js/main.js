import './vendor';

const inputs = [].map.call(document.querySelectorAll('.js-input input'), (it) => {
	return it;
});
const scaleSections = [].map.call(document.querySelectorAll('.js-scale path'), (it) => {
	return it;
});
const scaleArrow = document.querySelector('.js-scale-arrow');
const counter = document.querySelector('.js-counter');
const counterValues = [0, 500, 1000];
let currentLevel = 2;
let count = 0;
let rafId;

if (inputs.length) {
	inputs.forEach((input) => {
		input.addEventListener('focus', () => {
			input.parentElement.classList.add('is-filled');
		});

		input.addEventListener('blur', () => {
			if (!input.value) {
				input.parentElement.classList.remove('is-filled');
			}
		});
	});
}

function setCounterValue() {
	rafId = requestAnimationFrame(setCounterValue);

	if (count < counterValues[currentLevel]) {
		count += 5;
	} else if (count > counterValues[currentLevel]) {
		count -= 5;
	}

	counter.textContent = count;
	scaleArrow.style.transform = `rotate(${count * 180 / 1000}deg)`;

	if (count === counterValues[currentLevel]) {
		cancelAnimationFrame(rafId);
	}
}

if (scaleSections.length) {
	scaleSections.forEach((scaleSection, index) => {
		scaleSection.addEventListener('click', () => {
			currentLevel = index;
			cancelAnimationFrame(rafId);
			requestAnimationFrame(setCounterValue);
		});
	});
}

requestAnimationFrame(setCounterValue);
