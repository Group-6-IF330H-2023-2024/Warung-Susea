<?php
session_start();
require_once './header.php';
if (isset($_SESSION['id'])) {
    session_destroy();
    echo "berhasil logout";
}
