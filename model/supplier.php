<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Supplier extends DatabaseConnection
{
	
	
	//adds a user
	//takes sql and returns either true or false
	function addSupplier($sql)
	{
		if ($this->query($sql))
		{
			return true; 
		}
		return false;
	}
}	
?>