<?php	
//requires the database connection file
require('database/DatabaseConnection.php');

class SelectOptions extends DatabaseConnection
{
	
	//gets the options
	function getSelectOptions($sql)
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