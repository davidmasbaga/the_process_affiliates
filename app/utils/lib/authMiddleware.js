import jwt from 'jsonwebtoken';

const authMiddleware = (req) => {
    try {
        const tokenHeader = req.headers.get("authorization");
    const token = tokenHeader?.split(" ")[1];

    console.log(token)



        if (!token) {
            console.log("Token no encontrado en los headers")
            return false;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            console.log("Token decodificado:", decoded);
        } else {
            console.log("Token no pudo ser decodificado");
        }
        req.user = decoded;
        return true;

    } catch (ex) {
        onsole.error("Error al verificar el token:", ex.message);
        return false;
    }
};

export default authMiddleware;
