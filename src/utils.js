const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const config = require("../config");
const backendUrl = config.backendUrl //maybe

const s3 = new aws.S3();

aws.config.update({
  awsAccessKeyID: config.awsAccessKeyID,
  awsSecretAccessKey: config.awsSecretAccessKey,
  region: "us-east-2",

});

export const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: "flask-react-app",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString( + file.originalnameib));
    },
  }),
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/; //regex   
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Allow images only of extensions jpeg|jpg|png !");
    }
  }
}).single("image");

// usage
// const singleUpload = upload.single('image')
// singleUpload(req, res, function(err) {
//   return res.json({'imageUrl': req.file.location})
// })3

const ourGet = async(path) => {
  const {backendUrl} = config 
  const response = await fetch(backendUrl + path);
  return await response.json();
}
 
const ourPost = async(path, data) => {
  const response = await fetch(backendUrl + path,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({data})
  });
  return await response.json();
}
// module.exports = {
//   ourPost,
//   ourGet
// }
