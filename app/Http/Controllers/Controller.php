<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

abstract class Controller
{
    static function sendSMS($phone, $sms) {
        $phone = substr_replace($phone, "+254", 0, 1);
        $body = ['apikey'=> '4e107ea49005b969bec1b51556ac7fd6','partnerID'=> 9617,'message'=> $sms,'shortcode'=>'MELLOWARE','mobile'=>$phone];
        $response = Http::post('https://sms.textsms.co.ke/api/services/sendsms/',$body);
        // Log::channel('stderr')->info($response);
    }

    static function cleanUrl($str){
        $forbiddenUrlChar = '/[^-a-zA-Z0-9_& ]/';
        $str = preg_replace($forbiddenUrlChar, ' ', $str);

        $str = trim($str);

        $str = preg_replace('/[-_ ]+/', '-', $str);

        return strtolower($str);
    }

    function sendRequest($phone, $amount) {
      $request['BusinessShortCode'] = '4039929';
      $request['key'] = "JANhDNiIc91FATTRl4Y7cTLQJyCtNwMN";
      $request['secret'] = "6NxBNNj047LxSAV1";
      $request['username'] = "Mellow Dynamics LTD";
      $request['TransactionType'] = "CustomerPayBillOnline";
      $request['passkey'] = "124164ed7c84c692d4988d520b0c319ce251eb46da13c19916d62e14252793dd";
      $request['CallBackURL'] = route('www.mpesa-callback');
      $request['AccountReference'] = "Nexxus";
      $request['TransactionDesc'] = "Package";

      // // prep phone number
      // // prepend 254
      $phone = preg_replace("/^0/", "254", $phone);

      $accessToken = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
      $credentials = base64_encode($request['key'].':'.$request['secret']);

      $ch = curl_init($accessToken);
      curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Basic ".$credentials]);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $response = curl_exec($ch);
      curl_close($ch);
      $result = json_decode($response);
      $token = isset($result->{'access_token'}) ? $result->{'access_token'} : "N/A";
      // return $result;

      $timestamp = date("YmdHis");
      $password = base64_encode($request["BusinessShortCode"]. "" .$request['passkey']."".$timestamp);

      $postData['BusinessShortCode'] = $request["BusinessShortCode"];
      $postData['Password'] = $password;
      $postData['Timestamp'] = $timestamp;
      $postData['TransactionType'] = $request['TransactionType'];
      $postData['Amount'] = $amount;
      $postData['PartyA'] = $phone;
      $postData['PartyB'] = $request['BusinessShortCode'];
      $postData['PhoneNumber'] = $phone;
      $postData['CallBackURL'] = $request['CallBackURL'];
      $postData['AccountReference'] = $request['AccountReference'];
      $postData['TransactionDesc'] = $request['TransactionDesc'];

      $data = json_encode($postData);

      $endpoint = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

      $ch = curl_init($endpoint);
      curl_setopt($ch, CURLOPT_HTTPHEADER, [
         'Authorization: Bearer '.$token,
         'Content-Type: application/json'
      ]);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $response = curl_exec($ch);
      curl_close($ch);
      return $response;

      // $result = json_decode(json_encode(json_decode($response)), true);
   }

    static function randomText( $type = 'distinct', $length = 4 ){
        switch ( $type ) {
            case 'alnum':
                $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case 'alpha':
                $pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            case 'hexdec':
                $pool = '0123456789abcdef';
                break;
            case 'numeric':
                $pool = '0123456789';
                break;
            case 'nozero':
                $pool = '123456789';
                break;
            case 'distinct':
                $pool = '2345679ACDEFHJKLMNPRSTUVWXYZ';
                break;
            default:
                $pool = (string) $type;
                break;
        }


        $crypto_rand_secure = function ( $min, $max ) {
            $range = $max - $min;
            if ( $range < 0 ) return $min; // not so random...
            $log    = log( $range, 2 );
            $bytes  = (int) ( $log / 8 ) + 1; // length in bytes
            $bits   = (int) $log + 1; // length in bits
            $filter = (int) ( 1 << $bits ) - 1; // set all lower bits to 1
            do {
                $rnd = hexdec( bin2hex( openssl_random_pseudo_bytes( $bytes ) ) );
                $rnd = $rnd & $filter; // discard irrelevant bits
            } while ( $rnd >= $range );
            return $min + $rnd;
        };

        $token = "";
        $max   = strlen( $pool );
        for ( $i = 0; $i < $length; $i++ ) {
            $token .= $pool[$crypto_rand_secure( 0, $max )];
        }
        return $token;
    }
}
