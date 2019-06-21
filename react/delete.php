<?php 

$servername = "localhost";
$username = "root";
$password = "";
$db = "mydata";

// Create connection
$conn = new mysqli($servername, $username, $password, $db) or die("Connection failed");

if(isset($_POST)){
		$id = $_POST['id'];
		$sql = "DELETE FROM mytable WHERE id = '$id'";
		if ($conn->query($sql)=== TRUE){
			echo json_encode($id);
		}else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}
} else {
	echo "The delete POST is: " . isset($_POST);
}

?>