const is = require('../dist/is')
test('isString', () => {
    const tempt = [
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
        [1, true],
        ['2', false],
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
        expect(is.isNumber(value)).toBe(result)

    }
})
test('isBoolean', () => {
    const tempt = [
        [1, false],
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
        [true, false],
        [{}, false],
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

test('isNumberLike', () => {
    const tempt = [
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
        expect(is.isNumberLike(value)).toBe(result)

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

    ]

    for (let i = 0; i < tempt.length; i++) {
        let [value, value2, result] = tempt[i]
        expect(is.isEqual(value, value2)).toBe(result)

    }
})

test('doesArrayHaveAnyItems', () => {

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
        expect(is.doesArrayHaveAnyItems(value)).toBe(result)
    }
})
test('doesKeyvalueHaveAnyKeys', () => {

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
        expect(is.doesKeyvalueHaveAnyKeys(value)).toBe(result)
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