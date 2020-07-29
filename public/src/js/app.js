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

$(function() {
	$('#search').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'search-client/', // must be same as route name
				data: 'jsonp',
				type: 'GET',
				data: req,
				success: function(data) {
					console.log(data);
				},
				error: function(err) {
					console.error(err.stats);
				},
			});
		},
		minLength: 1,
		select: function(event, ui) {
			if (ui.item) {
				$('#search').text(ui.item.label);
			}
		},
	});
});
