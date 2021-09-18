-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 18 Σεπ 2021 στις 10:29:31
-- Έκδοση διακομιστή: 10.1.40-MariaDB
-- Έκδοση PHP: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `mydata`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `mytable`
--

CREATE TABLE `mytable` (
  `id` int(8) UNSIGNED NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Title` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `mytable`
--

INSERT INTO `mytable` (`id`, `Name`, `Email`, `Title`) VALUES
(1, 'Wesley Johnson', 'sociosqu@ametorci.co.uk', 'mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id'),
(2, 'Phyllis Mcmillan', 'egestas.rhoncus@egetipsumSuspendisse.ca', 'tortor at risus. Nunc ac sem ut dolor dapibus gravida.'),
(3, 'Ryder Buckner', 'convallis@tortor.net', 'turpis nec mauris blandit mattis. Cras eget nisi dictum augue'),
(4, 'Hadassah Holman', 'sagittis.felis@sapien.net', 'molestie sodales. Mauris blandit enim consequat purus. Maecenas libero est,'),
(5, 'Gabriel Vang', 'neque@loremsemper.com', 'malesuada fames ac turpis egestas. Fusce aliquet magna a neque.'),
(6, 'Jasmine Lester', 'semper.rutrum.Fusce@necorci.net', 'malesuada fames ac turpis egestas. Fusce aliquet magna a neque.'),
(7, 'Darius Albert', 'Quisque.varius.Nam@mifringilla.ca', 'Proin vel arcu eu odio tristique pharetra. Quisque ac libero'),
(8, 'Hayden Hill', 'tincidunt.dui.augue@malesuadafamesac.edu', 'dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate'),
(9, 'Hamilton Long', 'purus.mauris.a@erosProinultrices.net', 'tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel,'),
(10, 'Nigel Odonnell', 'Duis@idliberoDonec.ca', 'Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna.'),
(11, 'Deacon Bates', 'ullamcorper@vehiculaPellentesque.net', 'Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed'),
(12, 'Isabelle Rodriquez', 'placerat.orci.lacus@felis.edu', 'egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est,'),
(13, 'Madonna Horn', 'neque.vitae.semper@tempuseuligula.net', 'in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit'),
(14, 'Katelyn Parsons', 'Vestibulum@Donectincidunt.com', 'enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin'),
(15, 'Shellie Delacruz', 'lorem.lorem@inaliquet.org', 'mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In'),
(16, 'Wang Kim', 'lectus.sit@tellusid.ca', 'risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non'),
(17, 'Dexter Pennington', 'posuere.cubilia.Curae@interdum.com', 'natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
(18, 'Andrew Gayers', 'dictum.eu@Etiam.net', 'vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum dolor'),
(19, 'Dexter Davidson', 'nunc.nulla.vulputate@magna.net', 'elit sed consequat auctor, nunc nulla vulputate dui, nec tempus'),
(20, 'Shelby Hodge', 'Phasellus.vitae@elementumdui.org', 'dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent'),
(21, 'Amaya Pace', 'Etiam@magnaa.com', 'et ultrices posuere cubilia Curae; Donec tincidunt. Donec vitae erat'),
(22, 'Laith Walters', 'rutrum.non.hendrerit@at.co.uk', 'non, vestibulum nec, euismod in, dolor. Fusce feugiat. Lorem ipsum'),
(23, 'Halla Holloway', 'hendrerit@nullaDonecnon.net', 'diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget,'),
(24, 'Laith Castro', 'mauris.Suspendisse@dolorFuscefeugiat.edu', 'dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus'),
(25, 'Valentine Walter', 'in@ultriciesdignissim.edu', 'Donec porttitor tellus non magna. Nam ligula elit, pretium et,'),
(26, 'Xanthus Hays', 'non.massa.non@vestibulumnec.org', 'arcu. Vestibulum ante ipsum primis in faucibus orci luctus et'),
(27, 'Rachel Franco', 'mauris.aliquam@justoeuarcu.net', 'metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh.'),
(28, 'Roth Gutierrez', 'elit@enimEtiamimperdiet.edu', 'Sed auctor odio a purus. Duis elementum, dui quis accumsan'),
(29, 'Xerxes Cardenas', 'nulla.In.tincidunt@insodales.ca', 'dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate'),
(30, 'Adena Montoyas', 'turpis.Nulla@aliquetlobortis.edu', 'Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum'),
(31, 'Chandler Acosta', 'vitae.posuere.at@massaMauris.com', 'dapibus rutrum, justo. Praesent luctus. Curabitur egestas nunc sed libero.'),
(32, 'Camille Mcgowan', 'sed@facilisismagna.edu', 'dictum augue malesuada malesuada. Integer id magna et ipsum cursus'),
(33, 'Jakeem Mcdonald', 'bibendum.Donec.felis@sollicitudinamalesuada.ca', 'In lorem. Donec elementum, lorem ut aliquam iaculis, lacus pede'),
(34, 'Gretchen Vincent', 'Duis.volutpat@nunc.co.uk', 'augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum.'),
(35, 'Rebekah Nixona', 'Vivamus.euismod.urna@Nuncmaurissapien.ca', 'metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh.'),
(36, 'Xander Henry', 'consequat@seddictumeleifend.ca', 'odio. Phasellus at augue id ante dictum cursus. Nunc maurise'),
(37, 'Rashad Lane', 'sagittis@fringilla.net', 'facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus'),
(38, 'Kim Wiggins', 'pede@convalliserateget.co.uk', 'eu, ultrices sit amet, risus. Donec nibh enim, gravida sit'),
(39, 'Henry Hubbard', 'cursus@nectempusscelerisque.com', 'venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec'),
(40, 'Jermaine Pacheco', 'imperdiet.dictum.magna@Proinultrices.org', 'libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et,'),
(41, 'Athena Brooks', 'sociis.natoque.penatibus@nulla.net', 'elit, a feugiat tellus lorem eu metus. In lorem. Donec'),
(42, 'Duncan Berry', 'at@lacus.edu', 'dictum augue malesuada malesuada. Integer id magna et ipsum cursus'),
(43, 'Lysandra Miranda', 'Cum@egestasAliquam.co.uk', 'nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur egestas'),
(44, 'Bianca Jordan', 'luctus.et.ultrices@feugiatLorem.net', 'quis diam. Pellentesque habitant morbi tristique senectus et netus et'),
(45, 'Cairo Pittman', 'dolor.tempus@venenatisa.ca', 'Quisque libero lacus, varius et, euismod et, commodo at, libero.'),
(46, 'Nicholas Rhodes', 'gravida.mauris.ut@tacitisociosqu.ca', 'tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim'),
(47, 'Halla Mcintosh', 'dignissim@nisi.co.uk', 'senectus et netus et malesuada fames ac turpis egestas. Aliquam'),
(48, 'Caesar Larson', 'eget.ipsum@dolor.net', 'vel quam dignissim pharetra. Nam ac nulla. In tincidunt congue'),
(49, 'Kylynn Cardenas', 'sem.eget.massa@sitametconsectetuer.ca', 'iaculis nec, eleifend non, dapibus rutrum, justo. Praesent luctus. Curabitur'),
(50, 'Jordan Preston', 'lorem.ac.risus@Duisdignissim.ca', 'ipsum leo elementum sem, vitae aliquam eros turpis non enim.'),
(51, 'Perry Knapp', 'elementum@a.net', 'risus, at fringilla purus mauris a nunc. In at pede.'),
(52, 'Evangeline Terry', 'sodales@diamvel.ca', 'adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut'),
(53, 'Cynthia Mccarthy', 'mus@consequatauctornunc.com', 'laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi'),
(54, 'Winter Hahn', 'nonummy.Fusce.fermentum@egetmetus.edu', 'porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris'),
(55, 'Oleg Lewis', 'at.velit@euturpis.co.uk', 'Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio.'),
(56, 'Drake Stanton', 'Cras.pellentesque.Sed@pede.org', 'id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim'),
(57, 'Riley Snyder', 'lacus.Cras@Curabiturutodio.net', 'mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie'),
(58, 'Jillian Bullock', 'fermentum.arcu.Vestibulum@mollislectuspede.net', 'auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis'),
(59, 'Edward Chan', 'ac.risus.Morbi@placeratvelit.ca', 'amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing'),
(60, 'Cailin Carrillo', 'Maecenas.malesuada.fringilla@Donecporttitor.com', 'a felis ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam'),
(61, 'Orson Hebert', 'placerat.orci@eueleifend.ca', 'consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque, tellus'),
(62, 'Keegan Bowman', 'Mauris.blandit@quamelementumat.ca', 'risus. In mi pede, nonummy ut, molestie in, tempus eu,'),
(63, 'Madison Garner', 'adipiscing@Namporttitorscelerisque.edu', 'Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit'),
(64, 'Tamekah Forbes', 'parturient.montes.nascetur@semmagnanec.net', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames'),
(65, 'Christian Bridges', 'mi.felis.adipiscing@Duisdignissimtempor.com', 'magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem'),
(66, 'Kathleen Miles', 'ultrices.mauris.ipsum@sedliberoProin.net', 'malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas,'),
(67, 'Anne Cleveland', 'fringilla@eteros.ca', 'Fusce aliquet magna a neque. Nullam ut nisi a odio'),
(68, 'Lesley Forbes', 'nulla.Integer.vulputate@ullamcorper.com', 'magna a neque. Nullam ut nisi a odio semper cursus.'),
(69, 'Hyacinth Mcbride', 'vitae@est.net', 'ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare,'),
(70, 'Eric Navarro', 'ornare@miloremvehicula.com', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames'),
(71, 'Mara Fox', 'hendrerit.neque@nectempus.net', 'laoreet, libero et tristique pellentesque, tellus sem mollis dui, in'),
(72, 'Eliana Koch', 'non@facilisiSed.org', 'commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac,'),
(73, 'Cassady Gardner', 'Sed.pharetra.felis@adipiscingelit.com', 'at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et'),
(74, 'Cameron Dillon', 'lacus.Aliquam.rutrum@nuncullamcorper.edu', 'magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim'),
(75, 'Noel Cooke', 'ligula.Aenean.euismod@imperdiet.edu', 'enim consequat purus. Maecenas libero est, congue a, aliquet vel,'),
(76, 'Thomas Acevedo', 'imperdiet.dictum.magna@magnis.ca', 'Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede.'),
(77, 'Bianca Petersen', 'in@blanditatnisi.org', 'iaculis, lacus pede sagittis augue, eu tempor erat neque non'),
(78, 'Conan Church', 'diam.nunc@purus.org', 'bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus'),
(79, 'Jael Patterson', 'consectetuer.mauris.id@aauctornon.co.uk', 'ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit'),
(80, 'Jade Dejesus', 'Suspendisse.tristique@vestibulum.com', 'elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu'),
(81, 'Oren Frederick', 'tincidunt.aliquam@ataugue.co.uk', 'sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut'),
(82, 'Tamara Guthrie', 'Pellentesque.tincidunt@vestibulumMauris.co.uk', 'egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie'),
(83, 'Justin Aguirre', 'lectus.a@necorci.ca', 'ut dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare,'),
(84, 'Maisie Herring', 'tempus@iaculis.edu', 'Nunc ullamcorper, velit in aliquet lobortis, nisi nibh lacinia orci,'),
(85, 'Edan Herrera', 'Quisque.nonummy.ipsum@scelerisque.ca', 'facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus'),
(86, 'September Conway', 'lacus.Nulla@gravida.co.uk', 'lacus, varius et, euismod et, commodo at, libero. Morbi accumsan'),
(87, 'Dustin Nelson', 'vitae@pharetranibhAliquam.ca', 'quis accumsan convallis, ante lectus convallis est, vitae sodales nisi'),
(88, 'Scarlett Hoover', 'Cras.eget.nisi@Morbivehicula.ca', 'diam. Pellentesque habitant morbi tristique senectus et netus et malesuada'),
(89, 'Reece Harris', 'consequat.dolor@blandit.ca', 'tristique senectus et netus et malesuada fames ac turpis egestas.'),
(90, 'Wade Ferguson', 'quam@Proineget.com', 'justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate,'),
(91, 'Hiram Simon', 'pharetra.Quisque.ac@est.co.uk', 'est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed'),
(92, 'Cherokee Boone', 'Nullam.vitae.diam@elit.com', 'purus gravida sagittis. Duis gravida. Praesent eu nulla at seme'),
(93, 'Julian Mcintyre', 'ultrices.a.auctor@lacusCrasinterdum.co.uk', 'elit, a feugiat tellus lorem eu metus. In lorem. Donec'),
(94, 'Bertha Torres', 'elit.pharetra.ut@necenim.edu', 'In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas.'),
(95, 'Jessica Tyson', 'Fusce@Maurisblandit.org', 'sem. Pellentesque ut ipsum ac mi eleifend egestas. Sed pharetra,'),
(96, 'MacKensie Barlow', 'Sed.id@etpede.edu', 'sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices'),
(97, 'Kylee Tanner', 'tempus.mauris@egetodioAliquam.ca', 'erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla.'),
(98, 'Shaine Castillo', 'mi@Phasellusinfelis.net', 'egestas a, scelerisque sed, sapien. Nunc pulvinar arcu et pede.'),
(99, 'Lane George', 'mollis@penatibuset.co.uk', 'urna justo faucibus lectus, a sollicitudin orci sem eget massa.'),
(100, 'Alvin Hales', 'Fusce.mollis@sociis.net', 'Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sede');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`user`, `password`) VALUES
('admin', 'admin'),
('demo', 'demo');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `mytable`
--
ALTER TABLE `mytable`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `Name_2` (`Name`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `mytable`
--
ALTER TABLE `mytable`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
