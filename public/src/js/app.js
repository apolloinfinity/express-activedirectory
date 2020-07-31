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
	let id = wholeName[0];
	$.get('/search', { id: id }, (data, status) => {
		console.log(data);
		$('.results').addClass('card shadow-sm').html(`
		<ul class="list-group list-group-flush">
            
            <li class="list-group-item d-flex justify-content-around align-items-center">
                <div class="text-center">
                    <p><strong>Client ID:</strong></p>
                    <p onClick="newTab()" class="workOrder" id="workOrderLink"><i class="fas fa-binoculars"></i> ${data.id}</p>
                </div>
                <div class="text-center">
                    <p><strong>Name:</strong></p>
                    <p>${data.first_name} ${data.last_name}</p>
                </div>
                <div class="text-center">
                    <p><strong>Company:</strong></p>
                    <p>${data.company_name}</p>
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
                
                
            </li>
        </ul>
		`);
	});
});
