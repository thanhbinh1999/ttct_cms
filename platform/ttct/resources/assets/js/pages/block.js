/**
 * @author        Giang Nguyen
 * @description block for create html
 */
export const block = {
    block_1: {
        name: 'Block trích dẫn 1',
        html: `<div class="dbox">
                <div class="inner">
                    <p style="text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
                </div>
            </div>`
    },
    block_2: {
        name: 'Block trích dẫn 2',
        html: `<div class="block-quote-style">
                <p style="text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
                <span class="author"><span>Lorem Ipsum</span></span>
            </div>`
    },
    block_3: {
        name: 'Block đoạn text & tiêu đề lớn',
        html: `<h2 style="font-family: 'Montserrat', serif;margin: 50px 0 30px 0;text-align: center;">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
              <p style="margin: 0 0 1rem;text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>`,
    },
    block_4: {
        name: 'Block đoạn text',
        html: `<p style="margin: 0 0 1rem;text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>`,
    },
    block_5: {
        name: 'Block 1 hình',
        html: `<figure class="img-big">
                <div class="grid-img" style="text-align: center">
                    <div href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                    </div>
                </div>
                <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
            </figure>`
    },
    block_6: {
        name: 'Block 2 hình',
        html: `<figure class="img-full">
                                <div class="grid-img grid-2">
                                    <div class="w-img-1" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-2" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                </div>
                                <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                            </figure>`
    },
    block_7: {
        name: 'Block 3 hình ngang',
        html: `<figure class="img-full">
                                <div class="grid-img grid-3-w">
                                    <div class="w-img-1" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-2" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-3" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                </div>
                                <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                            </figure>`
    },
    block_8: {
        name: 'Block 3 hình ngang - dọc',
        html: `<figure class="img-big">
                                <div class="grid-img grid-3-h">
                                    <div class="w-img-1" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-2" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-3" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                </div>
                                <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                            </figure>`
    },
    block_9:{
        name: 'Block 4 hình',
        html: `<figure class="img-big">
                                <div class="grid-img grid-4">
                                    <div class="w-img-1" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-2" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-3" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                    <div class="w-img-4" href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                                        <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                                    </div>
                                </div>
                                <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                            </figure>`
    },
    block_10:{
        name: 'Block hình bên trái',
        html:`<figure class="img-left">
                    <div class="grid-img">
                        <div href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                            <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                        </div>
                    </div>
                    <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                </figure>
                <p style="margin: 0 0 1rem;text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>`
    },
    block_11:{
        name: 'Block hình bên phải',
        html:`<figure class="img-right">
                    <div class="grid-img">
                        <div href="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" data-fancybox="gallery" data-caption="">
                            <img src="${$('body').data('base-url')}/assets/img/img-default-placeholder.jpg" alt="">
                        </div>
                    </div>
                    <figcaption style="text-align: center;font-style: italic;font-size: 14px;color: #555;"><span>Image caption</span></figcaption>
                </figure>
                <p style="margin: 0 0 1rem;text-align: justify;"><span style="font-size: 18px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>`
    }
};
