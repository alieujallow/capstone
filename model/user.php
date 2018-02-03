<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class User extends DatabaseConnection
{
	//delete user
	function deleteUser()
	{

	}

	
	//adds a user
	//takes sql and returns either true or false
	function addUser($sql)
	{
		if($this->query($sql))
		{
			//getting the last inserted id
			$last_id = mysqli_insert_id($this->connection);

			$sql="SELECT *FROM users WHERE user_id='$last_id';";

			$result = $this->getUsers($sql);
			if ($result)
			{
				return $result;
			}
		}
		return false;
	}
	
	//edit user
	function editUser()
	{

	}
	//get user
	function getUser()
	{

	}
	
	//get users
	function getUsers($sql)
	{
		$result = $this->query($sql);
		if($result)
		{
			$result = array();
			while ($row = $this->getRow())
			{
				$result[] = $row;
			}
			return $result;
		}
		return false;
	}


	//login

	//logout
}	
?>