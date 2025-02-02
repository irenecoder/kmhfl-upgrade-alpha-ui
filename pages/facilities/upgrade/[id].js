
import React, {useState, useRef} from 'react'
import MainLayout from '../../../components/MainLayout'
import Head from 'next/head'
import Link from 'next/link'
import FacilitySideMenu from '../../../components/FacilitySideMenu'
import { checkToken } from "../../../controllers/auth/auth"
import { Formik, Form, Field } from 'formik'
import Select from 'react-select'
import { ChevronRightIcon, ChevronDownIcon }  from '@heroicons/react/solid'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useAlert } from 'react-alert'
import { handleFacilityUpgrades } from '../../../controllers/facility/facilityHandlers'


const Upgrade = props => {

    const alert = useAlert()

    const [khisSynched, setKhisSynched] = useState(false);
    const [facilityFeedBack, setFacilityFeedBack] = useState([])
    const [pathId, setPathId] = useState('') 
    const [allFctsSelected, setAllFctsSelected] = useState(false);
    const [title, setTitle] = useState('');
    const [isFacilityServices, setIsFacilityServices] = useState(false);
    const filters = []

  

    const kephOptions =  props['0']?.kephOptions.sort((a, b) => a < b) 
    const facilityServices =  props['1']?.services 
    const {
        id,
        keph_level,
        facility_type_name
    } = props['2']?.facilityData
    const facilityOptions = props['3']?.facilityTypes
    const levelChangeReasons = props['4']?.levelChangeReasons

    const newkephLvlRef = useRef(null)
    const facilityTypeRef = useRef(null)
    const reasonTypeRef = useRef(null)

    // useEffect(() => {

       
    //     if(newkephLvlRef.current ){
    //         newkephLvlRef.current.state.value = kephOptions.filter(({value}) => value === kephLevel)[0] || ''
    //     }
    // }, [])

    return (
        <>
        <Head>
               <title>KMHFL - Upgrade Facility</title>
               <link rel="icon" href="/favicon.ico" />
        </Head>
       <MainLayout isLoading={false} searchTerm={props?.query?.searchTerm}>
        <div className="w-full grid md:grid-cols-7 gap-4 px-1 md:px-4 py-2 my-4">
                {/* Header */}
                <div className="md:col-span-7 flex flex-col gap-3 md:gap-5 px-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-sm md:text-base">
                                <div className="flex flex-row items-center justify-between gap-2 text-sm md:text-base py-3">
                                    <Link className="text-green-700 cursor-pointer" href='/'>Home</Link>{'/'}
                                    <Link className="text-green-700 cursor-pointer" href='/facilities'>Facilities</Link> {'/'}
                                    <span className="text-gray-500">Upgrade</span>
                                </div>
                            </div>
                            <div className={"col-span-5 flex items-center justify-between p-6 w-full bg-gray-50 drop-shadow rounded text-black p-4 md:divide-x md:divide-gray-200z items-center border-l-8 " + (true ? "border-green-600" : "border-red-600")}>
                                    <h2 className='flex items-center text-xl font-bold text-black capitalize gap-2'>
                                    Upgrade Facility
                                    </h2>
                            </div>
                    
                </div>

                 {/* Facility Side Menu Filters */}
                 <div className="md:col-span-1 md:mt-8">
                            <FacilitySideMenu 
                                filters={filters}
                                states={[khisSynched, facilityFeedBack, pathId, allFctsSelected, title]}
                                stateSetters={[setKhisSynched, setFacilityFeedBack, setPathId, setAllFctsSelected, setTitle]}/>
                </div>

                {/* Facility Upgrade View */}
                <div className='md:col-span-6 flex flex-col items-center gap-2'>
                    {/* Upgrade Form */}
                    <Formik initialValues={{
                        previous_keph: kephOptions.find(({value}) => value === keph_level).label,
                        previous_facility_type: facility_type_name,
                        
                    }}

                    onSubmit={
                        async _ => {

                            handleFacilityUpgrades({
                                facility:id,
                                facility_type: facilityTypeRef.current.state.value.value ?? null,
                                keph_level: newkephLvlRef.current.state.value.value ?? null,
                                reason: reasonTypeRef.current.state.value.value ?? null

                            }, alert)
                        }
                    }
                    >
                        <Form className='md:col-span-5 flex flex-col w-full justify-start items-start gap-2 md:mt-12'>
                            {/* Previous KEPH Level */}
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='collection_date'
                                    className='text-gray-600 capitalize text-sm'>
                                    Previous KEPH Level
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                    </span>
                                </label>
                                <Field
                                    type='text'
                                    name='previous_keph'
                                    disabled={true}
                                    className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                                />
                            </div>

                            {/* New KEPH level */}
                            <div  className="w-full flex flex-col items-start justify-start gap-1 mb-3">
                                <label htmlFor="keph_level" className="text-gray-600 capitalize text-sm">KEPH Level</label>
                                <Select 
                                ref={newkephLvlRef}
                                options={kephOptions ?? []}   
                                placeholder="Select a KEPH Level.."
                                
                                
                                name="keph_level" 
                                className="flex-none  w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
                            </div>



                            {/* Previous Facility Type */}
                            <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                                <label
                                    htmlFor='collection_date'
                                    className='text-gray-600 capitalize text-sm'>
                                    Previous Facility Type
                                    <span className='text-medium leading-12 font-semibold'>
                                        {' '}
                                    </span>
                                </label>
                                <Field
                                    type='text'
                                    name='previous_facility_type'
                                    disabled={true}
                                    className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                                />
                            </div>

                            {/* New Facility Type */}
                            <div  className="w-full flex flex-col items-start justify-start gap-1 mb-3">
                                <label htmlFor="facility_type" className="text-gray-600 capitalize text-sm">Facility Type {" *"}</label>
                                <Select
                                    ref={facilityTypeRef}
                                    options={facilityOptions || []}
                                    required
                                    placeholder="Select a facility type..."
                                    name="facility_type"   
                                    className="flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
                            </div>



                            {/* Reason for Upgrade */}
                            <div  className="w-full flex flex-col items-start justify-start gap-1 mb-3">
                                <label htmlFor="facility_type" className="text-gray-600 capitalize text-sm">Reason for Upgrade {" *"}</label>
                                <Select
                                    ref={reasonTypeRef}
                                    options={levelChangeReasons || []}
                                    required
                                    placeholder="Select a reason"
                                    name="reason_upgrade" 
                                    className="flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none" />
                            </div>

                            {/* View Facility Services Button */}
                            <button
                                className="bg-green-500 font-semibold w-auto text-white flex text-left items-center p-2 h-auto rounded-md"
                                onClick={() => {
                                if (isFacilityServices) {
                                    setIsFacilityServices(false);
                                } else {
                                    setIsFacilityServices(true);
                                }
                                }}
                            >
                                {isFacilityServices ? 'Show' :  'Hide'} Facility Services
                                {isFacilityServices ? (
                                <ChevronRightIcon className="text-white h-7 w-7 font-bold" />
                                ) : (
                                <ChevronDownIcon className="text-white h-7 w-7 text-base font-bold" />
                                )}
                            </button>

                            {/* Facility Services Table */}
                            {
                                !isFacilityServices && 

                                <Table className="md:px-4">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <p className='text-base font-semibold'>Name</p>
                                            </TableCell>
                                            <TableCell className='text-xl font-semibold'>
                                                <p className='text-base font-semibold'>Service Option</p>
                                            </TableCell>
                                        </TableRow>
                                        {
                                            facilityServices.map(({service_name}, id) => (
                                                <TableRow key={id}>
                                                    <TableCell>
                                                        {service_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        Yes
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>


                            }

                            {/* Facility Upgrade Button */}

                            <button
                            type="submit"
                            className="bg-green-500 mt-3 font-semibold w-auto text-white flex text-left items-center p-2 h-auto rounded-md">
                            Upgrade Facility
                            </button>


                        </Form>
                    </Formik>


                  

                </div>

                
            </div>
        </MainLayout>
        </>
    )
}


Upgrade.getInitialProps = async (ctx) => {

    const allOptions = []
    const options = [
        'keph',
		'facility_services',
        'facilities',
        'facility_types',
        'level_change_reasons'	
    ]

    if (ctx.query.q) {
        const query = ctx.query.q
        if (typeof window !== 'undefined' && query.length > 2) {
            window.location.href = `/facilities?q=${query}`
        } else {
            if (ctx.res) {
                ctx.res.writeHead(301, {
                    Location: '/facilities?q=' + query
                });
                ctx.res.end();
                return {};
            }
        }
    }
    
   return checkToken(ctx.req, ctx.res).then(async t => {
        if (t.error) {
            throw new Error('Error checking token')
        } else {
            const token = t.token
            let url = ''




				for(let i = 0; i < options.length; i++) {
					const option = options[i]
                
					switch(option) {

                        case 'keph':
							url = `${process.env.NEXT_PUBLIC_API_URL}/facilities/${option}/?is_active=true&page_size=10000`;
	
						
							try{
	
								const _data = await fetch(url, {
									headers: {
										Authorization: 'Bearer ' + token,
										Accept: 'application/json',
									},
								})
	
								allOptions.push({kephOptions: (await _data.json()).results.map(({id, name }) => ({value:id, label:name}))})
								
							}
							catch(err) {
								console.log(`Error fetching ${option}: `, err);
								allOptions.push({
									error: true,
									err: err.message,
									keph: null,
								})
							}

							break;
					
						case 'facility_services':

							url = `/api/facility/get_facility/?path=facility_services&id=${ctx.query.id}`;

							try{
		
								const _data = await fetch(url, {
									headers: {
										Authorization: 'Bearer ' + token,
										Accept: 'application/json',
									}
								})
	
								allOptions.push({services: (await _data.json()).results.map(({id, service_name, service, facility}) => ({id, service_name, service, facility}))})
								
							}
							catch(err) {
								console.log(`Error fetching ${option}: `, err);
								allOptions.push({
									error: true,
									err: err.message,
									services: null,
								})
							}

                            break;


						case 'facilities':

							url = `/api/facility/get_facility/?path=facilities&id=${ctx.query.id}`;

							try{
		
								const _data = await fetch(url, {
									headers: {
										Authorization: 'Bearer ' + token,
										Accept: 'application/json',
									}
								})
	
								allOptions.push({facilityData: (await _data.json())})
								
							}
							catch(err) {
								console.log(`Error fetching ${option}: `, err);
								allOptions.push({
									error: true,
									err: err.message,
									facilityData: null,
								})
							}
	
							break;

                            case 'facility_types':
                                url = `${process.env.NEXT_PUBLIC_API_URL}/facilities/${option}/`;
        
                                        try{
                                        
                                            const _data = await fetch(url, {
                                                headers: {
                                                    Authorization: 'Bearer ' + token,
                                                    Accept: 'application/json',
                                                },
                                            })
        
									        
									    let results  = (await _data.json()).results.map(({id, name}) => ({value:id, label:name}))
                                            
                    
                                            allOptions.push({facilityTypes: results })
                                            
                                        }
                                        catch(err) {
                                            console.log(`Error fetching ${option}: `, err);
                                            allOptions.push({
                                                error: true,
                                                err: err.message,
                                                facilityTypes: [],
                                            });
                                        }
                                break;

                                case 'level_change_reasons':
                                    url = `${process.env.NEXT_PUBLIC_API_URL}/facilities/${option}/`;
            
                                            try{
                                            
                                                const _data = await fetch(url, {
                                                    headers: {
                                                        Authorization: 'Bearer ' + token,
                                                        Accept: 'application/json',
                                                    },
                                                })
            
                                                
                                            let results  = (await _data.json()).results.map(({id, reason}) => ({value:id, label:reason}))
                                                
                        
                                                allOptions.push({levelChangeReasons: results })
                                                
                                            }
                                            catch(err) {
                                                console.log(`Error fetching ${option}: `, err);
                                                allOptions.push({
                                                    error: true,
                                                    err: err.message,
                                                    levelChangeReasons: [],
                                                });
                                            }
                                    break;

					}
				}

                return allOptions
           

        }
    }).catch(err => {
        console.log('Error checking token: ', err)
        if (typeof window !== 'undefined' && window) {
            if (ctx?.asPath) {
                window.location.href = ctx?.asPath
            } else {
                window.location.href = '/facilities'
            }
        }
        setTimeout(() => {
            return {
                error: true,
                err: err,
                data: [],
            }
        }, 1000);
    })


}

export default Upgrade