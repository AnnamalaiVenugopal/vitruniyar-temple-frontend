import React, {useState} from 'react';
import './ArchanaTicketBooking.css'
import { URL } from '../Constants';
import Swal from 'sweetalert2';
import { Watch } from 'react-loader-spinner';

const ArchanaTicketBooking = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const[isResponseLoaded, setResponseLoaded] = useState(true);

    const bookTicket = (event) => {
        event.preventDefault();
        setResponseLoaded(false);

        try {
            const bookingData = {
                name,
                "phoneNumber":"+91"+phoneNumber,
                "emailId": emailId,
                bookingDate,
                bookingTime
            }
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            }
            fetch(URL+'archanaTicketBooking/bookTicket', postData).then(data => data.json()).then((response) => {
                setResponseLoaded(true);
                openPopup({
                    title: 'Success',
                    text: 'Ticket booked successfully!',
                    html: getTicketDetails(response),
                    timer: 20000,
                    timerProgressBar: true,
                    icon: 'success',
                    confirmButtonText: 'Exit'
                  });
                resetBookingData();
            }).catch((error, response)=>{
                setResponseLoaded(true);
                console.log(error);
                openPopup({
                    title: 'Uh-oh',
                    text: 'Unable to book ticket',
                    icon: 'error',
                    confirmButtonText: 'Close'
                  });
                  resetBookingData();
            });
        } catch (error) {
            //setError(error);
        }
    }

    const getTicketDetails = ticketResponse => {
        let ticketDetailsHTML = "<b>Ticket Reference Number : <b/>"+ ticketResponse.ticketId;
        ticketDetailsHTML += "<br/><b>Ticket Booked by : <b/>"+ticketResponse.name;
        ticketDetailsHTML += "<br/><b>Booking time : <b/>"+ticketResponse.bookingDateAndTime;
        ticketDetailsHTML += "<br/><b>Booking Status : <b/>"+ticketResponse.bookingStatus;
        return ticketDetailsHTML;
    }

    const openPopup = (data) => {
        Swal.fire(data);
    }

    const resetBookingData = () => {
        setName('');
        setPhoneNumber('');
        setEmailId('');
        setBookingDate('');
        setBookingTime('');
    }

    const isValidEmail = emailId => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailId);
    }

    const isValidPhoneNumber = phoneNumber => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailIdChange = (event) => {
        setEmailId(event.target.value);
    };

    const handleBookingDateChange = (event) => {
        setBookingDate(event.target.value);
    };

    const handleBookingTimeChange = (event) => {
        setBookingTime(event.target.value);
    };

    return (
        !isResponseLoaded ?(
        <div className='container loader'>
        <Watch
            visible={true}
            height="150"
            width="150"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
        ):
    (<div className='ArchanaTicketBooking'>
        <div className='form-group row'>
            <div className='col-sm-2 col-form-label form-text'>
                Name : 
            </div>
            <div className='col-sm-8'>
                <input className='form-control' type='text' id='name' placeholder='Name' value={name} onChange={handleNameChange}/>
            </div>
        </div>
        <div className='form-group row'>
            <div className='col-sm-2 col-form-label form-text'>
                Phone Number : 
            </div>
            <div className='col-sm-8'>
                <input className='form-control' type='text' id='phonenumber' placeholder='Phone Number' value={phoneNumber} onChange={handlePhoneNumberChange}/>
            </div>
            <div className={isValidPhoneNumber(phoneNumber) ? 'hide' : 'warning'}>Enter a valid phone number</div>
        </div>
        <div className='form-group row'>
            <div className='col-sm-2 col-form-label form-text'>
                Email Id : 
            </div>
            <div className='col-sm-8'>
                <input className='form-control' type='email'  id='emailid' placeholder='Email Id' value={emailId} onChange={handleEmailIdChange}/>
            </div>
        </div>
        <div className={isValidEmail(emailId) ? 'hide' : 'warning'}>Enter a valid Email Id</div>
        <div className='form-group row'>
            <div className='col-sm-2 col-form-label form-text'>
                Booking Date : 
            </div>
            <div className='col-sm-4'>
                <input type='date' className='form-control' value={bookingDate} onChange={handleBookingDateChange} onKeyDown={(e) => e.preventDefault()}/>
            </div>
        </div>
        <div className='form-group row'>
            <div className='col-sm-2 col-form-label form-text'>
                Booking time : 
            </div>
            <div className='col-sm-4'>
                <input type='time' className='form-control' id='bookingtime' value={bookingTime} onChange={handleBookingTimeChange} onKeyDown={(e) => e.preventDefault()}/>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-2">
                <button type="submit" onClick={bookTicket} className="btn btn-success">Book ticket</button>
            </div>
            <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-dark">Clear</button>
            </div>
        </div>
    </div>
    ));
}

export default ArchanaTicketBooking;