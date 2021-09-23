import axios from "axios";
import moment from "moment";

class Topical2 {

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
            if (parseInt(article.status) === 10)
                arr.push(axios.get(urlGetArticle + article.id))
        });

        Promise.all(arr).then(
            value => {
                let topical = value[0].data;
                let articles = value.slice(1, value.length);

                let topicalHtml = `<span class="img-topic" style="background-image: radial-gradient(ellipse, transparent 10%, #fff 65%),linear-gradient(to right, #eee, #eee), url(${topical.thumbnail.base_url}/${topical.thumbnail.absolute_url});"></span>
                                    <div class="outer-header">
                                        <div class="container">
                                            <div class="inner-header">
                                                <h1>${topical.name}</h1>
                                                <p>${topical.description}</p>
                                            </div>
                                        </div>
                                    </div>`;
                $('.masterHeader').html(topicalHtml);

                let articleHtml = articles.reduce((c, n) => {
                    let article = n.data;
                    let day = moment.unix(article.created_at);
                    let url = $('body').data('preview-detail');
                    url = url.slice(0, url.lastIndexOf('/') + 1) + article.id;
                    return c + `<article class="art-right">
                                    <div class="outer-thumb">
                                        <a class="thumb" href="#">
                                            <img lass="lazyload" src="${article.thumbnail.base_url}/${article.thumbnail.absolute_url}" data-original="${article.thumbnail.base_url}/${article.thumbnail.absolute_url}" alt="">
                                        </a>
                                    </div>
                                    <div class="des">
                                        <div class="b-center">
                                            <span class="date">${day.format('D/M/Y')}</span>
                                            <h3><a href="${url}" title="">${article.title}</a></h3>
                                            <a class="author_1" href="#">${article.author}</a>
                                        </div>
                                    </div>
                                </article>`;
                }, '');


                $('.list-art').html(articleHtml);
            }
        )
    }
}

$(() => {
    new Topical2()
});
