import { MigrationInterface, QueryRunner } from 'typeorm';

export class Teams1732339964861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.teams (id,"name") VALUES
	  (1,'Argentina'),
	  (2,'Inter Miami'),
	  (3,'Paris Saint-Germain'),
	  (4,'Barcelona'),
	  (5,'Peru'),
	  (6,'Paraguay'),
	  (7,'Atlanta United'),
	  (8,'New England'),
	  (9,'Bolivia'),
	  (10,'Venezuela');
    INSERT INTO public.teams (id,"name") VALUES
	  (11,'Toronto'),
	  (12,'Columbus'),
	  (13,'Charlotte FC'),
	  (14,'New York City'),
	  (15,'Philadelphia Union'),
	  (16,'Colombia'),
	  (17,'Canada'),
	  (18,'Ecuador'),
	  (19,'Chile'),
	  (20,'Guatemala');
    INSERT INTO public.teams (id,"name") VALUES
	  (21,'St. Louis'),
	  (22,'DC United'),
	  (23,'Montreal'),
	  (24,'New York Red Bulls'),
	  (25,'Nashville SC'),
	  (26,'Kansas City'),
	  (27,'Monterrey'),
	  (28,'Colorado Rapids'),
	  (29,'Orlando City'),
	  (30,'LA Galaxy');
    INSERT INTO public.teams (id,"name") VALUES
	  (31,'Real Salt Lake'),
	  (32,'Brazil'),
	  (33,'Uruguay'),
	  (34,'FC Cincinnati'),
	  (35,'LAFC'),
	  (36,'FC Dallas'),
	  (37,'Cruz Azul'),
	  (38,'Australia'),
	  (39,'Clermont Foot'),
	  (40,'Strasbourg');
    INSERT INTO public.teams (id,"name") VALUES
	  (41,'Auxerre'),
	  (42,'Ajaccio'),
	  (43,'Lorient'),
	  (44,'Angers'),
	  (45,'Lens'),
	  (46,'Nice'),
	  (47,'Lyon'),
	  (48,'Curacao'),
	  (49,'Panama'),
	  (50,'Rennes');
    INSERT INTO public.teams (id,"name") VALUES
	  (51,'Brest'),
	  (52,'Bayern Munich'),
	  (53,'Nantes'),
	  (54,'Marseille'),
	  (55,'Lille'),
	  (56,'Toulouse'),
	  (57,'Montpellier'),
	  (58,'Reims'),
	  (59,'France'),
	  (60,'Croatia');
    INSERT INTO public.teams (id,"name") VALUES
	  (61,'Netherlands'),
	  (62,'Poland'),
	  (63,'Mexico'),
	  (64,'Saudi Arabia'),
	  (65,'United Arab Emirates'),
	  (66,'Juventus'),
	  (67,'Troyes'),
	  (68,'Maccabi Haifa'),
	  (69,'Benfica'),
	  (70,'Jamaica');
    INSERT INTO public.teams (id,"name") VALUES
	  (71,'Honduras'),
	  (72,'Monaco'),
	  (73,'Estonia'),
	  (74,'Italy'),
	  (75,'Metz'),
	  (76,'Bordeaux'),
	  (77,'Real Madrid'),
	  (78,'St Etienne'),
	  (79,'Club Brugge'),
	  (80,'Manchester City');
    INSERT INTO public.teams (id,"name") VALUES
	  (81,'RB Leipzig'),
	  (82,'Celta Vigo'),
	  (83,'Levante'),
	  (84,'Atletico Madrid'),
	  (85,'Valencia'),
	  (86,'Granada'),
	  (87,'Villarreal'),
	  (88,'Getafe'),
	  (89,'Athletic Bilbao'),
	  (90,'Real Valladolid');
    INSERT INTO public.teams (id,"name") VALUES
	  (91,'Real Sociedad'),
	  (92,'Huesca'),
	  (93,'Osasuna'),
	  (94,'Sevilla'),
	  (95,'Elche'),
	  (96,'Cadiz'),
	  (97,'Alaves'),
	  (98,'Real Betis'),
	  (99,'Rayo Vallecano'),
	  (100,'Dynamo Kyiv');
    INSERT INTO public.teams (id,"name") VALUES
	  (101,'Ferencvaros'),
	  (102,'Napoli'),
	  (103,'Espanyol'),
	  (104,'Leganes'),
	  (105,'Mallorca'),
	  (106,'Eibar'),
	  (107,'Borussia Dortmund'),
	  (108,'Slavia Prague'),
	  (109,'Inter Milan'),
	  (110,'Qatar');
    INSERT INTO public.teams (id,"name") VALUES
	  (111,'Nicaragua'),
	  (112,'Liverpool'),
	  (113,'Manchester United'),
	  (114,'Girona'),
	  (115,'Tottenham Hotspur'),
	  (116,'PSV Eindhoven'),
	  (117,'Nigeria'),
	  (118,'Iceland'),
	  (119,'Haiti'),
	  (120,'Deportivo La Coruna');
    INSERT INTO public.teams (id,"name") VALUES
	  (121,'Roma'),
	  (122,'Chelsea'),
	  (123,'Las Palmas'),
	  (124,'Sporting CP'),
	  (125,'Russia'),
	  (126,'Olympiacos'),
	  (127,'Malaga'),
	  (128,'Sporting Gijon'),
	  (129,'Borussia Monchengladbach'),
	  (130,'Celtic');
    INSERT INTO public.teams (id,"name") VALUES
	  (131,'USA'),
	  (132,'Arsenal'),
	  (133,'River Plate'),
	  (134,'Bayer Leverkusen'),
	  (135,'Cordoba'),
	  (136,'Almeria'),
	  (137,'APOEL'),
	  (138,'Portugal'),
	  (139,'Ajax'),
	  (140,'Hong Kong');
    INSERT INTO public.teams (id,"name") VALUES
	  (141,'Germany'),
	  (142,'Belgium'),
	  (143,'Switzerland'),
	  (144,'Iran'),
	  (145,'Bosnia and Herzegovina'),
	  (146,'Slovenia'),
	  (147,'Trinidad and Tobago'),
	  (148,'Romania'),
	  (149,'AC Milan'),
	  (150,'Sweden');
    INSERT INTO public.teams (id,"name") VALUES
	  (151,'Spartak Moscow'),
	  (152,'Real Zaragoza'),
	  (153,'Racing Santander'),
	  (154,'Santos'),
	  (155,'Al-Sadd SC'),
	  (156,'Viktoria Plzen'),
	  (157,'BATE Borisov'),
	  (158,'FC Porto'),
	  (159,'Costa Rica'),
	  (160,'Albania');
    INSERT INTO public.teams (id,"name") VALUES
	  (161,'Shakhtar Donetsk'),
	  (162,'Hercules'),
	  (163,'Rubin Kazan'),
	  (164,'Panathinaikos'),
	  (165,'AD Ceuta'),
	  (166,'FC Copenhagen'),
	  (167,'Japan'),
	  (168,'Spain'),
	  (169,'Republic of Ireland'),
	  (170,'Greece');
    INSERT INTO public.teams (id,"name") VALUES
	  (171,'South Korea'),
	  (172,'Tenerife'),
	  (173,'Xerez'),
	  (174,'VfB Stuttgart'),
	  (175,'Estudiantes'),
	  (176,'Atlante F.C.'),
	  (177,'Cultural Leonesa'),
	  (178,'Huelva'),
	  (179,'Numancia'),
	  (180,'Benidorm');
    INSERT INTO public.teams (id,"name") VALUES
	  (181,'FC Basel'),
	  (182,'Real Murcia'),
	  (183,'Glasgow Rangers'),
	  (184,'Norway'),
	  (185,'Gimnastic'),
	  (186,'Algeria'),
	  (187,'Werder Bremen'),
	  (188,'Serbia'),
	  (189,'Angola'),
	  (190,'Udinese');
    INSERT INTO public.teams (id,"name") VALUES
	  (191,'Hungary'),
	  (192,'Albacete Balompie'),
	  (193,'UDA Gramenet');
    `);

    await queryRunner.query(`
      SELECT setval('teams_id_seq', (SELECT MAX(id) FROM public.teams));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.teams;
    `);
  }
}
