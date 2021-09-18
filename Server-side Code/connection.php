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
/*
if(!$conn){
	die("Connection failed");
}

$sql = "CREATE DATABASE IF NOT EXISTS $db";
if(!$conn->query($sql)){
	echo 'Error creating database: ' . $conn->error ."\n";
} else {
	//$selected_db = mysql_select_db($db, $conn);
	mysqli_set_charset($conn,"utf8_general_ci");
	$conn = new mysqli($servername, $username, $password, $db);
		$sql = "CREATE TABLE mytable (
			id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			Name VARCHAR(255) NOT NULL,
			Title VARCHAR(500) NOT NULL,
			Email VARCHAR(255)
			)";
		if(!$conn->query($sql)){
				echo "Error create table: " . $conn->error;
		}
}*/
$data = json_decode(file_get_contents('php://input'));

if($_SERVER['REQUEST_METHOD'] == "GET")
	{
		$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$uri_segments = explode('/', $uri_path);
		if(count($uri_segments) >= 4){
			$studentId = $uri_segments[3];
		
			$sql = "SELECT * FROM mytable WHERE id LIKE '$studentId'";
			$result = $conn->query($sql);
			if($result->num_rows > 0) {
				$ress1 = $result->fetch_assoc();
				echo json_encode($ress1);		
			} else {
				http_response_code(404);
				echo "Error to found content!";
			}
		} else {
			$sql = "SELECT Name, id FROM mytable";
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
					$ress2[] =  $row;
					//echo $row['Name']." ".$row['Email']." ".$row['Title']."<br>";
				}
			} else {
				echo "0 results"; //json_encode($ress2);
			}
			echo json_encode($ress2);
		}
	}

if($_SERVER['REQUEST_METHOD'] == "POST"){
	
		$name = $data->{'Name'};
		$title = $data->{'Title'};
		$email = $data->{'Email'};
		$sql = "INSERT INTO mytable (Name, Title, Email) VALUES ('$name', '$title', '$email')";
		if ($conn->query($sql) === TRUE) {
			$last_id = $conn->insert_id;
			echo $last_id;
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}
	}

if ($_SERVER['REQUEST_METHOD'] == "PUT"){
	
		$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$uri_segments = explode('/', $uri_path);
		$id = $uri_segments[3];
		
		$name = $data->{'Name'};
		$title = $data->{'Title'};
		$email = $data->{'Email'};
		$sql = "UPDATE mytable SET Name = '$name', Title = '$title', Email = '$email' WHERE id = '$id'";
		if ($conn->query($sql)=== TRUE){
			echo $id;
		}else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}
	}
	
if ($_SERVER['REQUEST_METHOD'] == "DELETE"){
	
		$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$uri_segments = explode('/', $uri_path);

		$id = $uri_segments[3];
		$sql = "DELETE FROM mytable WHERE id = '$id'";
		if ($conn->query($sql)=== TRUE){
			echo $id;
		}else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}
	}
?>