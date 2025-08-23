import path from "path";

const CONFIG = {
  files: {
    uploadPath: process.env.UPLOAD_PATH || path.join(process.cwd(), "uploads"),
  },
};

export default CONFIG;
