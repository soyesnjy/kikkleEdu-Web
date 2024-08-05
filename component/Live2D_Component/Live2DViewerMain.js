/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  cubism2Model_shizuku,
  cubism2Model_haru,
  cubism2Model_Mao,
  cubism2Model_Hiyori,
  cubism2Model_Wanko,
} from './Live2DModel';

async function cubismModelCall(model) {
  const result = await PIXI.live2d.Live2DModel.from(model);
  return result;
}

const model_class = {
  shizuku: {
    avarta_model: cubism2Model_shizuku,
    scale: 0.3,
  },
  mao: {
    avarta_model: cubism2Model_Mao,
    scale: 0.065,
  },
  haru: { avarta_model: cubism2Model_haru, scale: 0.12 },
  Hiyori: { avarta_model: cubism2Model_Hiyori, scale: 0.127 },
  Wanko: { avarta_model: cubism2Model_Wanko, scale: 0.37 },
};

export default function Live2DViewerMain({ avartar }) {
  const canvasRef = useRef(null);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const { avarta_model, scale } = model_class[avartar];
    const app = new PIXI.Application({
      view: canvasRef.current,
      // width: window.innerWidth < 768 ? 160 : 370,
      width: 370, // 캔버스 너비
      height: 630, // 캔버스 높이
      transparent: true,
    });
    console.log(app);
    cubismModelCall(avarta_model).then((model) => {
      app.stage.addChild(model);
      model.scale.set(scale);

      // 클릭 이벤트
      model.on('click', () => {
        // 랜덤한 표정 및 동작 발생
        model.motion('TapBody', parseInt(Math.random() * 10) % 6);
        model.expression(parseInt(Math.random() * 10) % 8);
      });
    });

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <motion.div ref={constraintsRef}>
      <motion.div drag dragConstraints={constraintsRef}>
        <canvas ref={canvasRef}></canvas>
      </motion.div>
    </motion.div>
  );
}
