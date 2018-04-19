<?php	
/**
*@author Alieu Jallow
*@version 1.0.0
*/	

//requires the database connection file
require('database/DatabaseConnection.php');

class User extends DatabaseConnection
{
	/**
	*This function is used for get a user or users from the database
	*@param $sql
	*@return result
	*/
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

	/**
	*This function is used for updating, inserting and deleting a user from the database
	*@param $sql
	*@return result or bool
	*/
	function updateUser($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
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
}	
?>