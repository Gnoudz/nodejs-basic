import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM USERS")
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(200).json({message: 'Missing required params'});
    }
    console.log(name, email, password)
    await pool.execute("INSERT INTO users (name, email, password) VALUES (? ,? ,?)", [name, email, password]);
    return res.status(200).json({
        message: 'ok',
    })
}

let updateUser = async (req, res) => {
    const {name, email, password, id} = req.body;
    console.log(name);
    if(!name || !email || !password || !id) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, password, id]);
    return res.status(200).json({
        message: 'Update ok',
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if(!userId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute("Delete from `users` where id = ?", [userId]);
    return res.status(200).json({
        message: 'Delete ok',
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}