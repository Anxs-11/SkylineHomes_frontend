import { useGetIdentity } from '@refinedev/core'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useForm } from "@refinedev/react-hook-form";

// import { useNavigate } from 'react-router-dom'
import Form from 'components/common/Form'
import axios from 'axios';
const CreateProperty = () => {
  const { data: user } = useGetIdentity();
 
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });
    
    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));

  };
  //@ts-ignore
    // console.log(user.email)
  const onFinishHandler = async (data: FieldValues) => {
    if(!propertyImage.name){return alert("Please select Image")}
     try {
       //  @ts-ignore
      await onFinish({ ...data, photo: propertyImage.url,email:user.email })
     } catch (error) {
       console.error('Error sending data to the backend:', error);
     }
  //   try {
  //   await axios.post('http://localhost:8080/api/v1/properties', {
  //     // @ts-ignore
  //     ...data,photo: propertyImage.url,email: user.email
  //   }, {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   // Handle successful request here
  // } catch (error) {
  //   console.error('Error sending data to the backend:', error);
  //   // Handle error here
  // }
    
    
     
  };

  return (
    <Form 
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  )
}
export default CreateProperty