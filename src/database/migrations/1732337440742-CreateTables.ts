import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1732337440742 implements MigrationInterface {
  name = 'CreateTables1732337440742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "competitions" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ef273910798c3a542b475e75c7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seasons" ("id" SERIAL NOT NULL, "name" character varying(11) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb8ed53b5fe109dcd4a4449ec9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "matches" ("id" SERIAL NOT NULL, "match_date" date, "home" boolean, "team_score" integer, "opponent_score" integer, "goals" integer, "assists" integer, "started" boolean, "minutes_played" integer, "pens_scored" integer, "pens_missed" integer, "hat_tricks" integer, "free_kicks" integer, "inside_box" integer, "outside_box" integer, "left" integer, "right" integer, "head" integer, "other" integer, "successful_dribbles" integer, "motm" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "season_id" integer, "competition_id" integer, "team_id" integer, "opponent_id" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_7d7e5cc65ab15d4c9a6139d7c24" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_dc604f895a134adedbbf5bf405d" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_58b365500eeb20dc491cb97ce2b" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "matches" ADD CONSTRAINT "FK_50ea84d4cc3a57e78330589dea7" FOREIGN KEY ("opponent_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_50ea84d4cc3a57e78330589dea7"`);
    await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_58b365500eeb20dc491cb97ce2b"`);
    await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_dc604f895a134adedbbf5bf405d"`);
    await queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "FK_7d7e5cc65ab15d4c9a6139d7c24"`);
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TABLE "seasons"`);
    await queryRunner.query(`DROP TABLE "competitions"`);
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
