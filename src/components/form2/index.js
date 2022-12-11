import { useState, useEffect } from 'react';

const Form2 = ({ setMessage, selectData }) => {

    const [countryData, setCountryData] = useState([])
    const [stateData, setStateData] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        contactNumber: '',
        email: '',
        country: '',
        state: '',
    })

    const formContainerStyle = {
        width: "100%",
        height: "calc(100vh - 20px)",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    }

    const formStyle = {
        margin: "30px auto",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
    }

    const formHeader = {
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #e5e5e5",
        marginBottom: "20px",
        backgroundColor: "#e6a765",
    }

    const formBody = {
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    }

    const fieldStyle = {
        width: "90%",
        height: "25px",
        padding: "50px auto",
        margin: "5px",
    }

    const buttonStyle = {
        width: "100%",
        height: "40px",
        borderRadius: "5px",
        border: "1px solid #e5e5e5",
        backgroundColor: "rgb(186, 202, 94)",
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "all 0.3s ease-in-out",
        margin: "0 auto",
    }

    const handleSubmit = () => {
        const { name, dateOfBirth, contactNumber, email, country, state } = formData
        
        let isValid = name && dateOfBirth && contactNumber && email && country && state
        if(!isValid) {
            alert("Please enter all the fields")
            return;
        }

        setMessage({ key: 'success', info: 'All fields are valid.'})

        alert('Submittted form successfully!')
    }

    console.log(formData)

    const validateForm = (propName, propValue) => {

        const { name, dateOfBirth, contactNumber, email, country, state } = formData

        if(propName === 'name' && !propValue) {
            return { key: 'Name', error: 'Name must be provided.'}
        }
        if(propName === 'name' && (propValue.length < 4 || propValue.length > 10)) {
            return { key: 'Name', error: 'Length should be between 4 and 10.'}
        }

        if(propName === 'dateOfBirth' && !propValue) {
            return { key: 'DateOfBirth', error: 'DateOfBirth must be provided.'}
        }

        if(propName === 'contactNumber' && !propValue) {
            return { key: 'ContactNumber', error: 'ContactNumber must be provided.'}
        }

        if(propName === 'contactNumber' && !(/^[1-9]\d{9}$/.test(propValue.toString()))) {
            return { key: 'ContactNumber', error: 'ContactNumber should be a valid of 10 digits number.' }
        }

        if(propName === 'country' && !propValue) {
            return { key: 'Country', error: 'Country must be provided.'}
        }

        if(propName === 'state' && !propValue) {
            return { key: 'State', error: 'State must be provided.'}
        }

        // let emailExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if(propName === 'email' && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(propValue))) {
            return { key: 'Email', error: 'Invalid email address.'}
        }

        let allValid = name && dateOfBirth && contactNumber && country && email && (state || propValue);


        return allValid ? 
        { key: 'success', info: 'All fields are valid.'} : 
        { key: 'success', info: 'No error'}


    }


    const handleChange = (e) => {

        let errorObj = validateForm(e.target.name, e.target.value);
        setMessage(errorObj)

        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))

        if(e.target.name === 'country') {
            setStateData(selectData.filter((cnty) => cnty.name === e.target.value)[0].states)
        }
        
    }

    console.log(stateData)

    useEffect(() => {
        setCountryData(selectData.map((item) => item.name))
        // eslint-disable-next-line
    }, [])


    return (
        <div className="form-container" style={formContainerStyle}>
            <div className="form" style={formStyle}>
                <div className="form-header" style={formHeader}>
                    <h2>Personal Details</h2>
                </div>
                <form className="form-body" onSubmit={handleSubmit} style={formBody}>
                        <input 
                            name='name'
                            style={fieldStyle}
                            placeholder='Enter Name..'
                            value={formData.name}
                            onChange={handleChange}
                        />
 
                        <input
                            name="dateOfBirth"
                            onChange={handleChange}
                            style={fieldStyle}
                            value={formData.dateOfBirth}
                            type='date'
                            placeholder='Enter Date Of Birth..'
                        />
    
                        <input
                            name='contactNumber'
                            onChange={handleChange}
                            type='number'
                            value={formData.contactNumber}
                            style={fieldStyle}
                            placeholder='Enter Contact Number..'
                        />
   
                        <input
                            name='email'
                            onChange={handleChange}
                            style={fieldStyle}
                            value={formData.email}
                            placeholder='Enter Email..'
                        />

                        <select
                            style={{...fieldStyle, ...{
                                width: '92.3%',
                                height: "30px",

                            }}}
                            name='country'
                            value={formData.country}
                            onChange={handleChange}
                        >
                            <option>Select Country</option>

                            {countryData?.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </select>

                        <select
                            style={{...fieldStyle, ...{
                                width: '92.3%',
                                height: "30px",
                            }}}
                            name='state'
                            value={formData.state}
                            onChange={handleChange}
                        >
                            <option>Select State</option>
 
                            {stateData?.map(item => (
                                <option value={item.name} key={item.code}>{item.name}</option>
                            ))}
                        </select>

                

                    <div className="form-footer" >
                        <input
                            className='submit-btn'
                            type="submit"
                            placeholder='Submit'
                            style={buttonStyle}
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form2;