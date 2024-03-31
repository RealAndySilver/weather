export const transformKey = (key: string) => {
    const arr = key
        .split('_')
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    const result = arr.reduce((acc, curr) => {
        return `${acc.charAt(0).toUpperCase()}${acc.slice(1)} ${curr
            .charAt(0)
            .toUpperCase()}${curr.slice(1)}`;
    });
    return result;
};

export const processDate = (date: number) => {
    const newDate = new Date(date * 1000);
    return newDate.toISOString();
};