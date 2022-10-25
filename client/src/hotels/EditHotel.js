import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel";
import { DatePicker, Select } from "antd";
import { useParams } from "react-router-dom";
import EditHotelForm from "../components/forms/EditHotelForm";
import { read, updateHotel } from "../actions/hotel";

const { Option } = Select;

const EditHotel = () => {
  const params = useParams();

  const { auth } = useSelector((state) => ({ ...state }));
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [image, setImage] = useState("");

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  //destructuring variables fro state
  const { title, content, location, price, from, to, bed } = values;

  const submitHandler = async (e) => {
    e.preventDefault();

    //creating Form Data
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("bed", bed);
    hotelData.append("from", from);
    hotelData.append("to", to);

    try {
      let res = await updateHotel(auth.token, hotelData, params.hotelID);
      console.log("HOTEL UPDATE RES", res);
      toast.success(`${res.data.title} is successfully updated.`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const imageChangeHandler = (e) => {
    //seting the image
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    //setting the values
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(params.hotelID);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  return (
    <>
      <div className="container-fluid h1 p-5 text-center bg-secondary">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <EditHotelForm
              values={values}
              setValues={setValues}
              changeHandler={changeHandler}
              imageChangeHandler={imageChangeHandler}
              submitHandler={submitHandler}
            />
          </div>
          <div className="col-md-2">
            <img src={preview} alt="preview" className="img img-fluid m-2" />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
