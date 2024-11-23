import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seasons1732339620799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public.seasons (id,"name") VALUES
	    (1,'2024-2025'),
	    (2,'2023-2024'),
	    (3,'2022-2023'),
	    (4,'2021-2022'),
	    (5,'2020-2021'),
	    (6,'2019-2020'),
	    (7,'2018-2019'),
	    (8,'2017-2018'),
	    (9,'2016-2017'),
	    (10,'2015-2016');
      INSERT INTO public.seasons (id,"name") VALUES
	    (11,'2014-2015'),
	    (12,'2013-2014'),
	    (13,'2012-2013'),
	    (14,'2011-2012'),
	    (15,'2010-2011'),
	    (16,'2009-2010'),
	    (17,'2008-2009'),
	    (18,'2007-2008'),
	    (19,'2006-2007'),
	    (20,'2005-2006');
      INSERT INTO public.seasons (id,"name") VALUES
        (21,'2004-2005');
    `);

    await queryRunner.query(`
      SELECT setval('seasons_id_seq', (SELECT MAX(id) FROM public.seasons));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.seasons;
    `);
  }
}
