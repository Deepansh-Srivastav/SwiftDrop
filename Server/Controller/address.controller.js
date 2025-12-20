import AddressModel from "../Model/address.model.js";

//Add address controller
export async function addAddressController(req, res) {
    try {
        const userId = req?.userId;
        const payload = req?.body;
        const { address_line, city, state, pin, country, addressType, mobile } = payload;

        if (!address_line || !city || !state || !pin || !country || !addressType || !mobile) {
            return res.status(404).json({
                message: "Provide all the required fields.",
                error: true,
                success: false
            });
        };

        const userAddress = await AddressModel.findOne({ user: userId })

        if (!userAddress) {
            const saveAddress = await AddressModel.create({
                user: userId,
                address: [payload]
            });

            if (!saveAddress) {
                return res.status(400).json({
                    message: "Failed to save the address.",
                    error: true,
                    success: false
                });
            };

            return res.status(200).json({
                message: "Address saved successfully.",
                error: false,
                success: true
            });
        };

        const addAddress = userAddress?.address.push(payload);


        await userAddress.save();

        return res.status(200).json({
            message: "Address saved successfully.",
            error: false,
            success: true
        });


    } catch (error) {
        console.log("Failed to add address");
        return res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    };
};

// Get all address controller
export async function getAddressController(req, res) {
    try {
        const userId = req?.userId;

        if (!userId) {
            return res.status(404).json({
                message: "User not authenticate.",
                error: true,
                success: false
            });
        };

        const userAddress = await AddressModel.findOne({ user: userId })

        if (!userAddress) {
            return res.status(200).json({
                error: false,
                success: true,
                address: []
            });
        };

        return res.status(200).json({
            error: false,
            success: true,
            address: userAddress.address
        });


    } catch (error) {
        console.log("Failed to fetch address");
        return res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    };
};

//Edit/Update address controller
export async function updateAddressController(req, res) {
    try {
        const userId = req?.userId;
        const payload = req?.body;
        const { addressId, data } = payload;

        const { address_line, city, state, pin, country, addressType, mobile } = data;

        if (
            !address_line?.trim() ||
            !city?.trim() ||
            !state?.trim() ||
            !pin?.trim() ||
            !country?.trim() ||
            !addressType ||
            !mobile?.trim()
        ) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All address fields are required"
            });
        }

        const userAddress = await AddressModel.findOne({ user: userId });

        if (!userAddress) {
            return res.status(404).json({
                message: "No address found.",
                error: false,
                success: true
            });
        };

        let selectedAddress = userAddress.address.id(addressId);

        if (!selectedAddress) {
            return res.status(404).json({
                message: "Address not found",
                error: true,
                success: false,
            });
        };

        Object.assign(selectedAddress, data);

        await userAddress.save();

        return res.json({
            message: "Address updated successfully",
            error: false,
            success: true,
        });


    } catch (error) {
        console.log("Failed to update address");
        return res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    };
};

//Delete address controller
export async function deleteAddressController(req, res) {
    try {
        const userId = req?.userId;
        const { address_id } = req?.query;
        
        if (!address_id) {
            return res.status(400).json({
                message: "Address ID not provided.",
                error: true,
                success: false
            });
        };

        const userAddress = await AddressModel.findOne({ user: userId });

        if (!userAddress) {
            return res.status(404).json({
                message: "No address found.",
                error: false,
                success: true
            });
        };

        userAddress.address = userAddress.address.filter(
            addr => addr._id.toString() !== address_id
        );

        await userAddress.save();

        return res.status(200).json({
            message: "Address removed",
            error: false,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while deleting the address.",
            error: true,
            success: false
        });
    };
};