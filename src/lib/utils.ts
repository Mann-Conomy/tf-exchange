export function roundMetal(refined: number): number {
    const whole = Math.floor(refined);
    const decimal = Math.round((refined - whole) / 0.11);

    const rounded = (whole + (9 === decimal ? 1 : 0.11 * decimal)).toFixed(2);

    return parseFloat(rounded);
}

export function roundInt(n: number): number {
    return parseInt((Math.round(2 * n) / 2).toFixed(2));
}



export function toScrap(refined: number): number {
    return roundInt(Math.round(9 * refined * 100) / 100);
}



