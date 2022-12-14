import React from 'react'
import {useState} from "react";

// index for which property to show
var toShow = 0;
// functions for Onclick Event Handler
var onClickHandlers = [];
var myFavorites = [];


const Favorites = (props) => {
    ///
    // states
    const [DefaultView, setDefaultView] = useState(0);
    //
    //click handler
    function showDetail(i) {
        setDefaultView(1);
        toShow = i;
    }

    function returnToMainPage() {
        setDefaultView(0);
    }

    function showFavorites() {
        setDefaultView(2);
    }

    function addFavorites(pid) {
        myFavorites.push(pid);
    }

    for (var j = 0; j < props.properties.length; j++) {
        onClickHandlers[j] = showDetail.bind(this, j);
    }
    const list = [];
    // initiate index for onClick Handler
    var clickIndex = -1;
    //var userFavorites = props.login.favorite_list;
    var isFav = false;
    //myFavorites = [2,4,6];
    myFavorites = props.login.favorite_list;
    for (let i = 0; i < props.properties.length; i++) {
        //for(let property of props.properties) {
        var property = props.properties[i];
        isFav = false;
        for (let j = 0; j < myFavorites.length; j++) {
            if (property.pid === myFavorites[j]) {
                isFav = true;
                //console.log(myFavorites[j]);
                break;
            }
        }
        if (!isFav){
            clickIndex+=1;
            continue;
        }
        // index number for onClick handler
        clickIndex += 1;

        const pid = "#" + property.id;
        list.push(
            <div className='card m-2' style={{width: "20rem"}}>
                <div id={property.id} className="carousel slide mx-auto card-img-top" data-interval="false">
                    {/* <!-- Indicators/dots --> */}
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={pid} data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target={pid} data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target={pid} data-bs-slide-to="2"></button>
                    </div>

                    {/* <!-- The slideshow/carousel --> */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={property.images[0]} alt="..." className="pointer" style={{width: "100%"}}
                                 onClick={onClickHandlers[clickIndex]}/>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={property.images[1]} alt="..." className="pointer" style={{width: "100%"}}
                             onClick={onClickHandlers[clickIndex]}/>
                    </div>
                    <div className="carousel-item">
                        <img src={property.images[2]} alt="..." className="pointer" style={{width: "100%"}}
                             onClick={onClickHandlers[clickIndex]}/>
                    </div>
                </div>

                <div className="card-body">
                    <h5 className="pointer" onClick={onClickHandlers[clickIndex]}>{property.title}</h5>
                    <p className="card-text">{property.location}</p>
                    <p className="card-text">{property.bedrooms}-bedroom</p>
                    <p className="card-text">${property.nightly_fee + property.cleaning_fee + property.service_fee}/night</p>
                </div>
            </div>
        );
    }
    const detailList = [];
    for (let property of props.properties) {
        if (
            (property.title.toLowerCase().indexOf(
                props.filterText.toLowerCase()
            ) == -1) &&
            (property.location.toLowerCase().indexOf(
                props.filterText.toLowerCase()
            ) == -1)
        )
            continue;

        const pid = "#" + property.id;

        // build amenity string
        var amenityStr = "";
        for (let j = 0; j < property.amenities.length - 1; j++) {
            amenityStr += property.amenities[j];
            amenityStr += ", ";
        }
        amenityStr += property.amenities[property.amenities.length - 1];

        //create list for click show in main content area
        detailList.push(
            <div className='main' style={{width: "70rem"}}>
                <div id={property.id} className="carousel slide mx-auto card-img-top" data-interval="false">
                    {/*<!-- Gallery -->*/}
                    <div class="row">
                        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                            <img
                                src={property.images[0]}
                                class="w-100 shadow-1-strong rounded mb-4"
                            />
                        </div>

                        <div class="col-lg-4 mb-4 mb-lg-0">
                            <img
                                src={property.images[1]}
                                class="w-100 shadow-1-strong rounded mb-4"
                            />
                        </div>

                        <div class="col-lg-4 mb-4 mb-lg-4">
                            <img
                                src={property.images[2]}
                                class="w-100 shadow-1-strong rounded mb-4"
                            />
                        </div>
                    </div>
                    {/*<!-- Gallery -->*/}
                </div>
                <div className="card-body">
                    <h5>{property.title}</h5>
                    <p className="card-text">{property.location}</p>
                </div>
                <br/>
                <div className="body">
                    <div className='main' style={{width: "30rem"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th scope="row">Bedrooms:</th>
                                <td>{property.bedrooms}</td>
                            </tr>
                            <tr>
                                <th scope="row">Nightly Fees:</th>
                                <td>${property.nightly_fee}</td>
                            </tr>
                            <tr>
                                <th scope="row">Cleaning Fee:</th>
                                <td>${property.cleaning_fee}</td>
                            </tr>
                            <tr>
                                <th scope="row">Service Fee:</th>
                                <td>${property.service_fee}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description:</th>
                                <td>{property.description}</td>
                            </tr>
                            <tr>
                                <th scope="row">Amenities:</th>
                                <td>{amenityStr}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="rating"><input type="radio" name="rating" value="5" id="5"></input><label
                            htmlFor="5">???</label> <input type="radio" name="rating" value="4" id="4"></input><label
                            htmlFor="4">???</label> <input type="radio" name="rating" value="3" id="3"></input><label
                            htmlFor="3">???</label> <input type="radio" name="rating" value="2" id="2"></input><label
                            htmlFor="2">???</label> <input type="radio" name="rating" value="1" id="1"></input><label
                            htmlFor="1">???</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Add Comment</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="button" className="backButton" onClick={addFavorites(property.pid)}>Add to
                            Favorites
                        </button>
                        <button type="button" className="backButton" onClick={returnToMainPage}>Return to Main Page
                        </button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
    if (DefaultView == 0) {
        return (
            <div>
                <div className="body">
                    <button type="button" className="backButton" onClick={showFavorites}>Show My Favorites</button>
                </div>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {list}
                </div>
            </div>
        )
    } else if (DefaultView == 1) {
        return (

            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {detailList[toShow]}
            </div>
        )
    }
    ;
}
export default Favorites