'use client'

import { useRef } from 'react'
import * as handpose from "@tensorflow-models/handpose"
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam"
import { drawHand } from '../utils/draw'

export default function WebcamVideo() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('handpose');

    setInterval(() => {
      detect(net);
    }, 0)

  }

  const detect = async (net: any) => {
    if (
      webcamRef.current &&
      webcamRef.current.video?.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;


      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx = canvasRef.current?.getContext('2d');
      drawHand(hand, ctx);
    }



  }

  runHandpose();

  return (
    <div className="">
      <Webcam ref={webcamRef} mirrored={true} className="absolute m-auto left-0 right-0 text-center w-full" />
      <canvas ref={canvasRef} className="absolute m-auto left-0 right-0 text-center w-full scale-x-[-1]" />
    </div>
  );
}
