const express = require("express");
const QrUrl = require("../models/qrUrl.model");
const router = express.Router();

router.get("/:id", async (req, res,next) => {
try {

  let qrs = await QrUrl
    .find()
    .populate({
      path: 'author',
      match: {_id: {$eq: req.params.id.toString()}}
      }
    );
  qrs = qrs.filter((q) => q.author);
  return res.status(200).json({
    message: 'ok',
    result: qrs
  });
}
catch (e) {
  console.log(e);
   return res.status(500).json({message: e});
}
});
router.post("/add", async(req, res, next) => {
  const url = req.body.url;
  const qrUrl = new QrUrl({
       url: url,
       author: req.body.id,
       date: new Date()
      });
    const qrDb = await qrUrl.save();
    return res.status(200).json({
      result: qrDb
    });
});

router.delete("/:id", async (req, res, next) => {
  try {
    const qr = await QrUrl.findByIdAndRemove({_id: req.params.id});
    return res.status(200).json({message: 'OK', result: qr});
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: e});
  }
});
module.exports = router;
