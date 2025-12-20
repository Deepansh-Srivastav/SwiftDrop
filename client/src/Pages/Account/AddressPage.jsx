import { useState, useEffect, useActionState } from 'react';
import AddAddressModal from '../../Components/AddAddressModal';
import PageBanner from '../../Common/PageBanner';
import { APIConfig } from '../../Networking/Configuration/ApiConfig';
import { getApiRequestWrapper, deleteApiRequestWrapper } from '../../Networking/Services/ApiCalls';
import AddressCard from '../../Components/AddressCard';

import { showSuccessToast, showErrorToast } from '../../Components/CostomAlert';

const AddressPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [addressData, setAddressData] = useState([]);

    const [addressChanged, setAddressChanged] = useState(false);

    async function fetchUserAddress() {

        const FINAL_URL = APIConfig?.addressPath?.getAddress;

        const response = await getApiRequestWrapper(FINAL_URL);

        if (response?.error === false && response?.success === true) {
            setAddressData(response?.address);
        };
    };

    async function deleteUserAddress(address_id) {

        const URL = APIConfig?.addressPath?.deleteAddress;

        const FINAL_URL = `${URL}?address_id=${address_id}`

        const response = await deleteApiRequestWrapper(FINAL_URL);

        if (response?.error === false && response?.success === true) {
            showSuccessToast(response?.message);

            setAddressChanged(prev => !prev);
            return;
        };
        showErrorToast(response?.message);

    };

    function handleModal(action) {
        if (!action) return;

        if (action === "open") {
            return setIsModalOpen(true);
        }
        else if (action === "close") {
            return setIsModalOpen(false);
        }
    };

    useEffect(() => {
        fetchUserAddress();
    }, [addressChanged]);

    return (
        <section className="category-page">

            <PageBanner heading={"your addresses"} />

            <aside className="add-category-button">
                {!isModalOpen && (
                    <button className="imageUploadButton" onClick={() => { handleModal('open') }}>
                        + Add Address
                    </button>
                )}
            </aside>

            {isModalOpen && <AddAddressModal handleModal={handleModal} setAddressChanged={setAddressChanged} />}

            <div className="display-category-container">
                {addressData?.map((address) => {
                    return <AddressCard key={address?._id} {...address} deleteUserAddress={deleteUserAddress} />
                })}
            </div>

        </section>
    );
};

export default AddressPage;