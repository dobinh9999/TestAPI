FROM node:18

# Cài đặt wait-for-it để chờ MongoDB sẵn sàng
RUN apt-get update && apt-get install -y wait-for-it

# Cài đặt thư viện cho ứng dụng
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 8000
EXPOSE 8000

# Chạy command wait-for-it trước khi bắt đầu server API
CMD ["wait-for-it", "mongo:27017", "--", "npm", "start"]
