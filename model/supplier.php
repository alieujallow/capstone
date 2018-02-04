<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Supplier extends DatabaseConnection
{
	
	//adds a user
	//takes sql and returns either true or false
	function addSupplier($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			//gets the id of the last inserted record
			$last_id = mysqli_insert_id($this->connection);

			//sets sql to get last inserted record
			$sql="SELECT * FROM suppliers WHERE supplier_id='$last_id';";
			$resutlt = $this->getSuppliers($sql);
			return $resutlt;
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
			while ($row = $this->getRow())
			{
				$result[] = $row;
			}
			return $result;
		}
	}
}	
?>