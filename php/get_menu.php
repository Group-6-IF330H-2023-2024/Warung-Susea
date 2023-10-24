<?php

require_once './dbconnection.php';
require_once './header.php';

$kategori = $_GET['kategori'];

if ($_SERVER['REQUEST_METHOD'] == "GET") {

    if ($kategori === "semua") {
        $q = "SELECT * FROM menu";
        $stmt = mysqli_prepare($conn, $q);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    } else {

        $q = "SELECT * FROM menu WHERE kategori = ?";
        $stmt = mysqli_prepare($conn, $q);
        if ($kategori !== "*") {
            mysqli_stmt_bind_param($stmt, 's', $kategori);
        }
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
    }

    $hasil = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $hasil[] = $row;
    }

    echo json_encode($hasil);
}
