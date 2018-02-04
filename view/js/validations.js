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
  var usernameValidation = validateName("login_form","username","username_span");
  var passwordValidation = validatePassword("login_form","password","password_span");
  if (usernameValidation==false || passwordValidation==false)
   {
    return false;
   }
   return true;
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
	var nameValidation  = validateName("supplier_form","supplier_name","supplier_name_span");
	var phoneValidation  = validatePhone("supplier_form","supplier_phone","supplier_phone_span");
	var emailValidation  = validateEmail("supplier_form","supplier_email","supplier_email_span");
	var addressValidation  = validateAddress("supplier_form","supplier_address","supplier_address_span");

	if (nameValidation==false || phoneValidation==false || emailValidation==false || addressValidation==false)
	 {
	 	return false;
	 }
	 addSupplier(nameValidation,phoneValidation,emailValidation,addressValidation);
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

//*****************************************************
//					ACTIONS
//******************************************************

//a function that adds a user
//takes username, email and role
function addUser(username,email,role)
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

    //ajax(serverUrl, userResponse);

	/*var form_data = new FormData();  

    //appending the form data
    form_data.append('username',username);
    form_data.append('email',email);
    form_data.append('role',role);
    form_data.append('action','add_user');


  $.ajax({
      url: serverUrl, 
      type: "POST",            
      data: form_data, 
      dataType: 'text',
      contentType: false,       
      cache: false,             
      processData:false,       
      success: function(data)   
      {
        alert("success: "+data);
      },
      error: function (request, status, error)
  	  {
    	alert("error : "+error);
  	  }
    });*/
}

//adds a supplier
function addSupplier(name,phone,email,address)
{
	/*//jquery ajax
    var form_data = new FormData();  

    //appending the form data
    form_data.append('name',name);
    form_data.append('phone',phone);
    form_data.append('email',email);
    form_data.append('address',address);
    form_data.append('action','add_supplier');
    var serverUrl='/capstone/controller/supplierController.php';

    //sending the data via ajax
    $.ajax({
      url: serverUrl, 
      type: "POST",            
      data: form_data, 
      dataType: 'text',
      contentType: false,       
      cache: false,             
      processData:false,        
      success: function(data)   
      {
        alert("success: "+data);
      }
    });*/

	var data = {name:name, phone:phone, email:email, address:address, action:'add_supplier'};
  	var serverUrl='/capstone/controller/supplierController.php';
 
  	$.ajax({ // jQuery Ajax
	    type: 'POST',
	    url: serverUrl, // URL to the PHP file which will insert new value in the database
	    data: data, // We send the data string
	    dataType: 'json', // Json format
	    timeout: 3000,
	    success: function(data)
	    {
	      alert("success: "+data.response);
	  	},
	  	error: function (request, status, error)
	  	{
	    	alert("error : "+error);
	  	}
  	});
}

//adds a supplier
function addCustomer(name,phone,email,address)
{
	var data = {name:name, phone:phone, email:email, address:address, action:'add_customer'};
  	var serverUrl='/capstone/controller/customerController.php';
 
  	$.ajax({ // jQuery Ajax
	    type: 'POST',
	    url: serverUrl, // URL to the PHP file which will insert new value in the database
	    data: data, // We send the data string
	    dataType: 'json', // Json format
	    timeout: 3000,
	    success: function(data)
	    {
	      alert("success: "+data.response);
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