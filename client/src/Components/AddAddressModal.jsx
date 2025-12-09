import React from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import { useState } from 'react';

import "../Styles/Modal.css"
import { showErrorToast } from './CostomAlert';
import { postApiRequestWrapper, getApiRequestWrapper } from '../Networking/Services/ApiCalls';
import { APIConfig } from '../Networking/Configuration/ApiConfig';
import { useEffect } from 'react';

const AddAddressModal = () => {

    const [addressData, setAddressData] = useState({
        address_line: null,
        city: null,
        state: null,
        pin: null,
        country: "India",
        addressType: "Home",
        mobile: null
    })

    async function fetchUserAddress() {

        const FINAL_URL = APIConfig?.addressPath?.getAddress;

        const response = await getApiRequestWrapper(FINAL_URL);


    }

    function handleAddressInput(e) {
        const { name, value } = e.target;

        setAddressData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    };

    async function handleAddressSubmitRequest() {
        if (
            !addressData?.address_line ||
            !addressData?.city ||
            !addressData?.state ||
            !addressData?.pin ||
            !addressData?.country ||
            !addressData?.addressType ||
            !addressData?.mobile
        ) {
            showErrorToast('Enter all the required fields.')
            return;
        }

        const payload = addressData;

        const FINAL_URL = APIConfig?.addressPath?.addAddress;

        const response = await postApiRequestWrapper(FINAL_URL, payload);




    };

    useEffect(() => {
        fetchUserAddress();
    }, [])

    return (
        <div className='modal-wrapper hide-scroll-bar'>
            <div className="modal-heading">
                <h3 className='text-size-2'>Add New Address</h3>
            </div>

            <div className="modal-form-container hide-scroll-bar">

                <div className="address-type">
                    <input
                        type="radio"
                        id="addr-home"
                        name="addressType"
                        value="Home"
                        checked={addressData?.addressType === "Home"}

                        onChange={handleAddressInput}
                    />
                    <label htmlFor="addr-home">Home</label>

                    <input
                        type="radio"
                        id="addr-office"
                        name="addressType"
                        value="Office"
                        checked={addressData?.addressType === "Office"}

                        onChange={handleAddressInput}
                    />
                    <label htmlFor="addr-office">Office</label>

                    <input
                        type="radio"
                        id="addr-other"
                        name="addressType"
                        value="Other"
                        checked={addressData?.addressType === "Other"}

                        onChange={handleAddressInput}
                    />
                    <label htmlFor="addr-other">Other</label>
                </div>

                <Typography fontWeight={500} mb={-1} mt={2}>
                    Phone
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="mobile"
                    value={addressData?.mobile}
                    required
                    type="tel"
                    placeholder="Enter contact number"
                    inputProps={{ maxLength: 10 }}
                    onChange={handleAddressInput}
                />

                <Typography fontWeight={500} mb={-1} mt={2}>
                    Address
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="address_line"
                    value={addressData?.address_line}
                    type="text"
                    placeholder="Enter house number, street, locality"
                    required
                    onChange={((e) => {
                        const value = e.target.value;
                        if (value.length < 200) {
                            handleAddressInput(e);
                        }
                    })}
                />


                <Typography fontWeight={500} mb={-1} mt={2}>
                    Pin Code
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="pin"
                    value={addressData?.pin}
                    type="tel"
                    inputProps={{ maxLength: 8 }}
                    placeholder="Enter Pincode"
                    required
                    onChange={handleAddressInput}
                />

                <Typography fontWeight={500} mb={-1} mt={2}>
                    City
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="city"
                    value={addressData?.city}
                    type="text"
                    placeholder="Enter your city"
                    onChange={handleAddressInput}
                    required
                />

                <Typography fontWeight={500} mb={-1} mt={2}>
                    State
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="state"
                    value={addressData?.state}
                    type="text"
                    placeholder="Enter your State"
                    required
                    onChange={handleAddressInput}
                />

                <Typography fontWeight={500} mb={-1} mt={2}>
                    Country
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    name="country"
                    value={addressData?.country}
                    type="text"
                    placeholder="Enter your Country"
                    required
                    onChange={handleAddressInput}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 4,
                        borderRadius: "8px",
                        textTransform: "none",
                        backgroundColor: "var(--purple-theme)",
                    }}
                    onClick={handleAddressSubmitRequest}
                >
                    Add
                </Button>

            </div>
        </div>
    );
};

export default AddAddressModal;
