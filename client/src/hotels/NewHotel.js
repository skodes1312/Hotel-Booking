import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreateHotelForm from "../components/forms/CreateHotelForm";
import { createHotel } from "../actions/hotel";

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  //destructuring variables fro state
  const { title, content, location, image, price, from, to, bed } = values;

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(values);

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
      let res = await createHotel(auth.token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast.success("Your Hotel is successfully posted.");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const imageChangeHandler = (e) => {
    //seting the image
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const changeHandler = (e) => {
    //setting the values
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid h1 p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <CreateHotelForm
              values={values}
              setValues={setValues}
              changeHandler={changeHandler}
              imageChangeHandler={imageChangeHandler}
              submitHandler={submitHandler}
            />
          </div>
          <div className="col-md-2">
            <img src={preview} alt="preview" className="img img-fluid m-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
