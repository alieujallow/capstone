//**************************************************
//				  FORM VALIDATIONS
//**************************************************

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
	var usernameValidation = validateName("add_user_form","username","username_span");
	var emailValidation = validateEmail("add_user_form","user_email","user_email_span");
	var roleValidation = validateSelectInputField("add_user_form","user_role","user_role_span");

	if (usernameValidation==false || emailValidation==false || roleValidation==false)
	{
		return false;
	}

	addUser(usernameValidation,emailValidation,roleValidation);
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
	var nameValidation  = validateName("customer_form","customer_name","customer_name_span");
	var phoneValidation  = validatePhone("customer_form","customer_phone","customer_phone_span");
	var emailValidation  = validateEmail("customer_form","customer_email","customer_email_span");
	var addressValidation  = validateAddress("customer_form","customer_address","customer_address_span");

	if (nameValidation==false || phoneValidation==false || emailValidation==false || addressValidation==false)
	 {
	 	return false;
	 }
   addCustomer(nameValidation,phoneValidation,emailValidation,addressValidation);
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
  if (id=="")
  {
     postCategory(name,"addCategory","");
  }
  else
  {
    postCategory(name,"updateCategory",id);
  }
  return false;
}

//*****************************************************
//					ACTIONS
//******************************************************


//*******************************************************
//                     CATEGORY
//********************************************************
//fill the edit category form
function fillEditCategoryForm(id)
{
  //splits the id
  var result = id.split(" ");

  modal_category_name = document.forms["category_form"]["category_name"];
  document.getElementById("category_header").innerHTML="Update Category";
  document.getElementById("category_saveBtn").value=result[0];
  modal_category_name.value=result[1];

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


function postCategory(name,action,id)
{
    if (action=="addCategory")
    {
      var data = {name:name, action:action};
    }
    else
    {
      var data = {name:name, id:id, action:action};
    }

    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'POST',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      timeout: 4000,
      success: function(data)
      {
        getCategory();
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

function getCategory()
{
    var data = {name:name, action:'getCategory'};
    var serverUrl='/capstone/controller/configurationController.php';
 
    $.ajax({ // jQuery Ajax
      type: 'GET',
      url: serverUrl, // URL to the PHP file which will insert new value in the database
      data: data, // We send the data string
      dataType: 'json', // Json format
      timeout: 3000,
      success: function(data)
      {
         var list="";
         var count = 0;

         //deletes all table rows except the first one
         $("#category_list").find("tr:gt(0)").remove();
         
         $.each(data,function(key,value){
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
         });
         $("#category_list").append(list);
      },
      error: function (request, status, error)
      {
        alert("error : "+error);
      }
    });
}

//*******************************************************
//                     USER
//********************************************************

//takes username, email and role
function postUser(username,email,role)
{
   var action="add_user";
   var data = {username:username, email:email, role:role, action:action};
   var serverUrl='/capstone/controller/userController.php';
 
   $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(response)
    {
      console.log(response);
      alert("success");
      console.log(response);
  	},
  	error: function (request, status, error)
  	{
    	console.log(error);
      alert("error");
  	}
  });
}

//displays users
function displayUsers()
{
  var data = {action:'display_users'};
  var serverUrl='/capstone/controller/userController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      var user_list="";
      var count = 0;

      //deletes all table rows except the first one
      $("#user_list").find("tr:gt(0)").remove();

      $.each(data, function(key,value){
        count++;
        user_list+="<tr>";
        user_list+="<td>"+count+"</td>";
        user_list+="<td>"+value.username+"</td>";
        user_list+="<td>"+value.email+"</td>";
        user_list+="<td>"+value.role+"</td>";
        user_list+="<td>"+value.last_login+"</td>";
        user_list+="<td>"+value.status+"</td>";
        user_list+="<td><div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" data-toggle=\"modal\" data-target=\"#add_user_modal\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" data-toggle=\"modal\" data-target=\"#user_deactivate_modal\">"+
                          "<i class=\"glyphicon glyphicon-off\"></i>" +
                          "Deactivate"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" data-toggle=\"modal\" data-target=\"#user_delete_modal\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                         " Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>";
        user_list+="</tr>";
      });
      $("#user_list").append(user_list);
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

//*******************************************************
//                     SUPPLIER
//********************************************************

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
           displayMessage(" Supplier is successfully added.","add_message_area");       
         }
         else if (data.response=="update_successful")
         {
          displayMessage(" Chnanges are successfully saved.","add_message_area");
         }
	  	},
	  	error: function (request, status, error)
	  	{
	    	
	  	}
  	});
}

//function
function displayMessage(message,dispayAreaId)
{
  var displayArea = document.getElementById(dispayAreaId);
  displayArea.innerHTML="<i class=\"glyphicon glyphicon-ok\"></i>"+message+"<span style=\"float:right;\">x</span>";
  displayArea.style.display ="block";
  displaySuppliers(); 
  $("#"+dispayAreaId).fadeOut(6000);     
}

//function tha displays suppliers
function displaySuppliers()
{
  $('document').ready(function()
  {
      $("#pagination a").trigger('click'); // When page is loaded we trigger a click
  });
 
  $('#pagination').on('click', 'a', function(e) {

  var current_page = this.id; // Page number is the id of the 'a' element
  var pagination = ''; // Init pagination

  var data = {current_page:current_page, num_items:6, action:'display_suppliers'};
  var serverUrl='/capstone/controller/supplierController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      var supplier_list="";
      var count = 0;

      //deletes all table rows except the first one
      $("#supplier_list").find("tr:gt(0)").remove();

      $.each(data, function(key,value){
        count++;
        supplier_list+="<tr>";
        supplier_list+="<td>"+count+"</td>";
        supplier_list+="<td>"+value.name+"</td>";
        supplier_list+="<td>"+value.phone+"</td>";
        supplier_list+="<td>"+value.email+"</td>";
        supplier_list+="<td>"+value.address+"</td>";
        supplier_list+="<td><div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditSupplierForm(this.id);\" id=\""+value.id+" "+value.name+" "+value.phone+" "+value.email+" "+value.address+"\">"+
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
                  "</td>";
        supplier_list+="</tr>";
      });
      $("#supplier_list").append(supplier_list);


      // Pagination system
      if (page == 1)
      {
        pagination += '<div class="cell_disabled"><span>First</span></div><div class="cell_disabled"><span>Previous</span></div>';
      }
      else
      {
        pagination += '<div class="cell"><a href="#" id="1">First</a></div><div class="cell"><a href="#" id="' + (page - 1) + '">Previous</span></a></div>';
      }
 
      for (var i=parseInt(page)-3; i<=parseInt(page)+3; i++) 
      {
        if (i >= 1 && i <= data.numPage) 
        {
          pagination += '<div';
          if (i == page) pagination += ' class="cell_active"><span>' + i + '</span>';
          else pagination += ' class="cell"><a href="#" id="' + i + '">' + i + '</a>';
          pagination += '</div>';
        }
      }
 
      if (page == data.numPage)
      {
        pagination += '<div class="cell_disabled"><span>Next</span></div><div class="cell_disabled"><span>Last</span></div>';
      }
      else
      {
        pagination += '<div class="cell"><a href="#" id="' + (parseInt(page) + 1) + '">Next</a></div><div class="cell"><a href="#" id="' + data.numPage + '">Last</span></a></div>';
        }
      
      $('#pagination').html(pagination); // We update the pagination DIV
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
  return false;
 });
}

function fillEditSupplierForm(id)
{
  //rests the supplier form
  document.getElementById("supplier_form").reset();

  //splits the id
  var result = id.split(" ");
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
        displayMessage(" Supplier successfully Deleted.","delete_message_area");
        $('#supplier_delete_modal').modal('hide');
      }
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}




//*******************************************************
//                     CUSTOMERS
//********************************************************
//adds a supplier
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
         if (data.response=="success") 
         {
          displayCustomers();
         }
      },
      error: function (request, status, error)
      {
        
      }
    });
}

//function tha displays suppliers
function displayCustomers()
{
  var data = {action:'display_customers'};
  var serverUrl='/capstone/controller/customerController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'GET',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      var customer_list="";
      var count = 0;

      //deletes all table rows except the first one
      $("#customer_list").find("tr:gt(0)").remove();

      $.each(data, function(key,value){
        count++;
        customer_list+="<tr>";
        customer_list+="<td>"+count+"</td>";
        customer_list+="<td>"+value.name+"</td>";
        customer_list+="<td>"+value.phone+"</td>";
        customer_list+="<td>"+value.email+"</td>";
        customer_list+="<td>"+value.address+"</td>";
        customer_list+="<td><div class=\"btn-group\">"+
                    "<button type=\"button\" class=\"btn btn-default\">Action</button>"+
                    "<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">"+
                      "<span class=\"caret\"></span>"+
                      "<span class=\"sr-only\">Toggle Dropdown</span>"+
                    "</button>"+
                    "<ul class=\"dropdown-menu\" role=\"menu\">"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillEditCustomerForm(this.id); id=\""+value.id+" "+value.name+" "+value.phone+" "+value.email+" "+value.address+"\">"+
                          "<i class=\"glyphicon glyphicon-edit\"></i>"+
                          "Edit"+
                        "</a>"+
                      "</li>"+
                      "<li>"+
                        "<a href=\"#\" onclick=\"fillDeleteCustomerModal(this.id); id=\""+value.id+"\">"+
                          "<i class=\"glyphicon glyphicon-trash\"></i>"+
                         " Delete"+
                        "</a>"+
                      "</li>"+
                    "</ul>"+
                  "</div>"+
                  "</td>";
        customer_list+="</tr>";
      });
      $("#customer_list").append(customer_list);
    },
    error: function (request, status, error)
    {
      alert("error : "+error);
    }
  });
}

function fillEditCustomerForm(id)
{
  //splits the id
  var result = id.split(" ");

  document.getElementById("customer_saveBtn").value=result[0];
  document.forms["customer_form"]["customer_name"].value=result[1];
  document.forms["customer_form"]["customer_phone"].value=result[2];
  document.forms["customer_form"]["customer_email"].value=result[3];
  document.forms["customer_form"]["customer_address"].value=result[4];
  document.getElementById("customer_header").innerHTML="Update Customer";

  //triger the modal
  $('#customer_modal').modal('show'); 
}

/*function fillDeleteSupplierModal(id)
{
  document.getElementById("delete_customer_btn").value=id;

  //triger the modal
  $('#customer_delete_modal').modal('show'); 
}*/


//*******************************************************
//                     PRODUCTS
//********************************************************

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
function displayRoles()
{
  var data = {action:'display_roles'};
  var serverUrl='/capstone/controller/roleController.php';
 
  $.ajax({ // jQuery Ajax
    type: 'POST',
    url: serverUrl, // URL to the PHP file which will insert new value in the database
    data: data, // We send the data string
    dataType: 'json', // Json format
    timeout: 3000,
    success: function(data)
    {
      document.getElementById("user_role").innerHTML=data.roleList;
  	},
  	error: function (request, status, error)
  	{
    	alert("error : "+error);

  	}
  });
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

//**************************************************
//				 INDIVIDUAL FORM FIELD VALIDATIONS
//**************************************************

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