<?php
/**
* Autoload.php
*
* No need to use include anymore !!
*
* PHP 7.0.8
*
* @category Controller
* @package  Controller
* @author   isma91 <ismaydogmus@gmail.com>
* @license  http://opensource.org/licenses/gpl-license.php GNU Public License
*/
function autoload($class) {
	$class = str_replace("\\", "/", $class);
    include $class . '.php';
}

spl_autoload_register('autoload');