import "../Styles/AddressCard.css"

const AddressCard = ({receiver_name, address_line, city, state, pin, country, addressType, mobile, _id, deleteUserAddress }) => {
    return (
        <div className="user-address-card-wrapper">
            <div className="user-address-card">

                <h3 className="text-size-custom">{receiver_name}</h3>

                <p className="text-size-3">{address_line}</p>
                <p className="text-size-3">{city}, {state}</p>
                <p className="text-size-3">{country} - {pin}</p>
                <p className="text-size-3">Address type: {addressType}</p>
                <p className="text-size-3">{mobile}</p>

                <div className="address-card-actions">
                    <button className="address-btn edit-btn">Edit</button>
                    <button className="address-btn delete-btn" onClick={() => deleteUserAddress(_id)}>Remove</button>
                </div>

            </div>
        </div>

    );
};

export default AddressCard;