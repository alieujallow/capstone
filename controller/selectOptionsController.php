<?php
 header("Content-Type: application/json");
//requires the product class
require('../model/selectOptions.php');

//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod=="GET") 
{
    //returns all the products from the database
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        $action = $_GET['action'];
        if ($action =="options")
        {
            $suppliers = returnSelectList("suppliers"); //gets the suppliers
            $source = returnSelectList("source"); //gets the sources
            $storage = returnSelectList("storage"); //gets the storage locations
            $products = returnSelectList("products"); //gets the storage locations
            $measurement = returnSelectList("measurement"); //gets the storage locations

            if ($suppliers&$source&$storage&$products&$measurement) 
            {
                $response = array();
                $response["suppliers"] = $suppliers;
                $response["sources"] = $source;
                $response["storages"] = $storage;
                $response["products"] = $products;
                $response["measurements"] =$measurement;
                echo json_encode($response);
            }
        }
    } 
}

//takes a table name and constructs a query
function returnSelectList($tableName)
{
    $sql="SELECT id, name FROM ".$tableName.";";
    $selectOptions = new SelectOptions;
    return $selectOptions->getSelectOptions($sql);
}
?>