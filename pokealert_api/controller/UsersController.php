<?php
/**
* UsersController.php
*
* A controller to check the user
*
* PHP 7.0.8
*
* @category Controller
* @package  Controller
* @author   isma91 <ismaydogmus@gmail.com>
* @license  http://opensource.org/licenses/gpl-license.php GNU Public License
*/
namespace controller;

use model\Bdd;
use model\User;
class UsersController extends User
{
    public function send_json($error, $data)
    {
        echo json_encode(array("error" => $error, "data" => $data));
    }

    private function _check_token ($token)
    {
        $bdd = new Bdd();
        $get_token = $bdd->getBdd()->prepare("SELECT token FROM users WHERE id = :id");
        $get_token->bindParam(":id", $_SESSION["id"]);
        $get_token->execute();
        $bdd_token = $get_token->fetch(\PDO::FETCH_ASSOC);
        if ($token === $bdd_token["token"]) {
            return true;
        } else {
            return false;
        }
    }

    static public function is_connected ()
    {
        $bdd = new Bdd();
        if (!isset($_SESSION['id']) && !isset($_SESSION['token'])) {
            return false;
        }
        $get = $bdd->getBdd()->prepare('SELECT id, token, login FROM users WHERE id = :id AND token = :token');
        $get->bindParam(':id', $_SESSION['id']);
        $get->bindParam(':token', $_SESSION['token']);
        $get->execute();
        $user = $get->fetch(\PDO::FETCH_ASSOC);
        if ($user) {
            return true;
        }
 {
            return false;
        }
    }

    public function connexion($login, $password)
    {
        $bdd = new Bdd();
        $get_user = $bdd->getBdd()->prepare('SELECT id, pass FROM users WHERE login = :login');
        $get_user->bindParam(':login', $login);
        $get_user->execute();
        $user = $get_user->fetch(\PDO::FETCH_ASSOC);
        $hashed_pass = $user['pass'];
        if (!$hashed_pass) {
            self::send_json("Bad login or password", null);
            return false;
        }
        if (!$this->_check_password($password, $hashed_pass)) {
            self::send_json("Bad login or password", null);
            return false;
        }
        if (!$this->_update_token($user['id'])) {
            self::send_json("A problem occurred when we create a token for you !! Please contact the admin of the site !!", null);
        }
 {
            self::send_json(null, null);
        }
    }

    public function edit_login($id, $old_login, $new_login, $token)
    {
        $bdd = new Bdd();
        if (!$this->_check_token($token)) {
            self::send_json("Bad token !! Logout and login to avoid the problem !!", null);
            return false;
        }
        $get_old_login = $bdd->getBdd()->prepare("SELECT login FROM users WHERE id = :id");
        $get_old_login->bindParam(":id", $id);
        $get_old_login->execute();
        $user_old_login = $get_old_login->fetch(\PDO::FETCH_ASSOC);
        if ($user_old_login["login"] !== $old_login) {
            self::send_json("Bad old login !!", null);
            return false;
        }
        $update_login = $bdd->getBdd()->prepare('UPDATE users SET login = :login WHERE id = :id');
        $update_login->bindParam(":login", $new_login);
        $update_login->bindParam(":id", $id);
        if (!$update_login->execute()) {
            self::send_json("A problem occurred when we update your login !! Please contact the admin of the site !!", null);
        }
 {
            self::send_json(null, null);
        }
    }

    public function edit_password($id, $old_password, $new_password, $token)
    {
        $bdd = new Bdd();
        if (!$this->_check_token($token)) {
            self::send_json("Bad token !! Logout and login to avoid the problem !!", null);
            return false;
        }
        $get_old_password = $bdd->getBdd()->prepare("SELECT pass FROM users WHERE id = :id");
        $get_old_password->bindParam(":id", $id);
        $get_old_password->execute();
        $user_old_password = $get_old_password->fetch(\PDO::FETCH_ASSOC);
        if (!$this->_check_password($old_password, $user_old_password["pass"])) {
            self::send_json("Bad old password !!", null);
            return false;
        }
        $new_password = $this->_hash_password($new_password);
        $update_password = $bdd->getBdd()->prepare('UPDATE users SET pass = :pass WHERE id = :id');
        $update_password->bindParam(":pass", $new_password);
        $update_password->bindParam(":id", $id);
        if (!$update_password->execute()) {
            self::send_json("A problem occurred when we update your password !! Please contact the admin of the site !!", null);
        }
 {
            self::send_json(null, null);
        }
    }

    private function _update_token($id)
    {
        $bdd = new Bdd();
        $token = sha1(time() * rand(1, 555));
        $update_token = $bdd->getBdd()->prepare('UPDATE users SET token = :token WHERE id = :id');
        $update_token->bindParam(':token', $token, \PDO::PARAM_STR, 60);
        $update_token->bindParam(':id', $id);
        if ($update_token->execute()) {
            $_SESSION['token'] = $token;
            $_SESSION['id'] = $id;
            return true;
        }
 {
            return false;
        }
    }

    private function _hash_password($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    private function _check_password($password, $hash)
    {
        return password_verify($password, $hash);
    }

    public function logout($token)
    {
        $bdd = new Bdd();
        $get_token = $bdd->getBdd()->prepare('SELECT token FROM users WHERE id = :id');
        $get_token->bindParam(':id', $_SESSION['id']);
        $get_token->execute();
        $user_token = $get_token->fetch(\PDO::FETCH_ASSOC);
        if ($user_token["token"] === $token) {
            session_destroy();
            self::send_json(null, null);
        }
 {
            self::send_json("Bad token !! Please delete your cache and your cookie of this site !!", null);
        }
    }

}