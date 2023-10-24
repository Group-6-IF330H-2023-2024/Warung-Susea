<?php
session_start();
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($_POST['data'], associative: true);


$filename = pathinfo($_FILES['file']['name'], PATHINFO_FILENAME);
$temp_file = $_FILES['file']['tmp_name'];

$file_ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
$file_ext = strtolower($file_ext);

$concatName = str_replace(' ', '', ucwords($data['nama_menu']));
$concatFileName = str_replace(' ', '', ucwords($filename));

switch ($file_ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'svg':
    case 'webp':
    case 'bmp':
    case 'gif':
        move_uploaded_file($temp_file, "../public/menu/" . $concatFileName . "." . $file_ext);

        $nama = ucwords($data['nama_menu']);
        $desk = $data['deskripsi_menu'];
        $kategori = $data['kategori'];
        $harga = $data['harga'];
        $gambar = $concatFileName . "." . $file_ext;

        require_once './dbconnection.php';
        $q = "INSERT INTO menu (nama, deskripsi, kategori, harga, gambar) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $q);
        mysqli_stmt_bind_param($stmt, 'sssis', $nama, $desk, $kategori, $harga, $gambar);
        $q2 = "SELECT * FROM akun WHERE username = ? OR email = ?";
        $stmt2 = mysqli_prepare($conn, $q2);
        mysqli_stmt_bind_param($stmt2, 'ss', $username, $email);
        mysqli_stmt_execute($stmt2);
        $result = mysqli_stmt_get_result($stmt2);
        $row = mysqli_fetch_assoc($result);
        if ($row) {
            echo "username / email sudah terdaftar";
        } else {
            mysqli_stmt_execute($stmt);
            echo "berhasil";
        }


        break;
    default:
        echo "Anda hanya bisa upload file gambar.";
}