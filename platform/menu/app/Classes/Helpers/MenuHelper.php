<?php

namespace Kuroneko\Menu\Classes\Helpers;

use Kuroneko\Menu\Classes\Constants\MenuConstant;
use Kuroneko\Menu\Models\MenuItem;

/**
 * Class MenuHelper
 * @package Kuroneko\Menu\Classes\Helpers
 * @author Giang Nguyen
 */
class MenuHelper
{
    public static function generateHtml($items, $level = 1, $parent = null)
    {
        $html = '';
        if ($level == 2) {
            foreach ($items as $item) {
                if (!empty($item['children'])) {
                    $check = false;
                    foreach ($item['children'] as $tmp) {
                        $permission = json_decode(empty($tmp['permission']) ? null : $tmp['permission']);
                        if (!$permission) {
                            $check = true;
                            break;
                        }
                        if ($permission && can($permission->text)) {
                            $check = true;
                            break;
                        }
                    }

                    if ($check) {
                        $html .= '<div class="kt-menu__submenu ">
                        <span class="kt-menu__arrow"></span>
                            <ul class="kt-menu__subnav">

                                <li class="kt-menu__item  kt-menu__item--parent" aria-haspopup="true">
                                <span class="kt-menu__link">
                        <span class="kt-menu__link-text">' . $parent . '</span></span></li>';
                        $permission = json_decode(empty($item['permission']) ? null : $item['permission']);

                        if (($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && !$permission) ||
                            ($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && $permission && can($permission->text))
                        ) {
                            $name = json_decode($item['route_name']);
                            $html .= '<li class="kt-menu__item " aria-haspopup="true" ' . (\Route::currentRouteName() == $name->name ? 'data-active="1"' : '') . '>
                                ' . (!empty($item['children']) ? '<a href="javascript:;" class="kt-menu__link kt-menu__toggle">' : '<a href="' . $item['url'] . '" class="kt-menu__link ">') . '
                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i>
                                    <span class="kt-menu__link-text text-uppercase kt-font-bold">' . $item['name'] . '</span>
                                    ' . (!empty($item['children']) ? '<i class="kt-menu__ver-arrow la la-angle-right"></i>' : '') . '
                                </a>
                                ' . (!empty($item['children']) ? self::generateHtml($item['children'], $level + 1, $item['name']) : '') . '
                            </li>';


                            if (!empty($item['children'])) {
                                $html .= self::generateHtml($item['children'], $level + 1);
                            }
                        }
                        
                        $html .= '</ul></div>';
                    }
                } else {
                    $html .= '<div class="kt-menu__submenu "><span class="kt-menu__arrow"></span><ul class="kt-menu__subnav"><li class="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span class="kt-menu__link"><span class="kt-menu__link-text">' . $parent . '</span></span></li>';
                    $permission = json_decode(empty($item['permission']) ? null : $item['permission']);

                    if (($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && !$permission) ||
                        ($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && $permission && can($permission->text))
                    ) {
                        $name = json_decode($item['route_name']);

                        $html .= '<li class="kt-menu__item " aria-haspopup="true" ' . (\Route::currentRouteName() == $name->name ? 'data-active="1"' : '') . '>
                                ' . (!empty($item['children']) ? '<a href="javascript:;" class="kt-menu__link kt-menu__toggle">' : '<a href="' . $item['url'] . '" class="kt-menu__link ">') . '
                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i>
                                    <span class="kt-menu__link-text text-uppercase kt-font-bold">' . $item['name'] . '</span>
                                    ' . (!empty($item['children']) ? '<i class="kt-menu__ver-arrow la la-angle-right"></i>' : '') . '
                                </a>
                                ' . (!empty($item['children']) ? self::generateHtml($item['children'], $level + 1, $item['name']) : '') . '
                            </li>';

                        if (!empty($item['children'])) {
                            $html .= self::generateHtml($item['children'], $level + 1);
                        }
                    }
                    $html .= '</ul></div>';
                }
            }

        } else if ($level == 3) {
            $check = false;
            foreach ($items as $item) {
                $permission = json_decode(empty($item['permission']) ? null : $item['permission']);
                if (!$permission) {
                    $check = true;
                    break;
                }
                if ($permission && can($permission->text)) {
                    $check = true;
                    break;
                }
            }
            if ($check) {
                $html = '<div class="kt-menu__submenu "><span class="kt-menu__arrow"></span><ul class="kt-menu__subnav">';

                foreach ($items as $item) {
                    if ($item['status'] == MenuConstant::MENU_STATUS_ACTIVE) {
                        $name = json_decode($item['route_name']);
                        $html .= '<li class="kt-menu__item " aria-haspopup="true">
                                <a href="' . $item['url'] . '" class="kt-menu__link " ' . (\Route::currentRouteName() == $name->name ? 'data-active="1"' : '') . '>
                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i>
                                    <span class="kt-menu__link-text text-uppercase kt-font-bold">' . $item['name'] . '</span>
                                </a>
                            </li>';
                    }
                }
                $html .= '</ul></div>';
            } else {
                return '';
            }

        } else {
            $html = '';
            foreach ($items as $item) {
                //if menu has child menu
                if (!empty($item['children'])) {
                    $check = false;
                    foreach ($item['children'] as $tmp) {
                        $permission = json_decode(empty($tmp['permission']) ? null : $tmp['permission']);
                        if (!$permission) {
                            $check = true;
                            break;
                        }
                        if ($permission && can($permission->text)) {
                            $check = true;
                            break;
                        }
                    }

                    if ($check) {
                        $permission = json_decode(empty($item['permission']) ? null : $item['permission']);
                        if (($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && $permission && can($permission->text)) ||
                            ($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && !$permission)) {
                            $isNoChild = !empty($item['children']) && count($item['children']) == 1 && $item['children'][0]['status'] != MenuConstant::MENU_STATUS_ACTIVE;
                            $name = json_decode($item['route_name']);
                            $html .= '<li class="kt-menu__item ' . (!empty($item['children']) ? 'kt-menu__item--submenu' : '') . '" aria-haspopup="true" ' . (!empty($item['children']) ? 'data-ktmenu-submenu-toggle="hover"' : '') . (\Route::currentRouteName() == $name->name ? 'data-active="1"' : '') . ' >
                            ' . (!empty($item['children']) ? '<a href="javascript:;" class="kt-menu__link kt-menu__toggle">' : '<a href="' . $item['url'] . '" class="kt-menu__link">') . '
                                <span class="kt-menu__link-icon">' . (!empty($item['icon']) ? '<i class="' . $item['icon'] . '"></i>' : '') . '</span>
                                <span class="kt-menu__link-text text-uppercase kt-font-bold">' . $item['name'] . '</span>
                                ' . (!empty($item['children']) ? '<i class="kt-menu__ver-arrow la la-angle-right"></i>' : '') . '
                            </a>
                            ' . ($isNoChild != true ? self::generateHtml($item['children'], $level + 1, $item['name']) : '') . '
                       </li>';
                       /*$html.= "<li class = 'kt-menu__item' aria-haspopup =  true
                                 <a href  'javascript:void()' class=  'kt-menu__link kt-menu__toggle'>
                                   <span class = ' kt-menu__link-icon'>Tac gia</span>
                                 </a>
                              </li>
                              ";*/
                        }
                    }

                } else {
                    $permission = json_decode(empty($item['permission']) ? null : $item['permission']);
                    if (($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && $permission && can($permission->text)) ||
                        ($item['status'] == MenuConstant::MENU_STATUS_ACTIVE && !$permission)) {
                        $isNoChild = !empty($item['children']) && count($item['children']) == 1 && $item['children'][0]['status'] != MenuConstant::MENU_STATUS_ACTIVE;
                        $name = json_decode($item['route_name']);
                        $html .= '<li class="kt-menu__item ' . (!empty($item['children']) ? 'kt-menu__item--submenu' : '') . '" aria-haspopup="true" ' . (!empty($item['children']) ? 'data-ktmenu-submenu-toggle="hover"' : '') . (\Route::currentRouteName() == $name->name ? 'data-active="1"' : '') . ' >
                            ' . (!empty($item['children']) ? '<a href="javascript:;" class="kt-menu__link kt-menu__toggle">' : '<a href="' . $item['url'] . '" class="kt-menu__link">') . '
                                <span class="kt-menu__link-icon">' . (!empty($item['icon']) ? '<i class="' . $item['icon'] . '"></i>' : '') . '</span>
                                <span class="kt-menu__link-text text-uppercase kt-font-bold">' . $item['name'] . '</span>
                                ' . (!empty($item['children']) ? '<i class="kt-menu__ver-arrow la la-angle-right"></i>' : '') . '
                            </a>
                            ' . ($isNoChild != true ? self::generateHtml($item['children'], $level + 1, $item['name']) : '') . '
                       </li>';
                       
                    }
                }
            }

        }
        return $html;
    }
}
