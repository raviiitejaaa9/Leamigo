import "./index.css"

const CabItem = props => {
    const {eachCab, date} = props 
    const {driverName, carModel, carImageUrl, licensePlate, available, from, to} = eachCab
    // console.log(carModel)
    // console.log(carImageUrl)
    return(
        <li className="list-item">
            <div className="car-img-sec" >
                <img alt = "car-img" src = {carImageUrl} className="car-img" />
                <h1> {carModel} </h1>
            </div>
            <div className="car-details" >
                <h1 className="car-head" > Car Info </h1>
                <p className="car-para" > 
                Driver Name : {driverName} <br/>
                Licence Plate : {licensePlate} <br/>
                 Route Info : {from} - {to} <br/>
                 Availability : {available ? "Available" : "Not Available" }<br/>
                 Date : {date} 
                 </p>
            </div>
            <div className="services-sec" >
                <h1 className="car-head" > Included in the price </h1>
                <p className="car-para">
                Free amendments<br/>
                Professional driver<br/>
                Instant confirmation<br/>
                Meet&Greet with welcome sign<br/>
                Free cancellations (Up to 24 hours before your arrival)
                </p>
            </div>
            <div>
                <h1> Price : 600 </h1>
                <button className="book-now-button" type = "button"  > Book now </button>
            </div>

        </li>
    )
}

export default CabItem