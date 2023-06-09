import React, {useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import plane from '../../assets/plane.png'
import LuggageIcon from '@mui/icons-material/Luggage';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import WifiIcon from '@mui/icons-material/Wifi';
import axios from 'axios';
import PaginationComponent from '@/component/pagination';
import { useCookies } from 'react-cookie';
import Layout from '@/component/layout';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Filter from '@/component/filter';


export const getStaticProps = async () => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/ticket`)
        const data = result.data.data
        return {
            props: {data},
            revalidate: 1
        }
    } catch (error) {
        return { props: {error}}
    }
}


export const ButtonId = ({id, href, text}) => {
    
    const router = useRouter()
     const handleClick = () => {
         router.push(`${href}/${id}`)
     }
   return (
     <div>
         <Button onClick={handleClick} variant='contained' className='px-10 py-5 font-semibold text-lg' style={{backgroundColor:'#2395FF'}}>{text}</Button>
     </div>
   )
 }


const Main = ({data, error}) => {

    const [cookies, setCookies] = useCookies()


    const itemsPerPage = 2;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (e, value) => {
        setPage(value);
    };


  return (
    <>
        {!data ? <div>Loading..</div> : 
            <Layout>
                <main className='mt-10 md:p-10 p-5 flex lg:flex-row flex-col' style={{backgroundColor:'#F5F6FA'}}>
                <div className='xxl:ml-36 xl:w-1/6 lg:w-2/6'>
                    <Filter />
                </div>

                <div className='lg:w-5/6 lg:ml-20 xl:h-screen lg:mt-0 mt-10'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <h3 className='text-2xl font-semibold'>Select Ticket</h3>
                        <h3 className='text-md ml-3 text-zinc-400 opacity-80 tracking-wide'>({data.length} flight found )</h3>
                    </div>
                    <h3 className='text-md font-semibold text-blue-700 mt-1'>Sort by</h3>
                </div>

            {!data ? <div>Loading...</div> : data.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => { 
                    const depHours = parseInt(item.departure_time.split('.')[0]);
                    const depMinutes = parseInt(item.departure_time.split('.')[1]);
                    const arrHours = parseInt(item.time_arrived.split('.')[0]);
                    const arrMinutes = parseInt(item.time_arrived.split('.')[1]);
                    
                    let hours = arrHours - depHours;
                    let minutes = arrMinutes - depMinutes;
                    
                    if (minutes < 0) {
                        hours--;
                        minutes += 60;
                    }
                    
                    const duration = `${hours} Hour ${minutes} Minutes`;
                
                return(
                <div className='bg-white shadow-sm p-2 mt-7 rounded-lg' key={index}>
                    <div className='flex items-center ml-7 mt-2'>
                        <Image src={item.photo} priority={true} alt='lion' width={100} height={100} style={{objectFit:'contain'}}/>
                        <h3 className='ml-5 tracking-wide text-lg font-medium' style={{color:'#595959'}}>{item.name}</h3>
                    </div>
                    <div className='flex xl:justify-around xl:flex-row flex-col md:mx-7 mt-7 xl:items-center'>
                        <div className='flex space-x-10 xl:w-2/6'>
                            <div className='text-center'>
                                <h3 className='font-semibold text-3xl'>{item.from_country}</h3>
                                <p className='tracking-wide text-sm' style={{color:'#595959'}}>{item.departure_time}</p>
                            </div>
                            <div className='lg:items-center xl:justify-center mt-3'>
                                <Image src={plane} alt='plane' className='w-5 h-5 lg:items-center'/>
                            </div>
                            <div className='text-center'>
                                <h3 className='font-semibold text-3xl'>{item.to_country}</h3>
                                <p className='tracking-wide text-sm' style={{color:'#595959'}}>{item.time_arrived}</p>
                            </div>
                        </div>
                        
                            <div className='xl:text-center xl:space-x-0 md:space-x-2 xl:mt-0 mt-5 flex xl:flex-col md:flex-row flex-col'>
                                <p className='tracking-wide font-semibold text-lg xl:hidden flex'>Duration : </p>
                                <div className='flex xxl:flex-row md:flex-col flex-row space-x-2 items-center'>
                                    <p className='font-semibold' style={{color:'#595959'}}>{duration}</p>
                                    <p className='tracking-wide text-sm' style={{color:'#595959'}}>
                                        {item.transit && (item.transit == 0 ? '( Direct )' : item.transit == 1 ? '( 1 Transit )' : '( Transit 2+ )')}
                                    </p>
                                </div>
                            </div>


                            <div className='flex items-center xl:mt-0 mt-7 space-x-2'>
                                <p className='tracking-wide font-semibold text-lg xl:hidden flex'>Facility : </p>
                                {item.facilities && 
                                <div className='space-x-3' style={{color:'#595959'}}>
                                    {item.facilities.split(',').map((facility) => {
                                    if (facility == 'luggage') {
                                        return <LuggageIcon />;
                                    } else if (facility == 'meal') {
                                        return <LunchDiningIcon />;
                                    } else if (facility == 'wifi') {
                                        return <WifiIcon />;
                                    }
                                    })}
                                </div>
                                }
                            </div>
                        
                            <div className='xl:mt-0 mt-5 flex items-center space-x-2'>
                                <p className='tracking-wide font-semibold text-lg xl:hidden flex'>Price : </p>
                                <p> <span className='text-blue-500 '>${item.price},00</span>/pax</p>
                            </div>
                        <div className='xl:mt-0 mt-5'>
                            {cookies.token &&
                            <ButtonId href='/booking' id={item.id} text='Select'/>
                        }
                        </div>
                     </div>
                    <div className='flex items-center mt-5 md:ml-7 pb-2 text-blue-500 font-semibold'>
                        <h3>View Details</h3>
                        <ArrowDropDownIcon />
                    </div>
                </div>
            
                    )})}
                <div className='mt-10 justify-center items-center flex'>
                    <PaginationComponent items={totalPages} page={page} handlePageChange={handlePageChange}/>
                </div>
            </div>
        </main>
     </Layout>
    }
    </>
  )
}

export default Main