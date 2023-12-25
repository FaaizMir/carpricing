/* @clientOnly */
"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { addDoc,getDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import Link from 'next/link';


 const Page = ({ carId }) => {

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    specs: '',
  });

  const [formErrors, setFormErrors] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    specs: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};
  
    // Validate Make
    if (!formData.make.trim()) {
      errors.make = 'Make is required';
      isValid = false;
    }
  
    // Validate Model
    if (!formData.model.trim()) {
      errors.model = 'Model is required';
      isValid = false;
    }
  
    // Validate Year
    if (!formData.year || isNaN(formData.year) || formData.year < 1900) {
      errors.year = 'Invalid year';
      isValid = false;
    }
  
    // Validate Price
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      errors.price = 'Invalid price';
      isValid = false;
    }
  
    // Validate Specifications
    if (!formData.specs.trim()) {
      errors.specs = 'Specifications are required';
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
  

  useEffect(() => {
    // If carId is provided, fetch data for that car and update the form
    const getCarData = async () => {
      try {
        const carDoc = await getDoc(doc(db, 'carPricing', carId));
        if (carDoc.exists()) {
          setFormData(carDoc.data());
 } else {
          console.error('Car not found');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    if (carId) {
      getCarData();
    }
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitData = async (event) => {
    event.preventDefault();

    
  // Validate the form
  if (!validateForm()) {
    console.log('Form has errors. Please correct them.');
    return;
  }


    try {
      // If carId is provided, update the existing document; otherwise, add a new one
      if (carId) {
        await updateDoc(doc(db, 'carPricing', carId), formData);
        console.log('Data updated successfully:', formData);
      } else {
        const docRef = await addDoc(collection(db, 'carPricing'), formData);
        console.log('Document written with ID:', docRef.id);
        console.log('Data inserted successfully:', formData);
      }
    } catch (error) {
      console.error('Error inserting/updating data:', error);
    }
  };


  return (
    <div>
               {!carId && (
        <nav className="bg-blue-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">CarPricer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/" >Home</Link>
              <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/Addcar" >Add Car</Link>
              <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/ReadData" >Read</Link>
              <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/pricing" >Pricing</Link>
              <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/contact" >Contact</Link>
            </div>
          </div>
        </nav>
      )}

        <div className="flex justify-end mt-4 mr-4">
      {/* <button> <Link className='bg-cyan-200 p-3 rounded' to="/admin">Admin</Link></button> */}
      </div>
     <div className="container mx-auto my-8 bg-blue-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
            {carId ? 'Update Car' : 'Add a Car'}
          </h2>
        <form 
        className="space-y-4">
          {/* Make Input */}
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-600">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the make of the car"
              onChange={handleInputChange}
              value={formData.make}
            />
  {formErrors.make && (
    <p className="text-red-500 text-sm mt-1">{formErrors.make}</p>
  )}


          </div>

          {/* Model Input */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-600">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the model of the car"
              onChange={handleInputChange}
              value={formData.model}
            />
              {formErrors.model && (
    <p className="text-red-500 text-sm mt-1">{formErrors.model}</p>
  )}

          </div>

          {/* Year Input */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-600">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the year of the car"
              onChange={handleInputChange}
              value={formData.year}
            />
              {formErrors.year && (
    <p className="text-red-500 text-sm mt-1">{formErrors.year}</p>
  )}

          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the price of the car"
              onChange={handleInputChange}
              value={formData.price}
            />
              {formErrors.price && (
    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
  )}

          </div>

          {/* Specifications Input */}
          <div>
       <label htmlFor="specifications" className="block text-sm font-medium text-gray-600">
        Specifications
       </label>
       <input
       id="specifications"
       name="specs"
       className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
       placeholder="Enter the specifications of the car"
       onChange={handleInputChange}
       value={formData.specs}
       ></input>
         {formErrors.specs && (
    <p className="text-red-500 text-sm mt-1">{formErrors.specs}</p>
  )}

        </div>

          {/* Submit Button */}
          <div>
            <button
            onClick={submitData}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                {carId ? 'Update Car' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    </div>
  )
}
export default Page;