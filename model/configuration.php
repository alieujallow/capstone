<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Configuration extends DatabaseConnection
{
	function updateItem($sql)
	{
		$result = $this->query($sql);
		if ($result)
		{
			return $result;
		}
		return false;
	}

	function get($sql)
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