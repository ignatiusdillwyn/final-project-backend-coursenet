// routes/UserRoute.js
const { UserController } = require("../controllers");
const userRouter = require("express").Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with email, password, and username
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               username:
 *                 type: string
 *                 example: newuser
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Register success
 *               user:
 *                 id: 1
 *                 email: newuser@example.com
 *       400:
 *         description: Bad request - validation error or email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: email must be unique
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
userRouter.post("/register", UserController.add);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login to user account
 *     description: Authenticate user with email and password, returns JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ignadillwyn5@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Ultraman6!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Login success
 *               user:
 *                 id: 1
 *                 username: johndoe
 *                 email: user@example.com
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - wrong email or password
 *         content:
 *           application/json:
 *             example:
 *               message: Wrong email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */
userRouter.post("/login", UserController.login);

module.exports = userRouter;