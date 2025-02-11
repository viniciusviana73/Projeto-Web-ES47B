const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.jwtAuth = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
    }

    try {
        if (!token) throw new Error("Token não encontrado");

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.UserID);
        
        if (!user) {
            return res.status(401).json({ message: 'Não autenticado' });
        }

        // Anexa usuário a req
        req.user = user;
        next();
    } catch (error) {
        //console.error("Erro de autenticação:", error.message);
        res.clearCookie("token");
        return res.status(401).json({ message: 'Não autenticado' });
    }
}