<?php 

$servername = "localhost";
$username = "root";
$password = "";
$db = "mydata";

// Create connection
$conn = new mysqli($servername, $username, $password, $db) or die("Connection failed");

if(isset($_POST)){
		$name = $_POST['Name'];
		$title = $_POST['Title'];
		$email = $_POST['Email'];
		$id = $_POST['id'];
		$sql = "UPDATE mytable SET Name = '$name', Title = '$title', Email = '$email' WHERE id = '$id'";
		if($conn->query($sql) === TRUE){
			echo $id;
		} else {
			echo $conn->error;
		}
} else {
	echo "The $_POST is: " . isset($_POST);
}
?>