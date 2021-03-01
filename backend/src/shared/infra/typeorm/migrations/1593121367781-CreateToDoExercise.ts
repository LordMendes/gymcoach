import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const foreignKeys = [
  new TableForeignKey({
    name: 'RecordId',
    columnNames: ['record_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'records',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
  new TableForeignKey({
    name: 'ExerciseId',
    columnNames: ['exercise_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'exercises',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }),
];

export default class CreateToDoExercise1593121367781
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'to_do_exercise',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'load',
            type: 'real',
          },
          {
            name: 'repetions',
            type: 'int',
          },
          {
            name: 'note',
            type: 'varchar',
          },
          {
            name: 'record_id',
            type: 'uuid',
          },
          {
            name: 'exercise_id',
            type: 'serial',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('to_do_exercise', foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('to_do_exercise', foreignKeys);
    await queryRunner.dropTable('to_do_exercise');
  }
}
