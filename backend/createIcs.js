// I was so confused on how to import an ics event so I looked online at 
// resources and found this
// SOURCE CREDIT: https://codepen.io/jessewarddev/pen/LYVqabP?editors=1111
// Built off of this initial source code

/**
* Create and download a file on click
* @params {string} filename - The name of the file with the ending
* @params {string} filebody - The contents of the file
*/
function download(filename, fileBody) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileBody));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


/**
* Returns a date/time in ICS format
* @params {Object} dateTime - A date object you want to get the ICS format for.
* @returns {string} String with the date in ICS format
*/
function convertToICSDate(dateTime) {
    const year = dateTime.getFullYear().toString();
    const month = (dateTime.getMonth() + 1) < 10 ? "0" + (dateTime.getMonth() + 1).toString() : (dateTime.getMonth() + 1).toString();
    const day = dateTime.getDate() < 10 ? "0" + dateTime.getDate().toString() : dateTime.getDate().toString();
    const hours = dateTime.getHours() < 10 ? "0" + dateTime.getHours().toString() : dateTime.getHours().toString();
    const minutes = dateTime.getMinutes() < 10 ? "0" +dateTime.getMinutes().toString() : dateTime.getMinutes().toString();

    return year + month + day + "T" + hours + minutes + "00";
}


/**
* Creates and downloads an ICS file
* @params {string} timeZone - In the format America/New_York
* @params {object} startTime - Vaild JS Date object in the event timezone
* @params {object} endTime - Vaild JS Date object in the event timezone
* @params {string} title
* @params {string} description
* @params {string} venueName
* @params {string} address
* @params {string} city
* @params {string} state
*/
function createDownloadICSFile(timezone, startTime, endTime, title, description, venueName, address, city, state) {
  const icsBody = 'BEGIN:VCALENDAR\n' +
  'VERSION:2.0\n' +
  'PRODID:Calendar\n' +
  'CALSCALE:GREGORIAN\n' +
  'METHOD:PUBLISH\n' +
  'BEGIN:VTIMEZONE\n' +
  'TZID:' + timezone + '\n' +
  'END:VTIMEZONE\n' +
  'BEGIN:VEVENT\n' +
  'SUMMARY:' + title + '\n' +
  'UID:@Default\n' +
  'SEQUENCE:0\n' +
  'STATUS:CONFIRMED\n' +
  'TRANSP:TRANSPARENT\n' +
  'DTSTART;TZID=' + timezone + ':' + convertToICSDate(startTime) + '\n' +
  'DTEND;TZID=' + timezone + ':' + convertToICSDate(endTime)+ '\n' +
  'DTSTAMP:'+ convertToICSDate(new Date()) + '\n' +
  'LOCATION:' + venueName + '\\n' + address + ', ' + city + ', ' + state + '\n' +
  'DESCRIPTION:' + description + '\n' +
  'END:VEVENT\n' +
  'END:VCALENDAR\n';

  download(title + '.ics', icsBody);
}


document.getElementById('downloadICS').addEventListener('click', () => {
  createDownloadICSFile(
    'America/Los_Angeles',
    new Date('Jan 1, 2020 08:00 PST'),
    new Date('Jan 4, 2020 17:00 PST'),
    'Example Event',
    'This is the event description',
    'Washington State Convention Center',
    '705 Pike St',
    'Seattle',
    'WA'
  );  
});



