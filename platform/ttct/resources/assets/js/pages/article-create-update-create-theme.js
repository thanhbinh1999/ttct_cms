import axios from "axios";
import {removeError, showError} from "./helper";
/**
 * @author        Giang Nguyen
 * @description Class ArticleCreateUpdateCreateTheme
 */
class ArticleCreateUpdateCreateTheme {
    constructor(selectTheme) {
        this.$selectTheme = selectTheme;
        this.$modalCreateTheme = $('#modal-create-theme');
        this.$formCreateTheme = $('#form-create-theme');
        this.$createName = $('#create-theme-name');
        this.$createDescription = $('#create-theme-description');
        this.$createThumbnail = $('#create-theme-thumbnail');

        this.init();
    }

    init() {
        this.initCreate();
        this.initModal();
    }

    initModal() {
        this.$modalCreateTheme.on('hide.bs.modal', () => {
            removeError([this.$createName, this.$createThumbnail]);
            this.$formCreateTheme.trigger('reset');
            this.$formCreateTheme.find('.dropify-clear').click();
        });
    }

    initCreate() {
        this.$createThumbnail.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$formCreateTheme.submit(event => {
            event.preventDefault();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                ({data}) => {
                    if (data.message) {
                        let theme = data.theme;
                        let option = new Option(theme.name, theme.id, true);
                        this.$selectTheme.append(option);
                        this.$selectTheme.val(theme.id);
                        // if (this.$selectTheme.select2('data').length > 0) {
                        //     let newValue = this.$selectTheme.select2('data').map(item => item.id);
                        //     newValue.push(theme.id);
                        //     this.$selectTheme.val(newValue);
                        // } else {
                        //     this.$selectTheme.val(theme.id);
                        // }
                        this.$selectTheme.trigger('change');

                        this.$modalCreateTheme.modal('hide');
                    }
                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-theme-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });
    }
}

export default ArticleCreateUpdateCreateTheme
