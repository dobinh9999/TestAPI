# TestAPI - Node.js, Express, MongoDB, Docker

## Giới thiệu
Đây là dự án API đơn giản sử dụng Node.js, Express, MongoDB và Docker.  
API hỗ trợ quản lý người dùng, đăng ký, đăng nhập, phân quyền và soft delete.

---
## công nghệ sử dụng 
- Node.js: Backend API Server
- Express.js: Web framework
- MongoDB: Cơ sở dữ liệu NoSQL, được triển khai bằng Docker (sử dụng MongoDB Atlas)
- Docker: Dùng để container hóa API và MongoDB
- Postman: Công cụ test API
---

## Yêu cầu môi trường
- Node.js >= 18 (nếu chạy local)
- Docker và Docker Compose (nếu chạy container)
- Git (để clone project)

---
## Cài đặt môi trường

### 👉 Cài bằng Docker Compose

#### Bước 1: Clone dự án
```bash
git clone https://github.com/ten-tai-khoan/TestAPI.git
cd TestAPI

Bước 2: Tạo file .env
PORT=8000
MONGO_URI=mongodb+srv://binhking69:binhking69@cluster0.a3fp6ws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=p@ssw0rdtokencuatao2025
Bước 3: Build image : docker-compose build
Bước 4: Chạy docker compose : docker-compose up
Bước 5: Truy cập API :http://localhost:8000/


-----------------------
-------------- Cài trực tiếp không dùng Docker (Chạy local) -----------------

Bước 1: Cài thư viện:
        npm install,
        npm install jsonwebtoken bcryptjs,
        npm install express dotenv cors body-parser axios cheerio,
Bước 2: Chạy server: npm start
bước 3: Cài phần mềm Postman để test API local nhanh chóng
----------------------------------------------
  API hỗ trợ:
---------------------------------------------
|Method	   |Endpoint	            |Yêu cầu Token	            |Vai trò

POST	   /users/login	            Không	                    Tất cả  (Đăng nhập)
POST	   /users	                Không	                    Tất cả  (Đăng ký)
GET	       /users	                Có	                        Admin   (Lấy tất cả người dùng)
GET	       /users/deleted	        Có	                        Admin   (Lấy danh sách user đã bị Soft Delete)
PATCH	   /users/restore	        Không	                    Tất cả  (khôi phục tài khoản bị Soft Delete)
DELETE	   /users/permanent	        Có	                        Admin   (Xóa cứng user trong cả database)
GET	       /users/:id	            Có	                        User    (lấy thông tin của chính user đăng nhập)
PUT	       /users/:id	            Có	                        User    (tự chỉnh sửa thông tin của chính user, không có quyền sửa role)
DELETE	   /users/:id	            Có	                        Admin   (xóa người dùng bằng Soft Delete)

--------------------------------------------------

Cấu trúc MongoDB

Hỗ trợ sử dụng MongoDB cục bộ (docker) hoặc MongoDB Atlas (cloud).

Kết nối qua URI trong file .env.

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_secret_key

---------------------------------------------------
Hướng dẫn push project lên GitHub
git init
git remote add origin https://github.com/ten-tai-khoan/TestAPI.git
git add .
git commit -m "First commit"
git branch -M main
git push -u origin main# TestAPI
