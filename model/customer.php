<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Customer extends DatabaseConnection
{
	function updateCustomer($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}

	function getCustomers($sql)
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


	function getTotalNumCustomers($sql)
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