import { MikroORM } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'pruebatpdsw',
    clientUrl: 'mysql://root:Julianalvarezbrasil19@localhost:3306',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
    }
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map