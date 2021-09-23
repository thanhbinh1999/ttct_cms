import axios from 'axios';
import {showError, showBlock, removeError, hideBlock} from '../../../../../ttct/resources/assets/js/pages/helper'

class UsersCreate {
    constructor() {
        this.$formCreateUser = $('#form-create-user');

        this.$firstName = $('#first_name');
        this.$lastName = $('#last_name');
        this.$email = $('#email');
        this.$username = $('#username');
        this.$dob = $('#dob');
        this.$phone = $('#phone');
        this.$address = $('#address');
        this.$gender = $('#gender');
        this.$role = $('#role');
        this.$password = $('#password');
        this.$passwordConfirmation = $('#password_confirmation');
        this.$avatar = $('#avatar');
        this.init();
    }

    init() {
        this.initSelect2();
        this.initPickDate();
        this.initDropify();
        this.initSubmit();
    }

    initSelect2() {
        this.$role.select2({
            placeholder: 'Chọn vai trò',
            ajax: {
                url: this.$role.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term,
                        page: params.page,
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.name}`,
                                id: item.id,
                                title: `${item.name}`
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total_pages
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });

        this.$role.change(() => {
            removeError(this.$role)
        })
    }

    initPickDate() {
        this.$dob.datepicker({
            todayHighlight: true,
            orientation: "bottom left",
            autoclose: true,
            format: 'dd/mm/yyyy',
            endDate: new Date(),
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });
    }

    initDropify() {
        this.$avatar.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
    }

    initSubmit() {
        this.$formCreateUser.submit(event => {
            event.preventDefault();
            // showBlock();
            removeError([
                this.$firstName,
                this.$lastName,
                this.$email,
                this.$username,
                this.$dob,
                this.$phone,
                this.$address,
                this.$gender,
                this.$role,
                this.$password,
                this.$passwordConfirmation,
                this.$avatar,
            ]);

            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            let role = this.$role.select2('data').length > 0 ? this.$role.select2('data')[0].id : null;
            fd.append('role', role);
            axios.post(url, fd).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        setTimeout(()=>{
                            window.location.href = data.redirect;
                        },1000);
                    }
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });
    }
}

$(() => {
    new UsersCreate();
});
