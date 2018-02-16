<?php
 header("Content-Type: application/json");
//requires the user class
require('../model/user.php');
//gets the request method
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod=="GET") 
{
    //returns all the users from the database
    if (isset($_GET['action']) & !empty($_GET['action']))
    {
        //gets the action
        $action = $_GET['action'];

        if ($action =="display_users")
        {
           //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"users");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT users.id as id,username,email,phone,role.name as role, status.name as status,last_login,role.id as roleId, status.id as statusId FROM users,status,role WHERE role.id=users.role AND status.id=users.status ORDER BY users.id DESC LIMIT $start,$numItemsPerPage;";

            $user = new User;
            $users = $user->getUsers($sql);
           
            if (sizeof($users)>1)
            {
                echo json_encode(getResponse($users,"not empty",$numPage));
            }
            else
            {
                echo json_encode(getResponse($users,"empty",$numPage));
            } 
        }
        elseif ($action=="search_user") 
        {
            //gets the name
            $name= $_GET['name'];

            //sets the sql
            $sql = "SELECT users.id as id,username,email,phone,role.name as role, status.name as status,last_login FROM users,role,status WHERE username LIKE '%$name%' AND role.id=users.role AND status.id=users.status";
          
            $user = new User;
            $users = $user->getUsers($sql);
            
            if (sizeof($users)>1)
            {
                echo json_encode(getResponse($users,"not empty",0));
            }
            else
            {
                echo json_encode(getResponse($users,"empty",0));
            }
        }
    } 
}
elseif ($requestMethod=="POST")
{
    //adds a user to the database
   if (isset($_POST['action']) & !empty($_POST['action']))
   {
        $action=$_POST['action'];

        if ($action=="login") 
        {
            //gets the login credentials
            $username= strip_tags($_POST['username']);
            $password = strip_tags($_POST['password']);

            //creates a user object
            $user = new User;

            //sets the sql
            $sql = "SELECT user_id, username, password, role FROM users WHERE username='$username';";
            $result = $user->loginUser($sql);

            if ($result)
            {
                $row=$result[0];
                if ($row["username"]=="")
                {
                    //wrong username
                    echo loginResponse("fail",null,null,null,"wrong username");
                }
                else
                {
                    //verifies the password
                    if (password_verify($password, $row['password'])) 
                    {
                        //password is correct
                        //creating sessions
                        session_start();
                        $_SESSION['user_id'] = $row['user_id'];
                        $_SESSION['username'] = $row['username'];
                        $_SESSION['role'] = $row['role'];

                        echo loginResponse("success",$row['username'],$row['role'],$row['user_id'],"correct credentials");
                    }
                    else
                    {
                        //wrong password
                        echo loginResponse("fail",null,null,null,"wrong password");
                    }
                }
            }
            
        }
        //checks if a user is logged in
        elseif ($action=="checklogin") 
        {
            $response=array();

            session_start();
            if(isset($_SESSION['username']) && !empty($_SESSION['username'])) 
            {
                $response["status"]="success";
                $response["username"]=$_SESSION['username'];
            }
            else
            {
                $response["status"]="fail";
            }
            echo json_encode($response);
        }
        //logs out the user by destroying all the sessions
        elseif ($action=="logout") 
        {
            $response=array();
            session_start();
            session_unset(); 
            session_destroy(); 

            $response["status"]="success";
            echo json_encode($response);
        }
        elseif ($action=="add_user")
        {
            //gets the values
            $username= strip_tags($_POST['username']);
            $email= strip_tags($_POST['email']);
            $phone= strip_tags($_POST['phone']);
            $role= strip_tags($_POST['role']);

            //default password is 123
            $password = "123";

            //encrypts the password
            $hashedPassword = password_hash($password,PASSWORD_DEFAULT);

            //sets the sql statement
            $sql = "INSERT INTO users(username,email,phone,role,status,password) VALUES('$username','$email','$phone','$role','1','$hashedPassword');";

            //creates an object of the user class
            $user = new User;
            $result = $user->updateUser($sql);

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
        elseif ($action=="update_user")
        {
            //gets the values
            $username= strip_tags($_POST['username']);
            $email= strip_tags($_POST['email']);
            $phone= strip_tags($_POST['phone']);
            $role= strip_tags($_POST['role']);
            $status= strip_tags($_POST['status']);
            $id= strip_tags($_POST['id']);

            //sets the sql statement
            $sql = "UPDATE users SET username='$username', email='$email',phone='$phone',role='$role',status='$status' WHERE id='$id';";

            //creates an object of the user class
            $user = new User;
            $result = $user->updateUser($sql);

            if ($result)
            {
               $array=array();
               $array["response"]="update_successful";
               echo json_encode($array);
            }
            else
            {
               $array=array();
               $array["response"]="update_failed";
               echo json_encode($array);
            }
        }
        elseif ($action=="delete_user") 
        {
            //gets the values
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM users WHERE id='$id';";

            //creates a supplier object
            $user = new User;
            $result = $user->updateUser($sql);
            if ($result)
            {
                $array=array();
                $array["response"]="delete_successful";
                echo json_encode($array);
            }
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
    $user = new User;
    $numberOfItems = $user->getTotalNumItems($query);
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