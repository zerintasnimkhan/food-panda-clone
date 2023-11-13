import dotenv from 'dotenv';
dotenv.config();

const config = {
      PORT: process.env.PORT ?? '3000',
      MONGOOSE_URI: process.env.MONGOOSE_URI ?? 'mongodb://127.0.0.1:27017/food-panda-clone'
}

export default config;