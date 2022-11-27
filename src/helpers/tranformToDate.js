export const transformToDate = (resDate, resTime) => {
  return `${
    resDate.month() + 1
  }/${resDate.date()}/${resDate.year()} ${resTime.hour()}:${resTime.minute()}`;
};

export const checkNewDateDateAndHour = (newDate) => {
  return `${
    newDate.month() + 1
  }/${newDate.date()}/${newDate.year()} ${newDate.hour()}`;
};

export const checkRespDateAndHour = (respDate, respTime) => {
  return `${
    respDate.month() + 1
  }/${respDate.date()}/${respDate.year()} ${respTime.hour()}`;
};
