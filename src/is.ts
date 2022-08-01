
export enum TYPES {
    String = '[object String]',
    Number = '[object Number]',
    Boolean = '[object Boolean]',
    Array = '[object Array]',
    Object = '[object Object]',
    Symbol = '[object Symbol]',
    Function = '[object Function]'
}
export function getTypeStr(value: any) {
    return Object.prototype.toString.call(value)
}

/**
 * 是否是数字
 * @param value 
 * @returns 
 */
export function isNumber(value: any): value is Number {
    return getTypeStr(value) === TYPES.Number
}

/**
 * 是否是字符串
 * @param value 
 * @returns 
 */
export function isString(value: any): value is String {
    return getTypeStr(value) === TYPES.String
}

/**
 * 是否是布尔
 * @param value 
 * @returns 
 */
export function isBoolean(value: any): value is Boolean {
    return getTypeStr(value) === TYPES.Boolean
}

/**
 * 数组判断
 * @param value 
 * @returns 
 */
export function isArray(value: any): value is any[] {
    return getTypeStr(value) === TYPES.Array
}

/**
 * 键值对判断
 * @param value 
 * @returns 
 */
export function isKeyvalue(value: any): value is { [k: string]: any } {
    return getTypeStr(value) === TYPES.Object
}

/**
 * 是否是symbol
 * @param value 
 * @returns 
 */
export function isSymbol(value: any): value is Symbol {
    return getTypeStr(value) === TYPES.Symbol
}

/**
 * 函数判断
 * @param value 
 * @returns 
 */
export function isFunction(value: any): value is Function {
    return getTypeStr(value) === TYPES.Function
}

/**
 * null 判断
 * @param value 
 * @returns 
 */
export function isNull(value: any): value is null {
    return value === null
}

/**
 * undefined 判断
 * @param value 
 * @returns 
 */
export function isUndefined(value: any): value is undefined {
    return value === undefined
}

/**
 * 是否是引用类型
 * @param value 
 * @returns 
 */
export function isReference(value: any): value is (any[] | { [k: string]: any } | Function) {
    return isArray(value) || isKeyvalue(value) || isFunction(value)
}

/**
 * 类数字判断  主要是数字和 字符串数字
 * @param value 
 * @returns 
 */
export function isNumberLike(value: any) {
    if (isNumber(value)) return true;
    if (isString(value) && !isNaN(+value)) return true
    return false;
}

/**
 * 数组有item
 * @param value 
 * @returns 
 */
export function doesArrayHaveItems(value: any): value is [any, ...any[]] {
    return isArray(value) && !!value.length;
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