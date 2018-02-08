<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Configuration extends DatabaseConnection
{
	
	//takes sql and returns either true or false
	function add($sql,$tableName,$id)
	{
		if($this->query($sql))
		{
			if ($id=="") 
			{
				//getting the last inserted id
				$last_id = mysqli_insert_id($this->connection);
			}
			else
			{
				$last_id = $id;
			}

			$sql="SELECT * FROM `".$tableName."` WHERE `id`='$last_id';";
			$result = $this->get($sql);
			if ($result)
			{
				return $result;
			}
		}
		return false;
	}

	function get($sql)
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