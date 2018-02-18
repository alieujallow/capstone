//we have to do this when the page is loaded
$('document').ready(function()
{
  $("#pagination a").trigger('click'); // When page is loaded we trigger a click

  //implements the live search here
  $("#search_name").keyup(function(){
    var name = document.getElementById("search_name").value;
    if (name=="")
    {
      displaySuppliers(1);
      displayCategory(1);
      displayUsers(1);
      displayCustomers(1);
      displayProducts(1);
      displaySource(1);
    }
    else
    {
      //validate the name before calling search function
      searchSupplier(name);
      searchCategory(name);
      searchUser(name);
      searchCustomer(name);
      searchProduct(name);
      searchSource(name);
    }
  });
});

//do the the following when a pagination button is clicked 
$('#pagination').on('click', 'a', function(e) { // When click on a 'a' element of the pagination div
  var page = this.id; // Page number is the id of the 'a' element
  displaySuppliers(page);
  displayCategory(page);
  displayUsers(page);
  displayCustomers(page);
  displayProducts(page);
  displaySource(page);
  return false;
});


//*****************************************************************************************************
//				                                FORM VALIDATIONS
//*****************************************************************************************************

//validate add product form
function validateAddProductForm()
{
  var supplier = validateSelectInputField("add_product_form","supplier","supplier_span");
  var source= validateSelectInputField("add_product_form","source","source_span");
  var category = validateSelectInputField("add_product_form","category","category_span");
  var storage = validateSelectInputField("add_product_form","storage","storage_span");
  var inventoryDate = validateDate("add_product_form","inventory_date","inventory_date_span");
  var orderDate = validateDate("add_product_form","order_date","order_date_span");
  var quantity = validateQuantity("add_product_form","quantity","quantity_span");
  var name = validateName("add_product_form","name","name_span");

  if (supplier==false || source==false || category==false|| storage==false || inventoryDate==false 
    || orderDate==false || quantity==false || name==false)
  {
    return false;
  }
  return true;
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
      timeout: 3000,
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
      timeout: 3000,
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
      timeout: 3000,
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
    timeout: 3000,
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
      timeout: 3000,
      success: function(data)
      {
        constructUsersTable(data);
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
   $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      if (data.response=="add_successful")
      {
        document.getElementById("user_form").reset();
        displayMessage(" User is successfully added.","add_message_area",displayUsers);     
      }
      else if (data.response=="update_successful")
      {
        document.getElementById("user_form").reset();
        displayMessage(" Changes are successfully saved.","add_message_area",displayUsers);   
      }
  	},
  	error: function (request, status, error)
  	{
    	console.log(error);
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
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      constructUsersTable(data);
      constructPagination(data,current_page);
      getRoles();
      getStatus();

    },
    error: function (request, status, error)
    {
      alert("error : "+error);
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
    timeout: 3000,
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
/*function checkUserLogin()
{
  var data = {action:'checklogin'};
  var serverUrl='/capstone/controller/userController.php';
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
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
          window.location.href="/capstone/view/pages/login/login.html";
       }
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}*/

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
    timeout: 3000,
    success: function(data)
    {
      if (data.status=="success")
       {
          //redirects user to the login page
          window.location.href="/capstone/view/pages/login/login.html";
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
  //deletes all table rows except the first one
  $("#user_list").find("tr:gt(0)").remove();
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      count++;
      user_list+="<tr>"+
                  "<td>"+count+"</td>"+
                  "<td>"+value.username+"</td>"+
                  "<td>"+value.email+"</td>"+
                  "<td>"+value.phone+"</td>"+
                  "<td>"+value.role+"</td>"+
                  "<td>"+value.last_login+"</td>"+
                  "<td>"+value.status+"</td>"+
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
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" User successfully Deleted.","delete_message_area",displayUsers);
        $('#user_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
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
      timeout: 3000,
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
 
  	$.ajax({ // jQuery Ajax
	    type: 'POST',
	    url: serverUrl, // URL to the PHP file which will insert new value in the database
	    data: data, // We send the data string
	    dataType: 'json', // Json format
	    timeout: 3000,
	    success: function(data)
	    {
	       if (data.response=="add_successful") 
         {
           document.getElementById("supplier_form").reset();
           displayMessage(" Supplier is successfully added.","add_message_area",displaySuppliers);       
         }
         else if (data.response=="update_successful")
         {
          displayMessage(" Chnanges are successfully saved.","add_message_area",displaySuppliers);
         }
	  	},
	  	error: function (request, status, error)
	  	{
	    	
	  	}
  	});
}

//function
function displayMessage(message,dispayAreaId,callBackFunction)
{
  var displayArea = document.getElementById(dispayAreaId);
  displayArea.innerHTML="<i class=\"glyphicon glyphicon-ok\"></i>"+message+"<span style=\"float:right;\">x</span>";
  displayArea.style.display ="block";
  callBackFunction(1);
  $("#"+dispayAreaId).fadeOut(6000);     
}

//function tha displays suppliers
function displaySuppliers(id)
{
  var current_page = id// Page number is the id of the 'a' element
  var num_items=6;

  var data = {current_page:current_page, num_items:num_items, action:'display_suppliers'};
  var serverUrl='/capstone/controller/supplierController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      constructSuppliersTable(data);
      constructPagination(data,current_page);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
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
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      if (data.response=="delete_successful") 
      {
        displayMessage(" Supplier successfully Deleted.","delete_message_area",displaySuppliers);
        $('#supplier_delete_modal').modal('hide'); 
      }
    },
    error: function (request, status, error)
    {
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
      timeout: 3000,
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
      timeout: 3000,
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
    timeout: 3000,
    success: function(data)
    {
      constructCustomersTable(data);
      constructPagination(data,current_page);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
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
    timeout: 3000,
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
      timeout: 3000,
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
      timeout: 3000,
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
      timeout: 3000,
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
    timeout: 3000,
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
      timeout: 3000,
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
      timeout: 3000,
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
      timeout: 3000,
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
    timeout: 3000,
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

//**********************************************************************************************************
//                                                STORAGE
//***********************************************************************************************************

//**********************************************************************************************************
//                                                INVENTORY
//***********************************************************************************************************
//displays users
function displayProductSelectOptions()
{
  var data = {action:'options'};
  var serverUrl='/capstone/controller/productController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      var suppliers="";
      var count = 0;
      $.each(data, function(key,value){

        if (key=="suppliers") 
        {
           buildOptions(value,"supplier");
        }
        else if(key=="category")
        {
          buildOptions(value,"category");
        }
        else if(key=="source")
        {
           buildOptions(value,"source");
        }
        else if(key=="storage")
        {
           buildOptions(value,"storage");
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
    timeout: 3000,
    success: function(data)
    {
     constructRoleOptions(data);
  	},
  	error: function (request, status, error)
  	{
    	alert("error : "+error);

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
    timeout: 3000,
    success: function(data)
    {
     constructStatusOptions(data);
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
    timeout: 3000,
    success: function(data)
    {
     constructCategoryOptions(data);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);

    }
  });
}






function constructCategoryOptions(data)
{
  var roleList="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      roleList+="<option value=\""+value.id+"\">"+value.name+"</option>";
    }
   else
   {
     flag=true;
   }
  });
  
   document.getElementById("product_category").innerHTML=roleList;
}



//construct the role options
function constructStatusOptions(data)
{
  var roleList="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      roleList+="<option value=\""+value.id+"\">"+value.name+"</option>";
    }
   else
   {
     flag=true;
   }
  });

   document.getElementById("user_status").innerHTML=roleList;
}

//construct the role options
function constructRoleOptions(data)
{
  var roleList="<option value=\"\" id=\"first_option\">Select...</option>";
  var flag = false;
  $.each(data, function(key,value){
    if (flag)
    {
      roleList+="<option value=\""+value.id+"\">"+value.name+"</option>";
    }
   else
   {
     flag=true;
   }
  });

   document.getElementById("user_role").innerHTML=roleList;
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
    return true; 
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