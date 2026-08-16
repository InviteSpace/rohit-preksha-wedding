"use client";

import { useCallback, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "@/components/ui/Button";

interface QrShareDownloadProps {
  value: string;
  title: string;
  filename?: string;
  size?: number;
}

export default function QrShareDownload({
  value,
  title,
  filename = "wedding-qr",
  size = 150,
}: QrShareDownloadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const canvasToBlob = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  }, []);

  const downloadQr = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${filename}.png`;
    link.click();
    setStatus("Downloaded");
    window.setTimeout(() => setStatus(null), 1800);
  }, [filename]);

  const shareQr = useCallback(async () => {
    const blob = await canvasToBlob();
    const file = blob
      ? new File([blob], `${filename}.png`, { type: "image/png" })
      : null;

    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text: `${title}\n${value}`,
        });
        setStatus("Shared");
      } else if (navigator.share) {
        await navigator.share({
          title,
          text: title,
          url: value,
        });
        setStatus("Shared");
      } else {
        await navigator.clipboard.writeText(value);
        setStatus("Link copied");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(value);
        setStatus("Link copied");
      } catch {
        setStatus("Share unavailable");
      }
    }

    window.setTimeout(() => setStatus(null), 1800);
  }, [canvasToBlob, filename, title, value]);

  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-gold/30 bg-ivory p-6">
      <p className="mb-4 font-heading text-xs tracking-wider text-sage uppercase">
        Scan for Directions
      </p>

      <QRCodeCanvas
        ref={canvasRef}
        value={value}
        size={size}
        bgColor="#FFFBF7"
        fgColor="#3D2B2B"
        level="M"
        includeMargin
      />

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" variant="primary" onClick={shareQr}>
          Share QR
        </Button>
        <Button type="button" variant="outline" onClick={downloadQr}>
          Download QR
        </Button>
      </div>

      {status && (
        <p className="mt-3 font-body text-xs text-sage" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}
