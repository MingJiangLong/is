
export enum TYPES {
    String = '[object String]',
    Number = '[object Number]',
    Boolean = '[object Boolean]',
    Array = '[object Array]',
    Object = '[object Object]',
    Symbol = '[object Symbol]',
    Function = '[object Function]',
    Set = '[object Set]',
    Map = '[object Map]'
}

export type Keyvalue = { [k: string]: any }
export type ArrayItem<S> = S extends Array<infer E> ? E : any

/**
 * 类型
 * Object.prototype.toString.call
 * @param value 
 * @returns 
 */
export function getTypeStr(value: any) {
    return Object.prototype.toString.call(value)
}

/**
 * 数字 
 * 排除NaN
 * @param value 
 * @returns 
 */
export function isNumber(value: any): value is Number {
    return getTypeStr(value) === TYPES.Number && !isNaN(+value)
}

/**
 * 字符串
 * @param value 
 * @returns 
 */
export function isString(value: any): value is String {
    return getTypeStr(value) === TYPES.String
}

/**
 * 布尔
 * @param value 
 * @returns 
 */
export function isBoolean(value: any): value is Boolean {
    return getTypeStr(value) === TYPES.Boolean
}

/**
 * 数组
 * @param value 
 * @returns 
 */
export function isArray(value: any): value is any[] {
    return getTypeStr(value) === TYPES.Array
}

/**
 * Set
 * @param value 
 * @returns 
 */
export function isSet(value: any): value is Set<any> {
    return getTypeStr(value) === TYPES.Set
}

/**
 * Map
 * @param value 
 * @returns 
 */
export function isMap(value: any): value is Map<any, any> {
    return getTypeStr(value) === TYPES.Map
}
/**
 * 键值对
 * @param value 
 * @returns 
 */
export function isKeyvalue(value: any): value is Keyvalue {
    return getTypeStr(value) === TYPES.Object
}

/**
 * symbol
 * @param value 
 * @returns 
 */
export function isSymbol(value: any): value is Symbol {
    return getTypeStr(value) === TYPES.Symbol
}

/**
 * 函数
 * @param value 
 * @returns 
 */
export function isFunction(value: any): value is Function {
    return getTypeStr(value) === TYPES.Function
}

/**
 * null
 * @param value 
 * @returns 
 */
export function isNull(value: any): value is null {
    return value === null
}

/**
 * undefined 
 * @param value 
 * @returns 
 */
export function isUndefined(value: any): value is undefined {
    return value === undefined
}

/**
 * 引用类型
 * @param value 
 * @returns 
 */
export function isReference(value: any): value is (any[] | Keyvalue | Function) {
    return isArray(value) || isKeyvalue(value) || isFunction(value) || isSet(value) || isMap(value)
}

/**
 * 类数字判断  
 * '1' / 1
 * @param value 
 * @returns 
 */
export function isNumberLike(value: any) {
    if (isNumber(value)) return true;
    if (isString(value) && !isNaN(+value)) return true
    return false;
}

export function isJustNaN(value: any) {
    return getTypeStr(value) === TYPES.Number && !isNumber(value)
}

/**
 * 相等判断
 * NaN比较  相等
 * Symbol 或者Function 被转化成字符串之后相等 判断为相等
 * 特殊 Map键变化会被认为不等 
 * 
 * 其余类型未做判断会自己默认false
 * @param value1 
 * @param value2 
 * @returns 
 */
export function isEqual(value1: any, value2: any): boolean {

    if (value1 === value2) return true;
    if (getTypeStr(value1) !== getTypeStr(value2)) return false;
    if (isJustNaN(value1)) return true;
    if (isSymbol(value1) || isFunction(value1)) return value1.toString() === value2.toString();
    if (isArray(value1)) {
        if (value1.length !== value2.length) return false;
        for (let i = 0; i < value1.length; i++) {
            if (!isEqual(value1[i], value2[i])) return false
        }

        return true
    }
    if (isKeyvalue(value1)) {
        let keys = Object.keys(value1);
        let key2s = Object.keys(value2);
        if (keys.length !== key2s.length) return false;

        for (let i = 0; i < keys.length; i++) {
            if (!(keys[i] in value2)) return false;
            if (!isEqual(value1[keys[i]], value2[keys[i]])) return false
        }

        return true
    }
    if (isSet(value1)) {
        if (value1.size !== value2.size) return false;
        let v1 = Array.from(value1);
        let v2 = Array.from(value2);
        return isEqual(v1, v2);
    }

    if (isMap(value1)) {
        // Map的key是有序的 Map乱序也会被认为false
        if (value1.size !== value2.size) return false;
        let v1 = Array.from(value1);
        let v2: [any, any][] = Array.from(value2);
        for (let i = 0; i < v1.length; i++) {
            let [keyOfFirst, valueOfFirst] = v1[i];
            let [keyOfSecond, valueOfSecond] = v2[i];
            if (!isEqual(keyOfFirst, keyOfSecond) || !isEqual(valueOfFirst, valueOfSecond)) return false
        }
        return true
    }
    return false;
}

/**
 * 数组有item
 * @param value 
 * @returns 
 */
export function doesArrayHasAnyItems(value: any): value is [any, ...any[]] {
    return isArray(value) && !!value.length;
}

/**
 * Keyvalue 是否有键
 * @param value 
 * @returns 
 */
export function doesKeyvalueHasAnyKeys(value: any) {
    return isKeyvalue(value) && !!Object.keys(value).length;
}

/**
 * key in keyvalue
 * @param value 
 * @param key 
 * @returns 
 */
export function isKeyInKeyvalue(value: Keyvalue, key: string) {
    return (isFunction(value.hasOwnProperty) && value.hasOwnProperty(key)) ||
        (isKeyvalue(value) && key in value);
}

/**
 * null / undefined
 * @param value 
 * @returns 
 */
export function isNullish(value: any): value is (null | undefined) {
    return isNull(value) || isUndefined(value);
}

/**
 * 整数
 * @param value 
 * @returns 
 */
export function isInteger(value: any) {
    if (!isNumber(value)) return false;
    return Number.isInteger(value)
}

/**
 * 类整数
 * @param value 
 * @returns 
 */
export function isIntegerLike(value: any) {
    if (!isNumberLike(value)) return false;
    return Number.isInteger(+value)
}

/**
 * 浮点数
 * @param value 
 * @returns 
 */
export function isFloat(value: any) {
    if (!isNumber(value)) return false;
    return `${Number(value)}`.indexOf('.') !== -1
}

/**
 * 类浮点数
 * @param value 
 * @returns 
 */
export function isFloatLike(value: any) {
    if (!isNumberLike(value)) return false;
    return `${Number(value)}`.indexOf('.') !== -1
}

/**
 * 大于
 * @param first 
 * @param second 
 * @returns 
 */
export function isGreaterThan(first: number, second: number) {
    return +first > +second
}

/**
 * 大于等于
 * @param first 
 * @param second 
 * @returns 
 */
export function isGEThan(first: number, second: number) {
    return +first >= +second;
}

/**
 * 小于
 * @param first 
 * @param second 
 * @returns 
 */
export function isLessThan(first: number, second: number) {
    return +first < +second;
}

/**
 * 小于等于
 * @param first 
 * @param second 
 * @returns 
 */
export function isLEThan(first: number, second: number) {
    return +first <= +second;
}
