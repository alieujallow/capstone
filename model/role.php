<?php
//requires the database connection file
require('database/DatabaseConnection.php');

/**
* 
*/
class Role extends DatabaseConnection
{
	
	
	//get roles
	function getRoles($sql)
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
}

?>