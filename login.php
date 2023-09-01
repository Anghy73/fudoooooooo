<?php
$mysqli = new mysqli("localhost", "root", "", "stdi_solutions");

if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM usuarios WHERE username = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $storedPassword = $row['password'];

    if (password_verify($password, $storedPassword)) {
        session_start();
        $_SESSION['username'] = $username;
        header("Location: principal.html");
    } else {
        header("Location: login.html?error=1");
    }
} else {
    header("Location: login.html?error=1");
}

$stmt->close();
$mysqli->close();
?>
