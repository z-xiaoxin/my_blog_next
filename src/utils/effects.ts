export const letters = [
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
  " ",
];

export const getTargetWord = (target: string, cb: (str: string) => void) => {
  const targetArr = target.split("");

  const status = { finished: false };

  const resultArr: string[] = [];

  let currentIndex = 0;
  let arrIndex = 0;

  const updateCurrentStr = () => {
    const arrLetter = letters[arrIndex] ?? "unknown";

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
    if (currentIndex < targetArr.length) {
      requestAnimationFrame(updateCurrentStr);
    } else {
      status.finished = true;
    }
  };

  requestAnimationFrame(updateCurrentStr);

  return status;
};
