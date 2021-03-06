
//*****************************************************************************************************
//				                                FORM VALIDATIONS
//*****************************************************************************************************

//validate add product form
function validateStockForm()
{
  var product = validateSelectInputField("stock_form","products","products_span");
  var quantity = validateQuantity("stock_form","quantity","quantity_span");
  var supplier = validateSelectInputField("stock_form","suppliers","suppliers_span");
  var orderDate = validateDate("stock_form","order_date","order_date_span");
  var inventoryDate = validateDate("stock_form","inventory_date","inventory_date_span");
  var orderNumber = validateQuantity("stock_form","order_number","order_number_span");
  var storage = validateSelectInputField("stock_form","storages","storages_span");
  //var measurement = validateSelectInputField("stock_form","measurements","measurements_span");
  var source= validateSelectInputField("stock_form","sources","sources_span");
  var description=validateDescription("stock_form","description","description_span");
  if (product==false || quantity==false || supplier==false|| orderDate==false || inventoryDate==false 
    || orderNumber==false || storage==false || source==false || description==false)
  {
    return false;
  }
  addStock(product,quantity,supplier,orderDate,inventoryDate,orderNumber,storage,source,description);
  return false;
}


//validates the login form
function validateLoginForm()
{
  var username = validateName("login_form","username","username_span");
  var password = validatePassword("login_form","password","password_span");

  if (username==false || password==false)
   {
     return false;
   }
   loginUser(username, password);
   return false;
}

//validates the add user form
function validateAddUserForm()
{
  var id = document.getElementById("user_saveBtn").value;
  if (id=="")
  {
    //we add if ID is empty
    var username = validateName("user_form","username","username_span");
    var email = validateEmail("user_form","user_email","user_email_span");
    var phone = validatePhone("user_form","user_phone","user_phone_span");
    var role = validateSelectInputField("user_form","user_role","user_role_span");
    if (username==false || email==false || role==false || phone==false)
    {
      return false;
    }
     postUser(username,email,phone,role,"",id);
     return false;
  }
  else
  {
    //we update if the ID is not empty
    var username = validateName("user_form","username","username_span");
    var email = validateEmail("user_form","user_email","user_email_span");
    var phone = validatePhone("user_form","user_phone","user_phone_span");
    var role = validateSelectInputField("user_form","user_role","user_role_span");
    var status = validateSelectInputField("user_form","user_status","user_status_span");
    if (username==false || email==false || role==false || phone==false || status==false)
    {
      return false;
    }
     postUser(username,email,phone,role,status,id);
     return false;
  } 
}

//validates the add supplier form
function validateSupplierForm()
{
	var name= validateName("supplier_form","supplier_name","supplier_name_span");
	var phone= validatePhone("supplier_form","supplier_phone","supplier_phone_span");
	var email= validateEmail("supplier_form","supplier_email","supplier_email_span");
	var address= validateAddress("supplier_form","supplier_address","supplier_address_span");

	if (name==false || phone==false || email==false || address==false)
	{
	 	return false;
	}
  var id = document.getElementById("supplier_saveBtn").value;
  postSupplier(name,phone,email,address,id);
  return false;
}

//validates the add supplier form
function validateCustomerForm()
{
	var name = validateName("customer_form","customer_name","customer_name_span");
	var phone= validatePhone("customer_form","customer_phone","customer_phone_span");
	var email= validateEmail("customer_form","customer_email","customer_email_span");
	var address = validateAddress("customer_form","customer_address","customer_address_span");

	if (name==false || phone==false || email==false || address==false)
	 {
	 	return false;
	 }

  var id = document.getElementById("customer_saveBtn").value;
  postCustomer(name,phone,email,address,id);
  return false;
}

//validates the category form
function validateCategoryForm()
{
  var name  = validateName("category_form","category_name","category_span");
  if (name==false)
  {
    return false;
  }

  var id = document.getElementById("category_saveBtn").value;
  postCategory(name,id);
  return false;
}

//validates search form
function valiateSearchForm()
{
  var name  = validateName("search_form","search_name","search_span");
  if (name==false)
  {
    return false;
  }
  searchSupplier(name);
  return false;
}

function validateProductForm()
{
  var name = validateName("product_form","product_name","product_name_span");
  var category = validateSelectInputField("product_form","product_category","product_category_span");
  var orderPoint= validateOrderPoints("product_form","order_point","order_point_span");
  var warningPoint= validateOrderPoints("product_form","warning","warning_span");

  if(name==false || category==false || orderPoint==false || warningPoint==false)
   {
    return false;
   }

  var id = document.getElementById("product_saveBtn").value;
  postProduct(name,category,orderPoint,warningPoint,id);
  return false;
}

function validateSourceForm()
{
  var name = validateName("source_form","source_name","source_name_span");
  if(name==false)
   {
    return false;
   }
  var id = document.getElementById("source_saveBtn").value;
  postSource(name,id);
  return false;
}

function validateProcessorForm()
{
  var name = validateName("processor_form","processor_name","processor_name_span");
  var phone= validatePhone("processor_form","processor_phone","processor_phone_span");
  var address = validateAddress("processor_form","processor_address","processor_address_span");
  if(name==false || phone==false || address==false)
  {
    return false;
  }
  var id = document.getElementById("processor_saveBtn").value;
  postProcessor(name,phone,address,id);
  return false;
}

function validateStorageForm()
{
  var name = validateName("storage_form","storage_name","storage_name_span");
  var phone= validatePhone("storage_form","storage_phone","storage_phone_span");
  var address = validateAddress("storage_form","storage_address","storage_address_span");
  if(name==false || phone==false || address==false)
  {
    return false;
  }
  var id = document.getElementById("storage_saveBtn").value;
  postStorage(name,phone,address,id);
  return false;
}

function validateMeasurementForm()
{
  var name = validateName("measurement_form","measurement_name","measurement_name_span");
  var symbol= validateName("measurement_form","measurement_symbol","measurement_symbol_span");

  if(name==false || symbol==false)
  {
    return false;
  }
  var id = document.getElementById("measurement_saveBtn").value;
  postMeasurement(name,symbol,id);
  return false;
}


function validatePackageForm()
{
  var name = validateName("package_form","package_name","package_name_span");
  var measurement = validateSelectInputField("package_form","package_measurement","package_measurement_span");
  var value= validateOrderPoints("package_form","package_value","package_value_span");

  if(name==false || measurement==false || value==false)
  {
    return false;
  }
  var id = document.getElementById("package_saveBtn").value;
  postPackage(name,measurement,value,id);
  return false;
}


function validateAdjustStokcForm()
{
  var location = validateSelectInputField("adjust_stock_form","storage_location","storage_location_span");
  var product = validateSelectInputField("adjust_stock_form","product_section","product_span");
  var quantity= validateQuantity("adjust_stock_form","quantity","quantity_span");
  var addDeduct= validateSelectInputField("adjust_stock_form","addDeduct","addDeduct_span");
  var reason= validateSelectInputField("adjust_stock_form","reason","reason_span");

  if(location==false ||product==false || quantity==false || addDeduct==false || reason==false)
  {
    return false;
  }
  adjustStock(location,product,quantity,addDeduct,reason);
  return false;
}

function validateMoveStockToLocation()
{
  var source = validateSelectInputField("move_stock_to_location_form","source","source_span");
  var product = validateSelectInputField("move_stock_to_location_form","product_section","product_span");
  var quantity= validateQuantity("move_stock_to_location_form","quantity","quantity_span");
  var destination= validateSelectInputField("move_stock_to_location_form","destination","destination_span");
  var reason= validateDescription("move_stock_to_location_form","reason","reason_span");

  if(source==false ||product==false || quantity==false || destination==false)
  {
    return false;
  }
  moveStockToLocation(source,product,quantity,destination,reason);
  return false;
}

function validateProcessStock()
{
  var source = validateSelectInputField("move_stock_to_processor_form","source","source_span");
  var product = validateSelectInputField("move_stock_to_processor_form","product_section","product_span");
  var quantity= validateQuantity("move_stock_to_processor_form","quantity","quantity_span");
  var processor= validateSelectInputField("move_stock_to_processor_form","processor","processor_span");

  if(source==false ||product==false || quantity==false || processor==false)
  {
    return false;
  }
  moveStockToProcessor(source,product,quantity,processor);
  return false;
}

function validateChangePasswordForm()
{
  var currentPassword = validatePassword("change_password_form","current_password","current_password_span");
  var newPassword = validatePassword("change_password_form","new_password","new_password_span");
  var confirmPassword = validatePassword("change_password_form","confirm_password","confirm_password_span");
  if (currentPassword==false || newPassword ==false || confirmPassword==false)
   {
    return false;
   }
   else
   {
      //checks if the two passwords are equal
      if (newPassword==confirmPassword)
      {
        document.getElementById("error_span").innerHTML="";
        document.getElementById("new_password").style.border= "";
        document.getElementById("confirm_password").style.border= "";
        //verifies the current password
        changePassword(currentPassword,newPassword);
      }
      else
      {
        document.getElementById("error_span").innerHTML="Passwords are Not equal";
        document.getElementById("new_password").style.border= "1px solid red";
        document.getElementById("confirm_password").style.border= "1px solid red";
      }
   }
   return false;
}

function validateChangeUsernameForm()
{
  var username = validateName("change_username_form","new_username","new_username_span");
  if (username==false)
   {
    return false;
   }
   return false;
}
//verifies the users pasword
function changePassword(currentPassword,newPassword)
{
   var data={current_password:currentPassword, new_password:newPassword, action:"change_password"};
   var serverUrl='/capstone/controller/userController.php';
    $("#overlay").show();
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="success") 
        {
          displayMessage("Password Changed Successfully.","message_area","");  
          document.getElementById("current_password_span").innerHTML="";
          $("#overlay").hide();
        }
        else if (data.response=="fail")
        {
           document.getElementById("current_password_span").innerHTML="Wrong Password";
            $("#overlay").hide();
        }
      },
      error: function (request, status, error)
      {
        //alert(error);
        $("#overlay").hide();
      }
    });
}
//*********************************************************************************************************
//                                              CATEGORY
//*********************************************************************************************************
//fill the edit category form
function fillEditCategoryForm(id)
{
  //rests the supplier form
  document.getElementById("category_form").reset();
  //splits the id
  var result = id.split(" ");
  document.getElementById("category_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Category";
  document.getElementById("category_saveBtn").value=result[0];
  document.forms["category_form"]["category_name"].value=result[1];
  document.getElementById("category_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#category_modal').modal('show'); 
}

//it fills the delecategory form
function fillDeleteCategoryModal(id)
{
  document.getElementById("delete_category_btn").value=id;

  //triger the modal
  $('#category_delete_modal').modal('show'); 
}


function postCategory(name,id)
{
    if (id=="")
    {
      var data = {name:name, action:"add_category"};
    }
    else
    {
      var data = {name:name, id:id, action:"update_category"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("category_form").reset();
           displayMessage(" Category is successfully added.","add_message_area",displayCategory);       
        }
        else if (data.response=="update_successful") 
        {
           document.getElementById("category_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayCategory);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayCategory(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_category'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructCategoryTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

//constructs the category table
function constructCategoryTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#category_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditCategoryForm(this.id);\" id=\""+value.id+" "+value.name+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteCategoryModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#category_list").append(list);
}

//resets and triggers the supplier form 
function openAddCategoryForm()
{
  document.getElementById("category_form").reset();

  document.getElementById("category_saveBtn").value="";
  
  document.getElementById("category_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Category";
  document.getElementById("category_saveBtn").innerHTML="Add Category";
  //triger the modal
  $('#category_modal').modal('show'); 
}

function searchCategory(name)
{
  var data = {name:name, action:"search_category"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructCategoryTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

//deletes a supplier
function deleteCategory(id)
{
  var data = {id:id, action:'delete_category'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Category successfully Deleted.","delete_message_area",displayCategory);
        $('#category_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}
//********************************************************************************************************
//                                                USER
//*********************************************************************************************************
//searches suppliers and displays them 
function searchUser(name)
{
  var data = {name:name, action:"search_user"};
  var serverUrl='/capstone/controller/userController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructUsersTable(data);
        document.getElementById("pagination").innerHTML="";
      },
      error: function (request, status, error)
     {
      alert("error : "+error);
     }
  });
}

//takes username, email and role
function postUser(username,email,phone,role,status,id)
{
   if (id=="")
   {
     var data = {username:username, email:email, phone:phone, role:role, action:"add_user"};
   }
   else
   {
     var data = {username:username, email:email, phone:phone, role:role, status:status, id:id, action:"update_user"};
   }
  
   var serverUrl='/capstone/controller/userController.php';
  $('#overlay').show(); 
   $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="add_successful")
      {
        document.getElementById("user_form").reset();
        displayMessage(" User is successfully added.","add_message_area",displayUsers);   
        $('#overlay').hide();   
      }
      else if (data.response=="update_successful")
      {
        document.getElementById("user_form").reset();
        displayMessage(" Changes are successfully saved.","add_message_area",displayUsers);   
        $('#overlay').hide(); 
      }
  	},
  	error: function (request, status, error)
  	{
      $('#overlay').hide(); 
      alert("error");
  	}
  });
}

//displays users
function displayUsers(id)
{
  var current_page = id// Page number is the id of the 'a' element
  var num_items=6;

  var data = {current_page:current_page, num_items:num_items, action:'display_users'};
  var serverUrl='/capstone/controller/userController.php';
  $('#overlay').show(); 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructUsersTable(data);
      constructPagination(data,current_page);
      getRoles();
      getStatus();
      $('#overlay').hide(); 
    },
    error: function (request, status, error)
    {
      $('#overlay').hide(); 
      //alert("user display error");
    }
  });
}

//logins the user to the system
function loginUser(username, password)
{
  var data = {username:username, password:password, action:'login'};
  var serverUrl='/capstone/controller/userController.php';
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      $.each(data,function(key,value){
        if (value=="wrong username")
         {
            printResponse("username","username_span",value);
         }
         else if(value=="wrong password")
         {
            printResponse("password","password_span",value);
         }
         else if (value=="correct credentials")
         {
            //redirects the user
            window.location.href="/capstone/";
         }
      });
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}
//checks if a user is logged in or not
function checkUserLogin()
{
  var data = {action:'checklogin'};
  var serverUrl='/capstone/controller/userController.php';

  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.status=="success")
       {
          setTimeout(function()
          {
            //write the username
            document.getElementById("header_username").innerHTML=data.username;
          }, 100);
       }
       else if (data.status=="fail")
       {
          //redirects user to the login page
          window.location.href="/capstone/view/pages/login/";
       }
    },
    error: function(request, status, error)
    {
      //alert(error);
    }
  });
}

function isLoggedIn()
{
  checkUserLogin();
  return false;
}

//logs out the user from the system
function logoutUser()
{
  var data = {action:'logout'};
  var serverUrl='/capstone/controller/userController.php';
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.status=="success")
       {
          //redirects user to the login page
          window.location.href="/capstone/view/pages/login/";
       }
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function constructUsersTable(data)
{
  var user_list="";
  var count = 0;
  var color ="label label-success";
  var itemCounter=document.getElementById("itemCounter");
  //deletes all table rows except the first one
  $("#user_list").find("tr:gt(0)").remove();
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      if (value.statusId=="1")
      {
        color ="label label-success";
      }
      else if (value.statusId=="3")
      {
        color ="label label-danger";
      }
      else if (value.statusId=="2")
      {
        color ="label label-warning";
      }
      count++;
      user_list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.username+"</td>"+
                  "<td>"+value.email+"</td>"+
                  "<td>"+value.phone+"</td>"+
                  "<td>"+value.role+"</td>"+
                  "<td>"+value.last_login+"</td>"+
                  "<td><span class=\""+color+"\">"+value.status+"</span></td>"+ 
                  "<td><div class=\"btn-group\">"+
                      "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                      "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                        "<span class=\"caret\"></span>"+
                        "<span class=\"sr-only\">Toggle Dropdown</span>"+
                      "</button>"+
                      "<ul class=\"dropdown-menu\" role=\"menu\">"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillEditUserForm(this.id);\" id=\""+value.id+"&"+value.username+"&"+value.email+"&"+value.phone+"&"+value.roleId+"&"+value.statusId+"\">"+
                            "<i class=\"glyphicon glyphicon-edit\"></i>"+
                            "Edit"+
                          "</a>"+
                        "</li>"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillDeleteUserModal(this.id);\" id=\""+value.id+"\">"+
                            "<i class=\"glyphicon glyphicon-trash\"></i>"+
                           " Delete"+
                          "</a>"+
                        "</li>"+
                      "</ul>"+
                    "</div>"+
                    "</td>"+
                  "</tr>";
  }
  else
  {
    flag=true;
  }
});
  $("#user_list").append(user_list);
}

function fillEditUserForm(id)
{
  //shows the status div on the user form
  document.getElementById("status_div").style.display = "block";

  //resets the user form 
  document.getElementById("user_form").reset();

  //splits the id
  var result = id.split("&");
  document.getElementById("user_saveBtn").value=result[0];
  document.forms["user_form"]["username"].value=result[1];
  document.forms["user_form"]["user_email"].value=result[2];
  document.forms["user_form"]["user_phone"].value=result[3];
  document.forms["user_form"]["user_role"].value=result[4];
  document.forms["user_form"]["user_status"].value=result[5];
  document.getElementById("user_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update User";
  document.getElementById("user_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#user_modal').modal('show');
}

function fillDeleteUserModal(id)
{
   document.getElementById("delete_user_btn").value=id;
  //triger the modal
  $('#user_delete_modal').modal('show');
}


function openUserForm()
{
  //hides the status form from the user form
  document.getElementById("status_div").style.display = "none";

  //display user roles 
  getRoles();

  //rests the supplier form
  document.getElementById("user_form").reset();

  //resets the supplier form save button
  document.getElementById("user_saveBtn").value="";
  
  document.getElementById("user_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add User";
  document.getElementById("user_saveBtn").innerHTML="Add User";
  //triger the modal
  $('#user_modal').modal('show'); 
}

//deletes a supplier
function deleteUser(id)
{
  var data = {id:id, action:'delete_user'};
  var serverUrl='/capstone/controller/userController.php';
  $('#overlay').show(); 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" User successfully Deleted.","delete_message_area",displayUsers);
        $('#user_delete_modal').modal('hide');
        $('#overlay').hide(); 
      }
    },
    error: function (request, status, error)
    {
      $('#overlay').hide(); 
      alert("error paaa : "+error);
    }
  });
}


//*************************************************************************************************************
//                                                 SUPPLIER
//**************************************************************************************************************

//searches suppliers and displays them 
function searchSupplier(name)
{
  var data = {name:name, action:"search_supplier"};
  var serverUrl='/capstone/controller/supplierController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructSuppliersTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

function postSupplier(name,phone,email,address,id)
{
  if (id=="")
  {
     var data = {name:name, phone:phone, email:email, address:address, action:"add_supplier"};
  }
  else
  {
     var data = {name:name, phone:phone, email:email, address:address, id:id, action:"update_supplier"};
  }
 
  var serverUrl='/capstone/controller/supplierController.php';
    $('#overlay').show(); 
  	$.ajax({ // jQuery Ajax
	    type: 'POST',
	    url: serverUrl, // URL to the PHP file which will insert new value in the database
	    data: data, // We send the data string
	    dataType: 'json', // Json format
	    success: function(data)
	    {
	       if (data.response=="add_successful") 
         {
           document.getElementById("supplier_form").reset();
           displayMessage(" Supplier is successfully added.","add_message_area",displaySuppliers);
           $('#overlay').hide();        
         }
         else if (data.response=="update_successful")
         {
           displayMessage(" Chnanges are successfully saved.","add_message_area",displaySuppliers);
           $('#overlay').hide(); 
         }
	  	},
	  	error: function (request, status, error)
	  	{
	    	 $('#overlay').hide(); 
	  	}
  	});
}

//function
function displayMessage(message,dispayAreaId,callBackFunction)
{
  var displayArea = document.getElementById(dispayAreaId);
  displayArea.innerHTML="<i class=\"glyphicon glyphicon-ok\"></i>"+message+"<span style=\"float:right;\">x</span>";
  displayArea.style.display ="block";
  if (callBackFunction!="")
  {
     callBackFunction(1);
  }
  $("#"+dispayAreaId).fadeOut(6000);     
}

//function tha displays suppliers
function displaySuppliers(id)
{
  var current_page = id// Page number is the id of the 'a' element
  var num_items=6;

  var data = {current_page:current_page, num_items:num_items, action:'display_suppliers'};
  var serverUrl='/capstone/controller/supplierController.php';
  $('#overlay').show(); 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructSuppliersTable(data);
      constructPagination(data,current_page);
      $('#overlay').hide(); 
    },
    error: function (request, status, error)
    {
      $('#overlay').hide(); 
      //alert(" display supplier error : "+error);
    }
  });
}


//constructs pagination for the supplier table
function constructPagination(data,current_page)
{
  var pagination = ''; // Init pagination

  //getting the numpage
  var numPage = data[0];
  numPage= numPage.num_page;

  // Pagination system
  if (current_page == 1)
  {
    pagination += '<div class="cell_disabled"><span>First</span></div><div class="cell_disabled"><span>Previous</span></div>';
  }
  else
  {
    pagination += '<div class="cell"><a href="#" id="1">First</a></div><div class="cell"><a href="#" id="' + (current_page - 1) + '">Previous</span></a></div>';
  }
 
  for (var i=parseInt(current_page)-3; i<=parseInt(current_page)+3; i++) 
  {
    if (i >= 1 && i <= numPage) 
    {
      pagination += '<div';
      if (i == current_page) pagination += ' class="cell_active"><span>' + i + '</span>';
      else pagination += ' class="cell"><a href="#" id="' + i + '">' + i + '</a>';
      pagination += '</div>';
    }
  }
  if (current_page == numPage)
  {
    pagination += '<div class="cell_disabled"><span>Next</span></div><div class="cell_disabled"><span>Last</span></div>';
  }
  else
  {
    pagination += '<div class="cell"><a href="#" id="' + (parseInt(current_page) + 1) + '">Next</a></div><div class="cell"><a href="#" id="' +numPage+ '">Last</span></a></div>';
  }
  $('#pagination').html(pagination); // We update the pagination DIV
}

//construct suppliers table
function constructSuppliersTable(data)
{
  var supplier_list="";
  var count = 0;
  //deletes all table rows except the first one
  $("#supplier_list").find("tr:gt(0)").remove();
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      count++;
      supplier_list+="<tr>"+
      "<td>"+count+"</td>"+
      "<td>"+value.name+"</td>"+
      "<td>"+value.phone+"</td>"+
      "<td>"+value.email+"</td>"+
      "<td>"+value.address+"</td>"+
      "<td><div class=\"btn-group\">"+
                      "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                      "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                        "<span class=\"caret\"></span>"+
                        "<span class=\"sr-only\">Toggle Dropdown</span>"+
                      "</button>"+
                      "<ul class=\"dropdown-menu\" role=\"menu\">"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillEditSupplierForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.phone+"&"+value.email+"&"+value.address+"\">"+
                            "<i class=\"glyphicon glyphicon-edit\"></i>"+
                            "Edit"+
                          "</a>"+
                        "</li>"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillDeleteSupplierModal(this.id);\" id=\""+value.id+"\">"+
                            "<i class=\"glyphicon glyphicon-trash\"></i>"+
                           " Delete"+
                          "</a>"+
                        "</li>"+
                      "</ul>"+
                    "</div>"+
                    "</td>"+
                   "</tr>";
  }
  else
  {
    flag=true;
  }
});
  $("#supplier_list").append(supplier_list);
}


function fillEditSupplierForm(id)
{
  //rests the supplier form
  document.getElementById("supplier_form").reset();

  //splits the id
  var result = id.split("&");
  document.getElementById("supplier_saveBtn").value=result[0];
  document.forms["supplier_form"]["supplier_name"].value=result[1];
  document.forms["supplier_form"]["supplier_phone"].value=result[2];
  document.forms["supplier_form"]["supplier_email"].value=result[3];
  document.forms["supplier_form"]["supplier_address"].value=result[4];
  document.getElementById("supplier_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Supplier";
  document.getElementById("supplier_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#supplier_modal').modal('show');
}

function fillDeleteSupplierModal(id)
{
   document.getElementById("delete_supplier_btn").value=id;
  //triger the modal
  $('#supplier_delete_modal').modal('show');
}


//resets and triggers the supplier form 
function openSupplierForm()
{
  //rests the supplier form
  document.getElementById("supplier_form").reset();

  //resets the supplier form save button
  document.getElementById("supplier_saveBtn").value="";
  
  document.getElementById("supplier_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Supplier";
  document.getElementById("supplier_saveBtn").innerHTML="Add Supplier";
  //triger the modal
  $('#supplier_modal').modal('show'); 
}

//deletes a supplier
function deleteSupplier(id)
{
  var data = {id:id, action:'delete_supplier'};
  var serverUrl='/capstone/controller/supplierController.php';
  $('#overlay').show(); 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Supplier successfully Deleted.","delete_message_area",displaySuppliers);
        $('#supplier_delete_modal').modal('hide');
        $('#overlay').hide(); 
      }
    },
    error: function (request, status, error)
    {
      $('#overlay').hide(); 
      alert("error paaa : "+error);
    }
  });
}

//********************************************************************************************************
//                                          CUSTOMERS
//********************************************************************************************************
//searches suppliers and displays them 
function searchCustomer(name)
{
  var data = {name:name, action:"search_customer"};
  var serverUrl='/capstone/controller/customerController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructCustomersTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

function postCustomer(name,phone,email,address,id)
{
  if (id=="")
  {
     var data = {name:name, phone:phone, email:email, address:address, action:"add_customer"};
  }
  else
  {
     var data = {name:name, phone:phone, email:email, address:address, id:id, action:"update_customer"};
  }
 
  var serverUrl='/capstone/controller/customerController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
         if (data.response=="add_successful") 
         {
           document.getElementById("customer_form").reset();
           displayMessage(" Customer is successfully added.","add_message_area",displayCustomers);       
         }
         else if (data.response=="update_successful")
         {
          displayMessage(" Chnanges are successfully saved.","add_message_area",displayCustomers);
         }
      },
      error: function (request, status, error)
      {
        
      }
    });
}


function displayCustomers(id)
{
  var current_page = id// Page number is the id of the 'a' element
  var num_items=6;

  var data = {current_page:current_page, num_items:num_items, action:'display_customers'};
  var serverUrl='/capstone/controller/customerController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructCustomersTable(data);
      constructPagination(data,current_page);
    },
    error: function (request, status, error)
    {
      //alert("error : "+error);
    }
  });
}

function constructCustomersTable(data)
{
  var customer_list="";
  var count = 0;
  //deletes all table rows except the first one
  $("#customer_list").find("tr:gt(0)").remove();
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      count++;
      customer_list+="<tr>"+
      "<td>"+count+"</td>"+
      "<td>"+value.name+"</td>"+
      "<td>"+value.phone+"</td>"+
      "<td>"+value.email+"</td>"+
      "<td>"+value.address+"</td>"+
      "<td><div class=\"btn-group\">"+
                      "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                      "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                        "<span class=\"caret\"></span>"+
                        "<span class=\"sr-only\">Toggle Dropdown</span>"+
                      "</button>"+
                      "<ul class=\"dropdown-menu\" role=\"menu\">"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillEditCustomerForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.phone+"&"+value.email+"&"+value.address+"\">"+
                            "<i class=\"glyphicon glyphicon-edit\"></i>"+
                            "Edit"+
                          "</a>"+
                        "</li>"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillDeleteCustomerModal(this.id);\" id=\""+value.id+"\">"+
                            "<i class=\"glyphicon glyphicon-trash\"></i>"+
                           " Delete"+
                          "</a>"+
                        "</li>"+
                      "</ul>"+
                    "</div>"+
                    "</td>"+
                   "</tr>";
  }
  else
  {
    flag=true;
  }
});
  $("#customer_list").append(customer_list);
}


function fillEditCustomerForm(id)
{
  //rests the supplier form
  document.getElementById("customer_form").reset();

  //splits the id
  var result = id.split("&");
  document.getElementById("customer_saveBtn").value=result[0];
  document.forms["customer_form"]["customer_name"].value=result[1];
  document.forms["customer_form"]["customer_phone"].value=result[2];
  document.forms["customer_form"]["customer_email"].value=result[3];
  document.forms["customer_form"]["customer_address"].value=result[4];
  document.getElementById("customer_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Customer";
  document.getElementById("customer_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#customer_modal').modal('show');
}

function fillDeleteCustomerModal(id)
{
   document.getElementById("delete_customer_btn").value=id;
  //triger the modal
  $('#customer_delete_modal').modal('show');
}


//resets and triggers the supplier form 
function openCustomerForm()
{
  //rests the supplier form
  document.getElementById("customer_form").reset();

  //resets the supplier form save button
  document.getElementById("customer_saveBtn").value="";
  
  document.getElementById("customer_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Customer";
  document.getElementById("customer_saveBtn").innerHTML="Add Customer";
  //triger the modal
  $('#customer_modal').modal('show'); 
}

function deleteCustomer(id)
{
  var data = {id:id, action:'delete_customer'};
  var serverUrl='/capstone/controller/customerController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Customer successfully Deleted.","delete_message_area",displayCustomers);
        $('#customer_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}


//**********************************************************************************************************
//                                                PRODUCTS
//***********************************************************************************************************

function fillEditProductForm(id)
{
  
  document.getElementById("product_form").reset();
  var result = id.split("&");
  document.getElementById("product_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Product";
  document.getElementById("product_saveBtn").value=result[0];
  document.forms["product_form"]["product_name"].value=result[1];
  document.forms["product_form"]["product_category"].value=result[2];
  document.forms["product_form"]["order_point"].value=result[3];
  document.forms["product_form"]["warning"].value=result[4];
  document.getElementById("product_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#product_modal').modal('show'); 
}


function fillDeleteProductModal(id)
{
  document.getElementById("delete_product_btn").value=id;

  //triger the modal
  $('#product_delete_modal').modal('show'); 
}


function postProduct(name,category,order_point,warning_point,id)
{
    if (id=="")
    {
      var data = {name:name, category:category, order_point:order_point, warning_point:warning_point, action:"add_product"};
    }
    else
    {
      var data = {name:name, category:category, order_point:order_point, warning_point:warning_point, id:id, action:"update_product"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("product_form").reset();
           displayMessage(" Product is successfully added.","add_message_area",displayProducts);       
        }
        else if (data.response=="update_successful") 
        {
           document.getElementById("product_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayProducts);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayProducts(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_products'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructProductTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function constructProductTable(data)
{
    var product_list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#product_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          product_list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+value.categoryName+"</td>"+
                  "<td>"+value.order_point+"</td>"+
                  "<td>"+value.warning_point+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditProductForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.category+"&"+value.order_point+"&"+value.warning_point+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteProductModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#product_list").append(product_list);
}

function openProductForm()
{
  getCategory();

  document.getElementById("product_form").reset();
  document.getElementById("product_saveBtn").value="";
  document.getElementById("product_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Product";
  document.getElementById("product_saveBtn").innerHTML="Add Product";
  //triger the modal
  $('#product_modal').modal('show'); 
}

function searchProduct(name)
{
  var data = {name:name, action:"search_product"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructProductTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

//deletes a supplier
function deleteProduct(id)
{
  var data = {id:id, action:'delete_product'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Product successfully Deleted.","delete_message_area",displayProducts);
        $('#product_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}

//**********************************************************************************************************
//                                                SOURCE
//***********************************************************************************************************
//fill the edit category form
function fillEditSourceForm(id)
{
  //rests the supplier form
  document.getElementById("source_form").reset();
  //splits the id
  var result = id.split("&");
  document.getElementById("source_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Source";
  document.getElementById("source_saveBtn").value=result[0];
  document.forms["source_form"]["source_name"].value=result[1];
  document.getElementById("source_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#source_modal').modal('show'); 
}

//it fills the delecategory form
function fillDeleteSourceModal(id)
{
  document.getElementById("delete_source_btn").value=id;

  //triger the modal
  $('#source_delete_modal').modal('show'); 
}


function postSource(name,id)
{
    if (id=="")
    {
      var data = {name:name, action:"add_source"};
    }
    else
    {
      var data = {name:name, id:id, action:"update_source"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("source_form").reset();
           displayMessage(" Source is successfully added.","add_message_area",displaySource);       
        }
        else if (data.response=="update_successful") 
        {
           //document.getElementById("Source_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displaySource);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displaySource(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_sources'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructSourceTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

//constructs the category table
function constructSourceTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#source_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditSourceForm(this.id);\" id=\""+value.id+"&"+value.name+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteSourceModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#source_list").append(list);
}

//resets and triggers the supplier form 
function openSourceForm()
{
  document.getElementById("source_form").reset();
  document.getElementById("source_saveBtn").value="";
  document.getElementById("source_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Source";
  document.getElementById("source_saveBtn").innerHTML="Add Source";

  //triger the modal
  $('#source_modal').modal('show'); 
}

function searchSource(name)
{
  var data = {name:name, action:"search_source"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructSourceTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

//deletes a supplier
function deleteSource(id)
{
  var data = {id:id, action:'delete_source'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Source successfully Deleted.","delete_message_area",displaySource);
        $('#source_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}

//**********************************************************************************************************
//                                                PROCESSOR
//***********************************************************************************************************
  
function fillEditProcessorForm(id)
{
  
  document.getElementById("processor_form").reset();
  var result = id.split("&");
  document.getElementById("processor_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Processor";
  document.getElementById("processor_saveBtn").value=result[0];
  document.forms["processor_form"]["processor_name"].value=result[1];
  document.forms["processor_form"]["processor_phone"].value=result[2];
  document.forms["processor_form"]["processor_address"].value=result[3];
  document.getElementById("processor_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#processor_modal').modal('show'); 
}


function fillDeleteProcessorModal(id)
{
  document.getElementById("delete_processor_btn").value=id;

  //triger the modal
  $('#processor_delete_modal').modal('show'); 
}


function postProcessor(name,phone,address,id)
{
    if (id=="")
    {
      var data = {name:name, phone:phone, address:address, action:"add_processor"};
    }
    else
    {
      var data = {name:name, phone:phone, address:address, id:id, action:"update_processor"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("processor_form").reset();
           displayMessage(" Processor is successfully added.","add_message_area",displayProcessor);       
        }
        else if (data.response=="update_successful") 
        {
           //document.getElementById("processor_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayProcessor);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayProcessor(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_processors'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructProcessorTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function constructProcessorTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#processor_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+value.phone+"</td>"+
                  "<td>"+value.address+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditProcessorForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.phone+"&"+value.address+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteProcessorModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#processor_list").append(list);
}

function openProcessorForm()
{
  document.getElementById("processor_form").reset();
  document.getElementById("processor_saveBtn").value="";
  document.getElementById("processor_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Processor";
  document.getElementById("processor_saveBtn").innerHTML="Add Processor";

  //triger the modal
  $('#processor_modal').modal('show'); 
}

function searchProcessor(name)
{
  var data = {name:name, action:"search_processor"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructProcessorTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

//deletes a supplier
function deleteProcessor(id)
{
  var data = {id:id, action:'delete_processor'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Processor successfully Deleted.","delete_message_area",displayProcessor);
        $('#processor_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}


//**********************************************************************************************************
//                                                STORAGE
//***********************************************************************************************************
  
function fillEditStorageForm(id)
{
  document.getElementById("storage_form").reset();
  var result = id.split("&");
  document.getElementById("storage_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Storage";
  document.getElementById("storage_saveBtn").value=result[0];
  document.forms["storage_form"]["storage_name"].value=result[1];
  document.forms["storage_form"]["storage_phone"].value=result[2];
  document.forms["storage_form"]["storage_address"].value=result[3];
  document.getElementById("storage_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#storage_modal').modal('show'); 
}


function fillDeleteStorageModal(id)
{
  document.getElementById("delete_storage_btn").value=id;

  //triger the modal
  $('#storage_delete_modal').modal('show'); 
}


function postStorage(name,phone,address,id)
{
    if (id=="")
    {
      var data = {name:name, phone:phone, address:address, action:"add_storage"};
    }
    else
    {
      var data = {name:name, phone:phone, address:address, id:id, action:"update_storage"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("storage_form").reset();
           displayMessage(" Storage is successfully added.","add_message_area",displayStorage);       
        }
        else if (data.response=="update_successful") 
        {
           //document.getElementById("storage_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayStorage);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayStorage(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_storages'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructStorageTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function constructStorageTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#storage_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+value.phone+"</td>"+
                  "<td>"+value.address+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditStorageForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.phone+"&"+value.address+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteStorageModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#storage_list").append(list);
}

function openStorageForm()
{
  document.getElementById("storage_form").reset();
  document.getElementById("storage_saveBtn").value="";
  document.getElementById("storage_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Storage";
  document.getElementById("storage_saveBtn").innerHTML="Add Storage";

  //triger the modal
  $('#storage_modal').modal('show'); 
}

function searchStorage(name)
{
  var data = {name:name, action:"search_storage"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructStorageTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

function deleteStorage(id)
{
  var data = {id:id, action:'delete_storage'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Storage successfully Deleted.","delete_message_area",displayStorage);
        $('#storage_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}

//**********************************************************************************************************
//                                      MEASUREMENT UNIT
//***********************************************************************************************************
  
function fillEditMeasurementForm(id)
{
  document.getElementById("measurement_form").reset();
  var result = id.split("&");
  document.getElementById("measurement_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Measurement";
  document.getElementById("measurement_saveBtn").value=result[0];
  document.forms["measurement_form"]["measurement_name"].value=result[1];
  document.forms["measurement_form"]["measurement_symbol"].value=result[2];
  document.getElementById("measurement_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#measurement_modal').modal('show'); 
}


function fillDeleteMeasurementModal(id)
{
  document.getElementById("delete_measurement_btn").value=id;
  //triger the modal
  $('#measurement_delete_modal').modal('show'); 
}


function postMeasurement(name,symbol,id)
{
    if (id=="")
    {
      var data = {name:name, symbol:symbol, action:"add_measurement"};
    }
    else
    {
      var data = {name:name, symbol:symbol, id:id, action:"update_measurement"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("measurement_form").reset();
           displayMessage(" Measurement is successfully added.","add_message_area",displayMeasurement);       
        }
        else if (data.response=="update_successful") 
        {
           //document.getElementById("measurement_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayMeasurement);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayMeasurement(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_measurements'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructMeasurementTable(data);
        constructPagination(data,current_page);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function constructMeasurementTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#measurement_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+value.symbol+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditMeasurementForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.symbol+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteMeasurementModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });

         $("#measurement_list").append(list);
}

function openMeasurementForm()
{
  document.getElementById("measurement_form").reset();
  document.getElementById("measurement_saveBtn").value="";
  document.getElementById("measurement_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Measurement";
  document.getElementById("measurement_saveBtn").innerHTML="Add Measurement";
  //triger the modal
  $('#measurement_modal').modal('show'); 
}

function searchMeasurement(name)
{
  var data = {name:name, action:"search_measurement"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructMeasurementTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

function deleteMeasurement(id)
{
  var data = {id:id, action:'delete_measurement'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Measurement successfully Deleted.","delete_message_area",displayMeasurement);
        $('#measurement_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}
//**********************************************************************************************************
//                                       PACKAGE TYPE
//***********************************************************************************************************

function fillEditPackageForm(id)
{
  document.getElementById("package_form").reset();
  var result = id.split("&");
  document.getElementById("package_header").innerHTML="<i class=\"glyphicon glyphicon-edit\"></i> Update Package";
  document.getElementById("package_saveBtn").value=result[0];
  document.forms["package_form"]["package_name"].value=result[1];
  document.forms["package_form"]["package_measurement"].value=result[2];
  document.forms["package_form"]["package_value"].value=result[3];
  document.getElementById("package_saveBtn").innerHTML="Save Changes";

  //triger the modal
  $('#package_modal').modal('show'); 
}


function fillDeletePackageModal(id)
{
  document.getElementById("delete_package_btn").value=id;
  //triger the modal
  $('#package_delete_modal').modal('show'); 
}


function postPackage(name,measurement_unit,value,id)
{
    if (id=="")
    {
      var data = {name:name, measurement_unit:measurement_unit, value:value, action:"add_package"};
    }
    else
    {
      var data = {name:name, measurement_unit:measurement_unit, value:value, id:id, action:"update_package"};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           document.getElementById("package_form").reset();
           displayMessage(" Package is successfully added.","add_message_area",displayPackage);       
        }
        else if (data.response=="update_successful") 
        {
           //document.getElementById("package_form").reset();
           displayMessage(" The Changes are successfully Saved.","add_message_area",displayPackage);   
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function displayPackage(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_packages'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructPackageTable(data);
        constructPagination(data,current_page);

        getmeasurement();
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function constructPackageTable(data)
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#package_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){

        if (flag) {
          count++
          list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.name+"</td>"+
                  "<td>"+value.symbol+"</td>"+
                  "<td>"+value.value+"</td>"+
                  "<td>"+
                    "<div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditPackageForm(this.id);\" id=\""+value.id+"&"+value.name+"&"+value.measurement_unit+"&"+value.value+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeletePackageModal(this.id);\" id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                          "Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>"+
                "</tr>";
            }
            else
            {
              flag = true;
            }
         });
         $("#package_list").append(list);
}

function openPackageForm()
{
  getmeasurement();

  document.getElementById("package_form").reset();
  document.getElementById("package_saveBtn").value="";
  document.getElementById("package_header").innerHTML="<i class=\"glyphicon glyphicon-plus\"></i> Add Package";
  document.getElementById("package_saveBtn").innerHTML="Add Package";
  //triger the modal
  $('#package_modal').modal('show'); 
}

function searchPackage(name)
{
  var data = {name:name, action:"search_package"};
  var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructPackageTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
    });
}

function deletePackage(id)
{
  var data = {id:id, action:'delete_package'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Package successfully Deleted.","delete_message_area",displayPackage);
        $('#package_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}
//**********************************************************************************************************
//                                                STOCK
//***********************************************************************************************************

function addStock(product,quantity,supplier,orderDate,inventoryDate,orderNumber,storage,source,description)
{
    
    var data = {
      product:product, 
      quantity:quantity,
      supplier:supplier,
      orderDate:orderDate, 
      inventoryDate:inventoryDate,
      orderNumber:orderNumber,
      storage:storage,
      source:source,
      description:description,
      action:"add_stock"
    };

    var orderNumberObject=document.getElementById("order_number");
    var orderNumberSpan=document.getElementById("order_number_span");

    var serverUrl='/capstone/controller/stockController.php';
    $('#overlay').show();
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="add_successful") 
        {
           orderNumberObject.style.border= "";
           orderNumberSpan.innerHTML="";

           document.getElementById("stock_form").reset();
           displayMessage(" Stock is successfully added.","add_message_area","");
           $('#overlay').hide();       
        }
        else if (data.response=="orderNumberExists")
        {
          orderNumberObject.style.border= "1px solid red";
          orderNumberSpan.innerHTML="Order Number Exits! Please Try a Different One";
          $('#overlay').hide();    
        }
      },
      error: function (request, status, error)
      {
        $('#overlay').hide();    
        alert("error : "+error);
      }
    });
}

//function to display stocks
function displayStock(id)
{
    var current_page = id// Page number is the id of the 'a' element
    var num_items=6;

    var data = {current_page:current_page, num_items:num_items, action:'display_stocks'};
    var serverUrl='/capstone/controller/stockController.php';
    $('#overlay').show(); 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructStockTable(data);
        //constructPagination(data,current_page);
        $('#overlay').hide(); 
      },
      error: function (request, status, error)
      {
        $('#overlay').hide(); 
        alert("error : "+error);
      }
    });
}

function constructStockTable(data)
{
    var list="";
    var count = 0;

    //deletes all table rows except the first one
    $("#stock_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value)
    {
      if (value.productID!="")
      {
      count++
      list+="<tr onclick=\"openInventoryForProduct(this.id)\" class=\"test\" id=\""+value.productID+"&"+value.productName+"\">"+
            "<td>"+count+"</td>"+
            "<td>"+value.productName+"</td>"+
            "<td>"+value.quantity+"</td>"+
            "</tr>";
      }
    });
    $("#stock_list").append(list);
}

//a function that opens the inventory for a particular product
function openInventoryForProduct(id)
{
   var id = "?id=" +id;
   window.location.href = "/capstone/view/pages/inventoryfor.html" + id;
}

function openTransactionForProduct(id)
{
   var id = "?id=" +id;
   window.location.href = "/capstone/view/pages/transactionhistory.html" + id;
}

function openLocationTransactionHistory(id)
{
  //gets the title of the page
   var title = document.getElementById("inventoryForProductHeader").innerHTML;
   title=title.split(" ");
   var id = "?id=" +id+"&"+title[2];
   window.location.href = "/capstone/view/pages/locationhistory.html" + id;
}

//a function that displays the inventory of a product in all the storage locations
function displayLocationInventory()
{
    var id = decodeURIComponent(window.location.search);
    id = id.substring(4);
    document.getElementById("transaction_history_btn").value=id;
    id = id.split("&");
    
    var data = {id:id[0], action:'display_location_inventory'};
    var serverUrl='/capstone/controller/stockController.php';
    $('#overlay').show(); 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        var product = id[1].charAt(0).toUpperCase() + id[1].slice(1);
        document.getElementById("inventoryForProductHeader").innerHTML="Inventory For "+product;
        constructLocationInventoryTable(data);
        //constructPagination(data,current_page);
        $('#overlay').hide(); 
      },
      error: function (request, status, error)
      {
        $('#overlay').hide(); 
        alert("error : "+error);
      }
    });

}


//displays a location's transaction history
function displayLocationTranactionHistory(pageId)
{
    var id = decodeURIComponent(window.location.search);
    id = id.substring(4);
    id = id.split("&");
    document.getElementById("locationTransactionHistoryHeader").innerHTML=" Transaction History of "+id[1];
    
    var current_page = pageId;// Page number is the id of the 'a' element
    var num_items=6;

    var data = {id:id[0], current_page:current_page,num_items:num_items,action:'display_location_transaction_history'};
    var serverUrl='/capstone/controller/stockController.php';
    $('#overlay').show(); 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructLocationTransactionHistory(data);
        constructPagination(data,current_page);
        $('#overlay').hide(); 
      },
      error: function (request, status, error)
      {
        $('#overlay').hide(); 
        alert("error : "+error);
      }
    });

}

function constructLocationTransactionHistory(data) 
{
    var list="";
    var count = 0;
    var action="";
    var flag = false;

    //deletes all table rows except the first one
    $("#location_transaction_history").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value)
    { 

      if (flag)
         {
           if (value.tag=="1")
            {
              action="Received";
            }
            else
            {
              action="Moved Out";
            }
            count++
            list+="<tr>"+
                    "<td>"+count+"</td>"+
                    "<td>"+value.transaction_date+"</td>"+
                    "<td>"+value.product+"</td>"+
                    "<td>"+value.type+"</td>"+
                    "<td>"+value.quantity+"</td>"+
                    "<td>"+value.source+"</td>"+
                    "<td>"+value.destination+"</td>"+
                    //"<td>"+action+"</td>"+
                    "<td>"+value.reason+"</td>"+
                    "<td>"+value.username+"</td>"+
                  "</tr>";
      }  
      else
      {
        flag = true;
      }      
    });

    $("#location_transaction_history").append(list);
}


function constructLocationInventoryTable(data) 
{
    var list="";
    var count = 0;

    //deletes all table rows except the first one
    $("#location_inventory_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value)
    {  
      if (value.storageName!="")
       {
            count++
            list+="<tr>"+
                    "<td>"+count+"</td>"+
                    "<td>"+value.storageName+"</td>"+
                    "<td>"+value.quantity+"</td>"+
                    "<td>"+
                          "<button class=\"btn btn-primary\" id=\""+value.storageID+"&"+value.storageName+"\" onclick=\"openLocationTransactionHistory(this.id)\">Transactions in "+value.storageName+"</button>"
                    "</td>"+
                  "</tr>";  
        }      
    });
    $("#location_inventory_list").append(list);
}


function displayTransactionHistory(pageid)
{
    var id = decodeURIComponent(window.location.search);
    id = id.substring(4).split("&");

    var current_page = pageid// Page number is the id of the 'a' element
    var num_items=6;

    var data = {id:id[0], num_items:num_items, current_page:current_page,action:'display_transaction_history'};
    var serverUrl='/capstone/controller/stockController.php';
    $('#overlay').show(); 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        console.log(data);
        var product = id[1].charAt(0).toUpperCase() + id[1].slice(1);
        document.getElementById("transactionHistoryHeader").innerHTML="Transaction History For "+product;
        constructTransactionHistoryTable(data);
        constructPagination(data,current_page);
        $('#overlay').hide(); 
      },
      error: function (request, status, error)
      {
        $('#overlay').hide(); 
        alert("error : "+error);
      }
    });
}

function constructTransactionHistoryTable(data) 
{
    var list="";
    var count = 0;
    var flag = false;

    //deletes all table rows except the first one
    $("#transaction_history_list").find("tr:gt(0)").remove();
         
    $.each(data,function(key,value){
        if (flag)
         {
            count++
            list+="<tr>"+
                    "<td>"+count+"</td>"+
                    "<td>"+value.transaction_date+"</td>"+
                    "<td>"+value.type+"</td>"+
                    //"<td>"+value.order_number+"</td>"+
                    //"<td>"+value.supplier+"</td>"+
                    "<td>"+value.quantity+"</td>"+
                    "<td>"+value.source+"</td>"+
                    "<td>"+value.destination+"</td>"+
                    //"<td>"+value.order_date+"</td>"+
                    //"<td>"+value.inventory_date+"</td>"+
                    "<td>"+value.reason+"</td>"+
                    "<td>"+value.user+"</td>"+
                  "</tr>";
          }
          else
          {
            flag = true;
          }
         });
         $("#transaction_history_list").append(list);
}

function moveStockToLocation(source,product,quantity,destination,reason)
{
  var data = {source:source, product:product, quantity:quantity, destination:destination, reason:reason, action:"move_stock_to_location"};
  var serverUrl='/capstone/controller/stockController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="movement_successful") 
        {
           document.getElementById("move_stock_to_location_form").reset();
           displayMessage(" Operation is successfully executed.","message_area","");       
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

//moves stock to a processor for processing
function moveStockToProcessor(source,product,quantity,processor)
{
  var data = {source:source, product:product, quantity:quantity, processor:processor, action:"move_stock_to_processor"};
  var serverUrl='/capstone/controller/stockController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="movement_successful") 
        {
           document.getElementById("move_stock_to_processor_form").reset();
           displayMessage(" Operation is successfully executed.","message_area","");       
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function adjustStock(location,product,quantity,addDeduct,reason)
{
  var data = {location:location, product:product, quantity:quantity, addDeduct:addDeduct, reason:reason, action:"adjust_stock"};
  var serverUrl='/capstone/controller/stockController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="adjustment_successful") 
        {
           document.getElementById("adjust_stock_form").reset();
           displayMessage(" Adjustment is successfully executed.","message_area","");       
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function searchProductStock(name)
{
  var data = {name:name, action:"search_product_stock"};
  var serverUrl='/capstone/controller/stockController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructStockTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function searchLocationStock(name,id)
{
   var data = {name:name, id:id, action:"search_location_stock"};
   var serverUrl='/capstone/controller/stockController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructLocationInventoryTable(data);
      },
      error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

//**********************************************************************************************************
//                                                TO PROCESS
//***********************************************************************************************************

function addRow()
{
  var row="";
  row="<div class=\"row\">"+
                              "<div class=\"col-md-3\">"+
                                  "<div class=\"form-group\">"+
                                    "<label>Select Source Location</label>"+
                                    "<select onchange=\"getMultipleProducts(this.value)\" class=\"form-control source\" style=\"width: 100%;\" id=\"source\" name=\"source\">"+
                                    "</select>"+
                                    "<span id=\"source_span\" style=\"color:red;\"></span>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"col-md-3\">"+
                                  "<div class=\"form-group\">"+
                                    "<label>Select Product</label>"+
                                    "<input type=\"hidden\" id=\"source_id\" value=\"\">"+
                                    "<select onchange=\"getQunatity(this.value)\" class=\"form-control product_section\" style=\"width: 100%;\" id=\"product_section\" name=\"product_section\">"+
                                    "</select>"+
                                    "<span id=\"product_span\" style=\"color:red;\"></span>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"col-md-3\">"+
                                  "<div class=\"form-group\">"+
                                    "<label>Quantity</label>"+
                                    "<input type=\"text\" class=\"form-control\" id=\"quantity\" placeholder=\"Enter Quantity\" name=\"quantity\">"+
                                    "<span id=\"quantity_span\" style=\"color:red;\"></span>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"col-md-3\">"+
                                    "<div></div><br>"+
                                    "<button type=\"button\" class=\"btn btn-danger\">"+
                                      "<i class=\"glyphicon glyphicon-trash\"></i>"+
                                      "Delete"+
                                    "</button>"+
                              "</div>"+
                              "</div>" ;
  $("#rowsHolder").append(row);
  getMultipleStorageLocations("source");
}


function getMultipleStorageLocations(displayAreaId)
{
  var data = {action:'get_storage'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructMultipleSelectOptions(data,displayAreaId);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function getMultipleProducts(value)
{
  //stores the location id
  document.getElementById("source_id").value=value;

  //checks if the value is not empty
  if (value!="")
  {
    var data = {location_id:value, action:'get_product'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        constructMultipleSelectOptions(data,"product_section");
      },
      error: function (request, status, error)
      {
        alert("error : "+error);

      }
    });
  }
}

function constructMultipleSelectOptions(data,displayAreaId)
{
  var list="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      list+="<option value=\""+value.id+"\">"+value.name+"</option>";
    }
   else
   {
     flag=true;
   }
  });

  //appends the list to all sources available
  var source = document.getElementsByClassName(displayAreaId);
  var i;
  for (i = 0; i < source.length; i++)
  {
    if (source[i].value=="")
    {
      source[i].innerHTML=list;
    }
  }
}

//lists the processors
function getProcessor(displayAreaId)
{
  var data = {action:'get_processor'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructSelectOptions(data,displayAreaId);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function displayProductsInProcess(id)
{
  var current_page = id// Page number is the id of the 'a' element
  var num_items=6;

  var data = {current_page:current_page, num_items:num_items, action:'display_products_in_process'};
  var serverUrl='/capstone/controller/stockController.php';
  $('#overlay').show(); 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructProductInProcessTable(data);
      constructPagination(data,current_page);
      $('#overlay').hide(); 
    },
    error: function (request, status, error)
    {
      $('#overlay').hide(); 
      alert("error : "+error);
    }
  });
}

function constructProductInProcessTable(data)
{
  var list="";
  var count = 0;
  var status ="processing";
  var color ="label label-success";

  //deletes all table rows except the first one
  $("#inporcess_list").find("tr:gt(0)").remove();
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      if (value.status!="1")
      {
        status="finished"
        color ="label label-success";
      }
      else
      {
        status="processing"
        color ="label label-danger";
      }
      count++;
      list+="<tr>"+
      "<td>"+count+"</td>"+
      "<td>"+value.transaction_date+"</td>"+
      "<td>"+value.product+"</td>"+
      "<td>"+value.quantity+"</td>"+
      "<td>"+value.processor+"</td>"+
      "<td>"+value.location+"</td>"+
      "<td><span class=\""+color+"\">"+status+"</span></td>"+ 
      "<td><div class=\"btn-group\">"+
                      "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                      "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                        "<span class=\"caret\"></span>"+
                        "<span class=\"sr-only\">Toggle Dropdown</span>"+
                      "</button>"+
                      "<ul class=\"dropdown-menu\" role=\"menu\">"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"abortTransaction(this.id);\" id=\""+value.id+"&"+value.product+"&"+value.quantity+"&"+value.location+"\">"+
                            "<i class=\"ion ion-arrow-return-left\"></i>"+
                            "Abort"+
                          "</a>"+
                        "</li>"+
                        "<li>"+
                          "<a href=\"#\" onclick=\"fillconfirmFinishProcessModal(this.id);\" id=\""+value.id+"\">"+
                            "<i class=\" ion ion-checkmark-circled\"></i>"+
                           " Finish"+
                          "</a>"+
                        "</li>"+
                      "</ul>"+
                    "</div>"+
                    "</td>"+
                   "</tr>";
  }
  else
  {
    flag=true;
  }
});
  $("#inporcess_list").append(list);
}


function fillconfirmFinishProcessModal(id)
{
  document.getElementById("finish_process_btn").value=id;

  //triger the modal
  $('#finish_process_modal').modal('show'); 
}

function finishProcess(id)
{
  var data = {id:id, action:'finish_process'};
  var serverUrl='/capstone/controller/stockController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      if (data.response=="success") 
      {
        //displayMessage(" Process finished successfully.","delete_message_area",displayProductsInProcess);
        $('#finish_process_modal').modal('hide');
        window.location.href="/capstone/view/pages/receivestock.html";
      }
    },
    error: function (request, status, error)
    {
      alert("error paaa : "+error);
    }
  });
}
//**********************************************************************************************************
//                                                INVENTORY
//***********************************************************************************************************
function displayReceiveStockSelectOptions()
{
  var data = {action:'options'};
  var serverUrl='/capstone/controller/selectOptionsController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      var suppliers="";
      var count = 0;
      $.each(data, function(key,value){

        if (key=="suppliers") 
        {
           buildOptions(value,"suppliers");
        }
        else if(key=="sources")
        {
           buildOptions(value,"sources");
        }
        else if(key=="storages")
        {
           buildOptions(value,"storages");
        }
        else if(key=="products")
        {
           buildOptions(value,"products");
        }
        else if(key=="measurements")
        {
           buildOptions(value,"measurements");
        }
      });
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

//displays roles
function getRoles()
{
  var data = {action:'get_roles'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
     constructSelectOptions(data,"user_role");
  	},
  	error: function (request, status, error)
  	{
    	//alert("get roles error");
  	}
  });
}

function getStatus()
{
  var data = {action:'get_status'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
     constructSelectOptions(data,"user_status");
    },
    error: function (request, status, error)
    {
      //alert("status error ");
    }
  });
}

function getStorageLocation(displayAreaId)
{
  var data = {action:'get_storage'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructSelectOptions(data,displayAreaId);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function getReason(displayAreaId)
{
  var data = {action:'get_reason'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      constructSelectOptions(data,displayAreaId);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function getCategory()
{
  var data = {action:'get_category'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
     constructSelectOptions(data,"product_category");
    },
    error: function (request, status, error)
    {
      alert("error : "+error);

    }
  });
}


function getmeasurement()
{
  var data = {action:'get_measurement'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
     constructMeasurementOptions(data);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);

    }
  });
}

//getst the quantity
function getQunatity(productId)
{
  var locationId=document.getElementById("source_id").value;
  var data = {location_id:locationId, product_id:productId, action:'get_quantity'};
  var serverUrl='/capstone/controller/configurationController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    success: function(data)
    {
      document.getElementById("product_span").innerHTML= "Available: "+data[1].quantity+"kg";
      //console.log(data);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}


//construct the role options
function constructMeasurementOptions(data)
{
  var list="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      list+="<option value=\""+value.id+"\">"+value.symbol+"</option>";
    }
   else
   {
     flag=true;
   }
  });

   document.getElementById("package_measurement").innerHTML=list;
}

function constructSelectOptions(data,displayAreaId)
{
  var list="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      list+="<option value=\""+value.id+"\">"+value.name+"</option>";
    }
   else
   {
     flag=true;
   }
  });

  document.getElementById(displayAreaId).innerHTML=list;
}


function getProduct(value)
{
  //stores the location id
  document.getElementById("source_id").value=value;

  //checks if the value is not empty
  if (value!="")
  {
    var data = {location_id:value, action:'get_product'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
       constructSelectOptions(data,"product_section");
      },
      error: function (request, status, error)
      {
        alert("error : "+error);

      }
    });
  }
}

//a function that buils the list of options
function buildOptions(value,selectId)
{
  var storage ="";
  storage +="<option selected=\"selected\" value=\"\">Select...</option>";
  $.each(value,function(key2,value2){
    storage +="<option value="+value2.id+">"+value2.name+"</option>";
  });
  document.getElementById(selectId).innerHTML=storage;
}

//
function printResponse(field_id,span_id,value)
{
  document.getElementById(field_id).style.border= "1px solid red";
  document.getElementById(span_id).innerHTML=value;
}

//**************************************************************************************************************
//				                            INDIVIDUAL FORM FIELD VALIDATIONS
//**************************************************************************************************************

//fucntion that validates the description
function validateDescription(form_name,field_name,span_name)
{
  var description = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (description.value=="") 
  {
      span.innerHTML = "";
      description.style.border= "";
      return description.value; 
    }
    else
    {
      span.innerHTML = "";
      description.style.border= "";
      return description.value; 
    }
}
//validates quantity
function validateQuantity(form_name,field_name,span_name)
{
  var quantity = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (quantity.value=="") 
  {
    span.innerHTML = "*required";
    quantity.style.border= "1px solid red";
    return false; 
  }
  else
  {
    //checks if the quantity is a number
    if (!isNaN(quantity.value))
    {
        span.innerHTML = "";
        quantity.style.border= "";
        return quantity.value;
    }
    else
    {
      span.innerHTML = "*invalid quantity";
      quantity.style.border= "1px solid red";
      return false; 
    }
  }
}

function validateOrderPoints(form_name,field_name,span_name)
{
  var quantity = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (quantity.value=="") 
  {
    span.innerHTML = "*required";
    quantity.style.border= "1px solid red";
    return false; 
  }
  else
  {
    //checks if the quantity is a number
    if (!isNaN(quantity.value))
    {
        span.innerHTML = "";
        quantity.style.border= "";
        return quantity.value;
    }
    else
    {
      span.innerHTML = "*invalid quantity";
      quantity.style.border= "1px solid red";
      return false; 
    }
  }
}

//validates dates
//validates the date
function validateDate(form_name,field_name,span_name)
{
  var date = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (date.value=="") 
  {
    span.innerHTML = "*required";
    date.style.border= "1px solid red";
    return false; 
  }
  else
  {
    date.style.border= "";
    span.innerHTML = "";
    return date.value;
  }
}

//validates password
function validatePassword(form_name,field_name,span_name)
{
  var password = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (password.value == "") 
   {
    span.innerHTML = "*required";
    password.style.border = "1px solid red";
    return false; 
   }
   else
  {

    /*//if password is not empty do the following
    //checks the length of the password
    if (password.value.length>=6 & password.value.length<13)
    {

      //if the password meets the length, check for an Uppercase letter, symbol, nummber, 
      var pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$");
      if(pattern.test(password.value))
      {
        span.innerHTML = "";
        password.style.border = "";
        return password.value; 
      }
      else
      {
        span.innerHTML = "*invalid password";
        password.style.border = "1px solid red";
        return false; 
      }
    }
    else
    {
      span.innerHTML = "*invalid password";
      password.style.border = "1px solid red";
      return false; 
    }*/

    span.innerHTML = "";
    password.style.border = "";
    return password.value; 
  }
}
//validates a name
function validateName(form_name,field_name,span_name)
{
	var name = document.forms[form_name][field_name];
	var span = document.getElementById(span_name);

  if (name.value == "") 
  {
    span.innerHTML = "*required";
    name.style.border= "1px solid red";
    return false; 
  }
  else
  {
  	//checks if the name does not contain numbers or symbols 
  	var pattern = new RegExp("^[a-zA-Z]+$");

  	if (pattern.test(name.value)) 
  	{
  		name.style.border= "";
 		span.innerHTML = "";
 		return name.value;
  	}
  	else
  	{
  		span.innerHTML = "*must not contain numbers or symbols";
 		name.style.border = "1px solid red";
 		return false; 
  	}
  }
}

//validates an input select field
function validateSelectInputField(form_name,field_name,span_name)
{
  var selectInputField = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  if (selectInputField.value == "") 
  {
    span.innerHTML = "*please select one";
    selectInputField.style.border= "1px solid red";
    return false; 
  }
  else
  {
    selectInputField.style.border= "";
    span.innerHTML = "";
    return selectInputField.value; 
  }
}

//validates an email 
function validateEmail(form_name,field_name,span_name)
{
  var email = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);

  //email is not required
  if (email.value=="") 
  {
    email.style.border= "";
    span.innerHTML = "";
    return null; 
  }
  else
  {
    //if not empty do the folling 
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email.value)) 
    {
      email.style.border= "";
      span.innerHTML = "";
      return email.value; 
    }
    else
    {
      span.innerHTML = "*invalid email address";
      email.style.border = "1px solid red";
      return false; 
    }
  }
}

//validates a phone number
function validatePhone(form_name,field_name,span_name)
{
  var telephone = document.forms[form_name][field_name];
  var span = document.getElementById(span_name);
  if (telephone.value=="") 
  {
    span.innerHTML = "*required";
    telephone.style.border= "1px solid red";
    return false; 
  }
  else
  {

    //checking for the length of the phone number
    if(telephone.value.length<=13 && telephone.value.length >= 7)
    {

      //checks if the phone number  meets the pattern
      if(phoneVerify(telephone.value))
       {
        span.innerHTML = "";
        telephone.style.border = "";
        return telephone.value;
      }
      else
      {
        telephone.style.border = "1px solid red";
        span.innerHTML = "invalid phone number";
        return false; 
      }
    }
    else
    {
      telephone.style.border = "1px solid red";
      span.innerHTML = "invalid phone number";
      return false; 
    }
  }
}

//VERIFY PHONE NUMBER
 function phoneVerify(phone)
 {
    var pattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;

    if(phone.match(pattern))
    {
        return true;
    }
    else
    {
        return false;
    }
 }

//validates the address 
function validateAddress(form_name,field_name,span_name)
{
	var address = document.forms[form_name][field_name];
	var span = document.getElementById(span_name);

	if (address.value=="") 
 	{
	    span.innerHTML = "*required";
	    address.style.border= "1px solid red";
	    return false; 
    }
    else
    {
    	span.innerHTML = "";
	    address.style.border= "";
	    return address.value; 
    }
}


//ajax function
function ajax(url, cFunction)
{
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
     {
      if (this.readyState == 4 && this.status == 200) 
      {
        cFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function userResponse(xhttp)
{
  var response = xhttp.responseText;
  alert(response);
}



function abortTransaction(id)
{
  idData=id.split("&");

  var data = {transactionID:idData[0],product:idData[1],quantity:idData[2], location:idData[3], action:"abort"};
  var serverUrl='/capstone/controller/stockController.php';
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      success: function(data)
      {
        if (data.response=="abort_successful") 
        {
          displayMessage(" Procesing is successfully aborted.","message_area","");  
          displayProductsInProcess(1);     
        }
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}