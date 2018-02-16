<?php
header("Content-Type: application/json");
//requires the user class
require('../model/customer.php');


//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod =="GET") 
{
	if (isset($_GET['action']) & !empty($_GET['action']))
	{
		//gets the action
		$action=$_GET['action'];

		if ($action=="display_customers")
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
		    $sql1 = "SELECT * FROM customers ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
		    $sql2 = "SELECT count(id) as num FROM customers";

		    //creates a customer object
		    $customer = new Customer;

			$customers = $customer->getCustomers($sql1);
			$numberOfCustomers = $customer->getTotalNumCustomers($sql2);

			$numPage = ceil($numberOfCustomers / $numItemsPerPage); // Total number of page

			if (sizeof($customers)>1)
			{
				$array=array();
				$array["status"]="not empty";
				$array["num_page"]=$numPage;
				$customers[0]=$array;
				echo json_encode($customers);
			}
			else
			{
				$array=array();
				$array["status"]="empty";
				$array["num_page"]=$numPage;
				$customers[0]=$array;
				echo json_encode($customers);
			}
		}
		elseif ($action=="search_customer")
		{
			//gets the name
			$name= $_GET['name'];

			//sets the sql
		    $sql = "SELECT * FROM customers  WHERE name LIKE '%$name%';";
		  
		    $customer = new Customer;
			$customers = $customer->getCustomers($sql);
			
			if (sizeof($customers)>1)
			{
				$array= array();
				$array["status"]="not empty";
				$customers[0]=$array;
				echo json_encode($customers);
			}
			else
			{
				$array= array();
				$array["status"]="empty";
				$customers[0]=$array;
				echo json_encode($customers);
			}
		}
  	}
}
elseif($requestMethod =="POST")
{
	if (isset($_POST['action']) & !empty($_POST['action']))
	{
		$action=$_POST['action'];

		if ($action=="add_customer")
		{
			//gets the values
		    $name= strip_tags($_POST['name']);
		    $phone= strip_tags($_POST['phone']);
		    $email= strip_tags($_POST['email']);
		    $address= strip_tags($_POST['address']);

		    $sql = "INSERT INTO customers(name,phone,email,address) VALUES('$name','$phone','$email','$address');";

		    $customer = new Customer;
			$results = $customer->updateCustomer($sql);
			if ($results)
			{
				$array=array();
				$array["response"]="add_successful";
				echo json_encode($array);
			}
		}
		elseif ($action=="update_customer") 
		{
			//gets the values
		    $name= strip_tags($_POST['name']);
		    $phone= strip_tags($_POST['phone']);
		    $email= strip_tags($_POST['email']);
		    $address= strip_tags($_POST['address']);
		    $id= strip_tags($_POST['id']);

		    $sql = " UPDATE customers SET name='$name', phone='$phone', email='$email',address='$address' WHERE id='$id';";

		    $customer = new Customer;
			$results = $customer->updateCustomer($sql);
			if ($results)
			{
				$array=array();
				$array["response"]="update_successful";
				echo json_encode($array);
			}
		}
		elseif ($action=="delete_customer") 
		{
			//gets the values
		    $id= strip_tags($_POST['id']);
		    $sql = "DELETE FROM customers WHERE id='$id';";

		    $customer = new Customer;
			$results = $customer->updateCustomer($sql);
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