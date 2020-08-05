const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const config = require('../config')

aws.config.update({
  awsAccessKeyID: config.awsAccessKeyID ,
  awsSecretAccessKey: config.awsSecretAccessKey,
  region:'us-east-2'
})

const s3 = new aws.S3()

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'flask-react-app',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA'});
    },
    key: function(req,file, cb){
      cb(null, Date.now().toString())
    }
  })
}).single('image')


// usage
// const singleUpload = upload.single('image')
// singleUpload(req, res, function(err) {
//   return res.json({'imageUrl': req.file.location})
// })