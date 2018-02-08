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

        if ($action=="getCategory")
        {
            //sets the sql
            $sql="SELECT * FROM category ORDER BY id DESC;";

            //creates a configuration object
            $configuration = new Configuration;
            $result = $configuration->get($sql);
            if ($result)
            {
                echo json_encode($result);
            }
        }
        elseif($action=="getSource")
        {

        }
        elseif($action=="getPackageType")
        {

        }
        elseif($action=="getStorage")
        {

        }
    } 
}
elseif ($requestMethod=="POST")
{
    
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];

        if ($action=="addCategory") 
        {
            //gets the form items
            $name = $_POST['name'];

            //sets the sql
            $sql="INSERT INTO category(name) VALUES('$name');";

            //creates a configuration object
            $configuration = new Configuration;
            $result = $configuration->add($sql,"category","");
            if ($result)
            {
                echo json_encode($result);
            }
        }
        elseif ($action=="updateCategory") 
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE category SET name='$name' WHERE id='$id';";

            //creates a configuration object
            $configuration = new Configuration;
            
            $result = $configuration->add($sql,"category",$id);
            if ($result)
            {
                echo json_encode($result);
            }
        }
        elseif ($action=="postStorage") 
        {
            
        }
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
?>