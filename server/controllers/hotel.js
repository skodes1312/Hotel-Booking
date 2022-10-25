import Hotel from "../models/hotel";
import fs from "fs";
export const createHotel = async (req, res) => {
  //   Save hotel in the database
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.auth._id;
    //save image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("Error while saving Hotel");
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
  //   res.status(200).send("Success");
};

export const hotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set(`Content-Type`, hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.auth._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let SingleHotel = await Hotel.findById(req.params.hId)
    .select("-image.data")
    .exec();
  console.log("Single Hotel: ", SingleHotel);
  res.json(SingleHotel);
};

export const updateHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hId, data, {
      new: true,
    }).select("-image.data");
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed. Try again.");
  }
};
