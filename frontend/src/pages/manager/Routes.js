import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Routes = () => {

  const [routess, setRoutess] = useState([]);
  const [routeNo, setRouteNo] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [fee, setFee] = useState('');
  const [selectedRoutesID, setselectedRoutesID] = useState(null);

 ///donwload schedule
 const downloadSchedule = () => {
  // Prepare the schedule data as a CSV or any other format
  const scheduleCSV = routess.map(item => (
      `${item.routeNo}, ${item.start}, ${item.end}, ${item.fee}`
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
    fetch('http://localhost:8080/api/roots')
      .then((response) => response.json())
      .then((data) => setRoutess(data))
      .catch((error) => console.error('Error fetching drivers:', error));
  }, []);




  /************Add New Routee ************/
  const handleAddRoute = () => {
    const newRoute = {
      routeNo,
      start,
      end,
      fee
    };

    axios.post('http://localhost:8080/api/roots', newRoute, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {

          // Reset input fields
          setRouteNo('');
          setStart('');
          setEnd('');
          setFee('');
          console.log(response);

          // Refresh the drivers data after adding a new driver
          axios.get('http://localhost:8080/api/roots')
            .then((response) => setRoutess(response.data))
            .catch((error) => console.error('Error fetching drivers:', error));
        } else {
          console.error('Failed to add driver');
        }
      })
      .catch((error) => console.error('Error adding driver:', error));
  };





  /*********************UPdating the Routes **********************/
  const handleEditClick = (routeId) => {
    setselectedRoutesID(routeId);

    // Fetch driver details based on the routeId
    fetch(`http://localhost:8080/api/roots/${routeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRouteNo(data.routeNo);
        setStart(data.start);
        setEnd(data.end);
        setFee(data.fee);
      })
      .catch((error) => console.error('Error fetching driver details:', error));
  };

  const handleUpdateDriver = (e) => {
    e.preventDefault();

    // Use selectedRoutesID to identify the driver you want to update
    const routesId = selectedRoutesID;

    // Prepare the updated driver data
    const updatedRoute = {
      routeNo,
      start,
      end,
      fee

    };// Send the updated data to the server
    fetch(`http://localhost:8080/api/roots/${routesId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRoute),
    })
      .then((response) => {
        if (response.status === 200) {
          // Reset form fields and close the modal
          setRouteNo('');
          setStart('');
          setEnd('');
          setFee('');
          setselectedRoutesID(null);
          // Refresh the drivers data after updating
          axios.get('http://localhost:8080/api/roots')
            .then((response) => setRoutess(response.data))
            .catch((error) => console.error('Error fetching drivers:', error));
        } else {
          console.error('Failed to update driver');
        }
      }).catch((error) => console.error('Error updating driver:', error));
  };




  /******************** Deleting the Driver  **********************/
  const handleDeleteClick = (routeId) => {
    setselectedRoutesID(routeId);
  };
  const handleDeleteDriver = () => {
    if (selectedRoutesID) {
      // Send a request to delete the selected driver
      fetch(`http://localhost:8080/api/roots/${selectedRoutesID}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 200) {
            // Reset the selectedRoutesID
            setselectedRoutesID(null);
            // Refresh the drivers data after deleting
            axios.get('http://localhost:8080/api/roots')
              .then((response) => setRoutess(response.data))
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
          <h2>Routes</h2>
        </div>
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Routes</b>
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
                  <th>Route No</th>
                  <th>Starting Place</th>
                  <th>Ending Place</th>
                  <th>Total Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routess.map((route) => (
                  <tr key={route.id}>
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
                    <td>{route.routeNo}</td>
                    <td>{route.start}</td>
                    <td>{route.end}</td>
                    <td>{route.fee}</td>


                    <td>
                      <a
                        href="#editEmployeeModal"
                        className="edit"
                        data-toggle="modal"
                        data-id={route.id}
                        onClick={() => handleEditClick(route.id)}
                      >
                        <i
                          className="material-icons"
                          data-toggle="tooltip"
                          title="Edit"
                          data-id={route.id}
                        >
                          
                        </i>

                      </a>
                      <a
                        href="#deleteEmployeeModal"
                        className="delete"
                        data-toggle="modal"
                        onClick={() => handleDeleteClick(route.id)}
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
            <form onSubmit={handleAddRoute}>
              <div className="modal-header">
                <h4 className="modal-title">Add Route</h4>
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
                  <label>Route No</label>
                  <input
                    type="text"
                    className="form-control"
                    required="true"
                    value={routeNo}
                    onChange={(e) => setRouteNo(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Starting Location</label>
                  <input
                    type="text"
                    className="form-control"
                    required="true"
                    value={start}
                    onChange={(e) => setStart(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Ending Location</label>
                  <textarea
                    className="form-control"
                    required="true"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Total Fee</label>
                  <input type="text" className="form-control" required="true"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)} />
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
                <h4 className="modal-title">Edit Route</h4>
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
                  <label>Route No</label>
                  <input type="text" className="form-control" required="true" value={routeNo} onChange={(e) => setRouteNo(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Starting Location</label>
                  <input type="text" className="form-control" required="true" value={start}
                    onChange={(e) => setStart(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Ending Location</label>
                  <textarea
                    className="form-control"
                    required="true"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Total Fees</label>
                  <input type="text" className="form-control" required="true" value={fee}
                    onChange={(e) => setFee(e.target.value)} />
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
                <h4 className="modal-title">Delete Route</h4>
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

export default Routes;