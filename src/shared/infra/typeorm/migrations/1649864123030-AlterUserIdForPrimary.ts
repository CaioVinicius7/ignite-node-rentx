import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserIdForPrimary1649864123030 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.updatePrimaryKeys("users", [
			new TableColumn({ name: "id", type: "uuid", isPrimary: true })
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("users");
	}
}
