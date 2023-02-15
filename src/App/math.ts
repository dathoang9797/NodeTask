export const calculateTip = (total: number, tipPercent = 0.5) => total + total * tipPercent;
export const add = (a: number, b: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
};