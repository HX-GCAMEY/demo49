import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPassword1711223722282 implements MigrationInterface {
  name = 'AddPassword1711223722282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
