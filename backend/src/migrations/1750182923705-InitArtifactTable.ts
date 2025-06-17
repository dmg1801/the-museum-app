import { MigrationInterface, QueryRunner } from "typeorm";

export class InitArtifactTable1750182923705 implements MigrationInterface {
    name = 'InitArtifactTable1750182923705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artifact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "imageUrl" character varying NOT NULL, "civilization" character varying, "age" character varying, "origin" character varying, CONSTRAINT "PK_1f238d1d4ef8f85d0c0b8616fa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artifact"`);
    }

}
