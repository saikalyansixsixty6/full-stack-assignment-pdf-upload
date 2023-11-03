const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {User,PDFFile} = require('./models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require("multer")

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, "./assets");
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now();
	  cb(null, uniqueSuffix + file.originalname);
	},
  });

const upload = multer({ storage: storage });

app.use(cors())
app.use(express.json())

mongoose
.connect("mongodb://127.0.0.1:27017/fileupload-db")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})



app.post("/upload-files", upload.single("file"), async (req, res) => {
	console.log(req.file);
	const title = req.body.title;
	const fileName = req.file.filename;
	try {
	  await PDFFile.create({ title: title, pdf: fileName });
	  res.send({ status: "ok" });
	} catch (error) {
	  res.json({ status: error });
	}
});


app.get("/get-files", async (req, res) => {
	try {
	PDFFile.find({}).then((data) => {
		res.send({ status: "ok", data: data });
	  });
	} catch (error) {}
  });


app.get("/", async (req, res) => {
	res.send("Success!!!!!!");
});

app.listen(9000, () => {
	console.log('Server started on 9000')
})