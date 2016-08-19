<?php
namespace model;
/**
* Bdd.php
*
* File to use the database
*
* PHP 7.0.8
*
* @category Model
* @package  Model
* @author   isma91 <ismaydogmus@gmail.com>
* @license  http://opensource.org/licenses/gpl-license.php GNU Public License
*/

/**
 * Class Bdd to use the database
 *
 * @category Class
 * @package  Model
 * @author   isma91 <ismaydogmus@gmail.com>
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
Class Bdd
{
    private $_bdd;

    /**
    * constructor of the Bdd Class
    */
    public function __construct ()
    {
        if (file_exists("config.php")) {
            $config = include 'config.php';
        } else {
            $config = include '../config.php';
        }
        try {
            $this->_bdd = new \PDO('mysql:host=' . $config['host'] . ';dbname=' . $config['dbname'], $config['user'], $config['password']);
        }
        catch (\PDOException $e) {
            die('Error : '.$e->getMessage());
        }
    }
    /** 
     * Fonction getEmail
     *
     * @return $_bdd return pdo
     */
    public function getBdd () 
    {
        return $this->_bdd;
    }
}