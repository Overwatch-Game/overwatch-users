import { MigrationInterface, QueryRunner } from 'typeorm';

import { ROLES, Role } from '../data/roles.data';

export class AddDataInUsersTable1694389474838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    ROLES.forEach(async (role: Role) => {
      await queryRunner.query(`INSERT INTO roles (name) VALUES ($1)`, [
        role.name,
      ]);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    ROLES.forEach(async (role: Role) => {
      await queryRunner.query(`DELETE FROM roles WHERE name = $1`, [role.name]);
    });
  }
}
