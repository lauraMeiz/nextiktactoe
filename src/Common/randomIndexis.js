import rand from "./rand";

export default function randomIndexis(i) {
  const celis = [];

  while (celis.length < 9) {
    // for (let i = 0; i < 9; i++) {
    const ran = rand(0, 8);
    if (!celis.includes(ran)) {
      celis.push(ran);
    }
  }
  celis.forEach((e) => {
    celis[i] = e;
  });
  return celis[i];
}
