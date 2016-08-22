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
    /*
     * Insert
     *
     * Function to insert into SQL return true on SUCCESS or false on FAIL
     *
     * @param string $table;         the table name
     * @param array  $fieldAndValue; the array who have the field => $value
     *
     * @return boolean|PDOStatement
     */
    public function insert ($table, array $fieldAndValue)
    {
        $bdd = self::getBdd();
        $query = "INSERT INTO `$table` (";
        foreach ($fieldAndValue as $field => $value) {
            $query = $query . "`$field`, ";
        }
        $query = substr($query, 0, -2) . ") VALUES (";
        foreach ($fieldAndValue as $field => $value) {
            if (!is_int($value)) {
                $value = "'$value'";
            }
            $query = $query . "$value, ";
        }
        $query = substr($query, 0, -2) . ");";
        $sql = $bdd->prepare($query);
        return $sql->execute();
    }
    /*
     * Select
     *
     * Function to select something in the SQL, return false in FAIL or an array in SUCCESS
     *
     * @param string $table;         the table name
     * @param string $where;         the where statement
     * @param array  $innerJoin;     Array of arrays for multiple inner join
     * @param array  $filedAndValue; the array who have $field => $value
     *
     * @return boolean|Array
     */
    public function select ($table, array $field, $where = null, array $innerJoin = null)
    {
        $bdd = self::getBdd();
        $query = "SELECT ";
        foreach ($field as $item) {
            $query = $query . "$item ,";
        }
        $query = substr($query, 0, -1) . "FROM `$table`";
        if (!is_null($innerJoin)) {
            foreach ($innerJoin as $value) {
                $query = $query . " INNER JOIN " . $value['table'] . " ON " . $value['on'];
            }
        }
        if (!is_null($where)) {
            $query = $query . " WHERE $where";
        }
        $sql = $bdd->prepare($query);
        if ($sql->execute()) {
            return $sql->fetchAll(\PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }
}