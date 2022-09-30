import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.query("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailUser = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `id` = ?",
    [req.params.id]
  );
  return res.send(rows);
};

let createNewUser = async (req, res) => {
  let { name, email, password } = req.body;
  await pool.execute(
    "Insert into `users` (name, email, password) Values (?,?,?)",
    [name, email, password]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  const { userId } = req.body;
  await pool.execute("Delete from `users` where id=?", [userId]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  const {userId} = req.params;
  const[rows, fields] = await pool.execute("Select * from users where id = ?", [userId]);
  return res.render("update.ejs", { dataUser: rows[0] });
};
 
let updateUser = async (req, res) => {
  const {id, name, email, password} = req.body;
  await pool.execute("Update users SET name = ?, email = ?, password = ? Where id = ?", [name, email, password, id]);
  return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs');
}

let handleUploadFile = async (req, res) => {
  return res.send('Hello');
}

module.exports = {
  getHomePage,
  getDetailUser,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadFilePage,
  handleUploadFile
};
