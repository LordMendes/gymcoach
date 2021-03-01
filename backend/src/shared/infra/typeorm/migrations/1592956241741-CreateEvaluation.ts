import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateEvaluation1592956241741
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluations',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'next_date',
            type: 'timestamp',
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'evaluations',
      new TableForeignKey({
        name: 'EvaluationClient',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('evaluations', 'EvaluationClient');
    await queryRunner.dropTable('evaluations');
  }
}
