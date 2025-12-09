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