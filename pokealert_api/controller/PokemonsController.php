<?php
/**
 * PokemonsController.php
 *
 * A controller to all pokemon
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
use model\Pokemon;

ini_set('xdebug.var_display_max_depth', -1);
ini_set('xdebug.var_display_max_children', -1);
ini_set('xdebug.var_display_max_data', -1);
Class PokemonsController extends Pokemon
{
    public function sendJson($error, $data)
    {
        echo json_encode(array("error" => $error, "data" => $data));
    }

    public function sendPokemon ($pokemonId, $user, $date, $latitude, $longitude)
    {
        $bdd = new Bdd();
        $arrayFieldAndValue = array("username" => $user, "latitude" => $latitude, "longitude" => $longitude, "date" => $date, "pokemonId" => $pokemonId);
        $sql = $bdd->insert('contribution', $arrayFieldAndValue);
        if ($sql) {
            self::sendJson(null, null);
        } else {
            self::sendJson("Error wile adding your contribution !!", null);
        }
    }

    public function findAllPokemonByName($pokemon)
    {
        $bdd = new Bdd();
        $pokemon = '%' . $pokemon . '%';
        $field = array("id", "name", "img");
        $where = "name LIKE '" . "$pokemon" . "'";
        $findAllPokemon = $bdd->select('pokemon', $field, $where);
        self::sendJson(null, $findAllPokemon);
    }

    public function findAllPokemonByLocation($latitude, $longitude, $interval)
    {
        $bdd = new Bdd();
        $interval = 'PT' . $interval . 'M';
        $distance = 0.0002;
        $maxLatitude = $latitude + $distance;
        $minLatitude = $latitude - $distance;
        $maxLongitude = $longitude + $distance;
        $minLongitude = $longitude - $distance;
        $date = new \DateTime();
        $currentTime = $date->format("Y-m-d H:i:s");
        $dateCurrentTime = new \DateTime($currentTime);
        $intervalChoosen = new \DateInterval($interval);
        $dateCurrentTime->sub($intervalChoosen);
        $intervalDate = $dateCurrentTime->format("Y-m-d H:i:s");
        $field = array("contribution.id", "contribution.username", "contribution.latitude", "contribution.longitude", "contribution.date", "pokemon.name", "pokemon.img");
        $innerJoin = array(
            array("table" => "pokemon", "on" => "contribution.pokemonId = pokemon.id")
        );
        $where = "(contribution.latitude >= $minLatitude AND contribution.longitude <= $maxLongitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude = $latitude AND contribution.longitude >= $maxLongitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude <= $minLatitude AND contribution.longitude >= $maxLongitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude >= $minLatitude AND contribution.longitude = $longitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude >= $minLatitude AND contribution.longitude = $longitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude <= $maxLatitude AND contribution.longitude >= $minLongitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude = $latitude AND contribution.longitude >= $minLongitude AND contribution.date >= '" . "$intervalDate" . "') OR (contribution.latitude <= $maxLatitude AND contribution.longitude >= $minLongitude AND contribution.date >= '" . "$intervalDate" . "')";
        $findAllPokemonInArea = $bdd->select("contribution", $field, $where, $innerJoin);
        self::sendJson(null, $findAllPokemonInArea);
    }
}