import {Component} from "react"
import {differenceInHours} from 'date-fns';


import CabItem from "../CabItem"

import "./index.css"
  
const apiStateConstants = {
    success : "SUCCESS",
    failure : "FAILURE",
    loading : "LOADING",
    static : "STATIC",
    starting : "STARTING"
}   

class CabApp extends Component{
    state = {
        cabsDetails : [],
        from : "",
        to : "",
        date : "",
        apiStatus : apiStateConstants.static,
    }

    getFilteredList = (modifiedCabDetails) => {
        const {from, to, cabsDetails} = this.state
        if (from === "" && to === "") {
            this.setState({
                apiStatus : apiStateConstants.starting,
            })
            return cabsDetails
        }
        
        else{
            return modifiedCabDetails.filter((cabItem) => {
            if (from && to) {
              return cabItem.from.toLowerCase().includes(from.toLowerCase()) && cabItem.to.toLowerCase().includes(to.toLowerCase());
            } else if (from) {
              return cabItem.from.toLowerCase().includes(from.toLowerCase());
            } else {
              return cabItem.to.toLowerCase().includes(to.toLowerCase()); 
            }
          });

        }
    }

    onSuccess = (cabsList) => {
        // console.log(cabsList)
        const modifiedCabDetails = cabsList.map(cabItem => ({
            id : cabItem.id,
            driverName : cabItem.driver_name,
            carModel: cabItem.car_model,
            carImageUrl: cabItem.car_image_url,
            licensePlate: cabItem.license_plate,
            available: cabItem.available,
            from: cabItem.from,
            to: cabItem.to
        }))

        const filteredList = this.getFilteredList(modifiedCabDetails)
        // console.log(filteredList)

        this.setState({
            cabsDetails : [...filteredList],
            apiStatus  : apiStateConstants.success
        })
    
    }

    onFailure = () => {
        this.setState({
            apiStatus : apiStateConstants.failure,
            cabsDetails : [],
        })
    }

    getCabs = async() => {
        this.setState({
            apiStatus:apiStateConstants.loading,
        })
        const url = "https://raw.githubusercontent.com/raviiitejaaa9/MockTestData-CabService/main/db.json"
        
        const response = await fetch(url)
        // console.log(response)

        if (response.ok) {
            const apiData = await response.json()
            const {cabs}  = apiData 
            // console.log(apiData.cabs)
            // console.log(cabs)
            this.onSuccess(cabs)
        }
        else{
            this.onFailure()
        }
    }

    onChangeStartingPoint = (event) => {
        const startPoint = event.target.value
        this.setState({
            from : startPoint,
        })
    }

    onChangeDeatinationPoint = (event) => {
        const endPoint = event.target.value 
        this.setState({
            to : endPoint,
        })
    } 
    
    onChangeDate = (event) => {
        const inputDate = event.target.value 
        this.setState({
            date : inputDate,
        })
    } 

    renderSuccessView = () => {
        const {cabsDetails, date} = this.state
        // console.log(cabsDetails.length)
        const currentDate = new Date()
        console.log(currentDate)
        const givenDate = new Date(date)
        console.log(givenDate)

        const hoursDifference = differenceInHours(givenDate, currentDate);
        console.log(hoursDifference)
        
        if(cabsDetails.length > 0 && hoursDifference >= 0.25 ) {
            return(
                <div className="cab-items-container" >
                {
                    cabsDetails.map(eachItem => (
                    < CabItem key = {eachItem.id} eachCab = {eachItem} date = {date}  />
                ))}
                </div>
            )
        }
        else if(cabsDetails.length > 0 && hoursDifference <= 0 ) {
            return <h1 className="error-msg"> Currently We can't take you back in Time </h1>
        }
        else{
            return <h1 className="error-msg"> No Cabs available between the selected Locations  </h1>
        }
        
    }

    renderStaticView = () => <h1 className="error-msg"> Please Enter both Starting Point and Destination Point  </h1>

    renderFailureView = () => <h1 className="error-msg" > Error 404 : Not Found </h1>

    renderLoadingView = () => <h1 className="loading" > Loading... </h1>
    

    renderView = () => {
        const {apiStatus} = this.state 

        switch (apiStatus) {
            case apiStateConstants.starting:
                return this.renderStaticView();
            case apiStateConstants.success:
                return this.renderSuccessView()  
            case apiStateConstants.failure:
                return this.renderFailureView()  
            case apiStateConstants.loading:
                return this.renderLoadingView()            
            default:
                return null;
        }
    }

    render(){
        const { from, to} = this.state
        
        return(
            <div className="app-container" >
                <h1 className="main-head" > Cabs Services </h1>
                <nav>
                    <div className="navbar">
                    <a href="" className="active">Home</a>
                    <a href="">About</a>
                    <a href="">Services</a>
                    <a href="">Contact</a>
                    <a className="login" type = "button" > <button className="login-button"> Login </button>   </a>
                    </div>
                </nav>
                <div className="search-container" >
                    <input onChange={this.onChangeStartingPoint}  className="search-el" type = "search" placeholder="Starting Point" value={from}  />
                    <input onChange={this.onChangeDeatinationPoint} className="search-el" type = "search" placeholder="Destination Point" value={to} />
                    <input className="date-el" onChange={this.onChangeDate} type = "date" />
                    <button className="search-button" type = "button"  onClick={this.getCabs}  > Search  </button>
                </div>
                {this.renderView()}
            </div>
        )
    }
}




export default CabApp