import axios from 'axios'
import moment from 'moment';

class Topical1 {
    constructor() {
        this.init();
    }

    init() {
        let urlGetArticle = $('body').data('article-detail');
        let urlGetTopical = $('body').data('topical-detail');
        let data = JSON.parse(localStorage.getItem('preview-topical-data'));

        let arr = [
            axios.get(urlGetTopical + data.id)
        ];

        data.articles.forEach(article => {
            if (article.status === 10)
                arr.push(axios.get(urlGetArticle + article.id))
        });

        Promise.all(arr).then(
            value => {
                let topical = value[0].data;
                let articles = value.slice(1, value.length);
                let topicalHtml = `<div class="slide slide-dark" style="background: url(${topical.thumbnail.base_url}/${topical.thumbnail.absolute_url}) center center no-repeat; background-size: cover;">
                                        <div class="caption-ctn caption-left-top">
                                            <h1>${topical.name}</h1>
                                            <a class="link-home" href="#" title="">Tuổi Trẻ Cuối Tuần</a>
                                        </div>
                                    </div>
                                    <div class="slide">
                                        <div class="sapo">
                                            ${topical.description}
                                        </div>
                                    </div>`;

                let articleHtml = articles.reduce((c, n) => {
                    let article = n.data;
                    let day = moment.unix(article.created_at);
                    return c + `<div class="slide scrollable-element scrollnormal">
                                    <div class="block-cover" style="background: url(${article.thumbnail.base_url}/${article.thumbnail.absolute_url}) center center no-repeat; background-size: cover;">
                                        <div class="box-top">
                                            <h1 class="fck-title">${article.title}</h1>
                                            <div class="parent_cate">
                                                <a href="#" title="">Vấn đề sự kiện</a>
                                                <a href="#" title="">Ngoài nước</a>
                                            </div>
                                            <div class="tool-author">
                                                <strong>${article.author}</strong><span>${day.format('D,M,Y HH:MM')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <section class="section section-top detail-topic">
                                            <div class="block-center row">
                                                <section class="content-detail content">
                                                    <article class="fck">
                                                 <article>  <p class="article-summary">${article.excerpt}</p>
                                                    ${article.content}</article>
                                                    </article>
                                                </section>
                                            </div>

                                        </section>
                                    </div>
                                </div>`;
                }, '');


                $('#section0').html(topicalHtml + articleHtml);

                $('#fullpage').fullpage({
                    loopBottom: false,
                    loopTop: false,
                    loopHorizontal: false,
                    css3: true,
                    responsiveWidth: 1025,
                    afterResponsive: function (isResponsive) {
                        scrollOverflow: true
                    }
                });
            }
        )
    }
}

$(() => {
    new Topical1()
});
