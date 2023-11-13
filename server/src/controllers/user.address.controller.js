import e from 'express';
import AddressModel from './path/to/your/address/model'; // Import your Address model

export const addAddress = async (req, res) => {
    const { userId, name, street, city, district, location } = req.body;

    try {
        const newAddress = await AddressModel.create({
            userId,
            name,
            street,
            city,
            district,
            location,
        });
        return res.status(200).json(newAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error adding new address' });
    }
};


export const updateAddressById = async (req, res) => {
    const userId = req.params.userId; 
    

    try {
        const updatedAddress = await AddressModel.findByIdAndUpdate(userId);
        if (!updatedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        return res.json(updatedAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating address by ID' });
    }
};

export const deleteAddressById = async (req, res) => {
    const userId = req.params.userId; 

    try {
        const deletedAddress = await AddressModel.findByIdAndDelete(userId);
        if (!deletedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        return res.json(deletedAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error deleting address by ID' });
    }
};

export const getAllAddress = async (req, res) => {
    try {
        const addresses = await AddressModel.find({});
        return res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error getting all addresses' });
    }
};

export const getAddressById = async (req, res) => {
    try{
        const address = await AddressModel.findById(req.params.userId);
        return res.status(200).json(address);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error:"Error getting address by ID"});
    }
}


