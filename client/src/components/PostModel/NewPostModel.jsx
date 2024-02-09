import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaImages } from 'react-icons/fa6';
import { GrFormPreviousLink } from "react-icons/gr";
import { uploadPost } from '../../api/PostRequest';



export default function NewPostModel({ modelOpne, setModelOpen , width}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${width ? "90%" :"40%"}`,
    height: "68vh",
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => setModelOpen(false);
  const imgref = useRef()
  const [imageBase64, setImageBase64] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState('');

  const user = JSON.parse(localStorage.getItem('user'))

  const handleback = () => {
    setDescription("")
    setImage("")
    setImageBase64("")

  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleconvertToBase64 = (e) => {
    setImage(URL.createObjectURL(event.target.files[0]))
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageBase64(reader.result)
    }
    reader.onerror = (err) => {
      console.log("error", err);
    }
  }

  const handleUploadImage = () => {
    const data = {
      image: imageBase64,
      description: description,
      userId: user.user._id
    }

    uploadPost(data).then((res) => {

      setModelOpen(false)
      window.location.reload()
    }).catch((err) => {
      
      console.log(err);
    })
  }


  return (
    <div>
      <Modal
        open={modelOpne}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col text-blue-900 b justify-between h-full'>
            <div className={` flex  ${image ? "justify-between" : "justify-center"}  items-center p-1`}>
              {image && <GrFormPreviousLink  size={30} onClick={handleback} />}
              <span className='font-bold text-xl'>New Post</span>
            </div>
            <hr color='black' className='mb-2' />

            {image ? <div>
              <img src={image} className='h-72 w-full' alt=""  onClick={() => imgref.current.click()} />
              <input type="file" ref={imgref} onChange={handleconvertToBase64} style={{ display: "none" }} />

              <input
                className='border-none outline-none p-2 w-full my-2 text-black'
                style={{ backgroundColor: "rgba(40, 52, 62, 0.07)" }}
                onChange={handleDescriptionChange}
                required
                value={description}
                type="text"
                placeholder="Description" />

            </div> : <div className='flex flex-col justify-center items-center  h-64' onClick={() => imgref.current.click()}>
              <div >
                <FaImages size={70} />
              </div>

              <input type="file" ref={imgref} onChange={handleconvertToBase64} style={{ display: "none" }} />
              <div>
                <button className='bg-blue-600 px-10 py-2 rounded text-white'>Upload</button>
              </div>
            </div>}
            {image ?
              <div className='flex justify-center items-center mt-2' >
                <button className='w-3/4  bg-blue-600 text-white rounded p-2' onClick={handleUploadImage}>Upload</button>
              </div>
              : ""}
          </div>

          <img src={""} alt="" />


        </Box>
      </Modal>
    </div>
  );
}