export function getTime(unixTimestamp) {
    const time = moment(unixTimestamp * 1000).locale('de');

    return time.format('HH.mm');

};

export function getDay(unixTimestamp) {
    const day = moment(unixTimestamp * 1000).locale('de');

    return day.format('dd, DD. MMM YYYY');
};