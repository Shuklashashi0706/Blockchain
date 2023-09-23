const express = require("express")
const fs = require("fs")
const pinataSDK = require("@pinata/sdk")
// Initialize Pinata SDK
const pinata = new pinataSDK(
  '48f508289af8ef63d34d',
  'dddb3386ea02651b07617ab8f700406e52e92f90f5a2cc2dd04b842a41820cb5'
);
const app = express();
const port = 5170;
app.use(express.json());

// Test Pinata authentication
pinata
  .testAuthentication()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Define the uploadDoc route
const uploadDoc = async (req, res) => {
  try {
    // const { lawyerId } = req.params;
    // const { file } = req.body;

    // Create a readable stream for the uploaded file
    const readableStreamForFile = fs.createReadStream("./img.jpg");

    const options = {
      pinataMetadata: {
        name: 'UploadedDocument',
        keyvalues: {
          uploadedBy: `Sneha Sehnoy`,
        },
      },
      pinataOptions: {
        cidVersions: 0,
      },
    };

    // Upload the file to IPFS using Pinata
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

    res.status(200).json({ message: 'File uploaded successfully', pinataResponse: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

app.get("/api/user/uploadDoc",uploadDoc);

app.listen(port,(req,res)=>{
    console.log(`Listening at port ${port}`)
})

