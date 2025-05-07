import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        // Extract token from Authorization header (Bearer <token>)
        const token = req.headers['authorization']?.split(' ')[1];  // Extracts token from Bearer <token>
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Please login first" });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token: ", token_decode); // Debugging to check if the token is decoded correctly
        
        // Attach user ID to the request body for further use
        req.userId = token_decode.id;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authUser;


