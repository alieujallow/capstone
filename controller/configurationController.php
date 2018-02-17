<?php
 header("Content-Type: application/json");
//requires the user class
require('../model/configuration.php');
//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];





 //***********************************************************************************************
  //                                     GET REQUESTS
  //***********************************************************************************************
if ($requestMethod=="GET") 
{
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        //gets the action
        $action=$_GET['action'];

        /////////////////////////////////////////
        //              CATEGORY
        ////////////////////////////////////////
        if ($action=="display_category")
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"category");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT * FROM category ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif($action=="search_category")
        {
            //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT * FROM category  WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }
        elseif ($action=="get_category")
        {
            //sets the sql
            $sql = "SELECT * FROM category;";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //              PRODUCTS
        ////////////////////////////////////////

        elseif ($action=="display_products") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"products");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT products.id as id, products.name as name, category, order_point, warning_point, category.name as categoryName FROM products,category WHERE category=category.id ORDER BY products.id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_product")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT products.id as id, products.name as name, category, order_point, warning_point, category.name as categoryName FROM products,category WHERE category=category.id AND products.name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //              ROLES
        ////////////////////////////////////////
        elseif ($action=="get_roles")
        {
            //sets the sql
            $sql = "SELECT * FROM role;";
          
            $configuration = new Configuration;
            $categories = $configuration->get($sql);
            
            if (sizeof($categories)>1)
            {
                echo json_encode(getResponse($categories,"not empty",0));
            }
            else
            {
                echo json_encode(getResponse($categories,"empty",0));
            }
        }

        /////////////////////////////////////////
        //              STATUS
        ////////////////////////////////////////
        elseif ($action=="get_status")
        {
            //sets the sql
            $sql = "SELECT * FROM status;";
          
            $configuration = new Configuration;
            $categories = $configuration->get($sql);
            
            if (sizeof($categories)>1)
            {
                echo json_encode(getResponse($categories,"not empty",0));
            }
            else
            {
                echo json_encode(getResponse($categories,"empty",0));
            }
        }

    }
        
}  
 
//***********************************************************************************************
//                                          POST REQUESTS
//***********************************************************************************************
elseif ($requestMethod=="POST")
{
    
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];

        /////////////////////////////////////////
        //              CATEGORY
        ////////////////////////////////////////
        if ($action=="add_category") 
        {
            //gets the form items
            $name = $_POST['name'];

            //sets the sql
            $sql="INSERT INTO category(name) VALUES('$name');";
            deliverPostResponse($sql,"add_successful","add_failed");
        }
        elseif ($action=="update_category") 
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE category SET name='$name' WHERE id='$id';";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_category") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM category WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }
        /////////////////////////////////////////
        //              PRODUCT
        ////////////////////////////////////////
        elseif ($action=="add_product")
        {
            //gets the form items
            $name = $_POST['name'];
            $category = $_POST['category'];
            $order_point = $_POST['order_point'];
            $warning_point= $_POST['warning_point'];

            //sets the sql
            $sql="INSERT INTO products(category,name,order_point,warning_point) VALUES('$category','$name','$order_point','$warning_point');";

            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_product")
        {
            //gets the form data
            $name = $_POST['name'];
            $category = $_POST['category'];
            $order_point = $_POST['order_point'];
            $warning_point= $_POST['warning_point'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE products SET category='$category', name='$name', order_point='$order_point', warning_point='$warning_point' WHERE id='$id';";

            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_product") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM products WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }

        /////////////////////////////////////////
        //              STORAGE
        ////////////////////////////////////////

        /////////////////////////////////////////
        //              PROCESSOR
        ////////////////////////////////////////

        /////////////////////////////////////////
        //              SOURCE
        ////////////////////////////////////////

        /////////////////////////////////////////
        //              UNIT OF MEASUREMENT
        ////////////////////////////////////////

        /////////////////////////////////////////
        //              PACKAGE TYPE
        ////////////////////////////////////////
    }
}


 //***********************************************************************************************
 //                                         FUNCTIONS
//***********************************************************************************************


//a function that returns the number of pages and the start
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
    $configuration = new Configuration;
    $numberOfItems = $configuration->getTotalNumItems($query);
    $numPage = ceil($numberOfItems / $numItemsPerPage); // Total number of page
    $array=[$start,$numPage];
    return $array;
}

function deliverGetResponse($sql,$numPage)
{
    $configuration = new Configuration;
    $items = $configuration->get($sql);

    if (sizeof($items)>1)
    {
        echo json_encode(getResponse($items,"not empty",$numPage));
    }
    else
    {
        echo json_encode(getResponse($items,"empty",$numPage));
    }
}

function deliverPostResponse($sql,$successMessage,$failMessage)
{
    $configuration = new Configuration;
    $result = $configuration->updateItem($sql);

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


function getResponse($items,$message,$numPage)
{
    $array=array();
    $array["status"]=$message;
    $array["num_page"]=$numPage;
    $items[0]=$array;
    return $items;
}

?>