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
        //              STORAGE
        ////////////////////////////////////////
        elseif ($action=="display_storages") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"storage");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name,phone FROM storage ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_storage")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name,phone FROM storage WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //              PROCESSOR
        ////////////////////////////////////////
        elseif ($action=="display_processors") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"processor");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name,phone,address FROM processor ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_processor")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name,phone,address FROM processor WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //              SOURCE
        ////////////////////////////////////////
        elseif ($action=="display_sources") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"source");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name FROM source ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_source")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name FROM source WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //         UNIT OF MEASUREMENT
        ////////////////////////////////////////
        elseif ($action=="display_measurements") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"measurement");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name,symbol FROM measurement ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_measurement")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name,symbol FROM measurement WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
        }

        /////////////////////////////////////////
        //         PACKAGE TYPES
        ////////////////////////////////////////
        elseif ($action=="display_packages") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"package");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name,measurement_unit,value FROM package ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_package")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name,measurement_unit,value FROM package WHERE name LIKE '%$name%';";
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
        elseif ($action=="display_roles") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"role");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name FROM role ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_role")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name FROM role WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
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
        elseif ($action=="display_status") 
        {
            //gets the current page and the number of items per page
            $currentPage = $_GET['current_page'];
            $numItemsPerPage = $_GET['num_items'];

            $startAndNumPage = getStartAndNumPage($currentPage,$numItemsPerPage,"status");
            $start =  $startAndNumPage[0];
            $numPage = $startAndNumPage[1];
           
            //sets the sql
            $sql = "SELECT id,name FROM status ORDER BY id DESC LIMIT $start,$numItemsPerPage;";
            deliverGetResponse($sql,$numPage);
        }
        elseif ($action=="search_status")
        {
             //gets the name
            $name= $_GET['name'];
            //sets the sql
            $sql = "SELECT id,name FROM status WHERE name LIKE '%$name%';";
            deliverGetResponse($sql,0);
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
         elseif ($action=="add_storage")
        {
            //gets the form items
            $name = $_POST['name'];
            $phone = $_POST['phone'];
           
            //sets the sql
            $sql="INSERT INTO storage(name,phone) VALUES('$name','$phone');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_storage")
        {
            //gets the form data
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE storage SET name='$name', phone='$phone' WHERE id='$id';";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_storage") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM storage WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }
        /////////////////////////////////////////
        //              PROCESSOR
        ////////////////////////////////////////
         elseif ($action=="add_processor")
        {
            //gets the form items
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $address = $_POST['address'];
            
            //sets the sql
            $sql="INSERT INTO processor(name,phone,address) VALUES('$name','$phone','$address');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_processor")
        {
            //gets the form data
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $address = $_POST['address'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE processor SET name='$name', phone='$phone', address='$address' WHERE id='$id';";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_processor") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM processor WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }

        /////////////////////////////////////////
        //              SOURCE
        ////////////////////////////////////////
        elseif ($action=="add_source")
        {
            //gets the form items
            $name = $_POST['name'];
            //sets the sql
            $sql="INSERT INTO source(name) VALUES('$name');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_source")
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE source SET name='$name' WHERE id='$id';";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_source") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM source WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }
        /////////////////////////////////////////
        //            UNIT OF MEASUREMENT
        ////////////////////////////////////////

         elseif ($action=="add_measurement")
        {
            //gets the form items
            $name = $_POST['name'];
            $symbol = $_POST['symbol'];
            //sets the sql
            $sql="INSERT INTO measurement(name,symbol) VALUES('$name','$symbol');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_measurement")
        {
            //gets the form data
            $name = $_POST['name'];
            $symbol = $_POST['symbol'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE measurement SET name='$name', symbol='$symbol' WHERE id='$id';";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_measurement") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM measurement WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }

        /////////////////////////////////////////
        //              PACKAGE TYPE
        ////////////////////////////////////////
        elseif ($action=="add_package")
        {
            //gets the form items
            $name = $_POST['name'];
            $measurement_unit = $_POST['measurement_unit'];
            $value = $_POST['value'];
           
            //sets the sql
            $sql="INSERT INTO package(name,measurement_unit,value) VALUES('$name','$measurement_unit','$value');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_package")
        {
            //gets the form data
            $name = $_POST['name'];
            $measurement_unit = $_POST['measurement_unit'];
            $value = $_POST['value'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE package SET name='$name', measurement_unit='$measurement_unit', value='$value' WHERE id='$id'";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_package") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM package WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }

        /////////////////////////////////////////
        //              ROLES
        ////////////////////////////////////////
        elseif ($action=="add_role")
        {
            //gets the form items
            $name = $_POST['name'];
            //sets the sql
            $sql="INSERT INTO role(name) VALUES('$name');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_role")
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE role SET name='$name' WHERE id='$id'";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_role") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM role WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }

        /////////////////////////////////////////
        //              STATUS
        ////////////////////////////////////////
        elseif ($action=="add_status")
        {
            //gets the form items
            $name = $_POST['name'];
            //sets the sql
            $sql="INSERT INTO status(name) VALUES('$name');";
            deliverPostResponse($sql,"add_successful","add_failed");
        } 
        elseif ($action=="update_status")
        {
            //gets the form data
            $name = $_POST['name'];
            $id = $_POST['id'];

            //sets the sql
            $sql="UPDATE status SET name='$name' WHERE id='$id'";
            deliverPostResponse($sql,"update_successful","update_failed");
        }
        elseif ($action=="delete_status") 
        {
            $id= strip_tags($_POST['id']);
            $sql = "DELETE FROM status WHERE id='$id';";
            deliverPostResponse($sql,"delete_successful","delete_failed");
        }
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