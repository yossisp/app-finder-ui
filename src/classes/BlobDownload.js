import constants from '../constants.js';

class BlobDownload {
  constructor(window, blob, fileName, contentType) {
    this.window = window;
    this.document = window.document;
    this.blob = blob;
    this.fileName = fileName;
    this.contentType = contentType;
  }

  /*
  createObjectURL is a sync function
  that's why it's wrapped in a promise
   */
  createObjectURLPromisifed = blob => {
    return new Promise((resolve, reject) => {
      const blobURL = this.window.URL.createObjectURL(blob);
      blobURL ? resolve(blobURL) : reject();
    });
  }

  click = (node) => {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      const evt = this.document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, this.window, 0, 0, 0, 80,
        20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  };

  download = async () => {
    const blob = new Blob([this.blob], { type: this.contentType });
    const a = this.document.createElement('a');
    a.download = this.fileName;
    a.href = await this.createObjectURLPromisifed(blob);
    setTimeout(() => { this.click(a) }, 0)
    setTimeout(() => { this.window.URL.revokeObjectURL(a.href) },
      constants.RESULT_CSV_DL_URL_REVOKE_TIME)
  }
}

export default BlobDownload;