import { MigrationInterface, QueryRunner } from "typeorm";

export class InitArtifacts1750061192250 implements MigrationInterface {
    name = 'InitArtifacts1750061192250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artifact" ADD "civilization" character varying`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD "age" character varying`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD "origin" character varying`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "artifact" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artifact" ALTER COLUMN "imageUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "artifact" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "artifact" DROP COLUMN "civilization"`);
    }

}
