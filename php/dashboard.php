<?php
session_start();
require_once './header.php';

if (isset($_SESSION['role'])) {
    if ($_SESSION['role'] === "admin") {
        require_once './dbconnection.php';
        $q = "SELECT * FROM menu";
        $stmt = mysqli_prepare($conn, $q);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $hasil = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $hasil[] = $row;
        }
        echo json_encode($hasil);
    } else {
        echo "bukan admin";
    }
} else {
    echo "belum login";
}
