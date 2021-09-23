import {showBlock, showError, hideBlock, removeError} from './helper';
import axios from 'axios';
/**
 * @author        Giang Nguyen
 * @description Class ArticleCreateUpdateCreateTag
 */
class ArticleCreateUpdateCreateTag {
    constructor(tagSelect2) {
        this.$tagSelect2 = tagSelect2;

        this.$modalCreateTag = $('#modal-create-tag');
        this.$formCreateTag = $('#form-create-tag');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');

        this.init();
    }

    init() {
        this.initModal();
        this.initSubmit();
    }

    initModal() {
        this.$modalCreateTag.on('hide.bs.modal', () => {
            this.$formCreateTag.trigger('reset');
            removeError(this.$createName);
        })
    }

    initSubmit() {
        this.$formCreateTag.submit(event => {
            event.preventDefault();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                ({data}) => {
                    let tag = data.tag;
                    let option = new Option(tag.name, tag.id, true);
                    this.$tagSelect2.append(option);
                    if (this.$tagSelect2.select2('data').length > 0) {
                        let newValue = this.$tagSelect2.select2('data').map(item => item.id);
                        newValue.push(tag.id);
                        this.$tagSelect2.val(newValue);
                    } else {
                        this.$tagSelect2.val(tag.id);
                    }
                    this.$tagSelect2.trigger('change');
                    this.$modalCreateTag.modal('hide');
                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors)
                    }
                }
            )
        })
    }

}

export default ArticleCreateUpdateCreateTag
