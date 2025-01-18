import { playerMove, isWin } from "./play.js";
import showUI from "./ui.js";
// 完成整个游戏

// 渲染UI
showUI();

let over = false;
window.addEventListener("keydown", function (e) {
  if (over) return;
  let result = false;
  switch (e.key) {
    case "ArrowUp":
      result = playerMove("up");
      break;
    case "ArrowDown":
      result = playerMove("down");
      break;
    case "ArrowLeft":
      result = playerMove("left");
      break;
    case "ArrowRight":
      result = playerMove("right");
      break;
  }
  if (result) {
    // 刷新页面
    showUI();
    if (isWin()) {
      console.log("恭喜你，游戏胜利！");
      over = true;
    }
  }
});
