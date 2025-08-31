"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./WaveUp.scss";
import { getUniId } from "@/utils/handle";

interface IFireItem {
  id: string;
  width: string;
  height: string;
  left: string;
  backgroundColor: string;
}

function WaveUp() {
  const [waveColor, setWaveColor] = useState("rgb(72, 117, 232)");
  const [fireList, setFireList] = useState<IFireItem[]>([]);
  const waveBoxRef = useRef<HTMLUListElement>(null);
  const waveWidth = useRef(0);
  const fpsRef = useRef(120);
  const lastTimeRef = useRef(0);

  const interval = useMemo(() => {
    return 1000 / fpsRef.current;
  }, [fpsRef]);

  const updateFireList = useCallback(
    (time: number) => {
      if (time - lastTimeRef.current >= interval) {
        const randomSize = Math.random();
        const randomPosition = Math.random();
        const boxSize = randomSize * 80 + 100;
        const offsetLeft =
          randomPosition * waveWidth.current > waveWidth.current - boxSize
            ? randomPosition * waveWidth.current - boxSize
            : randomPosition * waveWidth.current;

        const id = getUniId(fireList.map((i) => i.id));

        fireList.push({
          id,
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: `${offsetLeft}px`,
          backgroundColor: waveColor,
        });
        setFireList([...fireList]);

        setTimeout(() => {
          fireList.splice(0, 1);
          setFireList([...fireList]);
        }, 3000);
        lastTimeRef.current = time;
      }
      requestAnimationFrame(updateFireList);
    },
    [waveColor, fireList, interval]
  );

  useEffect(() => {
    waveWidth.current = waveBoxRef.current?.offsetWidth ?? 0;

    requestAnimationFrame(updateFireList);
  }, []);

  return (
    <div className="w-full fixed bottom-0 left-0 z-[-1]">
      <div className="relative h-[500px] overflow-hidden scale-110">
        <ul
          ref={waveBoxRef}
          className="waveBox absolute top-0 left-0 w-full h-[500px] bg-primary-bg"
        >
          <li
            style={{ background: waveColor }}
            className="w-full h-[150px] rounded-2xl absolute bottom-0 left-0 transition-all"
          ></li>
          {fireList.map((item) => (
            <li
              key={item.id}
              style={{
                left: item.left,
                width: item.width,
                height: item.height,
                background: item.backgroundColor,
              }}
              className="absolute rounded-full bottom-0 waveBoxUp transition-all"
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WaveUp;

{
  /* <template>
  <div class="w-full">
    <div class="relative h-[500px] overflow-hidden">
      <ul class="waveBox absolute top-0 left-0 w-full h-[500px] bg-white">
        <li
          :style="`background:${color}`"
          class="w-full h-[200px] absolute bottom-0 left-0 transition-all"
        ></li>
      </ul>
      <div
        class="absolute bottom-0 text-[20px] left-0 w-1/2 h-[200px] flex items-center justify-center z-30"
      >
        要实现上述的没有融合效果的效果，使用 CSS 是不难的，核心要做的，就是让 N
        个圆形元素，从底部无规律地进行向上升起的动画。
        再在上述动画的基础之上，给父容器，添加上filter: contrast() 与 filter:
        blur() 的组合， 就能够完美地得到这样一个复刻效果：
      </div>
      <ul>
        <li></li>
        <ol></ol>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const color = ref("rgb(232, 72, 91)");
setTimeout(() => {
  color.value = "rgb(72, 117, 232)";
}, 3000);
onMounted(() => {
  const waveBox = document.querySelector(".waveBox") as HTMLUListElement;
  const waveWidth = waveBox.offsetWidth;

  setInterval(() => {
    const randomSize = Math.random();
    const randomPosition = Math.random();
    const boxSize = randomSize * 80 + 100;
    const offsetLeft =
      randomPosition * waveWidth > waveWidth - boxSize
        ? randomPosition * waveWidth - boxSize
        : randomPosition * waveWidth;

    const vLi = document.createElement("li");
    vLi.classList.add(
      "rounded-full",
      "absolute",
      "bottom-0",
      "waveBoxUp",
      "transition-all"
    );
    vLi.style.width = `${boxSize}px`;
    vLi.style.height = `${boxSize}px`;
    vLi.style.left = `${offsetLeft}px`;
    vLi.style.backgroundColor = color.value;

    waveBox.appendChild(vLi);
    setTimeout(() => vLi.remove(), 3000);
  }, 5);
});
</script>

<style>
@keyframes upAnimation {
  0% {
    scale: 1;
    transform: translateY(0);
  }
  70% {
    scale: 0.4;
    opacity: 0.1;
  }
  100% {
    scale: 0.4;
    opacity: 0;
    transform: translateY(-1000px);
  }
}

.waveBoxUp {
  animation: upAnimation 3s forwards;
}

.waveBox {
  filter: blur(10px) contrast(15);
}
</style> */
}
