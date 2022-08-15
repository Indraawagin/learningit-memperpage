export default (date) => {
  const d = new Date(date);
  const dft = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", data: "2-digit" });
  const [{ value: Fmonth }, , { value: Fday }, , { value: Fyear }] = dft.formatToParts(d);
  return `${Fday} ${Fmonth}, ${Fyear}`;
};
