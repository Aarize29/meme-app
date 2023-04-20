import React,{useState,useEffect} from 'react'
import { FormField, Card, Loader } from '../components'
import{storage} from '../../firebase'
import { ref,getDownloadURL, listAll } from 'firebase/storage'

const RenderCard=({data,title})=>{
    if(data?.length>0) {
        return data.map((post)=><Card key={post._id} {...post}/>)
    }
    return(
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    )
}

function Home() {
    const imageListRef=ref(storage,'images/')
    const [allPosts, setAllPosts] = useState([])
    const [searchText, setSearchText]
     = useState('')
    const [loading, setLoading] = useState(false)
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
               listAll(imageListRef).then((res)=>{
                     res.items.forEach((itemRef)=>{
                          getDownloadURL(itemRef).then((url)=>{
                            setAllPosts((prev)=>[...prev,{name:'Meme',prompt:'Meme',photo:url}])
                          })
                     })
                })
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }   
        }
        fetchPosts()
    }, [])


    const handleSearchChange = 
    async (e) => {
    clearTimeout(searchTimeout)
     e.preventDefault()
     setSearchText(e.target.value)
     setSearchTimeout(
        setTimeout( () => {
            const searchResults=allPosts.filter((item)=>
               item.name.toLowerCase().includes(searchText.toLowerCase()) ||
               item.prompt.toLowerCase().includes(searchText.toLowerCase())      
               )
               setSearchedResults(searchResults)             
         },500)
     )
    }
  return (
    <section className="max-w-7xl mx-auto">
    <div>
      <h1 className="font-extrabold text-[#222328] text-[32px]" >Memes for and from our community</h1>
      <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of memes shared by our community</p>
    </div>
    <div className="mt-16">
            <FormField labelName="Search Memes"
            type="text"
            name="text"
            placeholder="Search Memes"
            value={searchText}
            handleChange={handleSearchChange}
            />
        </div>
        <div className="mt-10">
            {loading?(
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ):(
                <>
                {searchText&&(
                    <h2 className="font-medium text-[#666e75] text-xl mb-3">Showing results for:
                    <span className='text-[#222328]'>{searchText}
                    </span>
                    </h2>
                )}

<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText?(
                            <RenderCard 
                            data={searchedResults}
                            title="No results found"/>
                        ):(
                            <RenderCard data={allPosts}   
                            title="No posts found"/>
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
  )
}

export default Home
