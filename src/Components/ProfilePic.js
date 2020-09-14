import React from 'react'; 
import {useForm} from 'react-hook-form'

const ProfilePic = () => {

    const {register, handleSubmit} = useForm()
    
    return(
        <div>
            <div>
                <h3>Profile photo</h3>
            </div>
            <div> 
                <img src={} style={{"height": 200}} alt="pic" />  
            </div>
            <div>
                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='file'
                        name='image'
                        accept='image/jpeg'
                        ref={register}
                    ></input>
                    <button>Save changes</button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePic