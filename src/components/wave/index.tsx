import { useEffect, useRef } from "react";
import utils from "@/styles/utils";

const Wave = () => {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!ref) return;

    const canvas = document.createElement("canvas");
    canvas.width = window.screen.width / 6 - 60;
    canvas.height = 10;

    const charMap = " .:-=+*#%@";
    const ctx = canvas.getContext("2d");
    let textData: string[] = [];

    const imageData = ctx!.createImageData(canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const brightness = Math.floor(255 * Math.random());
        imageData.data[index] = brightness;
        imageData.data[index + 1] = brightness;
        imageData.data[index + 2] = brightness;
        imageData.data[index + 3] = 255;
      }
    }
    ctx!.putImageData(imageData, 0, 0);

    textData = [];
    const imgData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
      let row = "";
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const brightness = imgData.data[index];
        const charIndex = Math.floor((brightness / 255) * (charMap.length - 1));
        row += charMap[charIndex];
      }
      textData.push(row);
    }

    function animate(time: number) {
      if (ref.current) {
        ref.current.innerHTML = "";
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radiusFactor = 5;
        const distortionFactor = Math.sin(time * 0.002) * 2;

        for (let y = 0; y < textData.length; y++) {
          const row = textData[y].split("");
          for (let x = 0; x < row.length; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle =
              Math.atan2(dy, dx) + time * 0.002 + distance / radiusFactor;
            const offset = Math.floor(
              Math.sin(angle) * 3 +
                Math.cos(time * 0.005 + distance) * distortionFactor
            );
            const newIndex = (x + offset + row.length) % row.length;
            row[x] = textData[y][newIndex];
          }
          ref.current.innerHTML += row.join("") + "\n";
        }

        // ref.current.innerHTML = "";
        // const centerX = canvas.width / 2;
        // const centerY = canvas.height / 2;
        // const radiusFactor = 5;

        // for (let y = 0; y < textData.length; y++) {
        //   const row = textData[y].split("");
        //   for (let x = 0; x < row.length; x++) {
        //     const dx = x - centerX;
        //     const dy = y - centerY;
        //     const distance = Math.sqrt(dx * dx + dy * dy);
        //     const angle =
        //       Math.atan2(dy, dx) + time * 0.002 + distance / radiusFactor;
        //     const offset = Math.floor(Math.sin(angle) * 3);
        //     const newIndex = (x + offset + row.length) % row.length;
        //     row[x] = textData[y][newIndex];
        //   }
        //   ref.current.innerHTML += row.join("") + "\n";
        // }
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);

    return () => {
      canvas.remove();
    };
  }, [ref]);

  return <utils.wave ref={ref} />;
};

export default Wave;
