<?php

/*
*database connection class
*/

/**
* 
*/

//requires the database credentials file
require('DatabaseCredentials.php');

class DatabaseConnection
{
	//properties
	private $connection;
	private $result;

	//methods
	/*
	*connection method
	*@return returns true or false
	*/
	function connect()
	{
		//connects to the database
		$this ->connection = mysqli_connect(SERVER,USERNAME,PASSWORD,DATABASE_NAME);

		//checks if the connection is successful
		if ($this ->connection) 
		{
			return true;
		}
		return false;
	}


	//closes the connection
	function closeConnection()
	{
	  if ($this->connection!=Null & $this->connection!=False)
	  {
	  	mysqli_close($this->connection);
	  }
	}


	/*
	*query method
	*@param $sql
	*@return returns result or false or connection error 
	*/
	function query($sql)
	{
		//connects to the database
		if($this->connect())
		{
			//runs query
			$this->result = mysqli_query($this->connection,$sql);

			//checks if query is successful
			if($this->result)
			{
				//close connection
				closeConnection();

				//returns the result
			    return $this->result;
			}
			return false;
		}
		return "connection_error";
	}



	/*
	*gets a row
	*@return returns true or false
	*/
	function getRow()
	{
	  //it returns only one record
	  return mysqli_fetch_assoc($this->result);
	}

	/*
	*gets the number of rows
	*@return returns true or false
	*/
	function getNumRows()
	{
	  //returns the number of rows
	  return mysqli_num_rows($this->result);
	}

	//gets the last inserted id
	function getLastInsertedId()
	{
		return mysqli_insert_id($this ->connection);
	}

}
	//var_dump($this ->connection);
	//$db = new DatabaseConnection;
	//$db -> connect();
?>