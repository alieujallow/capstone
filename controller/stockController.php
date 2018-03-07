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
        elseif ($action =="display_stocks")
        {
             //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"stock");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];

            $sql = "SELECT products.name as productName, products.id as productID From products WHERE products.id IN (SELECT Distinct(product) From stock)";  
              $stock = new Stock; 
              $storage = $stock->getStock($sql); 

              if (sizeof($storage)>1)
              {
                 $responseArray = array();
                 $array=array();
                 for ($i=1; $i <sizeof($storage); $i++)
                 { 
                    $productID = $storage[$i]["productID"];
                    $productName = $storage[$i]["productName"];

                    $sql = "SELECT ABS(SUM(quantity) - (SELECT COALESCE(SUM(quantity),0) FROM stock WHERE tag='0' AND product='$productID')) as sum FROM stock WHERE product ='$productID' AND tag='1';";

                     $result=$stock->getStock($sql);
                     $quantity=$result[1]['sum'];
                     $array['productID']=$productID;
                     $array['productName']=$productName;
                     $array['quantity']= $quantity;
                     $responseArray[$i-1] =$array; 
                 }
                 echo json_encode($responseArray);
              }
        }
        elseif ($action =="display_location_inventory") 
        {
              $product_id = $_GET['id'];

              $sql = "SELECT storage.name as storageName, storage.id as storageID FROM storage WHERE storage.id IN (SELECT DISTINCT(storage) FROM stock WHERE product='$product_id')";  
              $stock = new Stock; 
              $storage = $stock->getStock($sql); 
              if (sizeof($storage)>1)
              {
                 $responseArray = array();
                 $array=array();
                 for ($i=1; $i <sizeof($storage); $i++)
                 { 
                    $storageID = $storage[$i]["storageID"];
                    $storageName = $storage[$i]["storageName"];
                    $sql = "SELECT ABS(SUM(quantity) - (SELECT COALESCE(SUM(quantity),0) FROM stock WHERE tag='0' AND product='$product_id' AND storage='$storageID' )) as sum FROM stock WHERE product ='$product_id' AND tag='1' AND storage='$storageID';";
                     $result=$stock->getStock($sql);
                     $quantity=$result[1]['sum'];
                     $array['storageID']=$storageID;
                     $array['storageName']=$storageName;
                     $array['quantity']= $quantity;
                     $responseArray[$i-1] =$array; 
                 }
                 echo json_encode($responseArray);
              }
        }
        elseif ($action =="display_transaction_history")
        {
             $id = $_GET['id'];
             $sql = "SELECT *FROM stock WHERE product='$id';";
             deliverGetResponse($sql,2); 
        }
        elseif ($action =="display_location_transaction_history")
        {
             $locationID = $_GET['id'];

             $sql = "SELECT transaction_date,products.name as product,type,quantity,storage.name as location,reason,tag FROM transaction,products,storage WHERE products.id=product AND storage.id=transaction.location AND transaction.location='$locationID';";

             deliverGetResponse($sql,2); 
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
            //sets the timezone to GMT
            date_default_timezone_set('GMT');

            //gets the values
            $product= strip_tags($_POST['product']);
            $quantity= strip_tags($_POST['quantity']);
            $supplier= strip_tags($_POST['supplier']);

            $orderDate= strtotime(strip_tags($_POST['orderDate']));
            $orderDate= date('Y-m-d',$orderDate); 

            $inventoryDate= strtotime(strip_tags($_POST['inventoryDate']));
            $inventoryDate= date('Y-m-d',$inventoryDate); 

            $orderNumber= strip_tags($_POST['orderNumber']);
            $storage= strip_tags($_POST['storage']);
            $source= strip_tags($_POST['source']);
            $description= strip_tags($_POST['description']); 
            $date= date('Y-m-d H:i:s');

            //sets the sql statement
            $sql = "INSERT INTO 
                    stock(product,quantity,supplier,source,order_date,inventory_date,order_number,storage,transaction_date,description,tag) 
                    VALUES('$product','$quantity','$supplier','$source','$orderDate','$inventoryDate','$orderNumber','$storage','$date','$description','1');";

            deliverPostResponse($sql,"add_successful","add_failed","updateStock");
        }
        elseif ($action=="move_stock_to_location") 
        {
            //get the parameters
            $source = strip_tags($_POST['source']);
            $product = strip_tags($_POST['product']);
            $quantity = strip_tags($_POST['quantity']);
            $destination = strip_tags($_POST['destination']);
            $date= date('Y-m-d H:i:s');
            $sql=  "INSERT INTO 
                    stock(product,quantity,supplier,source,storage,transaction_date,tag) 
                    VALUES('$product','$quantity','16','1', '$source','$date','0'),('$product','$quantity','16','1', '$destination','$date','1');";

            $sql .="INSERT INTO transaction(transaction_date,product,type,quantity,location,reason,tag) VALUES('$date','$product','movement','$quantity','$source','testing','0'),('$date','$product','movement','$quantity','$destination','testing','1');";

            deliverPostResponse($sql,"movement_successful","movement_failed","multiInsert");
        }
        elseif ($action=="adjust_stock") 
        {
            //get the parameters
            $location = strip_tags($_POST['location']);
            $product = strip_tags($_POST['product']);
            $quantity = strip_tags($_POST['quantity']);
            $addDeduct = strip_tags($_POST['addDeduct']);
            if ($addDeduct=="2")
            {
               $addDeduct =0;
            }
            $reason = strip_tags($_POST['reason']);
            $date= date('Y-m-d');
            $sql =  "INSERT INTO 
                    stock(product,quantity,supplier,source,storage,transaction_date,description,tag) 
                    VALUES('$product','$quantity','16','1', '$location','$date',(SELECT name FROM reason WHERE id='$reason'),'$addDeduct');";
            deliverPostResponse($sql,"adjustment_successful","adjustment_failed","updateStock");
        }  
    }
}

function deliverPostResponse($sql,$successMessage,$failMessage,$function)
{
    $stock = new Stock;
    $result = $stock->$function($sql);
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

function deliverGetResponse($sql,$numPage)
{
    $stock = new Stock;
    $stocks = $stock->getStock($sql);

    if (sizeof($stocks)>1)
    {
        echo json_encode(getResponse($stocks,"not empty",$numPage));
    }
    else
    {
        echo json_encode(getResponse($stocks,"empty",$numPage));
    }
}

function getResponse($stocks,$message,$numPage)
{
    $array=array();
    $array["status"]=$message;
    $array["num_page"]=$numPage;
    $stocks[0]=$array;
    return $stocks;
}

function getStartAndNumPage($currentPage,$numItemsPerPage,$tableName)
{
    if ($currentPage != 1)
    {
        $start = ($currentPage-1) * $numItemsPerPage;
    }
    else
    {
        $start=0;
    }

    $query = "SELECT count(id) as 'num' FROM `".$tableName."`";
    $stock = new Stock;
    $numberOfItems = $stock->getTotalNumStock($query);
    $numPage = ceil($numberOfItems / $numItemsPerPage); // Total number of page
    $array=[$start,$numPage];
    return $array;
}
?>