import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentails: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).send("Connected");
})

// start server
const port = process.env.DEV_PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});