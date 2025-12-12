"use client";

import React, { useEffect, useRef, useState } from "react";

type ScratchCardProps = {
  width: number;
  height: number;
  onReveal: () => void;
  children: React.ReactNode;
};

const SCRATCH_THRESHOLD = 0.5; // 30% revelado
const BRUSH_SIZE = 28;

export function ScratchCard({ width, height, onReveal, children }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const revealed = useRef(false);
  const deviceRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaledWidth = width * deviceRatio;
    const scaledHeight = height * deviceRatio;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(deviceRatio, deviceRatio);
    ctx.globalCompositeOperation = "source-over";
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(255, 240, 245, 0.95)");
    gradient.addColorStop(1, "rgba(253, 216, 255, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fillRect(0, 0, width, height);
  }, [width, height, deviceRatio]);

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas || revealed.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_SIZE, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  }

  function getPointerPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (revealed.current) return;
    isDrawing.current = true;
    const pos = getPointerPos(e);
    if (pos) scratch(pos.x, pos.y);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing.current || revealed.current) return;
    const pos = getPointerPos(e);
    if (pos) scratch(pos.x, pos.y);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    isDrawing.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function checkReveal() {
    const canvas = canvasRef.current;
    if (!canvas || revealed.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const imageData = ctx.getImageData(0, 0, cw, ch);
    const totalPixels = imageData.data.length / 4;
    let transparent = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) {
        transparent++;
      }
    }

    const revealedPercent = transparent / totalPixels;
    if (revealedPercent >= SCRATCH_THRESHOLD) {
      revealed.current = true;
      onReveal();
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-dashed border-pink-300 bg-gradient-to-br from-pink-50 to-pink-100 p-4 shadow-sm"
      style={{ width, maxWidth: "100%" }}
    >
      <div
        className="flex items-center justify-center text-center text-lg font-semibold text-pink-600 rounded-xl bg-white/70"
        style={{ minHeight: `${height}px` }}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute left-4 top-4 rounded-xl touch-none"
        style={{ width, height }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}
