import { MigrationInterface, QueryRunner } from 'typeorm';

export class Competitions1732338967859 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      SET TIMEZONE='America/Recife';  
    `);

    await queryRunner.query(`
      INSERT INTO public.competitions (id,"name") VALUES
	    (1,'World Cup Qualifier'),
	    (2,'MLS Cup'),
	    (3,'MLS'),
	    (4,'Copa America'),
	    (5,'International Friendly'),
	    (6,'CONCACAF Champions Cup'),
	    (7,'US Open Cup'),
	    (8,'Leagues Cup'),
	    (9,'Ligue 1'),
	    (10,'Champions League');
      INSERT INTO public.competitions (id,"name") VALUES
        (11,'Coupe de France'),
        (12,'World Cup'),
        (13,'Trophée des Champions'),
        (14,'Finalissima'),
        (15,'La Liga'),
        (16,'Copa del Rey'),
        (17,'Supercopa de Espana'),
        (18,'Club World Cup'),
        (19,'UEFA Super Cup');
    `);

    await queryRunner.query(`
      SELECT setval('competitions_id_seq', (SELECT MAX(id) FROM public.competitions));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.competitions;
    `);
  }
}
