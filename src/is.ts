
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

export type Keyvalue<T = any> = { [k: string]: T }
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
    return (typeof value === 'number' || getTypeStr(value) === TYPES.Number) && !isNaN(+value)
}

/**
 * 整数判断
 * @param value 
 * @returns 
 */
export function isInteger(value: any) {
    return isNumber(value) && Number.isInteger(value)
}

/**
 * 浮点数
 * @param value 
 * @returns 
 */
export function isFloat(value: any) {
    return isNumber(value) && !Number.isInteger(value)
}

/**
 * 正整数判断
 */
export function isPositiveInteger(value: any) {
    return isNumber(value) && isInteger(value) && value > 0
}

/**
 * 负整数
 * @param value 
 * @returns 
 */
export function isNegativeInteger(value: any) {
    return isNumber(value) && isInteger(value) && value < 0
}

/**
 * 
 * @param value 正浮点数
 * @returns 
 */
export function isPositiveFloat(value: any) {
    return isFloat(value) && value > 0
}

/**
 * 负浮点数
 * @param value 
 * @returns 
 */
export function isNegativeFloat(value: any) {
    return isFloat(value) && value < 0
}

/**
 * 字符串
 * @param value 
 * @returns 
 */
export function isString(value: any): value is String {
    return typeof value === 'string' || getTypeStr(value) === TYPES.String
}

/**
 * 布尔
 * @param value 
 * @returns 
 */
export function isBoolean(value: any): value is Boolean {
    return typeof value === 'boolean' || getTypeStr(value) === TYPES.Boolean
}

/**
 * 数组
 * @param value 
 * @returns 
 */
export function isArray(value: any): value is any[] {
    return Array.isArray(value) || value instanceof Array || getTypeStr(value) === TYPES.Array
}

/**
 * Set
 * @param value 
 * @returns 
 */
export function isSet(value: any): value is Set<any> {
    return value instanceof Set || getTypeStr(value) === TYPES.Set
}

/**
 * Map
 * @param value 
 * @returns 
 */
export function isMap(value: any): value is Map<any, any> {
    return value instanceof Map || getTypeStr(value) === TYPES.Map
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
export function doesArrayHasAnyItems<T = any>(value: T[]): value is [T, ...T[]] {
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
 * 类正整数判断
 */
export function lookLikePositiveInteger(value: any) {
    return lookLikeInteger(value) && +value > 0
}


export function lookLikeNegativeInteger(value: any) {
    return lookLikeInteger(value) && +value < 0
}

/**
 * 类浮点数
 * @param value 
 * @returns 
 */
export function lookLikeFloat(value: any) {
    if (!lookLikeNumber(value)) return false;
    return isFloat(+value)
}
/**
 * 类数字判断  
 * '1' / 1
 * @param value 
 * @returns 
 */
export function lookLikeNumber(value: any) {

    if (isNumber(value)) return true;
    if (!isString(value)) return false;
    if (value.trim() == '') return false;
    return !isNaN(+value)
}

/**
 * 类整数
 * @param value 
 * @returns 
 */
export function lookLikeInteger(value: any) {
    if (!lookLikeNumber(value)) return false;
    return isInteger(+value)
}

/**
 * 类整数
 * @param value 
 * @returns 
 */
export function lookLikePositiveFloat(value: any) {
    return lookLikeFloat(value) && +value > 0
}
/**
 * 类整数
 * @param value 
 * @returns 
 */
export function lookLikeNegativeFloat(value: any) {
    return lookLikeFloat(value) && +value < 0
}

/**
 * 大于等于
 * 可用字符串
 * 不是可匹配数字默认返回false
 * @param value 
 * @param value2 
 * @returns 
 */
export function lookLikeGreaterAndEqualThan(value: any, value2: any) {
    return lookLikeNumber(value) && lookLikeNumber(value2) && +value >= +value2
}

/**
 * 大于
 * 可用字符串
 * 不是可匹配数字默认返回false
 * @param value 
 * @param value2 
 * @returns 
 */
export function lookLikeGreaterThan(value: any, value2: any) {
    // return likeGEThan(value, value2) && (+value2 != +value)
    return lookLikeNumber(value) && lookLikeNumber(value2) && +value > +value2
}

/**
 * 小于等于
 * 可用字符串
 * 不是可匹配数字默认返回false
 * @param value 
 * @param value2 
 */
export function lookLikeLessAndEqualThan(value: any, value2: any) {
    // return likeGThan(value, value2)
    return lookLikeNumber(value) && lookLikeNumber(value2) && +value <= +value2
}
/**
 * 小于
 * 可用字符串
 * 不是可匹配数字默认返回false
 * @param value 
 * @param value2 
 * @returns 
 */
export function lookLikeLessThan(value: any, value2: any) {
    // return likeGEThan(value, value2)
    return lookLikeNumber(value) && lookLikeNumber(value2) && +value < +value2
}