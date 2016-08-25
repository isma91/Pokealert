-- phpMyAdmin SQL Dump
-- version 4.6.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost
-- Généré le :  Jeu 25 Août 2016 à 16:19
-- Version du serveur :  5.7.13-0ubuntu0.16.04.2
-- Version de PHP :  7.0.8-0ubuntu0.16.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pokealert`
--
CREATE DATABASE IF NOT EXISTS `pokealert` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pokealert`;

-- --------------------------------------------------------

--
-- Structure de la table `contribution`
--

CREATE TABLE `contribution` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `date` datetime NOT NULL,
  `pokemonId` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

CREATE TABLE `pokemon` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `pokemon`
--

INSERT INTO `pokemon` (`id`, `name`, `img`) VALUES
(1, 'Bulbasaur', 'http://img.pokemondb.net/artwork/bulbasaur.jpg'),
(2, 'Ivysaur', 'http://img.pokemondb.net/artwork/ivysaur.jpg'),
(3, 'Venusaur', 'http://img.pokemondb.net/artwork/venusaur.jpg'),
(4, 'Charmander', 'http://img.pokemondb.net/artwork/charmander.jpg'),
(5, 'Charmeleon', 'http://img.pokemondb.net/artwork/charmeleon.jpg'),
(6, 'Charizard', 'http://img.pokemondb.net/artwork/charizard.jpg'),
(7, 'Squirtle', 'http://img.pokemondb.net/artwork/squirtle.jpg'),
(8, 'Wartortle', 'http://img.pokemondb.net/artwork/wartortle.jpg'),
(9, 'Blastoise', 'http://img.pokemondb.net/artwork/blastoise.jpg'),
(10, 'Caterpie', 'http://img.pokemondb.net/artwork/caterpie.jpg'),
(12, 'Butterfree', 'http://img.pokemondb.net/artwork/butterfree.jpg'),
(13, 'Weedle', 'http://img.pokemondb.net/artwork/weedle.jpg'),
(16, 'Pidgey', 'http://img.pokemondb.net/artwork/pidgey.jpg'),
(17, 'Pidgeotto', 'http://img.pokemondb.net/artwork/pidgeotto.jpg'),
(18, 'Pidgeot', 'http://img.pokemondb.net/artwork/pidgeot.jpg'),
(19, 'Rattata', 'http://img.pokemondb.net/artwork/rattata.jpg'),
(20, 'Raticate', 'http://img.pokemondb.net/artwork/raticate.jpg'),
(21, 'Spearow', 'http://img.pokemondb.net/artwork/spearow.jpg'),
(22, 'Fearow', 'http://img.pokemondb.net/artwork/fearow.jpg'),
(23, 'Ekans', 'http://img.pokemondb.net/artwork/ekans.jpg'),
(24, 'Arbok', 'http://img.pokemondb.net/artwork/arbok.jpg'),
(26, 'Raichu', 'http://img.pokemondb.net/artwork/raichu.jpg'),
(27, 'Sandshrew', 'http://img.pokemondb.net/artwork/sandshrew.jpg'),
(28, 'Sandslash', 'http://img.pokemondb.net/artwork/sandslash.jpg'),
(29, 'Nidoran', 'http://img.pokemondb.net/artwork/nidoran-m.jpg'),
(31, 'Nidoqueen', 'http://img.pokemondb.net/artwork/nidoqueen.jpg'),
(32, 'Nidoran', 'http://img.pokemondb.net/artwork/nidoran-m.jpg'),
(34, 'Nidoking', 'http://img.pokemondb.net/artwork/nidoking.jpg'),
(38, 'Ninetales', 'http://img.pokemondb.net/artwork/ninetales.jpg'),
(41, 'Zubat', 'http://img.pokemondb.net/artwork/zubat.jpg'),
(42, 'Golbat', 'http://img.pokemondb.net/artwork/golbat.jpg'),
(46, 'Paras', 'http://img.pokemondb.net/artwork/paras.jpg'),
(47, 'Parasect', 'http://img.pokemondb.net/artwork/parasect.jpg'),
(48, 'Venonat', 'http://img.pokemondb.net/artwork/venonat.jpg'),
(49, 'Venomoth', 'http://img.pokemondb.net/artwork/venomoth.jpg'),
(50, 'Diglett', 'http://img.pokemondb.net/artwork/diglett.jpg'),
(51, 'Dugtrio', 'http://img.pokemondb.net/artwork/dugtrio.jpg'),
(52, 'Meowth', 'http://img.pokemondb.net/artwork/meowth.jpg'),
(53, 'Persian', 'http://img.pokemondb.net/artwork/persian.jpg'),
(54, 'Psyduck', 'http://img.pokemondb.net/artwork/psyduck.jpg'),
(55, 'Golduck', 'http://img.pokemondb.net/artwork/golduck.jpg'),
(56, 'Mankey', 'http://img.pokemondb.net/artwork/mankey.jpg'),
(57, 'Primeape', 'http://img.pokemondb.net/artwork/primeape.jpg'),
(59, 'Arcanine', 'http://img.pokemondb.net/artwork/arcanine.jpg'),
(60, 'Poliwag', 'http://img.pokemondb.net/artwork/poliwag.jpg'),
(62, 'Poliwrath', 'http://img.pokemondb.net/artwork/poliwrath.jpg'),
(65, 'Alakazam', 'http://img.pokemondb.net/artwork/alakazam.jpg'),
(66, 'Machop', 'http://img.pokemondb.net/artwork/machop.jpg'),
(68, 'Machamp', 'http://img.pokemondb.net/artwork/machamp.jpg'),
(69, 'Bellsprout', 'http://img.pokemondb.net/artwork/bellsprout.jpg'),
(71, 'Victreebel', 'http://img.pokemondb.net/artwork/victreebel.jpg'),
(72, 'Tentacool', 'http://img.pokemondb.net/artwork/tentacool.jpg'),
(73, 'Tentacruel', 'http://img.pokemondb.net/artwork/tentacruel.jpg'),
(74, 'Geodude', 'http://img.pokemondb.net/artwork/geodude.jpg'),
(76, 'Golem', 'http://img.pokemondb.net/artwork/golem.jpg'),
(77, 'Ponyta', 'http://img.pokemondb.net/artwork/ponyta.jpg'),
(78, 'Rapidash', 'http://img.pokemondb.net/artwork/rapidash.jpg'),
(79, 'Slowpoke', 'http://img.pokemondb.net/artwork/slowpoke.jpg'),
(80, 'Slowbro', 'http://img.pokemondb.net/artwork/slowbro.jpg'),
(81, 'Magnemite', 'http://img.pokemondb.net/artwork/magnemite.jpg'),
(82, 'Magneton', 'http://img.pokemondb.net/artwork/magneton.jpg'),
(83, 'Farfetch', 'http://img.pokemondb.net/artwork/farfetch.jpg'),
(84, 'Doduo', 'http://img.pokemondb.net/artwork/doduo.jpg'),
(85, 'Dodrio', 'http://img.pokemondb.net/artwork/dodrio.jpg'),
(86, 'Seel', 'http://img.pokemondb.net/artwork/seel.jpg'),
(87, 'Dewgong', 'http://img.pokemondb.net/artwork/dewgong.jpg'),
(88, 'Grimer', 'http://img.pokemondb.net/artwork/grimer.jpg'),
(89, 'Muk', 'http://img.pokemondb.net/artwork/muk.jpg'),
(91, 'Cloyster', 'http://img.pokemondb.net/artwork/cloyster.jpg'),
(92, 'Gastly', 'http://img.pokemondb.net/artwork/gastly.jpg'),
(94, 'Gengar', 'http://img.pokemondb.net/artwork/gengar.jpg'),
(95, 'Onix', 'http://img.pokemondb.net/artwork/onix.jpg'),
(96, 'Drowzee', 'http://img.pokemondb.net/artwork/drowzee.jpg'),
(97, 'Hypno', 'http://img.pokemondb.net/artwork/hypno.jpg'),
(98, 'Krabby', 'http://img.pokemondb.net/artwork/krabby.jpg'),
(99, 'Kingler', 'http://img.pokemondb.net/artwork/kingler.jpg'),
(100, 'Voltorb', 'http://img.pokemondb.net/artwork/voltorb.jpg'),
(101, 'Electrode', 'http://img.pokemondb.net/artwork/electrode.jpg'),
(103, 'Exeggutor', 'http://img.pokemondb.net/artwork/exeggutor.jpg'),
(104, 'Cubone', 'http://img.pokemondb.net/artwork/cubone.jpg'),
(105, 'Marowak', 'http://img.pokemondb.net/artwork/marowak.jpg'),
(106, 'Hitmonlee', 'http://img.pokemondb.net/artwork/hitmonlee.jpg'),
(107, 'Hitmonchan', 'http://img.pokemondb.net/artwork/hitmonchan.jpg'),
(108, 'Lickitung', 'http://img.pokemondb.net/artwork/lickitung.jpg'),
(109, 'Koffing', 'http://img.pokemondb.net/artwork/koffing.jpg'),
(110, 'Weezing', 'http://img.pokemondb.net/artwork/weezing.jpg'),
(111, 'Rhyhorn', 'http://img.pokemondb.net/artwork/rhyhorn.jpg'),
(112, 'Rhydon', 'http://img.pokemondb.net/artwork/rhydon.jpg'),
(113, 'Chansey', 'http://img.pokemondb.net/artwork/chansey.jpg'),
(114, 'Tangela', 'http://img.pokemondb.net/artwork/tangela.jpg'),
(115, 'Kangaskhan', 'http://img.pokemondb.net/artwork/kangaskhan.jpg'),
(116, 'Horsea', 'http://img.pokemondb.net/artwork/horsea.jpg'),
(117, 'Seadra', 'http://img.pokemondb.net/artwork/seadra.jpg'),
(118, 'Goldeen', 'http://img.pokemondb.net/artwork/goldeen.jpg'),
(119, 'Seaking', 'http://img.pokemondb.net/artwork/seaking.jpg'),
(121, 'Starmie', 'http://img.pokemondb.net/artwork/starmie.jpg'),
(122, 'Mr. mime', 'http://img.pokemondb.net/artwork/mr. mime.jpg'),
(123, 'Scyther', 'http://img.pokemondb.net/artwork/scyther.jpg'),
(124, 'Jynx', 'http://img.pokemondb.net/artwork/jynx.jpg'),
(125, 'Electabuzz', 'http://img.pokemondb.net/artwork/electabuzz.jpg'),
(126, 'Magmar', 'http://img.pokemondb.net/artwork/magmar.jpg'),
(127, 'Pinsir', 'http://img.pokemondb.net/artwork/pinsir.jpg'),
(128, 'Tauros', 'http://img.pokemondb.net/artwork/tauros.jpg'),
(129, 'Magikarp', 'http://img.pokemondb.net/artwork/magikarp.jpg'),
(130, 'Gyarados', 'http://img.pokemondb.net/artwork/gyarados.jpg'),
(131, 'Lapras', 'http://img.pokemondb.net/artwork/lapras.jpg'),
(133, 'Eevee', 'http://img.pokemondb.net/artwork/eevee.jpg'),
(135, 'Jolteon', 'http://img.pokemondb.net/artwork/jolteon.jpg'),
(136, 'Flareon', 'http://img.pokemondb.net/artwork/flareon.jpg'),
(137, 'Porygon', 'http://img.pokemondb.net/artwork/porygon.jpg'),
(138, 'Omanyte', 'http://img.pokemondb.net/artwork/omanyte.jpg'),
(139, 'Omastar', 'http://img.pokemondb.net/artwork/omastar.jpg'),
(140, 'Kabuto', 'http://img.pokemondb.net/artwork/kabuto.jpg'),
(141, 'Kabutops', 'http://img.pokemondb.net/artwork/kabutops.jpg'),
(142, 'Aerodactyl', 'http://img.pokemondb.net/artwork/aerodactyl.jpg'),
(143, 'Snorlax', 'http://img.pokemondb.net/artwork/snorlax.jpg'),
(144, 'Articuno', 'http://img.pokemondb.net/artwork/articuno.jpg'),
(145, 'Zapdos', 'http://img.pokemondb.net/artwork/zapdos.jpg'),
(146, 'Moltres', 'http://img.pokemondb.net/artwork/moltres.jpg'),
(147, 'Dratini', 'http://img.pokemondb.net/artwork/dratini.jpg'),
(148, 'Dragonair', 'http://img.pokemondb.net/artwork/dragonair.jpg'),
(149, 'Dragonite', 'http://img.pokemondb.net/artwork/dragonite.jpg'),
(150, 'Mewtwo', 'http://img.pokemondb.net/artwork/mewtwo.jpg'),
(151, 'Mew', 'http://img.pokemondb.net/artwork/mew.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `lastname` text NOT NULL,
  `firstname` text NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL,
  `token` text,
  `contributionId` text,
  `markContribution` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Index pour les tables exportées
--

--
-- Index pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `contribution`
--
ALTER TABLE `contribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
