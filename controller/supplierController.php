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
		$currentPage = $_GET['current_page'];
	    $numItemsPerPage = $_GET['num_items'];
	    if ($currentPage != 1)
	    {
	    	$start = ($currentPage-1) * $numItemsPerPage;
	    }
	    else
	    {
	    	$start=0;
	    }

		//sets the sql
	    $sql1 = "SELECT * FROM suppliers  LIMIT $start,$numItemsPerPage;";
	    $sql2 = "SELECT count(id) as num FROM suppliers";

	    //creates a customer object
	    $supplier = new Supplier;

		$suppliers = $supplier->getSuppliers($sql1);
		$numberOfSuppliers = $supplier->getTotalNumSuppliers($sql2);

		$numPage = ceil($numberOfSuppliers / $numItemsPerPage); // Total number of page

		if ($suppliers)
		{
			$array=array();
			$array["num_page"]=$numPage;
			$suppliers[]=$array;
			echo json_encode($suppliers);
		}
  	}
}
elseif($requestMethod =="POST")
{
	if (isset($_POST['action']) & !empty($_POST['action']))
	{
		$action=$_POST['action'];

		if ($action=="add_supplier")
		{
			//gets the values
		    $name= strip_tags($_POST['name']);
		    $phone= strip_tags($_POST['phone']);
		    $email= strip_tags($_POST['email']);
		    $address= strip_tags($_POST['address']);

		    $sql = "INSERT INTO suppliers(name,phone,email,address) VALUES('$name','$phone','$email','$address');";

		    //creates a supplier object
		    $supplier = new Supplier;
			$results = $supplier->updateSupplier($sql);
			if ($results)
			{
				$array=array();
				$array["response"]="add_successful";
				echo json_encode($array);
			}
		}
		elseif ($action=="update_supplier") 
		{
			//gets the values
		    $name= strip_tags($_POST['name']);
		    $phone= strip_tags($_POST['phone']);
		    $email= strip_tags($_POST['email']);
		    $address= strip_tags($_POST['address']);
		    $id= strip_tags($_POST['id']);

		    $sql = " UPDATE suppliers SET name='$name', phone='$phone', email='$email',address='$address' WHERE id='$id';";

		    //creates a supplier object
		    $supplier = new Supplier;
			$results = $supplier->updateSupplier($sql);
			if ($results)
			{
				$array=array();
				$array["response"]="update_successful";
				echo json_encode($array);
			}
		}
		elseif ($action=="delete_supplier") 
		{
			//gets the values
		    $id= strip_tags($_POST['id']);

		    $sql = "DELETE FROM suppliers WHERE id='$id';";

		    //creates a supplier object
		    $supplier = new Supplier;
			$results = $supplier->updateSupplier($sql);
			if ($results)
			{
				$array=array();
				$array["response"]="delete_successful";
				echo json_encode($array);
			}
		}
    	
  	}
}
?>