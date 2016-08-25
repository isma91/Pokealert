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
    public function sendJson($error, $data)
    {
        echo json_encode(array("error" => $error, "data" => $data));
    }

    private function _checkToken ($id, $token)
    {
        $bdd = new Bdd();
        $field = array("token");
        $where = "id = $id";
        $bddToken = $bdd->select("user", $field, $where)[0];
        if ($token === $bddToken["token"]) {
            return true;
        } else {
            return false;
        }
    }

    public function create($lastname, $firstname, $login, $pass, $confirmPass)
    {
        $errorCreate = "";
        $bdd = new Bdd();
        if (strlen($pass) < 5) {
            $errorCreate = $errorCreate . "Password must be at lest 5 characters !!\n";
        }
        if ($pass !== $confirmPass) {
            $errorCreate = $errorCreate . "Password are not the same !!\n";
        }
        if (empty($lastname) || empty($login) || empty($pass) || empty($confirmPass)) {
            $errorCreate = $errorCreate . "One of the filed is empty !!\n";
        }
        if ($login === "anonymous") {
            $errorCreate = $errorCreate . "You can't take this login !!\n";
        }
        if ($errorCreate === "") {
            $hashedPass = $this->_hashPassword($pass);
            if (!$this->_checkLogin($login)) {
                self::sendJson('Login already in use', null);
                return false;
            }
            $arrayFieldAndValue = array("lastname" => $lastname, "firstname" => $firstname, "login" => $login, "password" => $hashedPass);
            $sql = $bdd->insert('user', $arrayFieldAndValue);
            if ($sql) {
                self::sendJson(null, null);
            } else {
                self::sendJson('A problem occurred while adding your data in the database !! Please contact the admin of the application !!', null);
            }
        } else {
            self::sendJson($errorCreate, null);
        }
    }

    public function connexion($login, $password)
    {
        $bdd = new Bdd();
        $where = "login = '" . $login . "'";
        $field = array("id", "password");
        $user = $bdd->select("user", $field, $where)[0];
        $hashed_pass = $user['password'];
        if (!$hashed_pass || !$this->_checkPassword($password, $hashed_pass)) {
            self::sendJson("Bad login or password", null);
            return false;
        }
        if (!$this->_updateToken($user['id'])) {
            self::sendJson("Bad token !! Logout and login to avoid the problem !!", null);
        } else  {
            $where2 = "login = '" . $login . "'";
            $field2 = array("id", "login", "token");
            $user2 = $bdd->select("user", $field2, $where2)[0];
            self::sendJson(null, $user2);
        }
    }

    public function getAllUserMarkOnContribution($id, $token)
    {
        $bdd = new Bdd();
        if(!$this->_checkToken($id, $token)) {
            self::sendJson("Bad token !! Logout and login to avoid the problem !!", null);
        } else {
            $where = "id = $id";
            $field = array("contributionId", "markContribution");
            $userMarkOnContribution = $bdd->select("user", $field, $where);
            self::sendJson(null, $userMarkOnContribution);
        }
    }

    public function addMark($idLogin, $idContribution, $token)
    {
        $idLogin = (int)$idLogin;
        $idContribution = (int)$idContribution;
        $bdd = new Bdd();
        if(!$this->_checkToken($idLogin, $token)) {
            self::sendJson("Bad token !! Logout and login to avoid the problem !!", null);
        } else {
            $fieldUser = array("markContribution");
            $whereUser = "id = $idLogin";
            $markContributionUser = $bdd->select('user', $fieldUser, $whereUser)[0];
            $markContributionUser = $markContributionUser["markContribution"];
            $fieldContribution = array('score');
            $whereContribution = "id = $idContribution";
            $scoreContribution = $bdd->select("contribution", $fieldContribution, $whereContribution)[0];
            $scoreContribution = (int)$scoreContribution["score"];
            $scoreContributionPlusOne = $scoreContribution + 1;
            $fieldUserUpdate = array("markContribution" => $markContributionUser . $idContribution . ";");
            $whereUserUpdate = "id = $idLogin";
            $updateUser = $bdd->update('user', $fieldUserUpdate, $whereUserUpdate);
            $fieldContributionUpdate = array("score" => $scoreContributionPlusOne);
            $whereContributionUpdate = "id = $idContribution";
            $updateContribution = $bdd->update('contribution', $fieldContributionUpdate, $whereContributionUpdate);
            if($updateUser === true && $updateContribution === true) {
                self::sendJson(null, null);
            } else {
                self::sendJson("Error while adding mark on this contribution", null);
            }
        }
    }

    public function removeMark($idLogin, $idContribution, $token)
    {
        $idLogin = (int)$idLogin;
        $idContribution = (int)$idContribution;
        $bdd = new Bdd();
        if(!$this->_checkToken($idLogin, $token)) {
            self::sendJson("Bad token !! Logout and login to avoid the problem !!", null);
        } else {
            $fieldUser = array("markContribution");
            $whereUser = "id = $idLogin";
            $markContributionUser = $bdd->select('user', $fieldUser, $whereUser)[0];
            $markContributionUser = $markContributionUser["markContribution"];
            $fieldContribution = array('score');
            $whereContribution = "id = $idContribution";
            $scoreContribution = $bdd->select("contribution", $fieldContribution, $whereContribution)[0];
            $scoreContribution = (int)$scoreContribution["score"];
            $scoreContributionMinusOne = $scoreContribution - 1;
            $fieldUserUpdate = array("markContribution" => $markContributionUser . $idContribution . ";");
            $whereUserUpdate = "id = $idLogin";
            $updateUser = $bdd->update('user', $fieldUserUpdate, $whereUserUpdate);
            $fieldContributionUpdate = array("score" => $scoreContributionMinusOne);
            $whereContributionUpdate = "id = $idContribution";
            $updateContribution = $bdd->update('contribution', $fieldContributionUpdate, $whereContributionUpdate);
            if($updateUser === true && $updateContribution === true) {
                self::sendJson(null, null);
            } else {
                self::sendJson("Error while adding mark on this contribution", null);
            }
        }
    }

    public function getUserProfile ($id)
    {
        $bdd = new Bdd();
        $field = array("user.lastname", "user.firstname", "user.login", "user.markContribution", "contribution.date", "contribution.score", "pokemon.name");
        $where = "user.id = $id";
        $innerJoin = array(
            array("table" => "contribution", "on" => "contribution.username = user.login"),
            array("table" => "pokemon", "on" => "pokemon.id = contribution.pokemonId")
         );
        $userProfile = $bdd->select("user", $field, $where, $innerJoin);
        $arrayListMarkContribution = array();
        if(count($userProfile) !== 0) {
            $listMarkContributionUser = explode(";", $userProfile[0]["markContribution"]);
            $fieldUser = array("contribution.username", "contribution.date", "contribution.score", "pokemon.name");
            $innerJoinUser = array(
                array("table" => "pokemon", "on" => "pokemon.id = contribution.pokemonId")
            );
            foreach ($listMarkContributionUser as $idContribution) {
                $whereUser = "contribution.id = $idContribution";
                $userMarkContribution = $bdd->select('contribution', $fieldUser, $whereUser, $innerJoinUser);
                $arrayListMarkContribution[] = $userMarkContribution;
            }
        }
        if (!is_array($userProfile)) {
            self::sendJson("Error while trying to get your profile !!", null);
        } else {
            self::sendJson(null, array("userProfile" => $userProfile, "markContribution" => $arrayListMarkContribution));
        }
    }

    private function _updateToken($id)
    {
        $bdd = new Bdd();
        $token = sha1(time() * rand(1, 555));
        $field = array("token" => $token);
        $where = "id = $id";
        $updateToken = $bdd->update('user', $field, $where);
        if ($updateToken) {
            return true;
        } else {
            return false;
        }
    }

    private function _hashPassword($password)
    {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    private function _checkPassword($password, $hash)
    {
        return password_verify($password, $hash);
    }

    private function _checkLogin($login)
    {
        $bdd = new Bdd();
        $field = array("login");
        $where = "login = '" . "$login" . "'";
        $user = $bdd->select('user', $field, $where);
        if (empty($user)) {
            return true;
        } else {
            return false;
        }
    }
}