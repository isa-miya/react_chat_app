const multer = require('multer');
const path = require('path');
const HttpError = require('../util/http-error');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new HttpError('画像ファイルを添付してください', 400), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;