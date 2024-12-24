(function () {
  // 初始化
  // 1. 将列表中的第一个元素，克隆到列表的最后一个位置（无缝滚动）
  const list = document.querySelector(".list");

  // 克隆列表的第一个元素
  function cloneFirstItem() {
    const firstItem = list.firstElementChild; // 获取第一个元素
    const newItem = firstItem.cloneNode(true); // 深度克隆第一个元素
    list.appendChild(newItem); // 将克隆的元素添加到列表末尾
  }
  cloneFirstItem();

  // 2. 滚动：每隔一段时间把列表滚动一格
  const SCROLL_INTERVAL = 2000; // 滚动的时间间隔（毫秒）
  const SCROLL_DURATION = 300; // 一次滚动所需要的时间（毫秒）
  const TIME_STEP = 10; // 一次变化的时间间隔（毫秒）
  let curIndex = 0; // 当前滚动到的位置

  const itemHeight = list.firstElementChild.offsetHeight; // 每一次滚动的距离
  const totalItems = list.children.length; // 列表中元素的总数

  setInterval(scrollNext, SCROLL_INTERVAL);

  /**
   * 将列表滚动到下一个位置
   */
  function scrollNext() {
    let from = curIndex * itemHeight; // 滚动的起始位置
    curIndex++;
    let to = curIndex * itemHeight; // 滚动的目标位置
    let times = SCROLL_DURATION / TIME_STEP; // 一次滚动变化的次数
    let dis = itemHeight / times; // 一次变化的位移

    // 让scrollTop慢慢从from到to
    let timerId = setInterval(function () {
      from += dis;
      if (from >= to) {
        // 到达目标位置
        clearInterval(timerId); // 停止计数器
        // 滚动完成后，如果是最后一项，则重置
        if (curIndex === totalItems - 1) {
          from = 0;
          curIndex = 0;
        }
      }
      list.scrollTop = from;
    }, TIME_STEP);
  }
})();
