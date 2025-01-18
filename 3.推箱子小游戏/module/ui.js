/**
 * 该模块用于将地图显示到页面上
 */
import * as map from "./map.js";
const divContianer = document.querySelector("#game");
// 一个方块的宽度和高度
const pieceWidth = 45;
const pieceHeight = 45;

/**
 * 设置div的宽度和高度
 */
const setDivContainer = () => {
  divContianer.style.width = pieceWidth * map.mapCols + "px";
  divContianer.style.height = pieceHeight * map.mapRows + "px";
};

/**
 * 判断当前位置是否为正确位置
 */
const isCorrectBox = (row, col) => {
  return map.correctBox.some((item) => item.x === row && item.y === col);
};

/**
 * 设置当前位置的元素
 */
const setOnePiece = (row, col) => {
  // 获取当前位置的值
  const value = map.position[row][col];
  const piece = document.createElement("div");
  piece.classList.add("item");
  // 调整div的位置
  piece.style.left = col * pieceWidth + "px";
  piece.style.top = row * pieceHeight + "px";
  // 根据值设置div的类型
  switch (value) {
    case map.PLAYER:
      piece.classList.add("player");
      break;
    case map.WALL:
      piece.classList.add("wall");
      break;
    case map.BOX:
      // 判断是否为正确位置
      isCorrectBox(row, col)
        ? piece.classList.add("correct-box")
        : piece.classList.add("box");
      break;
    case map.SPACE:
      // 判断是否为正确位置
      if (isCorrectBox(row, col)) {
        piece.classList.add("correct");
      } else {
        return;
      }
  }
  return piece;
};

/**
 * 根据地图显示页面中的元素内容
 */
const setDivContent = () => {
  // 1. 清空容器
  divContianer.innerHTML = "";
  // 2. 显示地图中的内容
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < map.mapRows; row++) {
    for (let col = 0; col < map.mapCols; col++) {
      const piece = setOnePiece(row, col);
      if (piece) {
        fragment.appendChild(piece);
      }
    }
  }
  divContianer.appendChild(fragment);
};
/**
 * 该函数用于渲染地图
 */
export default function showUI() {
  // 1. 设置div的宽度和高度
  setDivContainer();
  // 2. 显示地图中的内容
  setDivContent();
}
