/**
 * Resizes and compresses an image file to a small base64 string
 * suitable for localStorage persistence (max 1000px width/height, 0.75 JPEG quality).
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (e) => reject(e);
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = (e) => reject(e);
      img.onload = () => {
        const maxDim = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback if canvas context is not available
          resolve(event.target?.result as string);
          return;
        }

        // Fill background and draw image
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Compress as high-efficiency JPEG
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
        resolve(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
