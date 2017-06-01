import moment from 'moment';
export const marks = {
  25: "Last 24h",
  45: "Last 7 days",
  65: "Last 14 days",
  85: "Last month",
  100: "Last year"
};

export const getData = (k) => {
  const res = [];
  let date = moment();
  for (let i = 0; i < k/2; i++) {
    date = date.add(1,'day');
    res.push({
      name: date.format("ddd DD/MM"),
      calories: 200 + Math.ceil(Math.random() * 1000),
      fats: 200 + Math.ceil(Math.random() * 1000),
      carbonohidrates: 0 + Math.ceil(Math.random() * 1000),
      frozen: 200 + Math.ceil(Math.random() * 1000),
    });
  }
  return res;
};