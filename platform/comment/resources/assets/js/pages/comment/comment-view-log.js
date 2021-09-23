import axios from 'axios';
/**
 * @author       Giang Nguyen
 * @description class manipulate comment view log
 */
class CommentViewLog {
    constructor() {
        this.$modalViewLogComment = $('#modal-view-log-comment');
        this.$tableLogComment = $('#table-log-comment');
        this.init();
    }

    init() {
        this.initModal();
    }

    initModal() {
        this.$modalViewLogComment.on('show.bs.modal', event => {
            if (event.namespace === 'bs.modal') {
                let urlGetLog = $(event.relatedTarget).data('url-get-log');
                axios.get(urlGetLog).then(
                    res => {
                        let data = res.data.data;
                        if (data.length > 0) {
                            let html = data.reduce((c, n) => {
                                return c + `<tr>
                                                <th>${n.username}</th>
                                                <td>${n.action}</td>
                                                <td>${n.created_at}</td>
                                                <td>${n.before_data === n.after_data ? 'Không thay đổi' : n.after_data}</td>
                                                <td>${n.before_author_name === n.after_author_name ? 'Không thay đổi' : n.after_author_name}</td>
                                                <td>${n.user_ip}</td>
                                            </tr>`;
                            }, '');
                            this.$tableLogComment.find('tbody').html(html);
                        } else {
                            this.$tableLogComment.find('tbody').html('<tr><td colspan="6" class="text-center">Không có dữ liệu</td></tr>')
                        }
                    }
                );
            }
        })
    }
}

export default CommentViewLog;
