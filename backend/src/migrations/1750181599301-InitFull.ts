import { MigrationInterface, QueryRunner } from "typeorm";

export class InitFull1750181599301 implements MigrationInterface {
    name = 'InitFull1750181599301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artifact" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artifact" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
