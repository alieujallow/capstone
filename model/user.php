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
	function updateUser($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
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
		if ($result)
		{
			$result = array();
			$result[0] ="";
			while ($row = $this->getRow())
			{
				$result[] = $row;
			}
			return $result;
		}
	}


	//login
	function loginUser($sql)
	{
		$result = $this->query($sql);
		if($result)
		{
			$result = array();
			$result[] = $this->getRow();
			return $result;
		}
		return false;
	}

	function getTotalNumItems($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			$row = $this->getRow();
			return $row["num"];
		}
	}
	//logout
}	
?>