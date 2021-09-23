
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Trang Chủ - Tuổi Trẻ Cuối Tuần</title>
    <!-- Bootstrap core CSS -->
    <link rel="shortcut icon" href="{{ asset('assets/article-preview/img/favicon.ico') }}" type="image/x-icon" />
    <link href="{{ asset('assets/article-preview/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/article-preview/vendor/iOS7-icon-font-master/icon.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/article-preview/vendor/fontawesome-free/css/all.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/article-preview/vendor/fancybox-master/dist/jquery.fancybox.min.css') }}" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="{{ asset('assets/article-preview/scss/style.css') }}" rel="stylesheet">
</head>

<body class="detail-1" data-article-detail="{{ $listUrl['article-detail'] }}" data-topical-detail="{{ $listUrl['topical-detail'] }}" data-preview-detail="{{ $listUrl['preview-detail'] }}">
<div class="loading-page">
    <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<!-- Navigation -->
<nav class="navbar menu navbar-expand-lg fixed-top nav-style" id="mainNav">
    <div class="container">
        <a class="navbar-brand logo" href="#"><img src="{{ asset('assets/article-preview/img/page/logo.png') }}" alt=""></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li>
                    <a class="logo-list" href="#"><img src="{{ asset('assets/article-preview/img/page/logo.png') }}" alt=""></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Vấn đề sự kiện</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Cuộc sống muôn màu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Văn hóa giải trí</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="user">
                    <a class="nav-link link" href="#">Đăng nhập </a>
                </li>
                <li class="user">
                    <a class="nav-link link" href="#">Đăng ký </a>
                </li>

            </ul>
        </div>
        <div class="find">
            <a class="button btn-find" data-toggle="modal" data-target="#searchModal" title=""><span class="icon">&#61788</span></a>
        </div>
    </div>
</nav>
<div class="banner-n">
    <img src="{{ asset('assets/article-preview/img/page/banner-top.jpg') }}" alt="">
</div>
<!-- Services -->
<div class="container">
    <section class="section section-top">
        <div class="block-cover-style">
            <div class="box-top-style">
                <h1 class="fck-title"></h1>
                <div class="parent_cate">
                </div>
                <div class="tool-author">
                    <strong>Long Nhật</strong> <span>05.03.2019, 15:14</span>
                </div>
            </div>
        </div>
        <div class="row row-style">
            <div class="block-right">
                <ul class="tool ui sticky-top">
                    <li><span><i class="icon icon-like"></i></span> 245</li>
                    <li><span><i class="icon icon-comment"></i></span> 24</li>
                    <li><span><i class="icon icon-facebook"></i></span></li>
                    <li><span><i class="icon icon-save"></i></span></li>
                </ul>
            </div>
            <section class="content border-right content-detail">
                <article class="fck">
                </article>
                <div class="topic-bar">
                    <a class="link-back" href="#"><span class="icon">&#61760</span> <i>Trở lại</i> </a>
                    <a class="link-topic" href="#"><span>Bạn đang đọc trong chuyên đề</span>  <strong>" Chính sách nhập cư "</strong></a>
                    <ul class="tool">
                        <li><span><i class="icon icon-like"></i></span></li>
                        <li><span><i class="icon icon-comment"></i></span></li>
                        <li><span><i class="icon icon-facebook"></i></span></li>
                        <li><span><i class="icon icon-save"></i></span></li>
                    </ul>
                    <a class="link-next" href="#"><i>Tiếp theo</i> <span class="icon">&#61812</span></a>
                </div>
                <ul class="list-tag">
                    <li>Tags: </li>
                    <li><a href="#" title="">thiếu ngủ</a></li>
                    <li><a href="#" title="">bệnh tim</a></li>
                    <li><a href="#" title="">chơi game</a></li>
                    <li><a href="#" title="">toàn lực</a></li>
                    <li><a href="#" title="">kém hiệu quả</a></li>
                </ul>
            </section>
            <aside class="sidebar">
                <div class="block-bar">
                    <a href="#" title="">
                        <img src="{{ asset('assets/article-preview/img/page/300x600.jpg') }}" alt="">
                    </a>
                </div>
                <div class="block-bar sticky-top">
                    <a href="#" title="">
                        <img src="{{ asset('assets/article-preview/img/page/300x250.jpg') }}" alt="">
                    </a>
                </div>
            </aside>
        </div>
        <div class="block-related-new">
            <h3>Tin liên quan</h3>
            <div class="row">
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-2.jpg') }}" data-original="img/page/img-2.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-3.jpg') }}" data-original="img/page/img-3.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-4.jpg') }}" data-original="img/page/img-4.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-5.jpg') }}" data-original="img/page/img-5.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-6.jpg') }}" data-original="img/page/img-6.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
                <div class="col-lg-4">
                    <article class="art-1">
                        <a class="thumb" href="#">
                            <img lass="lazyload" src="{{ asset('assets/article-preview/img/page/img-1.jpg') }}" data-original="img/page/img-1.jpg" alt="">
                        </a>
                        <div class="des">

                            <h3 class="mt-3"><a href="#" title="">Tuổi Trẻ Cuối Tuần số 47-2019 với câu chuyện Trung
                                    Quốc và tham</a></h3>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</div>
<!-- Footer -->
<footer class="footer">
    <div class="top-footer">
        <div class="container">
            <div class="inner">
                <ul class="list-sp">
                    <li><a href="#" title="">TUỔI TRẺ ONLINE</a></li>
                    <li><a href="#" title="">TUOITRENEWS</a></li>
                    <li><a href="#" title="">TRUYỀN HÌNH TUỔI TRẺ</a></li>
                    <li><a href="#" title="">TUỔI TRẺ CƯỜI</a></li>
                </ul>
                <ul class="list-social">
                    <li class="facebook"><a class="button" href="#" title=""><i class="fab fa-facebook-f"></i></a></li>

                </ul>
            </div>
        </div>
    </div>
    <div class="middle-footer">
        <div class="container">
            <div class="row">
                <div class="col-lg">
                    <dl>
                        <dt><a href="#" title="">Vấn đề sự kiện</a></dt>

                    </dl>
                </div>
                <div class="col-lg">
                    <dl>
                        <dt><a href="#" title="">Cuộc sống muôn màu</a></dt>

                    </dl>
                </div>
                <div class="col-lg">
                    <dl>
                        <dt><a href="#" title="">Văn hóa giải trí</a></dt>

                    </dl>
                </div>
            </div>
            <div class="footer-tag">
                <a class="tag" href="#" title="">Chính sách nhập cư</a>
                <a class="tag" href="#" title="">Hiến tạng</a>
                <a class="tag" href="#" title="">Tết 2020</a>
                <a class="tag" href="#" title="">Cơ hội Việt Nam</a>
                <a class="tag" href="#" title="">Phía sau núi</a>
                <a class="tag" href="#" title="">Kinh tế mới</a>
                <a class="tag" href="#" title="">Nga và cải cách</a>
                <a class="tag" href="#" title="">Căng thẳng trung đông</a>
                <a class="tag" href="#" title="">Dịch corona</a>
                <a class="tag" href="#" title="">Cướp nhí lộng hành</a>
                <a class="tag" href="#" title="">Nhà nước Việt Nam</a>
                <a class="tag" href="#" title="">Lịch sử và sự thật</a>
                <a class="tag" href="#" title="">Văn hóa và du lịch</a>
                <a class="tag" href="#" title="">Luật biển</a>
                <a class="tag" href="#" title="">Cái giá Hoa Hậu</a>
                <a class="tag" href="#" title="">Tài chính tình cảm</a>
                <a class="tag" href="#" title="">Rừng quốc gia</a>
            </div>
        </div>
    </div>
    <div class="bottom-footer">
        <div class="container">
            <div class="d-flex">
                <p class="copyright">© Copyright 2019 TUOITRE.VN, All rights reserved <br>
                    ® Tuổi Trẻ Online giữ bản quyền nội dung trên website này.</p>
                <p class="right">
                    <a href="#" title="">Thông tin Tòa soạn</a> -
                    <a href="#" title="">Thông tin Thành Đoàn</a> -
                    <a href="#" title="">Liên hệ Quảng cáo</a> - <br>
                    <a href="tel:0918033133" title="">Điện thoại liên hệ: 0918.033.133</a>
                </p>
            </div>
        </div>
    </div>
</footer>
<a class="btn-top" href="javascript:void(0)" title=""><span class="icon">&#61736</span></a>
<!-- Portfolio Modals -->
<!-- Bootstrap core JavaScript -->
<script src="{{ asset('assets/article-preview/vendor/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('assets/article-preview/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- Plugin JavaScript -->
<script src="{{ asset('assets/article-preview/vendor/jquery-easing/jquery.easing.min.js') }}"></script>
<script src="{{ asset('assets/article-preview/vendor/fancybox-master/dist/jquery.fancybox.min.js') }}"></script>
<!-- Custom scripts for this template -->
<script src="{{ asset('assets/article-preview/js/start.min.js') }}"></script>
<script src="{{ asset('assets/article-preview/js/topical-2-detail.js') }}"></script>
</body>

</html>
