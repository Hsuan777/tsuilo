import axios from "axios";
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  async upload() {
    const data = new FormData();
    data.append("file", await this.loader.file);
    const res = await axios({
      // url: process.env.VUE_APP_BASE_URL + "upload/image",
      url: "http://localhost:3000/upload/image",
      method: "POST",
      data,
      // withCredentials: true,
    });

    console.log(res.data);
    return {
      default: res.data.imgUrl,
    };
  }
}

export default MyUploadAdapter;
