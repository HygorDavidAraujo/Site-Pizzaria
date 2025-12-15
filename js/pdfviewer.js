/* Minimal PDF.js viewer wrapper
   Uses PDF.js from unpkg CDN. Renders a single canvas with simple prev/next and zoom controls.
*/
(function () {
  const url = 'pdf/cardapio.pdf';

  document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pdf-canvas');
    if (!canvas) {
      console.warn('PDF viewer: canvas #pdf-canvas not found in DOM.');
      return;
    }

    const ctx = canvas.getContext('2d');
  let pdfDoc = null;
  let pageNum = 1;
  // userScale is the user-adjustable zoom multiplier (1.0 = fit-to-width)
  let userScale = 1.0;

    function renderPage(num) {
      if (!pdfDoc) return;
      pdfDoc.getPage(num).then(function (page) {
        try {
          // Determine container width so we can compute a scale that fits horizontally
          const container = document.querySelector('.pdf-canvas-container') || document.getElementById('pdf-viewer-wrapper');
          const containerWidth = container ? container.clientWidth : Math.min(window.innerWidth, 1000);

          // Get the page at scale=1 to learn the intrinsic width
          const unscaledViewport = page.getViewport({ scale: 1 });

          // targetScale will make the PDF page's CSS width equal container width, multiplied by userScale
          let targetScale = (containerWidth / unscaledViewport.width) * userScale;
          // clamp to reasonable bounds
          targetScale = Math.max(0.5, Math.min(3, targetScale));

          const viewport = page.getViewport({ scale: targetScale });

          // Set canvas to the pixel dimensions required by PDF.js render. Use CSS to make it responsive.
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.height = 'auto';

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          page.render(renderContext).promise.then(function () {
            const current = document.getElementById('pdf-current');
            if (current) current.textContent = pageNum;
          }).catch(function(err){
            console.error('Error rendering PDF page:', err);
          });
        } catch (err) {
          console.error('Error in renderPage:', err);
        }
      }).catch(function(err){
        console.error('Error getting PDF page:', err);
      });
    }

    function queueRenderPage(num) {
      if (pdfDoc) renderPage(num);
    }

    function onPrevPage() {
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    }

    function onNextPage() {
      if (!pdfDoc) return;
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      queueRenderPage(pageNum);
    }

    function onZoomIn() {
      userScale = Math.min(userScale + 0.25, 3);
      queueRenderPage(pageNum);
    }

    function onZoomOut() {
      userScale = Math.max(userScale - 0.25, 0.5);
      queueRenderPage(pageNum);
    }

    // Wire up buttons
    const prev = document.getElementById('pdf-prev');
    const next = document.getElementById('pdf-next');
    const zin = document.getElementById('pdf-zoom-in');
    const zout = document.getElementById('pdf-zoom-out');

    if (prev) prev.addEventListener('click', onPrevPage);
    if (next) next.addEventListener('click', onNextPage);
    if (zin) zin.addEventListener('click', onZoomIn);
    if (zout) zout.addEventListener('click', onZoomOut);

    function initPdf() {
      try {
        if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js';
        }

        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function (pdf) {
          pdfDoc = pdf;
          const total = document.getElementById('pdf-total');
          if (total) total.textContent = pdf.numPages;
          renderPage(pageNum);
        }).catch(function (err) {
          console.error('Error loading PDF document:', err);
          const download = document.getElementById('pdf-download');
          if (download) download.style.display = 'inline-block';

          // Fallback: if PDF.js can't load (CORS/worker issues), replace viewer with an iframe/object
          try {
            const wrapper = document.getElementById('pdf-viewer-wrapper');
            if (wrapper) {
              wrapper.innerHTML = '';
              // Prefer <iframe> which uses browser native PDF viewer (works in Chrome/Edge)
              const iframe = document.createElement('iframe');
              iframe.src = url;
              iframe.width = '100%';
              iframe.height = '600';
              iframe.title = 'Cardápio Pizzaria Paulista (PDF)';
              iframe.setAttribute('role', 'document');
              iframe.setAttribute('aria-label', 'Cardápio em PDF');
              iframe.style.border = '0';
              wrapper.appendChild(iframe);
            }
          } catch (e) {
            console.error('Fallback iframe creation failed:', e);
          }
        });
      } catch (e) {
        console.error('PDF.js initialization error:', e);
      }
    }

    // Load PDF.js: try local vendor first, then CDN as fallback. This helps when files are served locally
    // Local paths (recommended to self-host for production)
    const LOCAL_PDFJS = 'js/vendor/pdf.min.js';
    const LOCAL_WORKER = 'js/vendor/pdf.worker.min.js';
    const CDN_PDFJS = 'https://unpkg.com/pdfjs-dist/build/pdf.min.js';
    const CDN_WORKER = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js';

    function setWorkerSrcAndInit(useLocalWorker) {
      try {
        if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = useLocalWorker ? LOCAL_WORKER : CDN_WORKER;
        }
      } catch (e) {
        console.warn('Could not set pdfjs workerSrc:', e);
      }
      initPdf();
    }

    if (typeof pdfjsLib === 'undefined') {
      // Try local vendor first
      const sLocal = document.createElement('script');
      sLocal.src = LOCAL_PDFJS;
      sLocal.crossOrigin = 'anonymous';
      sLocal.onload = function () {
        // local loader script added — it may itself inject the real pdf.js bundle.
        // Wait until pdfjsLib is available before continuing to initialization.
        var waitForLib = function (attemptsLeft) {
          if (window.pdfjsLib) {
            setWorkerSrcAndInit(true);
            return;
          }
          if (attemptsLeft <= 0) {
            console.warn('pdfviewer: pdfjsLib did not become available after loading local script. Falling back to CDN.');
            // fallback to CDN
            var s = document.createElement('script');
            s.src = CDN_PDFJS;
            s.crossOrigin = 'anonymous';
            s.onload = function () { setWorkerSrcAndInit(false); };
            s.onerror = function (e) { console.error('Failed to load PDF.js from CDN or local path:', e); };
            document.head.appendChild(s);
            return;
          }
          // try again shortly
          setTimeout(function () { waitForLib(attemptsLeft - 1); }, 150);
        };
        waitForLib(40); // ~6 seconds max wait
      };
      sLocal.onerror = function () {
        // fallback to CDN
        const s = document.createElement('script');
        s.src = CDN_PDFJS;
        s.crossOrigin = 'anonymous';
        s.onload = function () { setWorkerSrcAndInit(false); };
        s.onerror = function (e) { console.error('Failed to load PDF.js from CDN or local path:', e); };
        document.head.appendChild(s);
      };
      document.head.appendChild(sLocal);
    } else {
      // pdfjs already present on page
      setWorkerSrcAndInit(false);
    }
  });
})();
