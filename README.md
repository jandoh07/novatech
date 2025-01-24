# NovaTech E-commerce App
NovaTech is a full-stack e-commerce application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to browse products, add them to a cart or wishlist etc. It also includes features for admin management and secure authentication. Might also add more features in the future(improvements).

## Features
- User authentication
- CRUD operations for products (admin)
- Add products to cart
- Add products to wishlist
- Search for products
- Filter search results

## Technologies
- Frontend: React, Zustand, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Cloud Storage: AWS S3
- Authentication: JWT, bcryptjs

## Installation
1. Clone the repository
    ```bash
    git clone https://github.com/jandoh07/novatech.git
    ```
2. Set up environment variables
   - Backend (api/.env)
      ```bash
      PORT=5000
      MONGODB_URI=your-mongodb-connection-uri
      JWT_SECRET=your-jwt-secret
      AWS_ACCESS_KEY=your-aws-access-key
      AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
      AWS_BUCKET_NAME=your-bucket-name
      AWS_REGION=your-aws-region
      CLIENT_URL=http://localhost:5173
      NODE_ENV=development
      ```
    - Frontend (client/.env)
        ```bash
        VITE_API_URL=http://localhost:5000
        ```
3. Install dependencies
   - Backend
      ```bash
      cd api
      npm install
      ```
    - Frontend
      ```bash
      cd ../client
      npm install
      ```
4. Run the application
   - Backend
      ```bash
      cd api
      npm start
      ```
    - Frontend
      ```bash
      cd client
      npm run dev
      ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
 