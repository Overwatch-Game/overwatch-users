import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class CreateUsersTable1694389753099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'role_id',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'users_role_id_roles_FK',
        columnNames: ['role_id'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'users_role_id_roles_FK');
    await queryRunner.dropTable('users');
  }
}
