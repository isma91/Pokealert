<?php
/**
 * Index.php
 *
 * All ajax request go here and be sended to different Controller
 *
 * PHP 7.0.8
 *
 * @category Controller
 * @package  Controller
 * @author   isma91 <ismaydogmus@gmail.com>
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 */
session_start();
require '../autoload.php';

use controller\UsersController;
use controller\PokemonsController;

$user = new UsersController();
$pokemon = new PokemonsController();

$json = json_decode(file_get_contents('php://input'), true);
if (empty($json)) {
    echo json_encode(array('error' => "Empty body !!", "data" => null));
} else {
    switch ($json["action"]) {
        case 'sendPokemon':
            $pokemon->sendPokemon($json["idPokemon"], $json["user"], $json["date"], $json["latitude"], $json["longitude"]);
            break;
        case 'findAllPokemonByName':
            $pokemon->findAllPokemonByName($json["pokemon"]);
            break;
        case 'findAllPokemonByLocation':
            $pokemon->findAllPokemonByLocation($json["latitude"], $json["longitude"], $json["interval"]);
            break;
        case 'signUp':
            $user->create($json["lastname"], $json["firstname"], $json["login"], $json["password"], $json["confirmPassword"]);
            break;
        case 'logIn':
            $user->connexion($json["login"], $json["password"]);
            break;
        case 'getAllUserMarkOnContribution':
            $user->getAllUserMarkOnContribution($json["id"], $json["token"]);
            break;
        case 'removeMark':
            $user->removeMark($json['idLogin'], $json['idContribution'], $json["tokenLogin"]);
            break;
        case 'addMark':
            $user->addMark($json['idLogin'], $json['idContribution'], $json["tokenLogin"]);
            break;
        case 'getUserProfile':
            $user->getUserProfile($json["idLogin"]);
            break;
        case 'findAllLoginByName':
            $user->findAllLoginByName($json["login"]);
            break;
        case '':
            echo json_encode(array('error' => "Not a valid action !!", "data" => null));
            break;
        case null:
            echo json_encode(array('error' => "Not a valid action !!", "data" => null));
            break;
        default:
            echo json_encode(array('error' => "Not a valid action !!", "data" => null));
            break;
    }
}