"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "@/components/ui/Button";
import { isAdminSession } from "@/lib/adminAuth";
import { useLanguage } from "@/lib/LanguageContext";
import { eyebrowClass, getUiCopy } from "@/lib/uiCopy";

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
  const { language } = useLanguage();
  const t = getUiCopy(language);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminSession());
  }, []);

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
    setStatus(t.qrDownloaded);
    window.setTimeout(() => setStatus(null), 1800);
  }, [filename, t.qrDownloaded]);

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
        setStatus(t.qrShared);
      } else if (navigator.share) {
        await navigator.share({
          title,
          text: title,
          url: value,
        });
        setStatus(t.qrShared);
      } else {
        await navigator.clipboard.writeText(value);
        setStatus(t.qrLinkCopied);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(value);
        setStatus(t.qrLinkCopied);
      } catch {
        setStatus(t.qrUnavailable);
      }
    }

    window.setTimeout(() => setStatus(null), 1800);
  }, [canvasToBlob, filename, t.qrLinkCopied, t.qrShared, t.qrUnavailable, title, value]);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-navy/[0.03] p-6">
      <p
        className={`mb-4 font-heading font-semibold text-royal-gold ${eyebrowClass(language, "sm")}`}
      >
        {t.scanDirections}
      </p>

      <div className="rounded-xl border border-navy/10 bg-white p-3 shadow-sm">
        <QRCodeCanvas
          ref={canvasRef}
          value={value}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#11294d"
          level="M"
          includeMargin
        />
      </div>

      {isAdmin && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button type="button" variant="primary" onClick={shareQr}>
            {t.shareQr}
          </Button>
          <Button type="button" variant="outline" onClick={downloadQr}>
            {t.downloadQr}
          </Button>
        </div>
      )}

      {isAdmin && status && (
        <p className="mt-3 font-heading text-xs font-medium text-navy/70" aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}
