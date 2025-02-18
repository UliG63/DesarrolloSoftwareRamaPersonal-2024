import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import dotenv from "dotenv";
dotenv.config({ path: `.env.test` });
export let testOrm;
beforeAll(async () => {
    testOrm = await MikroORM.init({
        entities: ["dist/**/*.entity.js"],
        entitiesTs: ["src/**/*.entity.ts"],
        driver: SqliteDriver,
        dbName: ":memory:",
        debug: false,
    });
    await testOrm.getSchemaGenerator().createSchema();
});
afterAll(async () => {
    await testOrm.close();
});
//# sourceMappingURL=setup.js.map