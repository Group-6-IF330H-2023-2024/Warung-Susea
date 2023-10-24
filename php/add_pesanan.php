<?php
session_start();
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

if (isset($_SESSION['id'])) {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        require_once './dbconnection.php';
        $id_order = "ORDER//" . bin2hex(random_bytes(3));
        foreach ($data['cart'] as $menu) {
            $id_menu = $menu['id'];
            $id_customer = $_SESSION['id'];
            $jumlah = $menu['jumlah'];
            $harga = $menu['harga'];
            $tanggal = date("Y-m-d");
            $done = 0;
            $q = "INSERT INTO pesanan (id_order, id_menu, id_customer, jumlah, harga_menu, tanggal_order, order_selesai) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = mysqli_prepare($conn, $q);
            mysqli_stmt_bind_param($stmt, "siiiisi", $id_order, $id_menu, $id_customer, $jumlah, $harga, $tanggal, $done);
            mysqli_stmt_execute($stmt);
        }
        echo "berhasil";
    }
} else {
    echo "belum login";
}
