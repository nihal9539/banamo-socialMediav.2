import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaImages } from 'react-icons/fa6';
import { GrFormPreviousLink } from "react-icons/gr";
import { updatePost, uploadPost } from '../../api/PostRequest';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "68vh",
    bgcolor: 'background.paper',
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
};

export default function NewPostModel({ modelOpne, setModelOpen, data }) {
    

    const handleClose = () => setModelOpen(false);
    const imgref = useRef()
    const [imageBase64, setImageBase64] = useState("")
    const [image, setImage] = useState(data.image)
    const [description, setDescription] = useState(data.description);

    const user = JSON.parse(localStorage.getItem('user'))


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

    const postId = data._id
    const handleUploadImage = () => {
        const data = {
            image: imageBase64,
            description: description,
            userId: user.user._id
        }
        updatePost(postId, data).then((res) => {
            console.log(res);

            setModelOpen(false)
            window.location.reload()
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleChange = () => {
        imgref.current.click()


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
                        <div className={` flex   justify-center  items-center p-1`}>

                            <span className='font-bold text-xl'>Edit Post</span>
                        </div>
                        <hr color='black' className='mb-2' />

                        {image ? <div>
                            <input type="file" ref={imgref} onChange={handleconvertToBase64} style={{ display: "none" }} />

                            <img src={image} onClick={() => imgref.current.click()}
                                className='h-72 w-full' alt="" />
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