-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 27 mai 2023 à 20:32
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
-- Base de données : `novasys`
--

-- --------------------------------------------------------

--
-- Structure de la table `action_menes`
--

DROP TABLE IF EXISTS `action_menes`;
CREATE TABLE IF NOT EXISTS `action_menes` (
  `idAction` int NOT NULL AUTO_INCREMENT,
  `libelle_action` varchar(255) NOT NULL,
  `Intervention_id` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`idAction`),
  KEY `fk_action_intervention` (`Intervention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `idClt` int NOT NULL AUTO_INCREMENT,
  `nomEntreprie` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `localisation` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  `statusClientNovago` int DEFAULT NULL,
  PRIMARY KEY (`idClt`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`idClt`, `nomEntreprie`, `localisation`, `dateCreation`, `dateModification`, `statusClientNovago`) VALUES
(1, 'test', 'Il se trouve au test', '2023-04-29 13:27:40', '2023-04-29 13:27:40', 1),
(2, 'test', 'Il se trouve au test', '2023-04-29 13:28:11', '2023-04-29 13:28:11', 1),
(3, 'Mise à jour du test', 'Au test du client 2', '2023-04-29 14:01:42', '2023-04-29 14:32:34', 1),
(4, 'test', 'Il se trouve au test', '2023-05-27 09:36:40', '2023-05-27 09:36:40', 1),
(5, 'test', 'Il se trouve au test', '2023-05-27 09:42:47', '2023-05-27 20:24:24', 2);

-- --------------------------------------------------------

--
-- Structure de la table `date_interventions`
--

DROP TABLE IF EXISTS `date_interventions`;
CREATE TABLE IF NOT EXISTS `date_interventions` (
  `id_date_intervention` int NOT NULL AUTO_INCREMENT,
  `date_intervention` date NOT NULL,
  `heure_arrive` time NOT NULL,
  `heure_depart` time NOT NULL,
  `intervention_id` int NOT NULL,
  `dateCreation` int NOT NULL,
  `dateModification` int NOT NULL,
  PRIMARY KEY (`id_date_intervention`),
  KEY `fk_date_intervention` (`intervention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `interlocuteur`
--

DROP TABLE IF EXISTS `interlocuteur`;
CREATE TABLE IF NOT EXISTS `interlocuteur` (
  `idInterl` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `service` varchar(80) NOT NULL,
  `idClient` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`idInterl`),
  KEY `fk_client_id` (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `interlocuteur`
--

INSERT INTO `interlocuteur` (`idInterl`, `nom`, `prenom`, `email`, `contact`, `service`, `idClient`, `dateCreation`, `dateModification`) VALUES
(1, 'test', 'interlocuteur', 'interlocuteur@test.fr', '002250707070708', 'technique', 1, '2023-04-29 15:19:00', '2023-04-29 15:19:00'),
(2, 'Interlocuteur 2', 'C\'est son nom qui la', 'interlocuteur2@test.fr', '002250101010102', 'commercial', 3, '2023-04-29 15:42:51', '2023-04-29 15:42:51');

-- --------------------------------------------------------

--
-- Structure de la table `interventions`
--

DROP TABLE IF EXISTS `interventions`;
CREATE TABLE IF NOT EXISTS `interventions` (
  `idinterv` int NOT NULL AUTO_INCREMENT,
  `motif_intervention` varchar(150) DEFAULT NULL,
  `interlocuteur_id` int DEFAULT NULL,
  `technicien_id` int DEFAULT NULL,
  `status_intervention` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`idinterv`),
  KEY `fk_interlocution_intervention` (`interlocuteur_id`),
  KEY `fk_technicien_intervention` (`technicien_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `interventions`
--

INSERT INTO `interventions` (`idinterv`, `motif_intervention`, `interlocuteur_id`, `technicien_id`, `status_intervention`, `dateCreation`, `dateModification`) VALUES
(1, NULL, 2, 4, 1, '2023-04-29 16:40:41', '2023-04-29 16:40:41'),
(4, NULL, 2, 5, 1, '2023-04-29 16:55:11', '2023-04-29 16:55:11'),
(6, NULL, 1, 4, 1, '2023-04-29 16:56:05', '2023-04-29 16:56:05'),
(11, NULL, 1, 4, 1, '2023-04-29 17:06:51', '2023-04-29 17:06:51');

-- --------------------------------------------------------

--
-- Structure de la table `recommandations`
--

DROP TABLE IF EXISTS `recommandations`;
CREATE TABLE IF NOT EXISTS `recommandations` (
  `idRecommand` int NOT NULL AUTO_INCREMENT,
  `libelle_recomandation` varchar(255) NOT NULL,
  `Intervention_id` int NOT NULL,
  `dateCreation` timestamp NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`idRecommand`),
  KEY `fk_recommandations_intervention` (`Intervention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `status_intervention`
--

DROP TABLE IF EXISTS `status_intervention`;
CREATE TABLE IF NOT EXISTS `status_intervention` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `libelle_status` varchar(50) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `status_intervention`
--

INSERT INTO `status_intervention` (`id_status`, `libelle_status`) VALUES
(1, 'Informations du client'),
(2, 'Motif d\'intervention'),
(3, 'Enregistrement actions menées'),
(4, 'Ajout recommandations'),
(5, 'intervention réalisée'),
(7, 'Intervention annulée');

-- --------------------------------------------------------

--
-- Structure de la table `technicien`
--

DROP TABLE IF EXISTS `technicien`;
CREATE TABLE IF NOT EXISTS `technicien` (
  `idTech` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `contact` varchar(15) NOT NULL,
  `nomUser` varchar(50) NOT NULL,
  `motDePasse` text NOT NULL,
  `accesLvl` varchar(12) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` datetime NOT NULL,
  PRIMARY KEY (`idTech`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `technicien`
--

INSERT INTO `technicien` (`idTech`, `nom`, `prenom`, `email`, `contact`, `nomUser`, `motDePasse`, `accesLvl`, `dateCreation`, `dateModification`) VALUES
(4, 'test', 'C\'est le test', 'test@test.fr', '002250707070707', 'admin', '$2b$10$/4eEUv4kIpq.8knlYwPOQOtjhd7oQFlACsahicPhqarzLlNQqC2Hq', 'c-r-u-d-crud', '2023-04-23 21:06:07', '2023-04-23 21:06:07'),
(5, 'test2', 'C\'est le test n°2', 'test2@test.fr', '002250101010101', 'admin2', '$2b$10$Prwe3zM75zOAZdp76lqPq.MOB3vH9fimQLgrNtVT.QcUwgIV53rXe', 'c-r-u', '2023-04-23 21:31:27', '2023-04-23 21:31:27');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `action_menes`
--
ALTER TABLE `action_menes`
  ADD CONSTRAINT `fk_action_intervention` FOREIGN KEY (`Intervention_id`) REFERENCES `interventions` (`idinterv`);

--
-- Contraintes pour la table `date_interventions`
--
ALTER TABLE `date_interventions`
  ADD CONSTRAINT `fk_date_intervention` FOREIGN KEY (`intervention_id`) REFERENCES `interventions` (`idinterv`);

--
-- Contraintes pour la table `interlocuteur`
--
ALTER TABLE `interlocuteur`
  ADD CONSTRAINT `fk_client_id` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClt`);

--
-- Contraintes pour la table `interventions`
--
ALTER TABLE `interventions`
  ADD CONSTRAINT `fk_interlocution_intervention` FOREIGN KEY (`interlocuteur_id`) REFERENCES `interlocuteur` (`idInterl`),
  ADD CONSTRAINT `fk_technicien_intervention` FOREIGN KEY (`technicien_id`) REFERENCES `technicien` (`idTech`);

--
-- Contraintes pour la table `recommandations`
--
ALTER TABLE `recommandations`
  ADD CONSTRAINT `fk_recommandations_intervention` FOREIGN KEY (`Intervention_id`) REFERENCES `interventions` (`idinterv`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
