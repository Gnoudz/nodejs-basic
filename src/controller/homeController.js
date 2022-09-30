import pool from "../configs/connectDB";
import multer from 'multer';

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

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
  upload(req, res, function(err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }
    console.log(req);
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
});
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
