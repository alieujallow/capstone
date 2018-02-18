<?php
 header("Content-Type: application/json");
//requires the product class
require('../model/stock.php');

//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];



//**********************************************************************************
//                               GET REQUESTS
//**********************************************************************************
if ($requestMethod=="GET") 
{
    //returns all the products from the database
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        $action = $_GET['action'];
        if ($action =="products") 
        {
            $sql="SELECT *FROM products;";

            $stock = new Stock;
            $result = $stock->getStock($sql);
            if ($result) 
            {
                echo json_encode($result);
            }
        }
       
    } 
}

//*****************************************************************************************
//                              POST REQUESTS
//*****************************************************************************************
elseif ($requestMethod=="POST")
{
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];

        if ($action=="add_stock")
        {
            //gets the values
            $product= strip_tags($_POST['product']);
            $quantity= strip_tags($_POST['quantity']);
            $supplier= strip_tags($_POST['supplier']);
            $orderDate= strip_tags($_POST['orderDate']);
            $inventoryDate= strip_tags($_POST['inventoryDate']);
            $orderNumber= strip_tags($_POST['orderNumber']);
            $storage= strip_tags($_POST['storage']);
            $measurement= strip_tags($_POST['measurement']);
            $source= strip_tags($_POST['source']);
            $description= strip_tags($_POST['description']);

            //sets the sql statement
            $sql = "INSERT INTO 
                    stock(product,quantity,supplier,source,order_date,inventory_date,order_number,storage,measurement,transaction_date,description) 
                    VALUES('$product','$quantity','$supplier','$source','$orderDate','$inventoryDate','$orderNumber','$storage','$measurement','inventory_date','$description');";

            deliverPostResponse($sql,"add_successful","add_failed");
        } 
    }
}

function deliverPostResponse($sql,$successMessage,$failMessage)
{
    $stock = new Stock;
    $result = $stock->updateStock($sql);
    if ($result)
    {
        $array=array();
        $array["response"]=$successMessage;
        echo json_encode($array);
    }
    else
    {
        $array=array();
        $array["response"]=$failMessage;
        echo json_encode($array);
    }
}
?>