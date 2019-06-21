import { add } from "./add";

describe("add", () => {
    it("should add any number of arguments", () => {
        expect(add(1, 2)).toEqual(3);
        expect(add(1, 2, 3)).toEqual(6);
        expect(add(1, 2, 3, 4)).toEqual(10);
        expect(add(1, 2, 3, 4, 5)).toEqual(15);
    });
});
