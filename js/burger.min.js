function openSecondLinks() {
	const links = document.querySelectorAll('h3.header__link');
	links.forEach((el) => {
		el.addEventListener('click', () => {
			el.classList.toggle('active');
		})
	})
}
openSecondLinks();

/* Burger */
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('_lock');
	});
	$('.header__second-link').click(function (event) {
		$('.header__burger,.header__menu').removeClass('active');
		$('body').removeClass('_lock');
	});
});