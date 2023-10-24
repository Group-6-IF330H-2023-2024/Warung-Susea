<?php
define('HOSTNAME', 'localhost');
define('USERNAME_HOST', 'root');
define('PASSWORD_HOST', '');
define('DATABASE', 'warung_susea');

// define('HOSTNAME', '154.41.240.1');
// define('USERNAME_HOST', 'u579623280_uts_lecture');
// define('PASSWORD_HOST', 'Dronedaffa102');
// define('DATABASE', 'u579623280_warung_susea');

$conn = mysqli_connect(HOSTNAME, USERNAME_HOST, PASSWORD_HOST, DATABASE);
