var year, month, day;

function triarDia() {
  var mesos30 = [4, 6, 9, 11];

  var year = Math.floor(Math.random() * (2020 - 1907 + 1) + 1907);

  var month = parseInt(Math.random() * 12 + 1);

  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    if (month == 2) var day = parseInt(Math.random() * 29 + 1);
    if (mesos30.includes(month))
      var day = parseInt(Math.random() * 30 + 1);
    else var day = parseInt(Math.random() * 31 + 1);
  } else {
    if (month == 2) var day = parseInt(Math.random() * 28 + 1);
    if (mesos30.includes(month)) var day = parseInt(Math.random() * 30 + 1);
    else var day = parseInt(Math.random() * 31 + 1);
  }

  return year, month, day;
}

while ([year, month, day] != [1997, 1, 16]) {
  triarDia();
}

console.log(`Tu cumpleaños es el día ${day} del mes ${month} del año ${year}`);
