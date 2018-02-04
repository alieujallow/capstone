<?php	
	
//requires the database connection file
require('database/DatabaseConnection.php');

class Product extends DatabaseConnection
{
	//delete Product
	function deleteProduct()
	{

	}

	
	//adds a Product
	//takes sql and returns either true or false
	function addProduct($sql)
	{
		if($this->query($sql))
		{
			//getting the last inserted id
			$last_id = mysqli_insert_id($this->connection);

			$sql="SELECT *FROM products WHERE product_id='$last_id';";

			$result = $this->getProducts($sql);
			if ($result)
			{
				return $result;
			}
		}
		return false;
	}
	
	//edit Product
	function editProduct()
	{

	}
	//get Product
	function getProduct()
	{

	}
	
	//get Products
	function getProducts($sql)
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