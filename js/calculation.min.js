const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	/* for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);		
			popupOpen(curentPopup);
			e.preventDefault();
		});
	} */

	popupLinks.forEach((el => {
		el.addEventListener('click', (e) => {
			const popupName = el.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);	
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}))

}

const popupCloseIcon = document.querySelectorAll('.close-modal');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.modal'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.modal.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');

		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.modal__content') && !e.target.classList.contains('cart__remove') && !e.target.closest('button')) {	//
				popupClose(e.target.closest('.modal'));
			}
		})

		if (curentPopup.id == 'calculation') {
			checked();
			changeModalBody();
		}

		
		
	};
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.getElementsByClassName.PaddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout)
}
function bodyUnLock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock');
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.modal.open');
		popupClose(popupActive);
	}
});
(function () {
	//Проверяем поддержку
	if (!Element.prototype.closest) {
		//реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// Проверяем поддержку
	if (!Element.prototype.matches) {
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();









/* change modal body and submit form */
function changeModalBody() {
	const form = document.getElementById('formCalculator');
	const modalPrev = document.getElementById('modal__back');
	const modalNext = document.getElementById('modal__next');
	const formSubmit = document.getElementById('form__button');

	let modalStep = form.querySelector('.modal__step'),
		modalTitle = form.querySelector('.modal__titles'),
		modalLastText = form.querySelector('.modal__lasts-text'),
		progressbar = form.querySelector('.modal__progressbar-progress'),
		modalBody = form.querySelectorAll('.form__item');

	let step = 1;

	modalNext.addEventListener('click', () => {

		if (step === 1) {
			let notChecked = [];

			const inputOptions = document.querySelectorAll(`#body_${step} .options__input`);

			inputOptions.forEach((el) => {
				if (!el.checked) {
					notChecked.push(el);
				}
			})
			if (inputOptions.length != notChecked.length) {
				document.querySelector(`#body_${step} .options`).classList.remove('_error');
			} else {
				document.querySelector(`#body_${step} .options`).classList.add('_error');
			}
		}
		if (step < 4 && !(document.querySelector(`#body_1 .options`).classList.contains('_error'))) {
			step++;
			progressbar.style.width = (step - 1) * 33.333 + '%';
			modalBody.forEach((el) => {
				el.classList.remove('active');
				if (el.closest(`#body_${step}`)) {
					el.classList.add('active');
				}
			})

			if (step === 4) {
				modalTitle.classList.add('hidden');
				modalLastText.classList.add('visible');
				modalNext.classList.add('hidden');
				formSubmit.classList.add('visible');
			} else {
				modalStep.textContent = step;
			}

		}

	})


	modalPrev.addEventListener('click', () => {

		if (step > 1) {
			step--;
			progressbar.style.width = (step - 1) * 33.333 + '%';
			modalBody.forEach((el) => {
				el.classList.remove('active');
				if (el.closest(`#body_${step}`)) {
					el.classList.add('active');
				}
			})
			modalStep.textContent = step;
			if (step <= 3) {
				modalTitle.classList.remove('hidden');
				modalLastText.classList.remove('visible');
				modalNext.classList.remove('hidden');
				formSubmit.classList.remove('visible');
			}
		}
	})

	formSubmit.addEventListener('click', (e) => {
		let error = validateCalculatorForm();

		if (error === 0) {
			form.submit();
		} else {
			e.preventDefault();
		}
	})
}



/* validate calculation form */

function checked() {
	let calculatorRadio = document.querySelectorAll('.options__input[name="typeObject"]');

	calculatorRadio.forEach((el) => {
		el.addEventListener('change', () => {
			calculatorRadio.forEach((item) => {
				item.nextElementSibling.classList.remove('checked');
			})
			el.nextElementSibling.classList.add('checked');
		})
	})
}


function validateCalculatorForm() {

	const form = document.getElementById('formCalculator');

	let error = 0;
	let formReq = form.querySelectorAll('._req');

	for (let i = 0; i < formReq.length; i++) {
		const el = formReq[i];

		formRemoveError(el);

		if (el.classList.contains('formEmail')) {
			if (emailTest(el)) {
				formAddError(el);
				error++;
			}
		} else if (el.classList.contains('formTel')) {
			if (el.value == '') {
				formAddError(el);
				error++;
			}
		} else if (el.classList.contains('formName')) {
			if (el.value == '') {
				formAddError(el);
				error++;
			}
		}

	}

	return error;
}

function formAddError(el) {
	el.parentElement.classList.add('_error');
	el.classList.add('_error');
}
function formRemoveError(el) {
	el.parentElement.classList.remove('_error');
	el.classList.remove('_error');
}
function emailTest(el) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(el.value);
}


