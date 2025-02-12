const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Corpo da requisição inválido' });
    }

    try {
        const email = req.body.email.toLowerCase();

        // Checando se já existe um usuário com este email cadastrado (ignorando case sensitive)
        let existingUser = await User.findOne({
            $or: [
                { email: { $regex: new RegExp(`^${email}$`, 'i') } }
            ]
        });

        if (existingUser) return res.status(400).json({ message: 'User com o mesmo e-mail já existe' });

        // Cria usuário e assina jwt
        const newUser = await new User({ email, password: req.body.password }).save();
        const token = jwt.sign({ UserID: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        await res.cookie("token", token, { secure: IS_PRODUCTION });

        return res.status(200).json({ message: 'User criado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

exports.login = async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Corpo da requisição inválido' });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        // Verificando senha
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ UserID: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        await res.cookie("token", token, { secure: IS_PRODUCTION });

        return res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { uid } = req.query;

        if (uid) {
            // Buscando usuário específico pelo ID
            const user = await User.findById(uid);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            // Usuário localizado
            return res.status(200).json({ data: user });
        }

        // !req.query.uid -> Retorna todos os usuários
        const users = await User.find({});
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Não autenticado' });
        }
        
        const user = await User.findById(req.user._id).select('-password'); // Exclui a senha da resposta

        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};