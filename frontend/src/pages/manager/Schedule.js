import Header from "../../components/Header";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Schedule = () => {

    const [activeDay, setActiveDay] = useState('Monday'); // Default to Monday
    const [scheduleData, setScheduleData] = useState([]); // Store data for the selected day
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control the edit modal
    const [selectedDriverId, setSelectedDriverId] = useState(null);

    const [bus, setBus] = useState('')
    const [driver, setDriver] = useState('')
    const [routeNo, setRouteNo] = useState('')
    const [status, setStatus] = useState('')


    useEffect(() => {
        // Make an API call based on the active day

        axios.get(`http://localhost:8080/api/${activeDay.toLowerCase()}`)
            .then((response) => {
                setScheduleData(response.data);

            })
            .catch((error) => {
                console.error('Error fetching schedule data:', error);
            });
    }, [activeDay]);


    //Editing function
    const handleEdit = (id) => {
        setIsEditModalOpen(true);
        setSelectedDriverId(id);

        // Fetch driver details based on the driverId
        fetch(`http://localhost:8080/api/${activeDay.toLowerCase()}/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setDriver(data.driver);
                setRouteNo(data.routeNo);
                setBus(data.bus);
                setStatus(data.status);

            })
            .catch((error) => console.error('Error fetching driver details:', error));
    };

    const handleUpdateSchedule = (e) => {
        e.preventDefault();
        const updatedDriver = {
            bus,
            driver,
            status,
            routeNo
        };// Send the updated data to the server
        fetch(`http://localhost:8080/api/${activeDay.toLowerCase()}/${selectedDriverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDriver),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Reset form fields and close the modal
                    setBus('');
                    setRouteNo('');
                    setStatus('');
                    setDriver('');
                    // Refresh the drivers data after updating
                    axios.get(`http://localhost:8080/api/${activeDay.toLowerCase()}`)
                        .then((response) => setScheduleData(response.data))
                        .catch((error) => console.error('Error fetching drivers:', error));
                } else {
                    console.error('Failed to update driver');
                }
            }).catch((error) => console.error('Error updating driver:', error));

    };

    ///donwload schedule
    const downloadSchedule = () => {
        // Prepare the schedule data as a CSV or any other format
        const scheduleCSV = scheduleData.map(item => (
            `${item.time}, ${item.bus}, ${item.driver}, ${item.routeNo}, ${item.status}`
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


    return (
        <>


            <Header />
            <div className="event-schedule-area-two bg-color pad100" style={{ marginTop: 170 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <div className="title-text">
                                    <h2>Bus Schedule - {activeDay}</h2>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="nav custom-tab" id="myTab" role="tablist">

                                {/* MONDAY  heading--> */}
                                <li className="nav-item ">
                                    <input type="button" className="nav-link" onClick={() => setActiveDay('monday')} value="Monday" />
                                </li>
                                <li className="nav-item ">
                                    <input type="button" className="nav-link" onClick={() => setActiveDay('tuesday')} value="Tuesday" />
                                </li>
                                <li className="nav-item ">
                                    <input type="button" className="nav-link" onClick={() => setActiveDay('wednesday')} value="Wednesday" />
                                </li>
                                <li className="nav-item ">
                                    <input type="button" className="nav-link" onClick={() => setActiveDay('thursday')} value="Thursday" />
                                </li>
                                <li className="nav-item ">
                                    <input type="button" className="nav-link" onClick={() => setActiveDay('friday')} value="Friday" />
                                </li>

                            </ul>


                            {/* MONDay table */}
                            {activeDay && (
                                <div className="tab-pane fade active show" id="home" role="tabpanel">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center" scope="col">
                                                        Time
                                                    </th>
                                                    <th scope="col">Bus</th>
                                                    <th scope="col">Driver</th>
                                                    <th scope="col">Route</th>
                                                    <th className="text-center" scope="col">
                                                        Status
                                                    </th>
                                                    <th scope="col">Actions</th> {/* Add a column for actions (e.g., Edit and Delete) */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {scheduleData.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="text-center">{item.time}</td>
                                                        <td>{item.bus}</td>
                                                        <td>{item.driver}</td>
                                                        <td>{item.routeNo}</td>
                                                        <td className="text-center">{item.status}</td>
                                                        <td>
                                                            <a
                                                                href="#editScheduleModal"
                                                                className="edit"
                                                                data-toggle="modal"
                                                                data-id={item.id}
                                                                onClick={() => handleEdit(item.id)} // Handle edit action
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
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Edit Schedule Modal */}
                            {isEditModalOpen && (

                                <div id="editScheduleModal" className="modal fade">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form onSubmit={handleUpdateSchedule}>
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Edit Schedule for {activeDay}</h4>
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
                                                        <label>Bus</label>
                                                        <input type="text" className="form-control" required="true"
                                                            value={bus} onChange={(e) => setBus(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Driver</label>
                                                        <input type="text" className="form-control" required="true"
                                                            value={driver} onChange={(e) => setDriver(e.target.value)}

                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Route</label>
                                                        <input type="text" className="form-control" required="true"
                                                            value={routeNo} onChange={(e) => setRouteNo(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Status</label>
                                                        <input type="text" className="form-control" required="true"
                                                            value={status} onChange={(e) => setStatus(e.target.value)}
                                                        />
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
                            )}



                            <div className="primary-btn text-center">
                                <a onClick={downloadSchedule} className="btn btn-primary" style={{ color: "white" }}>
                                    Download Schedule
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>



    );
}

export default Schedule;