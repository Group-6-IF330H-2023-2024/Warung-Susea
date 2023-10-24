<?php

require_once './header.php';
function buatCaptcha($panjang = 6)
{
    $hasil = '';
    $karakter = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $panjangKarakter = strlen($karakter);
    for ($i = 0; $i < $panjang; $i++) {
        $hasil .= $karakter[rand(0, $panjangKarakter - 1)];
    }
    return $hasil;
}

echo buatCaptcha();
