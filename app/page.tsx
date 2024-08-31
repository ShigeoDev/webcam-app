'use client'

import { useRef } from 'react'
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { drawHand } from './utils/draw'

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('handpose');

    setInterval(() => {
      detect(net);
    }, 100)

  }

  const detect = async (net: any) => {
    if (
      webcamRef.current &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;


      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }

      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx = canvasRef.current?.getContext('2d');
      drawHand(hand, ctx);
    }



  }

  runHandpose();

  return (
    <div>
      <Webcam ref={webcamRef} className="w-screen h-screen" />
      <canvas ref={canvasRef} className="w-screen hscreen" />
    </div>
  );
}
