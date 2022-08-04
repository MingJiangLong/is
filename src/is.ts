
export enum TYPES {
    String = '[object String]',
    Number = '[object Number]',
    Boolean = '[object Boolean]',
    Array = '[object Array]',
    Object = '[object Object]',
    Symbol = '[object Symbol]',
    Function = '[object Function]'
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
 * 键值对
 * @param value 
 * @returns 
 */
export function isKeyvalue(value: any): value is { [k: string]: any } {
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
export function isReference(value: any): value is (any[] | { [k: string]: any } | Function) {
    return isArray(value) || isKeyvalue(value) || isFunction(value)
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

/**
 * 相等判断
 * 主要是判断值相等但是引用不同的情况
 * @param value1 
 * @param value2 
 * @returns 
 */
export function isEqual(value1: any, value2: any) {

    if (value1 === value2) return true;
    if (getTypeStr(value1) !== getTypeStr(value2)) return false;
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

