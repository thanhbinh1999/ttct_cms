import axios from 'axios';
import {showError, showBlock, removeError, hideBlock} from '../../../../../ttct/resources/assets/js/pages/helper'

class UsersProfile {
    constructor() {
        this.$formUpdateProfile = $('#form-update-profile');

        this.$firstName = $('#first_name');
        this.$lastName = $('#last_name');
        this.$email = $('#email');
        this.$dob = $('#dob');
        this.$phone = $('#phone');
        this.$address = $('#address');
        this.$gender = $('#gender');
        this.$avatar = $('#avatar');
        this.init();
    }

    init() {
        this.initPickDate();
        this.initDropify();
        this.initSubmit();
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
        this.$formUpdateProfile.submit(event => {
            event.preventDefault();
            // showBlock();
            removeError([
                this.$firstName,
                this.$lastName,
                this.$email,
                this.$dob,
                this.$phone,
                this.$address,
                this.$gender,
                this.$avatar,
            ]);

            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            axios.post(url, fd).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        setTimeout(()=>{
                            window.location.reload();
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
    new UsersProfile();
});
