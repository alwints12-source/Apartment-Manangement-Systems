# Apartment-Manangement-Systems

GIT hub URL https://github.com/alwints12-source/Apartment-Manangement-Systems

Make sure you have the following installed:

- [Node.js v22](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)  
- [PM2](https://pm2.keymetrics.io/) process manager  
- [Nginx](https://nginx.org/) (for server deployment)  
- AWS EC2 Instance (Ubuntu preferred)

- 2. Clone Repository

bash
git clone https://github.com/<your-username>/Apartment-Manangement-Systems.git
cd Apartment-Manangement-Systems

- 3. Create a .env file inside the backend/ directory:
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5001
mongodb+srv://username:password@cluster0.mongodb.net/ams?retryWrites=true&w=majority

4. Backend Setup
cd backend
npm install    # or yarn install

5. Frontend Setup
cd frontend
yarn install
yarn start
yarn build

 CI/CD with GitHub Actions

The pipeline (.github/workflows/ci.yml) will:
	1.	Install dependencies
	2.	Run tests
	3.	Build frontend
	4.	Deploy to EC2 via self-hosted runner
	5.	Restart PM2 processes
