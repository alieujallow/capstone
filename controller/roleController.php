<?php
require('../model/role.php');

if (isset($_POST['action']) & !empty($_POST['action']))
{
	//sets the sql
	$sql= "SELECT * FROM role;";

	$role = new Role;

	$results = $role->getRoles($sql);

	$roleList ="<option selected=\"selected\" value=\"\" id=\"first_option\">Select...</option>";

	foreach ($results as $value)
	{
		$roleList .="<option value=\"".$value["role_id"]."\">".$value["name"]."</option>";
	}
	// We send back the total number of page and the article list
	$dataBack = array('roleList' => $roleList);
	$dataBack = json_encode($dataBack);
	echo $dataBack;
}
?>