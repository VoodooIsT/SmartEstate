import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'


const CreateListing = () => {


  const [file, setFile] = useState([]);
  const[formData, setFormData] = useState({
    imageUrls:  [],
    name:"",
    description:"",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: "",
    parking: "",
    type: "rent",
    offer: false,
    paeking: false,
    furnished: false

    


  });

  const[imageUploadError, setImageUploadError] = useState(false);
  const[uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubit = (e) => {
    if(file.length > 0 && file.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      
      for(let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));

      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError("Image Upload Failed (not greater then 2 mb)")
      });

      
    } else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }

  };

  const storeImage = async(file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i!==index),
      
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form action="" className='flex flex-col sm:flex-row gap-4'>
          <div className="flex flex-col gap-4 flex-1">
            <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' className='border p-3 rounded-lg' id="name" maxLength='62' minLength= '10' required />
            <textarea onChange={handleChange} value={formData.description} type="text" placeholder='Description' className='border p-3 rounded-lg' id="name" maxLength='62' minLength= '10' required />
            <input onChange={handleChange} value={formData.address} type="text" placeholder='Address' className='border p-3 rounded-lg' id="address"  required />

            <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input onChange={handleChange} checked={formData.type === 'sale'} type="checkbox"  id="sale" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input onChange={handleChange} checked={formData.type === 'rent'} type="checkbox"  id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input onChange={handleChange} checked={formData.parking} type="checkbox"  id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input onChange={handleChange} checked={formData.furnished}  type="checkbox"  id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input onChange={handleChange} checked={formData.offer} type="checkbox"  id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.bedrooms} type="number" name="" id="bedrooms" min='1' max='10' required className="p-3  border border-gray-300 rounded-lg"/>
              <p>Bedrooms</p>
            </div>

            <div className="flex items-center gap-2">
              <input onChange={handleChange} value={formData.bathrooms} type="number" name="" id="bathrooms" min='1' max='10' required className="p-3  border border-gray-300 rounded-lg"/>
              <p>Bathrooms</p>
            </div>

            <div className="flex items-center gap-2">
              <input type="number" name="" id="regularPrice" min='1' max='10' required className="p-3  border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="number" name="" id="discountPrice" min='1' max='10' required className="p-3  border border-gray-300 rounded-lg"/>
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>

          <div className="flex gap-4">
            <input onChange={(e)=>setFile(e.target.files)} type="file" id="images" accept="image/*" multiple  className="p-3 border border-gray-300 rounded w-full"/>
            <button disabled={uploading} type="button" onClick={handleImageSubit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{
              uploading ? 'Uploading...': 'Upload'
            }</button>
          </div>
          <p className="text-red-700 text-sm">
          {
            imageUploadError && imageUploadError
          }
        </p>
        {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div key={index} className="flex justify-between items-center">
              <img src={url} className="w-20 h-20 object-cover rounded-lg" />
              <button onClick={() => handleRemoveImage(index)} className="text-sm text-red-700 font-semibold">Delete</button>
            </div>
          ))
        }
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>



        </form>

    </main>
  )
}

export default CreateListing