<?php

namespace Kuroneko\Comment\Classes\Constants;

class CommentConstant
{
    const STATUS_PUBLISHED = 50; # đã xuất bản
    const STATUS_VERIFIED = 2; # Đã kiểm duyệt
    const STATUS_PENDING = 3; # Đang chờ
    const STATUS_DELETED = 4; # Đã xóa
    /*List status bị lọc*/
    const STATUS_FILTER_UNSIGN = 5; # Không dấu
    const STATUS_FILTER_HAS_LINK = 6; # Có link
    const STATUS_FILTER_HAS_PHONE = 7; # Có Sđt
    const STATUS_FILTER_SHORT_SENTENCE = 8; # Cmt ngắn
    const STATUS_FILTER_SAME_CMT = 9; # cmt giống nhau
    const STATUS_FILTER_WORD_DANGER = 10; # từ khóa nguy hiểm
    const STATUS_FILTER_WORD_CAREFUL = 11; # từ khóa chú ý

    const TOP_NEWS = 'top_news';
    const STATUS_BAD_COMMENT = 'bad_comment';
    const STATUS_SAVE_CONTENT = 'save_content';
    const REPORT_STATUS = 'report';
    const STATUS_ALL = 'all';
}
