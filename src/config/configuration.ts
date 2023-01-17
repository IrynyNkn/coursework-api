export default () => ({
  port: parseInt(process.env.PORT, 10) || 5050,
  apiUrl: process.env.API_URL
});