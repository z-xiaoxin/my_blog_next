export const letters = [
  " ",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

/**
 * Description : 获取目标字符串的动画效果
 * @param {any} target:string
 * @param {any} cb:(str:string
 * @returns {any} */
export const getTargetWord = (
  target: string,
  cb: (str: string) => void,
  /** 帧率 */
  fps: number = 60
) => {
  /** 最新一次触发时间 */
  let lastTime = 0;
  /** 每帧间隔 */
  const interval = 1000 / fps;

  const targetArr = target.split("");
  const status = { finished: false };
  const resultArr: string[] = [];

  let currentIndex = 0;
  let arrIndex = 0;

  const updateCurrentStr = (time: number) => {
    const arrLetter = letters[arrIndex] ?? "unknown";

    if (time - lastTime >= interval) {
      // 触发帧
      resultArr.splice(currentIndex, 1, arrLetter);
      if (
        arrLetter === targetArr[currentIndex].toLocaleLowerCase() ||
        arrLetter === "unknown"
      ) {
        resultArr.splice(currentIndex, 1, targetArr[currentIndex]);
        currentIndex++;
        arrIndex = 0;
      } else {
        arrIndex++;
      }

      cb(resultArr.join(""));
      lastTime = time;
    }

    if (currentIndex < targetArr.length) {
      requestAnimationFrame(updateCurrentStr);
    } else {
      status.finished = true;
    }
  };

  requestAnimationFrame(updateCurrentStr);

  return status;
};
