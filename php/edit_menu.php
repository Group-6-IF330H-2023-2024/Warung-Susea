<?php
session_start();
require_once './header.php';

$raw_data = file_get_contents("php://input");

function getMenuData($conn, $id_menu)
{
    $query = "SELECT * FROM menu WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'i', $id_menu);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $menuData = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $menuData[] = $row;
    }
    return $menuData;
}

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    require_once './dbconnection.php';
    $id_menu = $_GET['id_menu'];
    $menuData = getMenuData($conn, $id_menu);
    echo json_encode($menuData);
} else {

    $data = json_decode($_POST['data'], true);
    $nama_menu = ucwords($data['nama_menu']);
    $deskripsi_menu = $data['deskripsi_menu'];
    $kategori = $data['kategori'];
    $harga = $data['harga'];
    $id_menu = $data['id_menu'];

    if (!empty($_FILES['file']['name'])) {
        require_once './dbconnection.php';
        $file = $_FILES['file'];

        if (empty($nama_menu)) {
            $menuData = getMenuData($conn, $id_menu);
            $nama_menu = $menuData[0]['nama'];
        }
        if (empty($deskripsi_menu)) {
            $menuData = getMenuData($conn, $id_menu);
            $deskripsi_menu = $menuData[0]['deskripsi'];
        }
        if (empty($kategori)) {
            $menuData = getMenuData($conn, $id_menu);
            $kategori = $menuData[0]['kategori'];
        }
        if (empty($harga)) {
            $menuData = getMenuData($conn, $id_menu);
            $harga = $menuData[0]['harga'];
        }

        $menuData = getMenuData($conn, $id_menu);
        $nama_sebelum = $menuData[0]['gambar'];

        $file_name = pathinfo($file['name'], PATHINFO_FILENAME);
        $concatFileName = str_replace(' ', '', ucwords($file_name));
        $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $gambar = $concatFileName . "." . $file_ext;
        $upload_path = "../public/menu/" . $gambar;

        if (empty($nama_menu)) {
            $nama_menu = $nama_sebelum;
        } else if ($concatFileName . "." . $file_ext !== $nama_sebelum) {
            $path_lama = "../public/menu/" . $nama_sebelum;
            if (file_exists($path_lama)) {
                unlink($path_lama);
            }
        }

        if (file_exists($upload_path)) {
            unlink($upload_path);
        }

        if (move_uploaded_file($file['tmp_name'], $upload_path)) {
            $query = "UPDATE menu SET nama = ?, deskripsi = ?, kategori = ?, harga = ?, gambar = ? WHERE menu.id = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, 'sssisi', $nama_menu, $deskripsi_menu, $kategori, $harga, $gambar, $id_menu);
            mysqli_stmt_execute($stmt);
            echo "berhasil";
        } else {
            echo "Gagal mengunggah gambar";
        }
    } else {
        require_once './dbconnection.php';
        $query = "UPDATE menu SET nama = ?, deskripsi = ?, kategori = ?, harga = ? WHERE menu.id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 'ssssi', $nama_menu, $deskripsi_menu, $kategori, $harga, $id_menu);
        if (mysqli_stmt_execute($stmt)) {
            echo "berhasil";
        } else {
            echo "Error: " . mysqli_error($conn);
        }
    }
}
