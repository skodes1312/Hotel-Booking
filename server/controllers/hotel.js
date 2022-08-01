import Hotel from "../models/hotel";
import fs from "fs";
export const createHotel = async (req, res) => {
  //   Save hotel in the database
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);

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
