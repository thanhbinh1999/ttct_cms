<?php

namespace Kuroneko\Core\Supports\Message;

use Kuroneko\Core\Supports\Message\PHPMailer;

/**
 * Class Mailer
 * Created by PhpStorm
 * Author: Vinh Banh <apacheservices68@gmail.com>
 * @package common\services
 */
class Mailer
{

    /**
     * @var PHPMailer
     */
    public $mail;


    public function __construct()
    {
        $this->mail = new PHPMailer();
    }

    /**
     * @param $obj
     * @param $code
     * @return bool
     */
    public function send($obj, $code)
    {
        if (!preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i', $obj)) {
            return $this->_sms($obj, $code);
        }
        return $this->_email($obj, $code);
    }

    /**
     * @param $obj
     * @param $msg
     * @return bool
     */
    public function sendSms($obj, $msg)
    {
        return $this->_sendSms($obj, $msg);
    }

    /**
     * @param $obj
     * @param $msg
     * @return bool
     */
    public function sendEmail($obj, $msg)
    {
        return $this->_sendEmail($obj, $msg);
    }

    /**
     * @param $phone
     * @param $code
     * @return bool
     * @throws phpmailerException
     */
    private function _sms($phone, $code)
    {
        $this->mail->CharSet = 'UTF-8';
        $this->mail->IsSMTP();
        $this->mail->Host = getenv('AUTH_SERVICE_ADDRESS'); # '192.168.88.81'
        $this->mail->Port = getenv('AUTH_SERVICE_PORT_SMS'); # 25
        $this->mail->Mailer = getenv('AUTH_SERVICE_TYPE'); # smtp
        $this->mail->SMTPAuth = false;
        $this->mail->From = getenv('AUTH_SERVICE_EMAIL'); #no-reply@tuoitre.com.vn
        $this->mail->FromName = getenv('AUTH_SERVICE_NAME'); # CMS TTO
        $this->mail->Subject = 'Mã xác thực CMS TTCT';
        $this->mail->AddAddress($phone . '@sms.tuoitre.com.vn');
        $body = 'Mã xác thực CMS : ' . $code . ' . No reply!';
        $this->mail->Body = $body;
        $this->mail->IsHTML(false);

        return $this->mail->Send();
    }

    /**
     * @param $phone
     * @param $msg
     * @return bool
     * @throws phpmailerException
     */
    private function _sendSms($phone, $msg)
    {
        $this->mail->CharSet = 'UTF-8';
        $this->mail->IsSMTP();
        $this->mail->Host = getenv('AUTH_SERVICE_ADDRESS'); # '192.168.88.81'
        $this->mail->Port = getenv('AUTH_SERVICE_PORT_SMS'); # 25
        $this->mail->Mailer = getenv('AUTH_SERVICE_TYPE'); # smtp
        $this->mail->SMTPAuth = false;
        $this->mail->From = getenv('AUTH_SERVICE_EMAIL'); #no-reply@tuoitre.com.vn
        $this->mail->FromName = getenv('AUTH_SERVICE_NAME'); # CMS TTO
        $this->mail->Subject = 'Mã xác thực CMS TTCT';
        $this->mail->AddAddress($phone . '@sms.tuoitre.com.vn');
        $body = $msg;
        $this->mail->Body = $body;
        $this->mail->IsHTML(false);

        return $this->mail->Send();
    }

    /**
     * @param $email
     * @param $otp
     * @return bool
     * @throws phpmailerException
     */
    private function _email($email, $otp)
    {
        $expire = strtotime("+1 minutes");
        $this->mail->CharSet = 'UTF-8';
        $this->mail->IsSMTP();
        $this->mail->Host = getenv('AUTH_SERVICE_HOST');
        $this->mail->Port = getenv('AUTH_SERVICE_PORT_EMAIL');
        $this->mail->Mailer = getenv('AUTH_SERVICE_TYPE');
        $this->mail->SMTPAuth = true;
        $this->mail->Username = getenv('AUTH_SERVICE_EMAIL');
        $this->mail->Password = getenv('AUTH_SERVICE_PASS');
        $this->mail->From = getenv('AUTH_SERVICE_EMAIL');
        $this->mail->FromName = getenv('AUTH_SERVICE_NAME'); # CMS TTO
        $this->mail->Subject = t('cms', 'Mã xác thực CMS TTO');
        $this->mail->AddAddress($email);

        $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        $body .= '<html>';
        $body .= '<head>';
        $body .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
        $body .= '</head>';
        $body .= '<body>';
        $body .= '<div><p><b>Mã xác thực sẽ hết hạn trong vòng 1 phút:</b> ' . date('h:i:s d-m-Y', $expire) . '</p></div>';
        $body .= '<div><p><b>Mã xác thực:</b> ' . $otp . '<p></div>';
        $body .= '</body>';
        $body .= '</html>';

        $this->mail->Body = $body;
        $this->mail->IsHTML(true);

        return $this->mail->Send();
    }

    /**
     * @param $email
     * @param $msg
     * @return bool
     * @throws phpmailerException
     */
    private function _sendEmail($email, $msg)
    {
        $this->mail->CharSet = 'UTF-8';
        $this->mail->IsSMTP();
        $this->mail->Host = getenv('AUTH_SERVICE_HOST');
        $this->mail->Port = getenv('AUTH_SERVICE_PORT_EMAIL');
        $this->mail->Mailer = getenv('AUTH_SERVICE_TYPE');
        $this->mail->SMTPAuth = true;

        $this->mail->Username = getenv('AUTH_SERVICE_EMAIL');
        $this->mail->Password = getenv('AUTH_SERVICE_PASS');
        $this->mail->From = getenv('AUTH_SERVICE_EMAIL');
        $this->mail->FromName = getenv('AUTH_SERVICE_NAME'); # CMS TTO
        $this->mail->Subject = 'Mã xác thực CMS TTCT';
        $this->mail->AddAddress($email);

        $body = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    </head>
                    <body>
                        '.$msg.'
                    </body>
                </html>';

        $this->mail->Body = $body;
        $this->mail->IsHTML(true);
        return $this->mail->Send();
    }
}
