<?php

session_start();
require_once './header.php';

if (isset($_SESSION['id'])) {
    echo "sudah login";
} else {
    echo "belum login";
}