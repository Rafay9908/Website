import React, { useState, useEffect } from "react";
import "./admin.css";
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";

export const Admin = () => {
  const [tableData, setTableData] = useState([]);
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("contacts")) || [];
    setTableData(storedData);
  }, []);

  const handleSave = () => {
    const newData = {
      address: location,
      email,
      phone,
      date: new Date().toLocaleDateString(),
      icons: {
        edit: editIcon,
        delete: deleteIcon,
      },
    };


    let updatedData;
    if (editIndex !== null) {
      updatedData = tableData.map((data, index) =>
        index === editIndex ? newData : data
      );
      setEditIndex(null);
    } else {
      updatedData = [...tableData, newData];
    }

    setTableData(updatedData);
    localStorage.setItem("contacts", JSON.stringify(updatedData));
    setLocation("");
    setEmail("");
    setPhone("");
  };

  const handleEdit = (index) => {
    const data = tableData[index];
    setLocation(data.address);
    setEmail(data.email);
    setPhone(data.phone);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    localStorage.setItem("contacts", JSON.stringify(updatedData));
  };

  return (
    <>
      <div className="tabs-section">
        <div className="container">
          <div className="tabs-container">
            <h1>Admin Panel</h1>
            <div className="tabs" role="tab" aria-label="tabs">
              <button className="btn">Home</button>
              <button className="btn btn-middle">Jobs</button>
              <button className="btn">Products</button>
            </div>
          </div>
        </div>
      </div>

      {/* Home starts from here */}
      <div className="home">
        <div className="container">
          <h3>Reach Out</h3>

          <div className="form">
            <div className="location">
              <label htmlFor="text">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="phone">
              <label htmlFor="text">text</label>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button onClick={handleSave}>
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>

          <table>
            <tbody>
              <tr className="table-headings">
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>

              <tr className="spacer-row">
                <td colSpan={5}></td>
              </tr>

              {tableData.map((data, index) => (
                <tr className="table-data" key={index}>
                  <td>{data.address}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.date}</td>
                  <td className="table-icons">
                    <img
                      className="edit-icon"
                      src={data.icons.edit}
                      alt="Edit"
                      onClick={() => handleEdit(index)}
                    />
                    <img
                      className="delete-icon"
                      src={data.icons.delete}
                      alt="Delete"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="divider"></div>

          <div className="gallery">
            <h3>Gallery</h3>
          </div>

        </div>
      </div>
    </>
  );
};
