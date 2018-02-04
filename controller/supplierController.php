<?php
header("Content-Type: application/json");
//requires the supplier class
require('../model/supplier.php');


//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod =="GET") 
{
	if (isset($_GET['action']) & !empty($_GET['action']))
	{
		//sets the sql
	    $sql = "SELECT * FROM suppliers;";

	    //creates a customer object
	    $supplier = new Supplier;

		$results = $supplier->getSuppliers($sql);
		if ($results)
		{
			echo json_encode($results);
		}
  	}
}
elseif($requestMethod =="POST")
{
	if (isset($_POST['action']) & !empty($_POST['action']))
	{
    	//gets the values
	    $name= strip_tags($_POST['name']);
	    $phone= strip_tags($_POST['phone']);
	    $email= strip_tags($_POST['email']);
	    $address= strip_tags($_POST['address']);

	    $sql = "INSERT INTO suppliers(name,phone,email,address) VALUES('$name','$phone','$email','$address');";

	    //creates a supplier object
	    $supplier = new Supplier;
		$results = $supplier->addSupplier($sql);
		if ($results)
		{
			echo json_encode($results);
		}
  	}
}
?>