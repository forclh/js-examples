import * as map from "./map.js";

/**
 * 获取传入的位置在传入的方向上下一步的信息
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} direction 方向 'up' 'down' 'left' 'right'
 * @param {Array<Array>} position 表示地图位置的二维数组
 * @returns {Object} {row, col, value} 返回下一步的信息
 */
const getNextInfo = (row, col, direction, position) => {
  switch (direction) {
    case "up":
      return {
        row: row - 1,
        col,
        value: position[row - 1][col],
      };
    case "down":
      return {
        row: row + 1,
        col,
        value: position[row + 1][col],
      };
    case "left":
      return {
        row,
        col: col - 1,
        value: position[row][col - 1],
      };
    case "right":
      return {
        row,
        col: col + 1,
        value: position[row][col + 1],
      };
  }
};

/**
 * 获取玩家的位置信息
 * @param {Array<Array>} position 表示地图位置的二维数组
 * @returns {Object} {row, col} 玩家在地图中的位置
 */
const getPlayerPosition = (position) => {
  for (let row = 0; row < map.mapRows; row++) {
    for (let col = 0; col < map.mapCols; col++) {
      if (position[row][col] === map.PLAYER) {
        return { row, col };
      }
    }
  }
  throw new Error("玩家不在地图中");
};

/**
 * 交换两个位置的值(移动)
 * @param {Object} pos1 位置1 {row, col}
 * @param {Object} pos2 位置2 {row, col}
 * @param {Array<Array>} position 表示地图位置的二维数组
 */
const exchange = (pos1, pos2, position) => {
  const temp = position[pos1.row][pos1.col];
  position[pos1.row][pos1.col] = position[pos2.row][pos2.col];
  position[pos2.row][pos2.col] = temp;
};

/**
 * 按照指定的方向，移动玩家一步
 * @param {String} direction 方向 'up' 'down' 'left' 'right'
 * @returns {Boolean} 是否移动成功
 */
export const playerMove = (direction) => {
  // 获取玩家的位置信息
  const playerPostion = getPlayerPosition(map.position);
  // console.log("玩家位置:", playerPostion);
  // 获取下一步的信息
  const nextInfo = getNextInfo(
    playerPostion.row,
    playerPostion.col,
    direction,
    map.position
  );
  // console.log("下一步位置:", nextInfo);

  switch (nextInfo.value) {
    // 1.下一个位置是墙：无法移动
    case map.WALL:
      // console.log("无法移动");
      return false;
    // 2.下一个位置是空白：直接移动
    case map.SPACE:
      exchange(playerPostion, nextInfo, map.position);
      return true;
    // 3.下一个位置是箱子：根据箱子的下一个位置判断是否能够移动
    case map.BOX:
      // 3.1 获取箱子的下一步信息
      const nextNextInfo = getNextInfo(
        nextInfo.row,
        nextInfo.col,
        direction,
        map.position
      );
      if (nextNextInfo.value === map.SPACE) {
        // 3.2 如果箱子的下一个位置是空白，则移动箱子和玩家
        exchange(nextInfo, nextNextInfo, map.position);
        exchange(playerPostion, nextInfo, map.position);
        return true;
      } else {
        // 3.3 如果箱子的下一个位置不是空白，则无法移动
        return false;
      }
  }
};

/**
 * 判断游戏是否胜利
 */
export const isWin = () => {
  // 是否每个正确位置上都有箱子
  for (const pos of map.correctBox) {
    if (map.position[pos.x][pos.y] !== map.BOX) {
      return false;
    }
  }
  return true;
};
