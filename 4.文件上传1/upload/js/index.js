// 快捷方式：将document.querySelector方法简写为$
const $ = document.querySelector.bind(document);

// DOM元素集合
const doms = {
  img: $(".preview"), // 图片预览区域
  container: $(".upload"), // 上传容器主体
  select: $(".upload-select"), // 文件选择区域
  selectFile: $(".upload-select input"), // 隐藏的file input
  progress: $(".upload-progress"), // 进度条容器
  cancelBtn: $(".upload-progress button"), // 取消上传按钮
  delBtn: $(".upload-result button"), // 删除按钮
};

// 切换显示区域（通过修改容器className）
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}

// 更新进度条显示（通过CSS变量控制）
function setProgress(value) {
  doms.progress.style.setProperty("--percent", value);
}

// 监听文件选择
doms.selectFile.onchange = (e) => {
  const file = e.target.files[0];
  showArea("progress");
  setProgress(0);
  // 预览操作，需要获取dataURL(所有能够使用url的地方都可以使用dataURL)
  const reader = new FileReader();
  // 所有的I/O操作都是异步的
  reader.onload = (e) => {
    doms.img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  // 图片上传
  upload(file);
};

function upload(file) {
  const xhr = new XMLHttpRequest(); // 只有XML支持进度事件
  const url = "http://localhost:9527/upload/single";
  //  配置请求
  xhr.open("POST", url);
  // 监听进度事件
  xhr.upload.onprogress = (e) => {
    // 计算百分比
    let percent = Math.floor((e.loaded / e.total) * 100);
    setProgress(percent);
  };
  // 监听上传完成事件
  xhr.onload = () => {
    showArea("result");
  };
  // 通过FormData对象构建请求体，
  const formData = new FormData();
  formData.append("avatar", file);
  xhr.send(formData);

  // 监听取消上传事件
  doms.cancelBtn.onclick = () => {
    xhr.abort();
    showArea("select");
  };
}

// 监听删除按钮点击事件
doms.delBtn.onclick = () => {
  showArea("select");
};
