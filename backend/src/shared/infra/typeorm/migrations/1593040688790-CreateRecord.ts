import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const foreignKeys = [
  new TableForeignKey({
    name: 'ClientRecord',
    columnNames: ['clients_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'clients',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
  new TableForeignKey({
    name: 'RecordInstructor',
    columnNames: ['instructor_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'instructors',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
];

export default class CreateRecord1593040688790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'records',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'boolean',
          },
          {
            name: 'cicle',
            type: 'char(1)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'next_date',
            type: 'timestamp',
          },
          {
            name: 'goal',
            type: 'varchar',
          },
          {
            name: 'clients_id',
            type: 'uuid',
          },
          {
            name: 'instructor_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('records', foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('records', foreignKeys);
    await queryRunner.dropTable('records');
  }
}
