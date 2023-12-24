/* @clientOnly */
"use client"
import React from 'react'
import {  collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { query } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import Addcar from "../Addcar/page"
const page = () => {
const [data,setData]=useState([]);
const [isFormVisible,SetIsFormVisible]=useState(false);
const [selectedCarId, setSelectedCarId] = useState(null);


    
    useEffect(()=>{

        const q=query(collection(db,'carPricing'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemArray=[];
        querySnapshot.forEach((doc) => {
            itemArray.push({...doc.data(), id:doc.id})
        });
        setData(itemArray);
       
      });
    },[]);

    useEffect(() => {
        console.log(data);
      }, [data]);
 const dltbtn=async (id)=>{
await deleteDoc(doc(db,'carPricing',id));
// alert(`details with id:${id} are deleted`);
 }
// const updatebtn=async(id)=>{
//   await updateDoc(doc(db,'carPricing',id));
// }
const handleUpdate=(id)=>{
  setSelectedCarId(id)
SetIsFormVisible(true);

}
  return (
    <>
     <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold">CarPricer</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/" >Home</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/Addcar" >Add Car</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/ReadData" >Read</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/pricing" >Pricing</Link>
          <Link className='hover:bg-black py-2 px-4 rounded-full text-white' href="/contact" >Contact</Link>
        </div>
      </div>
    </nav>

   <div className="container mx-auto my-8">
   {isFormVisible ? <Addcar carId={selectedCarId} />  :  <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Make</th>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Year</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Specs</th>
                <th className="py-2 px-4 border-b">Update</th>
                <th className="py-2 px-4 border-b">Delete</th>

              </tr>
            </thead>
            <tbody>
              {data.map((car) => (
                <tr key={car.id}> 
                  <td className="py-2 px-4 border-b">{car.id}</td>
                  <td className="py-2 px-4 border-b">{car.make}</td>
                  <td className="py-2 px-4 border-b">{car.model}</td>
                  <td className="py-2 px-4 border-b">{car.year}</td>
                  <td className="py-2 px-4 border-b">{car.price}</td>
                  <td className="py-2 px-4 border-b">{car.specs}</td>
                  <td className="py-2 px-4 border-b"><button onClick={()=>{handleUpdate(car.id)}} className='bg-blue-900 rounded p-3 hover:bg-blue-600'>Update</button></td>
                  <td className="py-2 px-4 border-b"><button onClick={()=>{dltbtn(car.id)}} className='bg-red-800 rounded p-3 hover:bg-red-500'>Delete</button></td>

                </tr>
              ))}
            </tbody>
          </table>
   }

          
        </div>

    </>
   );
  
}
export default page;