# TestAPI - Node.js, Express, MongoDB, Docker

## Giới thiệu
    Đây là dự án API đơn giản sử dụng Node.js, Express, MongoDB và Docker.  
    API hỗ trợ quản lý người dùng:
        đăng ký,
        đăng nhập,
        phân quyền
        soft delete.

---
## công nghệ sử dụng 
    Node.js: Backend API Server

    Express.js: Web framework

    MongoDB: Cơ sở dữ liệu NoSQL (sử dụng MongoDB Atlas)

    Docker: Dùng để container hóa API và MongoDB

    Docker Compose: Quản lý đa container

    Postman: Công cụ test API

    GitHub: Quản lý source code
---

## Yêu cầu môi trường

Công cụ	            Phiên bản yêu cầu
Node.js	            >= 18
Docker	            >= 24
Docker Compose	    >= 2
Git	                Mới nhất
Postman	            Để test API
---
## Hướng dẫn cài đặt và chạy project

 Bước 1: Clone dự án
```bash
git clone https://github.com/dobinh9999/TestAPI.git
cd TestAPI

Bước 2: Tạo file .env

    PORT=8000
    MONGO_URI=mongodb+srv://binhking69:binhking69@cluster0.a3fp6ws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=p@ssw0rdtokencuatao2025

-------------Hướng dẫn chạy bằng Docker-----------------
Bước 1: Build Docker Image
    docker-compose build
Bước 2: Chạy Docker
    docker-compose up
Bước 3: Truy cập API :
    http://localhost:8000/



--------------Cài trực tiếp không dùng Docker (Chạy local)-----------------

Bước 1: Cài thư viện:
        npm install,
        npm install jsonwebtoken bcryptjs,
        npm install express dotenv cors body-parser axios cheerio,
Bước 2: Chạy server:
         npm start
bước 3: Cài phần mềm Postman để test API local nhanh chóng
----------------------------------------------
    Test API hỗ trợ:
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


-------------------------------------------------
Cấu trúc MongoDB
-------------------------------------------------
Hỗ trợ sử dụng MongoDB cục bộ (docker) hoặc MongoDB Atlas (cloud).

Kết nối qua URI trong file .env.

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_secret_key

---------------------------------------------------
Hướng dẫn push project lên GitHub
git init
git remote add origin https://github.com/dobinh9999/TestAPI.git
git add .
git commit -m "First commit"
git branch -M main
git push -u origin main# TestAPI
