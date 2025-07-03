import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/devansh/jobCanvas/backend/src/public')
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname )
    }
  })
  
  export const upload = multer({ storage: storage })