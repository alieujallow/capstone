<?php
 header("Content-Type: application/json");
//requires the product class
require('../model/product.php');

//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod=="GET") 
{
    //returns all the products from the database
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        $action = $_GET['action'];
        if ($action =="products") 
        {
            $sql="SELECT *FROM products;";

            //creates an object of the product class
            $product = new Product;

            $result = $product->getProducts($sql);

            if ($result) 
            {
                echo json_encode($result);
            }
        }
        elseif ($action =="options")
        {
            $sql1="SELECT supplier_id as id, name FROM suppliers;";
            $sql2="SELECT category_id as id, name FROM category;";
            $sql3="SELECT source_id as id,   name FROM source;";
            $sql4="SELECT storage_id as id, name FROM storage;";

            //creates an object of the product class
            $product = new Product;
            $suppliers = $product->getSelectOptions($sql1);
            $category = $product->getSelectOptions($sql2);
            $source = $product->getSelectOptions($sql3);
            $storage = $product->getSelectOptions($sql4);

            if ($suppliers&$category&$source&$storage) 
            {
                $response = array();
                $response["suppliers"] = $suppliers;
                $response["category"] = $category;
                $response["source"] = $source;
                $response["storage"] = $storage;
                echo json_encode($response);
            }
        }
    } 
}
elseif ($requestMethod=="POST")
{
    //adds a product to the database
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];
        if ($action=="addProduct")
        {
            //gets the values
            $batchNumber= strip_tags($_POST['batch_number']);
            $category= strip_tags($_POST['category']);
            $name= strip_tags($_POST['name']);
            $quantity= strip_tags($_POST['quantity']);
            $source= strip_tags($_POST['source']);
            $supplier= strip_tags($_POST['supplier']);
            $storage= strip_tags($_POST['storage']);
            $orderDate= strip_tags($_POST['order_date']);
            $inventoryDate= strip_tags($_POST['inventory_date']);
            $description= strip_tags($_POST['description']);

            //sets the sql statement
            $sql = "INSERT INTO 
                    products(batch_number,category,name,quantity,source,supplier,storage,order_date,inventory_date,description) 
                    VALUES('$batchNumber','$category','$name','$quantity','$source','$supplier','$storage','$orderDate','$inventoryDate','$description');";

            //creates an object of the product class
            $product = new Product;
            $result = $product->addProduct($sql);
            if ($result)
            {
                echo json_encode($result);
            }
        } 
    }
}
?>