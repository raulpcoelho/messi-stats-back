import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMatchTable1732253421084 implements MigrationInterface {
  name = 'CreateMatchTable1732253421084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "matches" ("id" SERIAL NOT NULL, "match_date" date, "season" character varying(11), "competition" character varying(30), "home" boolean, "team" character varying(30), "opponent" character varying(30), "team_score" integer, "opponent_score" integer, "goals" integer, "assists" integer, "started" boolean, "minutes_played" integer, "pens_scored" integer, "pens_missed" integer, "hat_tricks" integer, "free_kicks" integer, "inside_box" integer, "outside_box" integer, "left" integer, "right" integer, "head" integer, "other" integer, "successful_dribbles" integer, "motm" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "matches"`);
  }
}
