import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;
const EditHotelForm = (props) => {
  const {
    values,
    setValues,
    submitHandler,
    changeHandler,
    imageChangeHandler,
  } = props;
  const { title, content, location, image, price, from, to, bed } = values;
  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={imageChangeHandler}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={changeHandler}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <input
          type="text"
          name="location"
          onChange={changeHandler}
          placeholder="Location"
          className="form-control m-2"
          value={location}
        />
        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          className="w-100 m-2"
          placeholder="Number of Beds"
          onChange={(value) => setValues({ ...values, bed: value })}
          value={bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>
      {from && (
        <DatePicker
          defaultValue={moment(from, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}
      {to && (
        <DatePicker
          defaultValue={moment(to, "YYYY-MM-DD")}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default EditHotelForm;
