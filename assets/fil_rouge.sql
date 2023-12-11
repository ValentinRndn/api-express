-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 11 déc. 2023 à 22:20
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fil_rouge`
--

DELIMITER $$
--
-- Fonctions
--
DROP FUNCTION IF EXISTS `countCharacters`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `countCharacters` (`id_universe` INT) RETURNS INT  BEGIN
    DECLARE total_personnages INT;
    SELECT COUNT(p.nom) INTO total_personnages
    FROM univers u
    JOIN personnages p ON p.id_univers = u.id
    WHERE u.id = id_universe;
    
    RETURN total_personnages;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `url`) VALUES
(1, 'k725ru0fga.png'),
(2, '9jmps2yrral.png'),
(3, 'wbu4dna2n5h.png'),
(4, 'a2sbomj0j44.png'),
(5, 'smqc0pkz6ns.png'),
(6, 'xyo4fvga5bj.png'),
(7, 'vxoralokes.png'),
(8, '3xgz52y3zlh.png'),
(9, 'n6lpuoynsmp.png');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isHumain` tinyint(1) NOT NULL,
  `date_dernier_message` datetime NOT NULL,
  `contenu` text NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_personnage` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `isHumain`, `date_dernier_message`, `contenu`, `id_utilisateur`, `id_personnage`) VALUES
(3, 1, '2023-10-24 08:48:45', 'jzebfjzbfjkabfkjazbfjzabf', 3, 0),
(5, 1, '2023-10-24 08:48:45', 'vzehvuiazyudazygf', 5, 0),
(7, 0, '0000-00-00 00:00:00', 'abcdefg', 0, 0),
(8, 1, '0000-00-00 00:00:00', 'abcdefg', 5, 0),
(9, 1, '0000-00-00 00:00:00', 'abcdefghijlkmnopqrst', 4, 0),
(10, 1, '0000-00-00 00:00:00', 'azerty', 4, 0),
(11, 1, '0000-00-00 00:00:00', 'test postman', 4, 0),
(12, 1, '0000-00-00 00:00:00', 'mon message', 6, 0),
(13, 1, '2023-12-11 22:06:30', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(14, 1, '2023-12-11 22:07:25', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(15, 1, '2023-12-11 22:08:11', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(16, 1, '2023-12-11 22:08:19', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(17, 1, '2023-12-11 22:08:41', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(18, 0, '2023-12-11 22:08:43', 'Bonjour cher utilisateur de l\'application ! Je suis Obbbi WAn, ravi de faire ta connaissance. Comment puis-je t\'aider aujourd\'hui ?', 6, 7),
(19, 1, '2023-12-11 22:31:06', 'loremtporjjt rôçithj zepoeiurh zepiouihr pzeiu hroizeru', 6, 7),
(20, 0, '2023-12-11 22:31:09', 'Excusez-moi, mais je suis un peu confus. Pouvez-vous reformuler votre question ou votre demande, s\'il vous plaît ? Je suis ici pour vous aider dans votre aventure en tant qu\'Obbbi WAn, alors n\'hésitez pas à me poser des questions ou à discuter de ce que vous voulez !', 6, 7),
(21, 1, '2023-12-11 22:50:57', 'Comment vas-tu aujourd\'hui ?', 6, 7),
(22, 0, '2023-12-11 22:50:59', 'Dans le cadre de ce jeu de rôle, je suis Obbbi WAn, un personnage fictif, donc je n\'ai pas réellement d\'état physique ou émotionnel. Je suis ici pour interagir avec vous et vous aider dans votre aventure. Comment puis-je vous assister aujourd\'hui ?', 6, 7);

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

DROP TABLE IF EXISTS `personnages`;
CREATE TABLE IF NOT EXISTS `personnages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `id_images` int NOT NULL,
  `id_messages` int NOT NULL,
  `id_univers` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id`, `nom`, `id_images`, `id_messages`, `id_univers`) VALUES
(7, 'Obbbi WAn', 0, 0, 0),
(8, 'yoda', 1, 1, 2),
(12, 'asohka', 8, 5, 2),
(13, 'anakin', 9, 9, 1),
(14, 'r2d2', 10, 10, 1),
(15, 'r2d2', 10, 10, 1),
(16, 'bb9', 11, 11, 1),
(18, 'Minie', 3, 0, 1),
(19, 'Minie', 3, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `univers`
--

DROP TABLE IF EXISTS `univers`;
CREATE TABLE IF NOT EXISTS `univers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_utilisateurs` int NOT NULL,
  `nom` varchar(50) NOT NULL,
  `id_images` int NOT NULL,
  `nb_perso` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `univers`
--

INSERT INTO `univers` (`id`, `description`, `id_utilisateurs`, `nom`, `id_images`, `nb_perso`) VALUES
(1, 'science fiction des annees 70', 1, 'Star Wars', 1, 1),
(2, 'ogreeesse qui vit dans le marais', 1, 'Shrekkk', 2, 2),
(14, 'saga sorcier', 2, 'Harry Potter', 1, 3),
(16, '\n\n\n\nL\'univers fictif de Pokemon est substantiellem', 1, 'Pokemon', 9, 2),
(32, 'Un h Eclipse suivant une élève qui a disparu à l\'univers du fictions. L\'acronyme est upper caseLAOS et le nom is it N on intentionnelle. lower caseLaos.', 4, 'luigi', 5, 3),
(33, 'Univers fictif de[object Object] est un monde où les personnages que ont à faire des objects et oÙ la magie est cachée. L\'univers fictif dispose de territoire industriel, qui sont envahis par le débutant canin(Nouvelle easier) et les filles dont les épineslles franchise attirent des aiguilles pointues( Nouvelle easier). Ces derniers ont cryo-refrique pour se résoudreront en périphicite en guise deonceuse Spinaka.', 4, 'Le monde de narnia', 5, 3),
(34, 'L\'univers fictif de[object Object] est si Others s\'occupant seuls d\'ici, ils n\'ont rien à voir avec l\'un Mossie et The like.', 4, 'Le monde de narnia', 5, 0);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  `id_message` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `pseudo`, `mdp`, `id_message`) VALUES
(3, 'Plouet', 'Melina', 'PM', 'cba', 3),
(5, 'Javor', 'Emir', 'EJxxxxxx', 'azerty', 5),
(6, 'Javor', 'Emir', 'EJ', 'azerty', 5),
(14, 'Javor', 'Emirrr', 'EJRRR', 'abc', 8),
(15, 'swarm', '', '', '1234', 0),
(16, '', '', 'Azr', 'qwerty', 0),
(17, 'Vall', 'Vale', 'Azr', 'qwerty', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
