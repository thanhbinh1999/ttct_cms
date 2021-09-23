import axios from "axios";
import moment from "moment";

class Topical2Detail {
    constructor() {

        this.init();
    }

    init() {
        let topicalDetail = $('body').data('topical-detail');
        let articleDetail = $('body').data('article-detail');

        let data = JSON.parse(localStorage.getItem('preview-topical-data'));

        let arr = [
            axios.get(topicalDetail + data.id),
            axios.get(articleDetail),
        ];
        Promise.all(arr).then(
            value => {
                let topical = value[0].data;
                let article = value[1].data;

                let next = null;
                let prev = null;
                for (let i = 0; i < data.articles.length; i++) {
                    if ((parseInt(data.articles[i].id) === parseInt(article.id))) {
                        if (((i + 1) === data.articles.length)) {
                            prev = data.articles[(i - 1)];
                        } else if (i === 0) {
                            next = data.articles[(i + 1)];
                        } else {
                            prev = data.articles[(i - 1)];
                            next = data.articles[(i + 1)];
                        }
                        break;
                    }
                }

                let urlNext = $('body').data('preview-detail');
                let urlPrev = $('body').data('preview-detail');

                urlNext = next ? urlNext.slice(0, urlNext.lastIndexOf('/') + 1) + next.id : '';
                urlPrev = prev ? urlPrev.slice(0, urlPrev.lastIndexOf('/') + 1) + prev.id : '';

                let day = moment.unix(article.created_at);
                let themes = article.tags.filter(item => parseInt(item.type) === 2);
                let tags = article.tags.filter(item => parseInt(item.type) === 1);

                let fck = `<section>
                                <p class="article-summary">${article.excerpt}</p>
                                ${article.content}
                            </section>`;
                $('.fck-title').text(article.title);
                $('.fck').html(fck);
                $('.parent_cate').html(themes.reduce((c, n) => c + `<a href="#" title="">${n.name}</a>`, ''));
                $('.tool-author').html(`<strong>${article.author}</strong> <span>${day.format('D.M.Y, HH:MM')}</span>`);
                $('.list-tag').html(tags.reduce((c, n) => c + `<li><a href="#" title="">${n.name}</a></li>`, `<li>Tags: </li>`));
                $('.link-topic').html(`<span>Bạn đang đọc trong chuyên đề</span>  <strong>" ${topical.name} "</strong>`);

                if (prev) {
                    $('.link-back').attr('href', urlPrev)
                } else {
                    $('.link-back').remove();
                }

                if (next) {
                    $('.link-next').attr('href', urlNext)
                } else {
                    $('.link-next').remove();
                }
            }
        )
    }
}

$(() => {
    new Topical2Detail()
});
