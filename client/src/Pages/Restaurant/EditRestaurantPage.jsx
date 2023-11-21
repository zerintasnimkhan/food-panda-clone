import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateRestaurantInfo } from '../../services/restaurant.service';
import RestaurantMap from '../../components/RestaurantMap';
import EditLocationModal from '../../components/EditLocationModal';

function EditRestaurantPage() {

  const [restaurantInfo, setRestaurantInfo] = useState();

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.restaurant) navigate('/restaurant/info');
    setRestaurantInfo(state.restaurant);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'street' || name === 'city' || name === 'district') {
      setRestaurantInfo(prevState => ({ ...prevState, address: { ...prevState.address, [name]: value } }));
    } else {
      setRestaurantInfo(prevState => ({ ...prevState, [name]: value }));
    }
  }

  function handleLocationChange (lng, lat) {
    setRestaurantInfo(prevState => ({...prevState, location: { lng, lat }}));
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await updateRestaurantInfo(restaurantInfo._id, restaurantInfo);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 flex">
      <form className='w-1/2 flex flex-col items-center'>
        <h1 className='text-2xl font-bold my-3'>Edit Restaurant Info</h1>
        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='name'>Name: </label>
          <input
            name="name"
            type="text"
            placeholder="Restaurant name"
            className="input input-bordered input-primary w-full max-w-xs"
            defaultValue={restaurantInfo ? restaurantInfo.name : ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='street'>Street: </label>
          <input
            name="street"
            type="text"
            placeholder="Street address"
            className="input input-bordered input-primary w-full max-w-xs"
            defaultValue={restaurantInfo ? restaurantInfo.address.street : ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='city'>City: </label>
          <input
            name="city"
            type="text"
            placeholder="City"
            className="input input-bordered input-primary w-full max-w-xs"
            defaultValue={restaurantInfo ? restaurantInfo.address.city : ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='district'>District: </label>
          <input
            name="district"
            type="text"
            placeholder="District"
            className="input input-bordered input-primary w-full max-w-xs"
            defaultValue={restaurantInfo ? restaurantInfo.address.district : ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='img'>Image: </label>
          <input name="img" type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        </div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='img'>Categories: </label>
          <button className='btn btn-primary btn-outline' onClick={(e) => { e.preventDefault() }}>Edit categories</button>
        </div>

        <button className='btn btn-primary' onClick={handleSubmit}>Update Info</button>
      </form>

      <div className='w-1/2 flex flex-col items-center mt-20'>
        {restaurantInfo &&
          <>
            <RestaurantMap restaurant={restaurantInfo} />
            <button className="btn my-10" onClick={() => document.getElementById('edit-location-modal').showModal()}>Edit Location</button>
            <dialog id="edit-location-modal" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <EditLocationModal restaurant={restaurantInfo} handleLocationChange={handleLocationChange} />
              </div>
            </dialog>
          </>
        }

      </div>

    </div>
  )
}

export default EditRestaurantPage