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
        elseif ($action =="display_products_in_process")
        {
            
           //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"processing");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT processing.id as id,products.name as product,quantity,processor.name as processor,storage.name as location, transaction_date,status FROM processing,products,processor,storage WHERE product=products.id AND processor=processor.id AND product_from=storage.id ORDER BY processing.id DESC LIMIT $start,$numItemsPerPage;";

            deliverGetResponse($sql,$numPage);
            
        }
        elseif ($action=="search_product_stock")
        {
            //gets the name
            $name= $_GET['name'];
            $sql="SELECT id,name FROM products WHERE products.name like '%$name%'";
            $stock = new Stock; 
            $storage = $stock->getStock($sql); 
              if (sizeof($storage)>1)
              {
                 $responseArray = array();
                 $array=array();
                 for ($i=1; $i <sizeof($storage); $i++)
                 { 
                    $productID = $storage[$i]["id"];
                    $productName = $storage[$i]["name"];

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
              else
              {
                $responseArray = array();
                $array=array();

                $array['productID']="";
                $array['productName']="";
                $array['quantity']= "";
                $responseArray[0] =$array; 
                echo json_encode($responseArray);
              }
        }
        elseif ($action=="search_location_stock") 
        {
            $name= $_GET['name'];
            $product_id = $_GET['id'];

            $sql = "SELECT name,id FROM storage WHERE storage.name like '%$name%';";  
            $stock = new Stock; 
            $storage = $stock->getStock($sql); 

              if (sizeof($storage)>1)
              {
                 $responseArray = array();
                 $array=array();
                 for ($i=1; $i <sizeof($storage); $i++)
                 { 
                    $storageID = $storage[$i]["id"];
                    $storageName = $storage[$i]["name"];

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
              else
              {
                $responseArray = array();
                $array=array();

                $array['storageID']="";
                $array['storageName']="";
                $array['quantity']= "";
                $responseArray[0] =$array; 
                echo json_encode($responseArray);
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

            session_start();
            $userID= $_SESSION['user_id'];

            //sets the sql statement
            $sql = "INSERT INTO 
                    stock(product,quantity,supplier,source,order_date,inventory_date,order_number,storage,transaction_date,description,tag,user_id) 
                    VALUES('$product','$quantity','$supplier','$source','$orderDate','$inventoryDate','$orderNumber','$storage','$date','$description','1','$userID');";

            $sql .="INSERT INTO transaction(transaction_date,product,type,quantity,location,reason,tag) VALUES('$date','$product','Stock Receipt','$quantity','$storage','adding','1');";

            deliverPostResponse($sql,"add_successful","add_failed","multiInsert");
        }
        elseif ($action=="move_stock_to_location") 
        {
            //get the parameters
            $source = strip_tags($_POST['source']);
            $product = strip_tags($_POST['product']);
            $quantity = strip_tags($_POST['quantity']);
            $destination = strip_tags($_POST['destination']);
            $date= date('Y-m-d H:i:s');

            session_start();
            $userID= $_SESSION['user_id'];

            $sql=  "INSERT INTO 
                    stock(product,quantity,supplier,source,storage,transaction_date,tag,user_id) 
                    VALUES('$product','$quantity','16','1', '$source','$date','0','$userID'),('$product','$quantity','16','1', '$destination','$date','1','$userID');";

            $sql .="INSERT INTO transaction(transaction_date,product,type,quantity,location,reason,tag) VALUES('$date','$product','movement','$quantity','$source','testing','0'),('$date','$product','movement','$quantity','$destination','testing','1');";

            deliverPostResponse($sql,"movement_successful","movement_failed","multiInsert");
        }
        elseif ($action=="move_stock_to_processor")
        {
            //get the parameters
            $source = strip_tags($_POST['source']);
            $product = strip_tags($_POST['product']);
            $quantity = strip_tags($_POST['quantity']);
            $processor = strip_tags($_POST['processor']);
            $date= date('Y-m-d H:i:s');

            session_start();
            $userID= $_SESSION['user_id'];

            //moves out of stock
            $sql=  "INSERT INTO 
                    stock(product,quantity,supplier,source,storage,transaction_date,tag,user_id) 
                    VALUES('$product','$quantity','16','1', '$source','$date','0','$userID');";

            //moves into processor
            $sql .=  "INSERT INTO 
                    processing(product,quantity,processor,product_from,transaction_date,status) 
                    VALUES('$product','$quantity','$processor','$source', '$date','1');";

            //records the transaction
            $sql .="INSERT INTO transaction(transaction_date,product,type,quantity,location,reason,tag) VALUES('$date','$product','processing','$quantity','$source','to a processing plant','0')";

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

            session_start();
            $userID= $_SESSION['user_id'];

            $sql =  "INSERT INTO 
                    stock(product,quantity,supplier,source,storage,transaction_date,description,tag,user_id) 
                    VALUES('$product','$quantity','16','1', '$location','$date',(SELECT name FROM reason WHERE id='$reason'),'$addDeduct','$userID');";
            deliverPostResponse($sql,"adjustment_successful","adjustment_failed","updateStock");
        }
        elseif ($action=="finish_process")
        {
            $processID = strip_tags($_POST['id']);
            $sql="UPDATE processing SET status='0' WHERE id='$processID'";
            deliverPostResponse($sql,"success","failed","updateStock");
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