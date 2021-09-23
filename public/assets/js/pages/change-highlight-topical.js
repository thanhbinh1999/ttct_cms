$(document).ready(function () {
	$(document).on('change', '.highlight-topical', function () {
		var type = Number($(this).val());
		var topical_id = Number($(this).attr('data-id'));
		if (typeof type === 'number' && typeof topical_id === 'number') {
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
				}
			});
			$.ajax({
				url: '/topical/change-highlight',
				type: "POST",
				dataType: 'json',
				data: { 'type': type, 'topical_id': topical_id },
				success: function (response) {
					var messages = "";
					if (response.success) {
						messages = response.success;
					} else {
						messages = response.error;
					}
					if (messages != '') {
						setTimeout(function () {
							alert(messages);
						}, 50);
						setTimeout(function () {
							location.reload();
						}, 500);

					}
				}
			});

		} else {

			alert('Cập nhật không thành công');
		}

	})
})