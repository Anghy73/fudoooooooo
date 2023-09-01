<?php
$mysqli = new mysqli("localhost", "root", "", "stdi_solutions");

if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

$email = $_POST['email'];
$username = $_POST['username'];


$sql = "SELECT * FROM usuarios WHERE email = ? AND username = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ss", $email, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $token = bin2hex(random_bytes(32));

    $updateSql = "UPDATE usuarios SET token = ? WHERE email = ?";
    $updateStmt = $mysqli->prepare($updateSql);
    $updateStmt->bind_param("ss", $token, $email);
    $updateStmt->execute();

    $to = $email;
    $subject = "Recuperación de Contraseña";
    $message = "Haga clic en el siguiente enlace para restablecer su contraseña:";
    $headers = "From: stdi_solutions@gmail.com";

    mail($to, $subject, $message, $headers);

    echo "Se ha enviado un enlace de recuperación a su correo electrónico.";
    header("Location: login.html");
} else {
    echo "No se encontró ninguna cuenta asociada a la dirección de correo electrónico y usuario proporcionados.";
}

$stmt->close();
$updateStmt->close();
$mysqli->close();
?>
