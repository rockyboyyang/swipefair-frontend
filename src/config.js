module.exports = {
  awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiBaseUrl : process.env.FLASK_API_BASE_URL || "http://localhost:3000/api"
}
