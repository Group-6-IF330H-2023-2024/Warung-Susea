<?php
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, associative: true);

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$namaDpn = $data['nama_depan'];
$namaBlkng = $data['nama_belakang'];
$gender = $data['gender'];
$tanggal_lahir = $data['tanggal_lahir'];
$role = "customer";


if (isset($data['username'])) {
    require_once './dbconnection.php';
    $q = "INSERT INTO akun (nama_depan, nama_belakang, username, email, password, role, tanggal_lahir, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 'ssssssss', $namaDpn, $namaBlkng, $username, $email, $password, $role, $tanggal_lahir, $gender);
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
}
