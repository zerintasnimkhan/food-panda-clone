import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../services/restaurant.service';

function EditCategoriesModal({ handleCategoryChange, restaurantCat }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(restaurantCat);

  useEffect(() => {
    async function getCategories () {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  useEffect(() => {
    setSelectedCategories(restaurantCat);
  }, [restaurantCat])


  function handleSelect (selected) {
    setSelectedCategories(prevState => {
      const index = selectedCategories.findIndex(category => category._id === selected._id);
      if (index !== -1) return prevState.filter(category => category._id !== selected._id);
      return [...prevState, selected];
    })
  }


  function handleCatergorySubmission (e) {
    e.preventDefault();
    handleCategoryChange(selectedCategories);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className="font-bold text-lg my-5">Edit categories</h3>
      <div className='flex flex-wrap'>
        {categories.map(category => <div 
          key={category._id}
          className={'w-1/4 border-4 m-2 text-center p-2 rounded-md cursor-pointer' + (selectedCategories.findIndex(c => category._id === c._id) !== -1 ? " border-pink-600" : " border-neutral-300")}
          onClick={() => handleSelect(category)}
          >
            {category.name}
          </div>)}
      </div>
      <button className='btn' onClick={handleCatergorySubmission}>Submit Selection</button>
    </div>
  )
}

export default EditCategoriesModal