<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Supplier extends DatabaseConnection
{
	
	//adds a user
	//takes sql and returns either true or false
	function updateSupplier($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}

	//gets all the customers
	function getSuppliers($sql)
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

	//gets the total number of suppliers
	function getTotalNumSuppliers($sql)
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