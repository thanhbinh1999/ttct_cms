<?php

/*
|--------------------------------------------------------------------------
| Comment helper
|--------------------------------------------------------------------------
|
*/

// define your helper function here

if (!function_exists('platform_path')) {

    /**
     * @param null $path
     * @return string
     */
    function platform_path($path = null)
    {
        return __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $path;
    }
}

if (!function_exists('convert_name_to_status')) {
    function convert_name_to_status($name)
    {
        switch ($name) {
            case 'report':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::REPORT_STATUS;
                break;
            case 'bad_comment':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_BAD_COMMENT;
                break;
            case 'published':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_PUBLISHED;
                break;
            case 'verified':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_VERIFIED;
                break;
            case 'pending':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_PENDING;
                break;
            case 'deleted':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_DELETED;
                break;
            case 'f_unsign':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_UNSIGN;
                break;
            case 'f_has_link':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_HAS_LINK;
                break;
            case 'f_has_phone':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_HAS_PHONE;
                break;
            case 'f_short_sentence':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_SHORT_SENTENCE;
                break;
            case 'f_same_comment':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_SAME_CMT;
                break;
            case 'f_word_danger':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_WORD_DANGER;
                break;
            case 'f_word_careful':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_WORD_CAREFUL;
                break;
            case 'all':
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_ALL;
                break;
            default:
                return \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_PENDING;
                break;
        }
    }
}

if (!function_exists('convert_status_to_name')) {
    /**
     * @param $status
     * @return string
     */
    function convert_status_to_name($status)
    {
        switch ($status) {
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::REPORT_STATUS:
                return 'report';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_BAD_COMMENT:
                return 'bad_comment';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_PUBLISHED:
                return 'published';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_VERIFIED:
                return 'verified';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_PENDING:
                return 'pending';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_DELETED:
                return 'deleted';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_UNSIGN:
                return 'f_unsign';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_HAS_LINK:
                return 'f_has_link';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_HAS_PHONE:
                return 'f_has_phone';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_SHORT_SENTENCE:
                return 'f_short_sentence';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_SAME_CMT:
                return 'f_same_comment';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_WORD_DANGER:
                return 'f_word_danger';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_FILTER_WORD_CAREFUL:
                return 'f_word_careful';
                break;
            case \Kuroneko\Comment\Classes\Constants\CommentConstant::STATUS_ALL:
                return 'all';
                break;
            default:
                return 'pending';
                break;
        }
    }
}

if (!function_exists('convert_array_name_to_array_status')) {
    /**
     * @return array
     */
    function convert_array_name_to_array_status()
    {
        $result = [];
        if (!empty($arr)) {
            foreach ($arr as $item) {
                $result[] = convert_name_to_status($item);
            }
        }
        return $result;
    }
}
