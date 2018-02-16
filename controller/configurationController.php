<?php
 header("Content-Type: application/json");
//requires the user class
require('../model/configuration.php');
//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod=="GET") 
{
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        //gets the action
        $action=$_GET['action'];

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

            $configuration = new Configuration;
            $categories = $configuration->get($sql);
           
            if (sizeof($categories)>1)
            {
                echo json_encode(getResponse($categories,"not empty",$numPage));
            }
            else
            {
                echo json_encode(getResponse($categories,"empty",$numPage));
            } 
        }
        elseif($action=="search_category")
        {
            //gets the name
            $name= $_GET['name'];

            //sets the sql
            $sql = "SELECT * FROM category  WHERE name LIKE '%$name%';";
          
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
        //***********************************************************************************************
        //                                          ROLES
        //***********************************************************************************************
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
        //***********************************************************************************************
        //                                          STATUS
        //***********************************************************************************************
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
 
elseif ($requestMethod=="POST")
{
    
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];

        //CATEGORY SECTION
        if ($action=="add_category") 
        {
            //gets the form items
            $name = $_POST['name'];

            //sets the sql
            $sql="INSERT INTO category(name) VALUES('$name');";

            //creates a configuration object
            $configuration = new Configuration;
            $result = $configuration->updateItem($sql);
            if ($result)
            {
                $array=array();
                $array["response"]="add_successful";
                echo json_encode($array);
            }
            else
            {
                $array=array();
                $array["response"]="add_failed";
                echo json_encode($array);
            }
        }
        elseif ($action=="update_category") 
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE category SET name='$name' WHERE id='$id';";

            //creates a configuration object
            $configuration = new Configuration;
            
            $result = $configuration->updateItem($sql);
            if ($result)
            {
                $array=array();
                $array["response"]="update_successful";
                echo json_encode($array);
            }
        }
        elseif ($action=="delete_category") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM category WHERE id='$id';";

            //creates a supplier object
            $configuration = new Configuration;
            $result = $configuration->updateItem($sql);
            if ($result)
            {
                $array=array();
                $array["response"]="delete_successful";
                echo json_encode($array);
            }
        }
        //CATEGORY SECTION
        elseif ($action=="postPackageType")
        {
        
            
        } 
    }
}

//login response
function loginResponse($status,$username,$role,$user_id,$message)
{
    $response = array();
    $response["status"] = $status;
    $response["user_id"] = $user_id;
    $response["username"] = $username;
    $response["role"] = $role;
    $response["message"] = $message;
    return json_encode($response);
}

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

function getResponse($items,$message,$numPage)
{
    $array=array();
    $array["status"]=$message;
    $array["num_page"]=$numPage;
    $items[0]=$array;
    return $items;
}

?>