<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Customer extends DatabaseConnection
{
	
	//adds a user
	//takes sql and returns either true or false
	function addCustomer($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			//gets the id of the last inserted record
			$last_id = mysqli_insert_id($this->connection);

			//sets sql to get last inserted record
			$sql="SELECT * FROM customers WHERE customer_id='$last_id';";
			$resutlt = $this->getCustomers($sql);
			return $resutlt;
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