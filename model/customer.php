<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Customer extends DatabaseConnection
{
	
	//adds a user
	//takes sql and returns either true or false
	function updateCustomer($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}

	//gets all the customers
	function getCustomers($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			$result = array();
			while ($row = $this->getRow())
			{
				$result[] = $row;
			}
			return $result;
		}
	}
}	
?>