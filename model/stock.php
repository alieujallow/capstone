<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Stock extends DatabaseConnection
{
	
	function updateStock($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}
	
	function getStock($sql)
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


	function getTotalNumStock($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			$row = $this->getRow();
			return $row["num"];
		}
	}

	function multiInsert($sql)
	{
		$result = $this->multiQuery($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}
}	
?>