<?php 

$servername = "localhost";
$username = "root";
$password = "";
$db = "mydata";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Content-type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $db) or die("Connection failed");

$data = json_decode(file_get_contents('php://input'));


if($_SERVER['REQUEST_METHOD'] == "POST"){
	
		$user = $data->{'user'};
		$psw = $data->{'password'};
		$sql = "SELECT user, password FROM users WHERE user LIKE '$user' AND password LIKE '$psw'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			echo TRUE;
		}
		else if($result->num_rows == 0){
			echo FALSE;
			}
		else {
			echo $conn->error;
		}
	}

?>