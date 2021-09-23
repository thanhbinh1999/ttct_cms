<?php

namespace Kuroneko\User\Classes\Helpers;

use Illuminate\Support\Carbon;

class UserHelper
{
    public static function renderNotify()
    {
        $unRead = auth()->user()->unReadNotifications;

        $html = '';

        foreach ($unRead as $item) {
            $data = $item->data['data'];
            $notifyType = strval($item->type);

            switch ($notifyType) {
                case 'Kuroneko\User\Notifications\ArticleTransferNotification':
                {
                    $text = $data['type'] == 'user' ? ('<strong>' . $data['from_user_username'] . '</strong> vừa ' . ($data['sb_or_fw'] == 1 ? 'chuyển một bài viết đến bạn' : 'trả lại một bài viết') . ': <strong>' . ($data['sb_or_fw'] == 1 ? $data['note'] : $data['article']) . '</strong>') : ('<strong>' . $data['from_user_username'] . '</strong> vừa chuyển một bài viết đến vai trò của bạn: <strong>' . $data['note'] . '</strong>');
                    $time = $item->created_at->diffForHumans();
                    $route = $data['sb_or_fw'] == 1 ? ($data['type'] == 'user' ? route('ttct.articles.article_for_me') : route('ttct.articles.article_send_by_role')) : route('ttct.articles.article_send_back');
                    $html .= '<a href="' . $route . '" class="kt-notification__item" data-url="' . route('users.mark_as_read_notify', $item->id) . '">
                        <div class="kt-notification__item-icon">
                            <i class="flaticon-interface-2 kt-font-success"></i>
                        </div>
                        <div class="kt-notification__item-details">
                            <div class="kt-notification__item-title">
                                ' . $text . '
                            </div>
                            <div class="kt-notification__item-time">
                                ' . $time . '
                            </div>
                        </div>
                    </a>';
                    break;
                }
                default:
                {
                    break;
                }
            }
        }

        return $html;
    }

    public static function countNotify()
    {
        return auth()->user()->unReadNotifications->count();
    }
}
