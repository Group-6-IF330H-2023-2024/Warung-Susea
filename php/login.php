<?php
session_start();
require_once './header.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data, associative: true);

    $username = $data['username'];
    $password = $data['password'];
    $captcha = $data['captcha'];
    $input_captcha = $data['input_captcha'];

    require_once './dbconnection.php';
    $q = "SELECT * FROM akun WHERE username = ? OR email = ?";
    $stmt = mysqli_prepare($conn, $q);
    mysqli_stmt_bind_param($stmt, 'ss', $username, $username);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if ($input_captcha === $captcha) {
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            if (password_verify($password, $row['password'])) {
                $_SESSION['id'] = $row['id'];
                $_SESSION['username'] = $username;
                $_SESSION['role'] = $row['role'];
                if ($row['role'] === "admin") {
                    echo "admin";
                } else {
                    echo "customer";
                }
            } else {
                echo "Password salah";
            }
        } else {
            echo "Username / email tidak ditemukan";
        }
    } else {
        echo "Captcha Salah";
    }
} else {
    if (isset($_SESSION['username'])) {
        echo "sudah login";
    } else {
        echo "belum login";
    }
}
