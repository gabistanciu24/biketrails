import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gpx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      "Error: Invalid file type! Only JPEG, JPG, PNG, and GPX files are allowed."
    );
  }
}

export const uploadFiles = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "postPicture", maxCount: 1 },
  { name: "photoGallery", maxCount: 10 },
  { name: "gpxTrail", maxCount: 1 },
]);
