<?php
//requires the user class
require('../model/customer.php');




/*if (isset($_POST['action']) & !empty($_POST['action']))
{
    //gets the values
    $name= strip_tags($_POST['name']);
    $phone= strip_tags($_POST['phone']);
    $email= strip_tags($_POST['email']);
    $address= strip_tags($_POST['address']);

    $sql = "INSERT INTO suppliers(name,phone,email,address) VALUES('$name','$phone','$email','$address');";

    //creates a suppleir object
    $supplier = new Supplier;
	$results = $supplier->addSupplier($sql);
	if ($results)
	{
		$dataBack = array('response' =>'success');
		echo json_encode($dataBack);
	}
	else
	{
		$dataBack = array('response' =>'failure');
		echo json_encode($dataBack);
	}
}*/
    


    $sql = "INSERT INTO suppliers(name,phone,email,address) VALUES('jama43','02547','4987987','fds');";

    //creates a suppleir object
    $supplier = new Supplier;

	//$results = $supplier->addSupplier($sql);
	
	if (true)
	{
		$dataBack = array('response' =>'success');
		echo json_encode($dataBack);
	}
	else
	{
		echo json_encode("failure");
	}  
?>