import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateInstructor1593034577157
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'instructors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'instructors',
      new TableForeignKey({
        name: 'UserInstructor',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('instructors', 'UserInstructor');
    await queryRunner.dropTable('instructors');
  }
}
