<?php
require_once './header.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, true);

if (isset($data['id'])) {
    $id = $data['id'];

    require_once './dbconnection.php';

    $selectQuery = "SELECT * FROM menu WHERE id = ?";
    $stmt = mysqli_prepare($conn, $selectQuery);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);


    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);


    $foto = $row['gambar'];

    $filePath = "../public/menu/$foto";
    if (file_exists($filePath)) {
        unlink($filePath);
    }


    $deleteQuery = "DELETE FROM menu WHERE id = ?";
    $stmt = mysqli_prepare($conn, $deleteQuery);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);

    echo "berhasil";
} else {
    echo "id hilang";
}
