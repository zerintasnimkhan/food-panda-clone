import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import EditCategoriesModal from '../../components/EditCategoriesModal';
import { updateFood } from '../../services/food.service';

function EditFoodPage() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [foodInfo, setFoodInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState();

  useEffect(() => {
    if (!state || !state.food) navigate('/restaurant/food');
    setFoodInfo(state.food);
  }, [])

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'img') {
      setNewImage(e.target.files[0]);
      return;
    }

    if (name === 'normalTime' || name === 'peakTime') {
      setFoodInfo(prevState => ({ ...prevState, prepareTime: { ...prevState.prepareTime, [name]: value } }));
    } else {
      setFoodInfo(prevState => ({ ...prevState, [name]: value }));
    }
  }

  function handleCategoryChange(categories) {
    setFoodInfo(prevState => ({ ...prevState, category: categories }));
    document.getElementById('edit-categories-modal').close();
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl;
      if (newImage) {
        const { secure_url } = await cldUpload(foodInfo._id, newImage, 'food');
        imageUrl = secure_url
      }

      const data = {
        ...foodInfo,
        ...(imageUrl ? {imageUrl}: {}),
        servingSize: `1:${foodInfo.servingSize}`,
        category: foodInfo.category.map(cat => cat._id)
      }
      
      delete data._id;
      delete data.foodId;
      
      await updateFood(foodInfo.foodId, data);
      setLoading(false);
      navigate('/restaurant/food');
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }


  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className='w-full flex justify-start'>
        <button className='btn btn-outline btn-primary mt-8 ml-10' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft} /> Back</button>
      </div>


      <form onSubmit={handleSubmit} className='flex w-1/2 min-w-96 flex-col items-center'>
        <h1 className='text-2xl font-bold my-3'>Edit Food Info</h1>
        <div className='w-5/6 my-3 flex items-center justify-between'>
          <label htmlFor='name'>Name: </label>
          <input
            name="name"
            type="text"
            placeholder="Food name"
            className="input input-bordered input-primary w-2/3 max-w-xs"
            defaultValue={foodInfo && foodInfo.name}
            onChange={handleChange}
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
            defaultValue={foodInfo && foodInfo.price}
            onChange={handleChange}
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
            defaultValue={foodInfo && (Number(foodInfo.servingSize.split(':')[1]))}
            onChange={handleChange}
            required
          />
        </div>

        <div className='w-5/6 my-3 flex items-center justify-between'>
          <label htmlFor='servingSize'>Package size: </label>
          <select name="servingSize" className="select select-primary w-2/3 max-w-xs" required defaultValue={foodInfo && foodInfo.packageSize}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="divider">PREPARE TIME (MIN)</div>

        <div className='w-5/6 my-3 flex items-center justify-between'>
          <label className='w-24' htmlFor='normalTime'>Normal: </label>
          <input name='normalTime' type="range" min={0} max="60" defaultValue={foodInfo && foodInfo.prepareTime.normalTime} className="range range-primary" required onChange={handleChange} />
          <p className='ml-3'>{foodInfo && foodInfo.prepareTime.normalTime}</p>
        </div>

        <div className='w-5/6 my-3 flex items-center justify-between'>
          <label className='w-24' htmlFor='peakTime'>Peak: </label>
          <input name='peakTime' type="range" min={0} max="60" defaultValue={foodInfo && foodInfo.prepareTime.peakTime} className="range range-primary" required onChange={handleChange} />
          <p className='ml-3'>{foodInfo && foodInfo.prepareTime.peakTime}</p>
        </div>

        <div className="divider"></div>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='categories'>Categories: </label>
          <div>
            {foodInfo && foodInfo.category.map(category => <div key={category._id} className="badge badge-primary badge-lg">{category.name}</div>)}
          </div>
          <button className='btn btn-primary btn-outline' onClick={(e) => { e.preventDefault(); document.getElementById('edit-categories-modal').showModal() }}>Edit categories</button>
        </div>

        <dialog id="edit-categories-modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <EditCategoriesModal handleCategoryChange={handleCategoryChange} restaurantCat={foodInfo ? foodInfo.category : []} />
          </div>
        </dialog>

        <div className="w-5/6 flex justify-between items-center my-3">
          <label htmlFor='img'>Image: </label>
          <input
            name="img"
            type="file"
            accept="image/png, image/jpeg"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} className='btn btn-primary mt-2'>
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditFoodPage