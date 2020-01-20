var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
let lovedImages = [];
let nopedImages = [];
let ids;
let lovedImagesStr = '';
let nopedImagesStr = '';
let ell;

const postData = async() => {
	console.log(getCookie('email'));
	console.log(getCookie('phone'));
	console.log(getCookie('lovedImage'));
	console.log(getCookie('nopedImage'));

	try {
		await axios
		.post('https://blooming-taiga-68537.herokuapp.com', {
			email: getCookie('email'),
			phone: getCookie('phone'),
			likes: getCookie('lovedImage'),
			dislikes: getCookie('nopedImage')
		})
		.then((res) => {
			console.log(res);
			// window.location.href = 'reward.html';
		})
	} catch (error) {
		console.error(error)
	}
};

const setCookie = (name, value, days = 7, path = '/') => {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
};

const getCookie = (name) => {
	return document.cookie.split('; ').reduce((r, v) => {
		const parts = v.split('=');
		return parts[0] === name ? decodeURIComponent(parts[1]) : r;
	}, '');
};

const deleteCookie = (name, path) => {
	setCookie(name, '', -1, path);
};

function listCookies() {
	var theCookies = document.cookie.split(';');
	var aString = '';
	for (var i = 1; i <= theCookies.length; i++) {
		aString += i + ' ' + theCookies[i - 1] + '\n';
	}
	return aString;
}

function initCards(card, index) {
	var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

	newCards.forEach(function(card, index) {
		card.style.zIndex = allCards.length - index;
		card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
		card.style.opacity = (10 - index) / 10;
	});

	tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function(el) {
	var hammertime = new Hammer(el);

	hammertime.on('pan', function(event) {
		el.classList.add('moving');
	});

	hammertime.on('pan', function(event) {
		if (event.deltaX === 0) return;
		if (event.center.x === 0 && event.center.y === 0) return;
		tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);

		tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

		var xMulti = event.deltaX * 0.03;
		var yMulti = event.deltaY / 80;
		var rotate = xMulti * yMulti;

		event.target.style.transform =
			'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
	});

	hammertime.on('panend', async function(event) {
		el.classList.remove('moving');
		const classes = tinderContainer.classList[2];
		console.log('classes', classes);

		ids = el.id;
		console.log(ids, 'ids');
		tinderContainer.classList.remove('tinder_love');

		tinderContainer.classList.remove('tinder_nope');

		var moveOutWidth = document.body.clientWidth;
		var keep = Math.abs(event.deltaX) < 0 || Math.abs(event.velocityX) < 0.1;

		event.target.classList.toggle('removed', !keep);

		// console.log(event.target);
		if (keep) {
			event.target.style.transform = '';
		} else {
			let alltincard = document.getElementsByClassName('tinder--card');

			var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
			var toX = event.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.velocityY) * moveOutWidth;
			var toY = event.deltaY > 0 ? endY : -endY;
			var xMulti = event.deltaX * 0.03;
			var yMulti = event.deltaY / 80;
			var rotate = xMulti * yMulti;
			event.target.style.transform =
				'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
			initCards();

			if (classes.includes('tinder_love')) {
				console.log('loved and removed:::::::::::', ids);
				lovedImages.push(ids);
			}
			if (classes.includes('tinder_nope')) {
				console.log('noped and removed----------', ids);
				nopedImages.push(ids);
			}

			if (
				alltincard[0].className.includes('removed') &&
				alltincard[1].className.includes('removed') &&
				alltincard[2].className.includes('removed') &&
				alltincard[3].className.includes('removed') &&
				alltincard[4].className.includes('removed')
			) {
				showCookiee();

				postData();

				// window.location.href = 'reward.html';
			}
		}
	});
});

function createButtonListener(love) {
	return function(event) {
		var cards = document.querySelectorAll('.tinder--card:not(.removed)');
		var moveOutWidth = document.body.clientWidth * 1.5;

		if (!cards.length) return false;

		var card = cards[0];

		card.classList.add('removed');

		let alltincardclick = document.getElementsByClassName('tinder--card');

		if (love) {
			lovedImages.push(card.id);

			card.style.transform = 'translate(' + moveOutWidth + 'px, -10px) rotate(-30deg)';
		} else {
			nopedImages.push(card.id);

			card.style.transform = 'translate(-' + moveOutWidth + 'px, -10px) rotate(30deg)';
		}

		initCards();

		if (
			alltincardclick[0].className.includes('removed') &&
			alltincardclick[1].className.includes('removed') &&
			alltincardclick[2].className.includes('removed') &&
			alltincardclick[3].className.includes('removed') &&
			alltincardclick[4].className.includes('removed')
		) {
			showCookiee();
			// window.location.href = 'reward.html';
		}

		event.preventDefault();
	};
}

const showCookiee = (params) => {
	setCookie('lovedImage', lovedImages.toString());
	setCookie('nopedImage', nopedImages.toString());

	var cookieVal = getCookie('lovedImage');
	var cookieVall = getCookie('nopedImage');

	console.log(cookieVal);
	console.log(cookieVall);
};

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
