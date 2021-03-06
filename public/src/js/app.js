$(function() {
	$('#search').autocomplete({
		source: function(req, res) {
			$.ajax({
				url: 'search-client/', // must be same as route name
				data: 'jsonp',
				type: 'GET',
				data: req,
				success: function(data) {
					res(data);
				},
				error: function(err) {
					console.error(err.stats);
				},
			});
		},
		minLength: 1, // Chane to a minimum of 2 or 3 later
		select: function(event, ui) {
			if (ui.item) {
				$('#search').text(
					`${ui.item.label}  ${ui.item.label2} ${ui.item.company}`
				);
			}
		},
	});
});

$('#btn-search').click(function(e) {
	const value = $('#search').val();
	let wholeName = value.split(' ');
	$.get('/search', {
		first_name: wholeName[0],
		last_name: wholeName[1],
	})
		.done((data) => {
			$('.results').addClass('shadow-lg').html(`
		<div class="bg-white overflow-hidden rounded-md">

            <div class="p-4 flex justify-between items-center">
                <div class="text-center">
                    <p><strong>Client ID:</strong></p>
                    <a href="clients/${data._id}" class="text-blue-600 font-bold">${data.id}</a>
                </div>
                <div class="text-center">
                    <p><strong>Name:</strong></p>
                    <p>${data.first_name} ${data.last_name}</p>
                </div>
                <div class="text-center">
                    <p><strong>Company:</strong></p>
                    <p>${data.company}</p>
				</div>
				<div class="text-center">
                    <p><strong>Department:</strong></p>
                    <p>${data.department}</p>
				</div>
				<div class="text-center">
                    <p><strong>Support Tickets Open:</strong></p>
                    <p>${data.support_tickets
						? data.support_tickets.length
						: 0}</p>
				</div>
            </div>
        </div>
		`);
		})
		.fail((error) => {
			console.log(error);
			$('.results')
				.addClass('card shadow-sm')
				.html(
					`<h2 class="text-center my-3">${error.responseJSON
						.msg}</h2>`
				);
		});
});
