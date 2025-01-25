export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '0hv8z1gfw4a8gfgoyb8jb2ccsr32ham715yahy2zp36k7d0298uhdoquq3c2lj1c'
}
