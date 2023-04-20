import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../components'
import {preview} from '../assets'
import { storage} from '../../firebase'
import {v4} from 'uuid'
import {ref, uploadBytes} from 'firebase/storage'
import { db } from '../../firebase'
import { onValue,ref as reference, set} from 'firebase/database'
function CreatePost() {
    const navigate = useNavigate()
    const [imageUpload, setImageUpload] = useState(null)
    const [form,setForm]=useState({
        name:'',
        prompt:'',
        photo:'',
    })

    const [loading,setLoading]=useState(false)
    
    const handleUpload=(e)=>{
        const file=e.target.files[0]
        setImageUpload(file);
        if(file && file.type.substr(0,5)==='image'){
            const reader=new FileReader()
            reader.onloadend=()=>{
                setForm({...form,photo:reader.result})
            }
            reader.readAsDataURL(file)
        }
        else{
            alert('Please upload animage')
        }
    }
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            if(imageUpload===null){
                alert('Please upload a meme')
                return
            }
            else{
         
                const imageRef=ref(storage,`images/${imageUpload.name + v4()}`)
                uploadBytes(imageRef,imageUpload).then(()=>{
                    alert('Image uploaded successfully')
                    navigate('/')
                   
                })
            }
        }
        catch(err){
            console.log(err)
        }finally{
            setLoading(false)

        }

    }

  return (
    <section className="max-w-7xl mx-auto">
        <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Upload</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">Contribute to our community by uploading intresting and funny memes!!!</p>
        </div>

        <form  className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <FormField labelName="Your Name" type="text" name="name" placeholder="Enter your name" value={form.name}
                handleChange={handleChange} />
                <FormField labelName="Meme Caption" type="text" name="prompt" placeholder="Enter meme caption" value={form.prompt} handleChange={handleChange} />

                <div className="relative bg-grey-50 border border-grey-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                   {form.photo?( <img src={form.photo
                    } alt="" className="absolute inset-0 w-full h-full object-cover" />):(
                        <img src={preview} alt
                        ="preview" className="absolute inset-0 w-full h-full object-cover" />

                    )
                }
                </div>
                <div>
                        <label htmlFor="photo" className="cursor-pointer">
                            <div className='mt-e text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Upload meme</div>
                            <input type="file" name="photo" id="photo" className="sr-only" onChange={handleUpload} />
                        </label>
                    </div>

            </div>
            <div className="mt-10">
                <p className='mt-2 text-[#666e75] text-14px'> Share it with others in the community</p>
                <button type='submit' className='mt-e text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                    {loading?'Sharing...':'Share with the community'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default CreatePost
