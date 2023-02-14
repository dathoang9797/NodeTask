import multer from 'multer';

// \.(doc|docx)$ -> regular expression for serach for determined file extensions
export const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith(".pdf")) {
        if (file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Error in upload format"));
        }

        cb(undefined, true);
        //cb(undefined, false);
    }
});
