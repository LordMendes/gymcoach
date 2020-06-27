import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStretching1593122168389
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stretching',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'group',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stretching');
  }
}
