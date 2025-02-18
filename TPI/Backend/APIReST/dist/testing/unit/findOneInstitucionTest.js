import { orm } from "../../shared/db/orm.js";
import { app } from "../../app.js";
import request from "supertest";
jest.mock("../shared/db/orm", () => ({
    orm: {
        em: {
            findOneOrFail: jest.fn(),
        },
    },
}));
describe("GET /api/institucion/:id", () => {
    it("Debe devolver una institucion cuando existe", async () => {
        const mockInstitucion = { id: 1, nombre: "Hogwarts", ciudad: 'Unknown', pais: "Scotland" };
        orm.em.findOneOrFail.mockResolvedValue(mockInstitucion);
        const response = await request(app).get("/api/institucion/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: "found institucion",
            data: mockInstitucion,
        });
    });
    it("Debe devolver error 500 si no existe", async () => {
        orm.em.findOneOrFail.mockRejectedValue(new Error("Institución no encontrada"));
        const response = await request(app).get("/api/institucion/999");
        expect(response.status).toBe(500);
    });
});
//# sourceMappingURL=findOneInstitucionTest.js.map