import { add } from "../index";

describe("index.ts", () => {
    it("should add two numbers correctly", () => {
        const x = 2,
            y = 3;

        const correctResult = x + y;
        const result = add(x, y);
        expect(result).toEqual(correctResult);
    });
});
