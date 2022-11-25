const is = require('../dist/is')
test('isString', () => {
    const tempt = [
        [' ', true],
        ['2', true],
        [1, false],
        [true, false],
        [[1], false],
        [{}, false],
        [void 0, false],
        [null, false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isString(value)).toBe(result)
    }
})
test('isNumber', () => {
    const tempt = [
        ['', false],
        [' ', false],
        [1, true],
        ['2', false],
        [true, false],
        [[1], false],
        [{}, false],
        [void 0, false],
        [null, false],
        [Symbol(1), false],
        [function a() { }, false],
        [NaN, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isNumber(value)).toBe(result)
    }
})
test('isBoolean', () => {
    const tempt = [
        [1, false],
        [' ', false],
        ['2', false],
        [true, true],
        [[1], false],
        [{}, false],
        [void 0, false],
        [null, false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isBoolean(value)).toBe(result)

    }
})
test('isNull', () => {
    const tempt = [
        [null, true],
        [1, false],
        ['2', false],
        [true, false],
        [[1], false],
        [{}, false],
        [void 0, false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isNull(value)).toBe(result)

    }
})
test('isUndefined', () => {
    const tempt = [
        [void 0, true],
        [null, false],
        [1, false],
        ['2', false],
        [true, false],
        [[1], false],
        [{}, false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isUndefined(value)).toBe(result)

    }
})
test('isArray', () => {
    const tempt = [
        [[1], true],
        [void 0, false],
        [null, false],
        [1, false],
        ['2', false],
        ['  ', false],
        [true, false],
        // [#00ffff, false],
        [{}, false],
        [class a { }, false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isArray(value)).toBe(result)

    }
})
test('isKeyvalue', () => {
    const tempt = [
        [{}, true],
        [void 0, false],
        [null, false],
        [1, false],
        ['2', false],
        [true, false],
        [[1], false],
        [Symbol(1), false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isKeyvalue(value)).toBe(result)

    }
})
test('isSymbol', () => {
    const tempt = [
        [Symbol(1), true],
        [void 0, false],
        [null, false],
        [1, false],
        ['2', false],
        [true, false],
        [[1], false],
        [{}, false],
        [function a() { }, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isSymbol(value)).toBe(result)

    }
})
test('isFunction', () => {
    const tempt = [
        [function a() { }, true],
        [Symbol(1), false],
        [void 0, false],
        [null, false],
        [1, false],
        ['2', false],
        [true, false],
        [[1], false],
        [{}, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isFunction(value)).toBe(result)

    }
})

test('likeNumber', () => {
    const tempt = [
        ['', false],
        [1, true],
        [-11, true],
        ['2', true],
        ['+2', true],
        ['2.', true],
        ['.2', true],
        ['0.2', true],
        [true, false],
        [Symbol(1), false],
        [void 0, false],
        [null, false],
        [function a() { }, false],
        [[1], false],
        [{}, false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikeNumber(value)).toBe(result)
    }
})


test('isEqual', () => {
    const tempt = [
        [
            [],
            [],
            true
        ],

        [
            [],
            [{ name2: 'jiang', name: "long" }, {}],
            false
        ],
        [
            [],
            [1],
            false
        ],

        [
            [1],
            [2],
            false
        ],
        [
            [1, 1],
            [1, 2],
            false
        ],
        [
            [1, 1],
            [1, 1],
            true
        ],
        [
            [{ name: "long" }, 1],
            [{ name: 'long' }, 2],
            false
        ],
        [
            [{ name: "long", name2: "jiang" }],
            [{ name2: 'jiang', name: "long" }],
            true
        ],
        [
            [{ name: "long", name2: "jiang" }],
            [{ name2: 'jiang', name: "long" }, {}],
            false
        ],
        [
            function name() { console.log("longjiang") },
            function name() { console.log("longjiang") },
            true
        ],
        [
            function name() { console.log("longjiang") },
            function name2() { console.log("longjiang") },
            false
        ],
        [
            function name() { console.log("longjiang") },
            function name() { console.log("longjiang2") },
            false
        ],
        [
            [{ name: "long", name2: "jiang", friends: [1, 2, { name: "adorn" }] }],
            [{ name2: 'jiang', name: "long", friends: [1, 2, { name: "adorn" }] }],
            true
        ],
        [
            new Set([1, 2]),
            [{ name2: 'jiang', name: "long", friends: [1, 2, { name: "adorn" }] }],
            false
        ],
        [
            new Set([1, 2]),
            new Set([2, 1]),
            false
        ],
        [
            new Set([1, 2]),
            new Set([1, 2]),
            true
        ],
        [
            new Set('abc'),
            new Set('abc'),
            true
        ],
        [
            new Set().add({ name: "longjiang" }),
            new Set().add({ name: "longjiang" }),
            true
        ],
        [
            new Map().set({ name: "longjiang" }),
            new Set().add({ name: "longjiang" }),
            false
        ],
        [
            new Map().set({ name: "longjiang" }, 2),
            new Map().set({ name: "longjiang" }, 2),
            true
        ],
        [
            new Map().set({ name: "longjiang" }, 2),
            new Map().set({ name: "longjiang" }, 1),
            false
        ],
        [
            new Map().set(new Set().add('abc'), 2),
            new Map().set(new Set().add('abc'), 2),
            true
        ],
        [
            new Map().set(NaN, 2),
            new Map().set(NaN, 2),
            true
        ],
        [
            new Map().set(NaN, 2),
            new Map().set(NaN, NaN),
            false
        ],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, value2, result] = tempt[i]
        expect(is.isEqual(value, value2)).toBe(result)

    }
})

test('doesArrayHasAnyItems', () => {

    const tempt = [
        [1, false],
        [-11, false],
        ['2', false],
        ['+2', false],
        ['2.', false],
        ['.2', false],
        ['0.2', false],
        [true, false],
        [Symbol(1), false],
        [void 0, false],
        [null, false],
        [function a() { }, false],
        [[1], true],
        [{}, false],
        [[], false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.doesArrayHasAnyItems(value)).toBe(result)
    }
})
test('doesKeyvalueHasAnyKeys', () => {

    const tempt = [
        [1, false],
        [-11, false],
        ['2', false],
        ['+2', false],
        ['2.', false],
        ['.2', false],
        ['0.2', false],
        [true, false],
        [Symbol(1), false],
        [void 0, false],
        [null, false],
        [function a() { }, false],
        [[1], false],
        [{}, false],
        [{ name: 1 }, true],
        [[], false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.doesKeyvalueHasAnyKeys(value)).toBe(result)
    }
})
test('isNullish', () => {

    const tempt = [
        [1, false],
        [-11, false],
        ['2', false],
        ['+2', false],
        ['2.', false],
        ['.2', false],
        ['0.2', false],
        [true, false],
        [Symbol(1), false],
        [void 0, true],
        [null, true],
        [function a() { }, false],
        [[1], false],
        [{}, false],
        [{ name: 1 }, false],
        [[], false],
    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isNullish(value)).toBe(result)
    }
})
test('isKeyInKeyvalue', () => {
    const tempt = [
        [{ name: "longjiang" }, "longjiang", false],
        [{ name: "longjiang" }, 2, false],
        [{ name: "longjiang" }, "name", true],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, value2, result] = tempt[i]
        expect(is.isKeyInKeyvalue(value, value2)).toBe(result)
    }
})
test('isInteger', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, true],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, false],
        [NaN, false],
        [Math.pow(2.1, 10), false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isInteger(value)).toBe(result)
    }
})
test('likeInteger', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, true],
        ['1', true],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, false],
        [NaN, false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikeInteger(value)).toBe(result)
    }
})
test('isFloat', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, false],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, true],
        ["1.1", false],
        [NaN, false],
        [1.0, false],
        [NaN, false],
        [Math.pow(2.1, 10), true],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.isFloat(value)).toBe(result)
    }
})
test('likeFloat', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, false],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, true],
        [1.0, false],
        [1, false],
        ["1.1", true],
        [NaN, false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikeFloat(value)).toBe(result)
    }
})
test('likeNegativeInteger', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, false],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, false],
        [1.0, false],
        [1, false],
        ["1.1", false],
        [NaN, false],
        [-1, true],
        ["-1", true],
        ["-1.0", true],
        ["-1.2", false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikeNegativeInteger(value)).toBe(result)
    }
})
test('likePositiveInteger', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, true],
        ['1', true],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, false],
        [1.0, true],
        [1, true],
        ["1.1", false],
        [NaN, false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikePositiveInteger(value)).toBe(result)
    }
})
test('likePositiveFloat', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, false],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, true],
        [1.0, false],
        [1, false],
        ["1.1", true],
        [NaN, false],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikePositiveFloat(value)).toBe(result)
    }
})
test('likeNegativeFloat', () => {
    const tempt = [
        [{ name: "longjiang" }, false],
        [1, false],
        ['1', false],
        [true, false],
        [null, false],
        [undefined, false],
        [Symbol(1), false],
        [1.1, false],
        [1.0, false],
        [1, false],
        ["1.1", false],
        [NaN, false],
        ["-1", false],
        ["-1.0", false],
        ["-1.2", true],

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, result] = tempt[i]
        expect(is.lookLikeNegativeFloat(value)).toBe(result)
    }
})
test('likeGThan', () => {
    const tempt = [
        [1, 2, false],
        [1, -1, true],
        [1, '', false],
        [1, '1', false],
        [1, '-1', true],
        [1, 'a', false],
        ['1', '2', false],
        ['1.0', 0.2, true],


    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, value2, result] = tempt[i]
        expect(is.lookLikeGreaterThan(value, value2)).toBe(result)
    }
})
