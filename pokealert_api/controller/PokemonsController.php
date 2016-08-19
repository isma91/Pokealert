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
        $sql = "INSERT INTO `contribution`(`username`, `latitude`, `longitude`, `date`, `pokemonId`) VALUES (:username, :latitude, :longitude, :date, :pokemonId)";
        $pushContribution = $bdd->getBdd()->prepare($sql);
        $pushContribution->bindParam(':username', $user);
        $pushContribution->bindParam(':latitude', $latitude);
        $pushContribution->bindParam(':longitude', $longitude);
        $pushContribution->bindParam(':date', $date);
        $pushContribution->bindParam(':pokemonId', $pokemonId);
        if ($pushContribution->execute()) {
            self::sendJson(null, null);
        } else {
            self::sendJson("Error wile adding your contribution !!", null);
        }
    }

    public function findAllPokemonByName($pokemon)
    {
        $pokemon = '%' . $pokemon . '%';
        $bdd = new Bdd();
        $sql = "SELECT `id`, `name`, `img` FROM `pokemon` WHERE `name` LIKE :pokemon";
        $findPokemon = $bdd->getBdd()->prepare($sql);
        $findPokemon->bindParam(':pokemon', $pokemon);
        $findPokemon->execute();
        $findAllPokemon = $findPokemon->fetchAll(\PDO::FETCH_ASSOC);
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
        $sql = "SELECT contribution.username, contribution.latitude, contribution.longitude, contribution.date, pokemon.name, pokemon.img FROM `contribution` INNER JOIN pokemon ON contribution.pokemonId = pokemon.id WHERE (contribution.latitude >= :minLatitude AND contribution.longitude <= :maxLongitude AND contribution.date >= :intervalDate) OR (contribution.latitude = :latitude AND contribution.longitude >= :maxLongitude AND contribution.date >= :intervalDate) OR (contribution.latitude <= :minLatitude AND contribution.longitude >= :maxLongitude AND contribution.date >= :intervalDate) OR (contribution.latitude >= :minLatitude AND contribution.longitude = :longitude AND contribution.date >= :intervalDate) OR (contribution.latitude >= :minLatitude AND contribution.longitude = :longitude AND contribution.date >= :intervalDate) OR (contribution.latitude <= :maxLatitude AND contribution.longitude >= :minLongitude AND contribution.date >= :intervalDate) OR (contribution.latitude = :latitude AND contribution.longitude >= :minLongitude AND contribution.date >= :intervalDate) OR (contribution.latitude <= :maxLatitude AND contribution.longitude >= :minLongitude AND contribution.date >= :intervalDate)";
        $findPokemonInArea = $bdd->getBdd()->prepare($sql);
        $findPokemonInArea->bindParam(":latitude", $latitude);
        $findPokemonInArea->bindParam(":maxLatitude", $maxLatitude);
        $findPokemonInArea->bindParam(":minLatitude", $minLatitude);
        $findPokemonInArea->bindParam(":longitude", $longitude);
        $findPokemonInArea->bindParam(":maxLongitude", $maxLongitude);
        $findPokemonInArea->bindParam(":minLongitude", $minLongitude);
        $findPokemonInArea->bindParam(":intervalDate", $intervalDate);
        $findPokemonInArea->execute();
        $findAllPokemonInArea = $findPokemonInArea->fetchAll(\PDO::FETCH_ASSOC);
        self::sendJson(null, $findAllPokemonInArea);
    }
}