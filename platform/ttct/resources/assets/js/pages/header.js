import axios from 'axios';

$(() => {
    $('.kt-notification__item').click(event => {
        event.preventDefault();
        let url = $(event.currentTarget).data('url');
        axios.post(url).then(
            res => {
                window.location.href = $(event.currentTarget).attr('href')
            },
            err => {
                window.location.href = $(event.currentTarget).attr('href')
            }
        )
    });
    $(document).on('click', '.kuroneko-notify', event => {
        event.preventDefault();
        let url = $(event.currentTarget).data('url');
        let href = $(event.currentTarget).attr('href');
        axios.post(url).then(
            res => {
                window.location.href = href;
            },
            err => {
                window.location.href = href;
            }
        )
    });
});

 