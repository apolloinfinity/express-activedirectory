$(document).ready(() => {
	let url = window.location.pathname;
	let activePage = url.substring(url.lastIndexOf('/') + 1);
	$('.nav-item .nav-link').each(function() {
		var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1);

		if (activePage == linkPage) {
			$(this).closest('li').addClass('active');
		}
	});
});
