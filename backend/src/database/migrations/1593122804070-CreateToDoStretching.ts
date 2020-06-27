import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const foreignKeys = [
  new TableForeignKey({
    name: 'StretchingId',
    columnNames: ['stretching_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'stretching',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
  new TableForeignKey({
    name: 'RecordId',
    columnNames: ['record_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'records',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
];

export default class CreateToDoStretching1593122804070
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'to_do_stretching',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'time',
            type: 'int',
          },
          {
            name: 'stretching_id',
            type: 'serial',
          },
          {
            name: 'record_id',
            type: 'uuid',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('to_do_stretching', foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('to_do_stretching', foreignKeys);
    await queryRunner.dropTable('to_do_stretching');
  }
}
