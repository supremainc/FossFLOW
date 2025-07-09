import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

export const generateGenericFilename = (extension: string) => {
  return `fossflow-export-${new Date().toISOString()}.${extension}`;
};

export const base64ToBlob = (
  base64: string,
  contentType: string,
  sliceSize = 512
) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  return blob;
};

export const downloadFile = (data: Blob, filename: string) => {
  FileSaver.saveAs(data, filename);
};

export const exportAsImage = async (el: HTMLDivElement) => {
  const imageData = await domtoimage.toPng(el, {
    cacheBust: true,
    style: {
      transform: 'scale(1)',
      transformOrigin: 'top left'
    }
  });

  return imageData;
};
