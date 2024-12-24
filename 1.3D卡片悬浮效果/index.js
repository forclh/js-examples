const card = document.querySelector(".card");

const range = [-10, 10]; // 旋转的范围

function getRotation(range, mousePos, mouseRange) {
  return ((range[1] - range[0]) / mouseRange) * mousePos + range[0];
}

card.onmousemove = (e) => {
  const { offsetX, offsetY } = e;
  const { width, height } = card.getBoundingClientRect();
  const rx = getRotation(range, offsetY, width);
  const ry = -getRotation(range, offsetX, height);
  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
};

card.onmouseleave = (e) => {
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};
