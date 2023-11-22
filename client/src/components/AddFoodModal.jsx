import React, { useState } from 'react';
import { cldUpload } from '../services/cloudinary.service';
import { addFood } from '../services/food.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function AddFoodModal({ restaurantId, handleNewFood }) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [normalTime, setNormalTime] = useState(0);
  const [peakTime, setPeakTime] = useState(0);
  const [imgFile, setImgFile] = useState(null);
  const [packageSize, setPackageSize] = useState('small');
  const [loading, setLoading] = useState(false);


  async function handleSubmit (e) {
    e.preventDefault();
    try {
      if (name && price && servingSize && normalTime && peakTime && packageSize) {
        setLoading(true);
        let imageUrl;

        if (imgFile) {
          const { secure_url } = await cldUpload(restaurantId, imgFile, 'food');
          imageUrl = secure_url
        }

        const data = {
          name,
          price,
          servingSize: `1:${servingSize}`,
          prepareTime: {
            normalTime,
            peakTime
          },
          packageSize,
          ...(imageUrl ? { imageUrl } : {})
        }

        const res = await addFood(restaurantId, data);
        handleNewFood(res.food);
        setLoading(false);
        e.target.reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <h2 className='text-xl font-bold mb-3'>Add Food</h2>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label htmlFor='name'>Name: </label>
        <input
          name="name"
          type="text"
          placeholder="Food name"
          className="input input-bordered input-primary w-2/3 max-w-xs"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label htmlFor='price'>Price (৳): </label>
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered input-primary w-2/3 max-w-xs"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label htmlFor='servingSize'>Serving size: </label>
        <input
          name="servingSize"
          type="number"
          placeholder="Serving size"
          className="input input-bordered input-primary w-2/3 max-w-xs"
          onChange={(e) => setServingSize(e.target.value)}
          required
        />
      </div>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label htmlFor='servingSize'>Package size: </label>
        <select name="servingSize" className="select select-primary w-2/3 max-w-xs" required onChange={(e) => setPackageSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="divider">PREPARE TIME (MIN)</div>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label className='w-24' htmlFor='normalTime'>Normal: </label>
        <input name='normalTime' type="range" min={0} max="60" defaultValue={0} className="range range-primary" required onChange={(e) => setNormalTime(e.target.value)} />
        <p className='ml-3'>{normalTime}</p>
      </div>

      <div className='w-5/6 my-3 flex items-center justify-between'>
        <label className='w-24' htmlFor='peakTime'>Peak: </label>
        <input name='peakTime' type="range" min={0} max="60" defaultValue={0} className="range range-primary" required onChange={(e) => setPeakTime(e.target.value)} />
        <p className='ml-3'>{peakTime}</p>
      </div>

      <div className="divider"></div>

      <div className="w-5/6 flex justify-between items-center my-3">
        <label htmlFor='img'>Image: </label>
        <input
          name="img"
          type="file"
          accept="image/png, image/jpeg"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={(e) => setImgFile(e.target.files[0])}
        />
      </div>

      <button type="submit" disabled={loading} className='btn btn-primary mt-2'>
        {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        Submit
      </button>

    </form>
  )
}

export default AddFoodModal