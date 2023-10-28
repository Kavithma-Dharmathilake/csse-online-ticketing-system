import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Driver = () => {

  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [licenceNo, setLicenceNo] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState(null);



  ///donwload schedule
  const downloadSchedule = () => {
    // Prepare the schedule data as a CSV or any other format
    const scheduleCSV = drivers.map(item => (
      `${item.name}, ${item.contact}, ${item.age}, ${item.address}, ${item.licenceNo}`
    )).join('\n');

    // Create a Blob containing the data and set the appropriate headers
    const blob = new Blob([scheduleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule.csv';
    document.body.appendChild(a);

    // Trigger the download
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };




  /************Update the code ************/
  useEffect(() => {
    // Fetch drivers data from your backend API
    fetch('http://localhost:8080/api/drivers')
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error('Error fetching drivers:', error));
  }, []);




  /************Add New Driver ************/
  const handleAddDriver = () => {
    const newDriver = {
      name,
      contact,
      age,
      address,
      licenceNo,
    };

    axios.post('http://localhost:8080/api/drivers', newDriver, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {

          // Reset input fields
          setName('');
          setContact('');
          setAge('');
          setAddress('');
          setLicenceNo('');
          console.log(response);

          // Refresh the drivers data after adding a new driver
          axios.get('http://localhost:8080/api/drivers')
            .then((response) => setDrivers(response.data))
            .catch((error) => console.error('Error fetching drivers:', error));
        } else {
          console.error('Failed to add driver');
        }
      })
      .catch((error) => console.error('Error adding driver:', error));
  };





  /*********************UPdating the Driver **********************/
  const handleEditClick = (driverId) => {
    setSelectedDriverId(driverId);

    // Fetch driver details based on the driverId
    fetch(`http://localhost:8080/api/drivers/${driverId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setAge(data.age);
        setAddress(data.address);
        setContact(data.contact);
        setLicenceNo(data.licenceNo);
      })
      .catch((error) => console.error('Error fetching driver details:', error));
  };

  const handleUpdateDriver = (e) => {
    e.preventDefault();

    // Use selectedDriverId to identify the driver you want to update
    const driverId = selectedDriverId;

    // Prepare the updated driver data
    const updatedDriver = {
      name,
      age,
      address,
      contact,
      licenceNo,
    };// Send the updated data to the server
    fetch(`http://localhost:8080/api/drivers/${driverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDriver),
    })
      .then((response) => {
        if (response.status === 200) {
          // Reset form fields and close the modal
          setName('');
          setAge('');
          setAddress('');
          setContact('');
          setLicenceNo('');
          setSelectedDriverId(null);
          // Refresh the drivers data after updating
          axios.get('http://localhost:8080/api/drivers')
            .then((response) => setDrivers(response.data))
            .catch((error) => console.error('Error fetching drivers:', error));
        } else {
          console.error('Failed to update driver');
        }
      }).catch((error) => console.error('Error updating driver:', error));
  };




  /******************** Deleting the Driver  **********************/
  const handleDeleteClick = (driverId) => {
    setSelectedDriverId(driverId);
  };
  const handleDeleteDriver = () => {
    if (selectedDriverId) {
      // Send a request to delete the selected driver
      fetch(`http://localhost:8080/api/drivers/${selectedDriverId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 200) {
            // Reset the selectedDriverId
            setSelectedDriverId(null);
            // Refresh the drivers data after deleting
            axios.get('http://localhost:8080/api/drivers')
              .then((response) => setDrivers(response.data))
              .catch((error) => console.error('Error fetching drivers:', error));
          } else {
            console.error('Failed to delete driver');
          }
        })
        .catch((error) => console.error('Error deleting driver:', error));
    }


  };

  return (
    <>


      <Header />
      <div className="container-xl" style={{ marginTop: 200 }}>
        <div className="title-text">
          <h2>Drivers</h2>
        </div>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Drivers</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                  >
                    <i className="material-icons"></i>{" "}
                    <span>Add New Driver</span>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    <i className="material-icons"></i> <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll" />
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Licence No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox1"
                          name="options[]"
                          defaultValue={1}
                        />
                        <label htmlFor="checkbox1" />
                      </span>
                    </td>
                    <td>{driver.name}</td>
                    <td>{driver.contact}</td>
                    <td>{driver.age}</td>
                    <td>{driver.address}</td>
                    <td>{driver.licenceNo}</td>

                    <td>
                      <a
                        href="#editEmployeeModal"
                        className="edit"
                        data-toggle="modal"
                        data-id={driver.id}
                        onClick={() => handleEditClick(driver.id)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                          data-id={driver.id}
                        >
                          
                        </i>

                      </a>
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                        onClick={() => handleDeleteClick(driver.id)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Delete"
                        >
                          
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}



              </tbody>
            </table>
            <div className="primary-btn text-center">
              <a onClick={downloadSchedule} className="btn btn-primary" style={{ color: "white" }}>
                Download CSV
              </a>
            </div>



          </div>
        </div>
      </div>
      {/* ADD Modal HTML */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAddDriver}>
              <div className="modal-header">
                <h4 className="modal-title">Add Driver</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"

                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    required="true"
                    value={age}
                    onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    required="true"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" required="true"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Licence No</label>
                  <input type="text" className="form-control" required="true" value={licenceNo}
                    onChange={(e) => setLicenceNo(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-success"
                  defaultValue="Add"

                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit Modal HTML */}
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdateDriver}>
              <div className="modal-header">
                <h4 className="modal-title">Edit Driver</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" required="true" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" className="form-control" required="true" value={age}
                    onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    required="true"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" required="true" value={contact}
                    onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Licence No</label>
                  <input type="text" className="form-control" required="true" value={licenceNo}
                    onChange={(e) => setLicenceNo(e.target.value)} />
                </div>
              </div>

              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input type="submit" className="btn btn-info" defaultValue="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Delete Modal HTML */}
      <div id="deleteEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Delete Driver</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete these Records?</p>
                <p className="text-warning">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  defaultValue="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-danger"
                  defaultValue="Delete"
                  onClick={handleDeleteDriver}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

    </>



  );
}

export default Driver;