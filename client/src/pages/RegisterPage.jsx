import React, { useState } from 'react'
import '../styles/Register.scss'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value
        })
    }


    return (
        <div className='register'>
            <div className='register_content'>
                <form className='register_content_form'>
                    <input type="text" placeholder='First Name'
                        value={formData.firstName} name='firstName'
                        onChange={handleChange} required />
                    <input type="text" placeholder='Last Name'
                        value={formData.lastName} name='lastName'
                        onChange={handleChange} required />
                    <input type="email" placeholder='Email'
                        value={formData.email} name='email'
                        onChange={handleChange} required />
                    <input type="password" placeholder='Password'
                        value={formData.password} name='password'
                        onChange={handleChange} required />
                    <input type="password" placeholder='Confirm Password'
                        value={formData.confirmPassword} name='confirmPassword'
                        onChange={handleChange} required />

                    <input id='image' type="file" name='profileImage'
                        value={formData.profileImage} accept='image/*'
                        onChange={handleChange} required
                        style={{ display: "none" }} />

                    <label htmlFor='image'>
                        <img src="/assets/addImage.png" alt="add" />
                        <p>Upload your photo</p>
                    </label>

                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)}
                            alt='profile' style={{ maxWidth: '80px' }} />
                    )}
                    <button type='submit'>REGISTER</button>
                </form>
                <a href='/login'>Already have an account? Log in here </a>
            </div>
        </div>
    )
}

export default RegisterPage