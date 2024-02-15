export function getTime(unixTimestamp) {
    const time = dayjs(unixTimestamp * 1000).locale('de');

    return time.format('HH.mm');

};

export function getDay(unixTimestamp) {
    const day = dayjs(unixTimestamp * 1000).locale('de');

    return day.format('dd, DD. MMM YYYY');
};