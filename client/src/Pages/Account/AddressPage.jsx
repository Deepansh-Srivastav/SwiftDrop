import { useState, useEffect } from 'react';
import AddAddressModal from '../../Components/AddAddressModal';
import PageBanner from '../../Common/PageBanner';
import { APIConfig } from '../../Networking/Configuration/ApiConfig';
import { getApiRequestWrapper } from '../../Networking/Services/ApiCalls';

const AddressPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function fetchUserAddress() {

        const FINAL_URL = APIConfig?.addressPath?.getAddress;

        const response = await getApiRequestWrapper(FINAL_URL);

    };

    function handleModal(action) {
        if (!action) return;

        if (action === "open") {
            return setIsModalOpen(true);
        }
        else if (action === "close") {
            return setIsModalOpen(false);
        }
    }

    useEffect(() => {
        fetchUserAddress();
    }, []);


    return (
        <section className="category-page">


            <PageBanner heading={"address"} />

            <aside className="add-category-button">
                {!isModalOpen && (
                    <button className="imageUploadButton" onClick={() => { handleModal('open') }}>
                        + Add Address
                    </button>
                )}
            </aside>

            {isModalOpen && <AddAddressModal handleModal={handleModal} />}

        </section>
    );
    ;
}

export default AddressPage;
