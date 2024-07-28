# Sử dụng image Node.js
FROM node:21

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các dependencies
RUN npm install

# Chạy ứng dụng
CMD ["npm", "run", "start:dev"]

# Expose port
EXPOSE 3000
