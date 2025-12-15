PDF.js vendor stubs

This directory contains small stub files that provide same-origin URLs for the
PDF.js runtime and worker while delegating the actual heavy code to the CDN.

Why these stubs?
- They allow the page to set a workerSrc that points to a same-origin path
  (important to avoid some worker/CORS initialization problems).
- They avoid committing very large minified files into the repository while
  keeping the viewer functional.

Recommended (production):
- Replace `pdf.min.js` with the official minified runtime (copy from the
  pdf.js distribution) and `pdf.worker.min.js` with the official worker build.
  This is the most robust and offline-friendly option.

To replace with the real files (quick steps):
1. Download from CDN (example):
  https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.min.js
  https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js
2. Save them as `pdf.min.js` and `pdf.worker.min.js` in this directory, overwriting
   the stubs.

Notes:
- The viewer script (`js/pdfviewer.js`) already prefers these local paths and
  falls back to CDN if needed.
- If you want fully offline hosting, make sure both files are the actual builds.
