const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK(
  "48f508289af8ef63d34d",
  "dddb3386ea02651b07617ab8f700406e52e92f90f5a2cc2dd04b842a41820cb5"
);
const hashToUnpin = "QmfNZhEJd9KKWaetcZdcMxSgzQSRf7kzkNUgXVPZMeQG7b";

pinata.unpin(hashToUnpin).then((results)=>{
    console.log(results);
}).catch((error)=>{
    console.log(error);
})