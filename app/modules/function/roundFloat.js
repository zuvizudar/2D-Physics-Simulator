export function roundFloat(number, n) {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
}