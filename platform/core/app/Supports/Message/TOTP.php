<?php
/**
 * Created by PhpStorm.
 * Author: Vinh Banh <apacheservices68@gmail.com> on 03/04/2018
 * Date: 03/04/2018
 * Time: 16:00
 */

namespace Kuroneko\Core\Supports\Message;


/**
 * Class TOTP
 * Created by PhpStorm
 * Author: Vinh Banh <apacheservices68@gmail.com>
 * @package common\components\auth
 */
class TOTP
{
    private static $map = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', //  7
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', // 15
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', // 23
        'Y', 'Z', '2', '3', '4', '5', '6', '7', // 31
        '='  // padding character
    ];

    private static $flippedMap = [
        'A'=>'0', 'B'=>'1', 'C'=>'2', 'D'=>'3', 'E'=>'4', 'F'=>'5', 'G'=>'6', 'H'=>'7',
        'I'=>'8', 'J'=>'9', 'K'=>'10', 'L'=>'11', 'M'=>'12', 'N'=>'13', 'O'=>'14', 'P'=>'15',
        'Q'=>'16', 'R'=>'17', 'S'=>'18', 'T'=>'19', 'U'=>'20', 'V'=>'21', 'W'=>'22', 'X'=>'23',
        'Y'=>'24', 'Z'=>'25', '2'=>'26', '3'=>'27', '4'=>'28', '5'=>'29', '6'=>'30', '7'=>'31'
    ];

    public static function verify($secretkey, $code, $rangein30s = 3)
    {
        $key           = self::decode32($secretkey);
        $unixtimestamp = time()/30;

        for ($i =- ($rangein30s); $i <= $rangein30s; $i++) {
            $checktime = (int)($unixtimestamp+$i);
            $thiskey   = self::oath_hotp($key, $checktime);

            if ((int)$code == self::oath_truncate($thiskey, 6)) {
                return true;
            }
        }
        return false;
    }


    public static function getTokenCode($secretkey, $rangein30s = 3)
    {
        $result        = "";
        $key           = self::decode32($secretkey);
        $unixtimestamp = time()/30;

        for ($i =- ($rangein30s); $i <= $rangein30s; $i++) {
            $checktime = (int)($unixtimestamp+$i);
            $thiskey   = self::oath_hotp($key, $checktime);
            $result    = self::oath_truncate($thiskey, 6);
        }

        return $result;
    }

    public static function getTokenCodeDebug($secretkey, $rangein30s = 3)
    {
        $result = "";
        print "<br/>SecretKey: $secretkey <br/>";

        $key = self::decode32($secretkey);
        print "Key(base 32 decode): $key <br/>";

        $unixtimestamp = time()/30;
        print "UnixTimeStamp (time()/30): $unixtimestamp <br/>";

        for ($i =- ($rangein30s); $i <= $rangein30s; $i++) {
            $checktime = (int)($unixtimestamp+$i);
            print "Calculating oath_hotp from (int)(unixtimestamp +- 30sec offset): $checktime basing on secret key<br/>";

            $thiskey = self::oath_hotp($key, $checktime, true);
            print "======================================================<br/>";
            print "CheckTime: $checktime oath_hotp:".$thiskey."<br/>";

            $result = $result." # ".self::oath_truncate($thiskey, 6, true);
        }

        return $result;
    }

    public static function getBarCodeUrl($username, $domain, $secretkey, $issuer)
    {
        $url = "http://chart.apis.google.com/chart";
        $url = $url."?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/";
        $url = $url.$username . "@" . $domain . "%3Fsecret%3D" . $secretkey . '%26issuer%3D' . rawurlencode($issuer);

        return $url;
    }

    public static function generateRandomClue($length = 16)
    {
        $b32 = "234567QWERTYUIOPASDFGHJKLZXCVBNM";
        $s   = "";

        for ($i = 0; $i < $length; $i++) {
            $s .= $b32[rand(0, 31)];
        }

        return $s;
    }

    private static function hotp_tobytestream($key)
    {
        $result = [];
        $last   = strlen($key);
        for ($i = 0; $i < $last; $i = $i + 2) {
            $x      = $key[$i] + $key[$i + 1];
            $x      = strtoupper($x);
            $x      = hexdec($x);
            $result =  $result.chr($x);
        }

        return $result;
    }

    private static function oath_hotp($key, $counter, $debug=false)
    {
        $result      = "";
        $orgcounter  = $counter;
        $cur_counter = [0,0,0,0,0,0,0,0];

        if ($debug) {
            print "Packing counter $counter (".dechex($counter).")into binary string - pay attention to hex representation of key and binary representation<br/>";
        }

        for ($i = 7; $i >= 0; $i--) {
            $cur_counter[$i] = pack('C*', $counter);

            if ($debug) {
                print $cur_counter[$i]."(".dechex(ord($cur_counter[$i])).")"." from $counter <br/>";
            }

            $counter = $counter >> 8;
        }

        if ($debug) {
            foreach ($cur_counter as $char) {
                print ord($char) . " ";
            }

            print "<br/>";
        }

        $binary = implode($cur_counter);

        // Pad to 8 characters
        str_pad($binary, 8, chr(0), STR_PAD_LEFT);

        if ($debug) {
            print "Prior to HMAC calculation pad with zero on the left until 8 characters.<br/>";
            print "Calculate sha1 HMAC(Hash-based Message Authentication Code http://en.wikipedia.org/wiki/HMAC).<br/>";
            print "hash_hmac ('sha1', $binary, $key)<br/>";
        }

        $result = hash_hmac('sha1', $binary, $key);

        if ($debug) {
            print "Result: $result <br/>";
        }

        return $result;
    }

    private static function oath_truncate($hash, $length = 6, $debug=false)
    {
        $result="";

        // Convert to dec
        if ($debug) {
            print "converting hex hash into characters<br/>";
        }

        $hashcharacters = str_split($hash, 2);

        if ($debug) {
            print_r($hashcharacters);
            print "<br/>and convert to decimals:<br/>";
        }

        for ($j=0; $j<count($hashcharacters); $j++) {
            $hmac_result[]=hexdec($hashcharacters[$j]);
        }

        if ($debug) {
            print_r($hmac_result);
        }

        $offset = $hmac_result[19] & 0xf;

        if ($debug) {
            print "Calculating offset as 19th element of hmac:".$hmac_result[19]."<br/>";
            print "offset:".$offset;
        }

        $result = (
                (($hmac_result[$offset+0] & 0x7f) << 24) |
                (($hmac_result[$offset+1] & 0xff) << 16) |
                (($hmac_result[$offset+2] & 0xff) << 8) |
                ($hmac_result[$offset+3] & 0xff)
            ) % pow(10, $length);

        return $result;
    }

    public static function encode32($input, $padding = true)
    {
        if (empty($input)) {
            return "";
        }

        $input        = str_split($input);
        $binaryString = "";

        for ($i = 0; $i < count($input); $i++) {
            $binaryString .= str_pad(base_convert(ord($input[$i]), 10, 2), 8, '0', STR_PAD_LEFT);
        }

        $fiveBitBinaryArray = str_split($binaryString, 5);
        $base32             = "";
        $i                  = 0;

        while ($i < count($fiveBitBinaryArray)) {
            $base32 .= self::$map[base_convert(str_pad($fiveBitBinaryArray[$i], 5, '0'), 2, 10)];
            $i++;
        }

        if ($padding && ($x = strlen($binaryString) % 40) != 0) {
            if ($x == 8) {
                $base32 .= str_repeat(self::$map[32], 6);
            } elseif ($x == 16) {
                $base32 .= str_repeat(self::$map[32], 4);
            } elseif ($x == 24) {
                $base32 .= str_repeat(self::$map[32], 3);
            } elseif ($x == 32) {
                $base32 .= self::$map[32];
            }
        }

        return $base32;
    }

    public static function decode32($input)
    {
        if (empty($input)) {
            return;
        }

        $paddingCharCount = substr_count($input, self::$map[32]);
        $allowedValues    = [6,4,3,1,0];

        if (!in_array($paddingCharCount, $allowedValues)) {
            return false;
        }

        for ($i = 0; $i < 4; $i++) {
            if ($paddingCharCount == $allowedValues[$i]
                && substr($input, -($allowedValues[$i])) != str_repeat(self::$map[32], $allowedValues[$i])
            ) {
                return false;
            }
        }

        $input        = str_replace('=', '', $input);
        $input        = str_split($input);
        $binaryString = "";

        for ($i=0; $i < count($input); $i = $i+8) {
            $x = "";

            if (!in_array($input[$i], self::$map)) {
                return false;
            }

            for ($j=0; $j < 8; $j++) {
                $x .= str_pad(base_convert(@self::$flippedMap[@$input[$i + $j]], 10, 2), 5, '0', STR_PAD_LEFT);
            }

            $eightBits = str_split($x, 8);

            for ($z = 0; $z < count($eightBits); $z++) {
                $binaryString .= (($y = chr(base_convert($eightBits[$z], 2, 10))) || ord($y) == 48) ? $y:"";
            }
        }

        return $binaryString;
    }
}
