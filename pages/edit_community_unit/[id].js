// React imports
import React, { useState, useEffect } from 'react';

// Next imports
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Components imports
import MainLayout from '../../components/MainLayout';

// Controller imports
import { approveRejectCHU, rejectCHU } from '../../controllers/reject';
import { checkToken } from '../../controllers/auth/auth';

// Heroicons imports
import { ArrowsExpandIcon } from '@heroicons/react/outline';

// Package imports
import * as Tabs from '@radix-ui/react-tabs';
import { ChevronDownIcon } from '@heroicons/react/solid';
import
{
  CheckCircleIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
  LockClosedIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import Select from 'react-select';

const CommUnit = (props) =>
{
  const Map = dynamic(
    () => import('../../components/Map'), // replace '@components/map' with your component's location
    {
      loading: () => (
        <div className='text-gray-800 text-lg rounded bg-white py-2 px-5 shadow w-auto mx-2 my-3'>
          Loading&hellip;
        </div>
      ),
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );
  let cu = props.data;

  const [user, setUser] = useState(null);
  const [isCHUDetails, setIsCHUDetails] = useState(true);
  const [isApproveReject, setIsApproveReject] = useState(false);

  useEffect(() =>
  {
    if (typeof window !== 'undefined')
    {
      let usr = window.sessionStorage.getItem('user');
      if (usr && usr.length > 0)
      {
        setUser(JSON.parse(usr));
      }
    }
    return () =>
    {
      setIsCHUDetails(true);
      setIsApproveReject(false);
    };
  }, []);

  const handleChange = (event) =>
  {
    event.preventDefault();

    console.log(event.target.value);
  }
  return (
    console.log(props),
    <div className=''>
      <Head>
        <title>KMHFL - {cu?.name || cu?.official_name}</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='/assets/css/leaflet.css' />
      </Head>

      <MainLayout>
        <div className='w-full grid grid-cols-4 gap-4 p-2 my-6'>
          <div className='col-span-4 flex flex-col items-start px-4 justify-start gap-3'>

            {/* Breadcrumb */}
            <div className='flex flex-row gap-2 text-sm md:text-base'>
              <a className='text-green-700' href='/'>
                Home
              </a>{' '}
              {'>'}
              <a className='text-green-700' href='/community-units'>
                Community units
              </a>{' '}
              {'>'}
              <span className='text-gray-500'>
                {cu.name} ( #
                <i className='text-black'>{cu.code || 'NO_CODE'}</i> )
              </span>
            </div>

            {/* Header snippet */}
            <div
              className={
                'col-span-5 grid grid-cols-6 gap-5 md:gap-8 py-6 w-full bg-gray-50 drop-shadow rounded text-black p-4 md:divide-x md:divide-gray-200z items-center border-l-8 ' +
                (cu.active ? 'border-green-600' : 'border-red-600')
              }
            >
              <div className='col-span-6 md:col-span-3'>
                <h1 className='text-4xl tracking-tight font-bold leading-tight'>
                  {cu.name}
                </h1>
                <div className='flex gap-2 items-center w-full justify-between'>
                  <span
                    className={
                      'font-bold text-2xl ' +
                      (cu.code ? 'text-green-900' : 'text-gray-400')
                    }
                  >
                    #{cu.code || 'NO_CODE'}
                  </span>
                  <p className='text-gray-600 leading-tight'>
                    {cu.keph_level_name && 'KEPH ' + cu.keph_level_name}
                  </p>
                </div>
              </div>
              {/* Info snippet */}
              <div className='flex flex-wrap gap-3 items-center justify-end col-span-6 md:col-span-2'>
                <div className='flex flex-wrap gap-3 w-full items-center justify-start md:justify-center'>
                  {cu.is_approved ? (
                    <span className='bg-green-200 text-green-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <CheckCircleIcon className='h-4 w-4' />
                      CHU Approved
                    </span>
                  ) : (
                    <span className='bg-red-200 text-red-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <XCircleIcon className='h-4 w-4' />
                      Not approved
                    </span>
                  )}
                  {cu.is_closed && (
                    <span className='bg-gray-200 text-gray-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <LockClosedIcon className='h-4 w-4' />
                      CHU Closed
                    </span>
                  )}
                  {cu.deleted && (
                    <span className='bg-gray-200 text-gray-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <XCircleIcon className='h-4 w-4' />
                      CHU Deleted
                    </span>
                  )}
                  {cu.active && (
                    <span className='bg-green-200 text-green-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <CheckCircleIcon className='h-4 w-4' />
                      CHU Active
                    </span>
                  )}
                  {cu.has_fffedits && (
                    <span className='bg-blue-200 text-blue-900 p-1 leading-none text-sm rounded whitespace-nowrap cursor-default flex items-center gap-x-1'>
                      <InformationCircleIcon className='h-4 w-4' />
                      Has changes
                    </span>
                  )}
                </div>
              </div>
              <div className='col-span-6 md:col-span-1 flex flex-col items-center justify-center p-2'>
                {/* {user && user?.id ? <a href={'/community-unit/edit/' + cu.id} className='bg-white border-2 border-black text-black hover:bg-black focus:bg-black-700 active:bg-black-700 font-semibold px-5 py-1 text-base rounded hover:text-white focus:text-white active:text-white w-full whitespace-nowrap text-center'>
                                    Edit
                                </a> : <a href='/auth/login'>Log in</a>} */}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className='col-span-5 md:col-span-3 flex flex-col gap-3 mt-4'>

            <Tabs.Root orientation='horizontal' className='w-full flex flex-col tab-root' defaultValue='overview'>
              {/* Tabs List */}
              <Tabs.List className='list-none flex flex-wrap gap-2 md:gap-3 px-4 uppercase leading-none tab-list font-semibold border-b'>
                <Tabs.Tab value='basic_details' className='p-2 whitespace-nowrap focus:outline:none flex items-center justify-center text-gray-400 text-base hover:text-black cursor-default border-b-2 border-transparent tab-item'>
                  Basic Details
                </Tabs.Tab>
                <Tabs.Tab value='chews' className='p-2 whitespace-nowrap focus:outline:none flex items-center justify-center text-gray-400 text-base hover:text-black cursor-default border-b-2 border-transparent tab-item'>
                  CHEWs
                </Tabs.Tab>
                <Tabs.Tab value='services' className='p-2 whitespace-nowrap focus:outline:none flex items-center justify-center text-gray-400 text-base hover:text-black cursor-default border-b-2 border-transparent tab-item'>
                  Services
                </Tabs.Tab>
              </Tabs.List>

              {/* Panel List */}
              <Tabs.Panel value='basic_details' className='grow-1 py-3 px-4 tab-panel'>
                <>
                  <form className='flex flex-col w-full items-start justify-start gap-3'>

                    {/* CHU Name */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <label
                        htmlFor='comm_unit_name'
                        className='text-gray-600 capitalize text-sm'>
                        Community Health Unit Official Name
                        <span className='text-medium leading-12 font-semibold'>
                          *
                        </span>
                      </label>
                      <input
                        required
                        type='text'
                        name='comm_unit_name'
                        value={cu?.official_name || cu?.name}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none' />
                    </div>

                    {/* CHU Linked Facility */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <label
                        htmlFor='comm_unit_facility'
                        className='text-gray-600 capitalize text-sm'>
                        Community Health Unit Linked Facility
                        <span className='text-medium leading-12 font-semibold'>
                          {' '}
                          *
                        </span>
                      </label>
                      <input
                        required
                        type='text'
                        name='comm_unit_facility'
                        value={cu.facility_name || ' - '}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                      />
                    </div>

                    {/* CHU Operational Status */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <label
                        htmlFor='comm_unit_status'
                        className='text-gray-600 capitalize text-sm'>
                        Operation Status{' '}
                        <span className='text-medium leading-12 font-semibold'>
                          {' '}
                          *
                        </span>
                      </label>
                      <Select
                        options={[
                          {
                            value: 'closed',
                            label: 'Closed',
                          },
                          {
                            value: 'non-functional',
                            label: 'Non-functional',
                          },
                          {
                            value: 'semi-functional',
                            label: 'Semi-functional',
                          },
                          {
                            value: 'fully-functional',
                            label: 'Fully-functional',
                          },
                        ]}
                        required
                        placeholder='Select an operation status ...'
                        onChange={() => console.log('changed')}
                        name='comm_unit_status'
                        value={cu.status_name}
                        className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                      />
                    </div>

                    {/* CHU Dates - Established and Operational */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <div className='grid grid-cols-2 place-content-start gap-3 w-full'>
                        {/* Date Established  */}
                        <div className='col-start-1 col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='date_established'
                              className='text-gray-600 capitalize text-sm'>
                              Date Established
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <input
                              required
                              type='date'
                              name='date_established'
                              value={cu.date_established}
                              className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                            />
                          </div>
                        </div>

                        {/* Date Operational  */}
                        <div className='col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='date_operational'
                              className='text-gray-600 capitalize text-sm'>
                              Date Operational
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <input
                              required
                              type='date'
                              name='date_operational'
                              value={cu.date_operational}
                              className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CHU Number of Monitored Households */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <label
                        htmlFor='no_monitored_households'
                        className='text-gray-600 capitalize text-sm'>
                        Number of monitored households
                        <span className='text-medium leading-12 font-semibold'>
                          {' '}
                          *
                        </span>
                      </label>
                      <input
                        required
                        type='number'
                        name='no_monitored_households'
                        placeholder='Number of households served by the unit'
                        min={0}
                        value={cu.households_monitored}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                      />
                    </div>

                    {/* CHU Number of CHVs */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <label
                        htmlFor='no_chvs'
                        className='text-gray-600 capitalize text-sm'>
                        Number of CHVs
                        <span className='text-medium leading-12 font-semibold'>
                          {' '}
                          *
                        </span>
                      </label>
                      <input
                        required
                        type='number'
                        name='no_chvs'
                        placeholder='Number of Community Health Volunteers in the unit'
                        min={0}
                        value={cu.number_of_chvs}
                        className='flex-none w-full bg-gray-50 rounded p-2 flex-grow border-2 placeholder-gray-500 border-gray-200 focus:shadow-none focus:bg-white focus:border-black outline-none'
                      />
                    </div>

                    {/* CHU, Linked Facility Location */}
                    <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                      <div className='grid grid-cols-4 place-content-start gap-3 w-full'>
                        {/* County  */}
                        <div className='col-start-1 col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='county'
                              className='text-gray-600 capitalize text-sm'>
                              County
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <Select
                              options={[
                                {
                                  value: 'Private Practice',
                                  label: 'Private Practice',
                                },
                                {
                                  value:
                                    'Non-Governmental Organizations',
                                  label:
                                    'Non-Governmental Organizations',
                                },
                                {
                                  value: 'Ministry of Health',
                                  label: 'Ministry of Health',
                                },
                                {
                                  value: 'Faith Based Organization',
                                  label: 'Faith Based Organization',
                                },
                              ]}
                              required
                              placeholder='Select County'
                              name='county'
                              onChange={handleChange}
                              value={cu.facility_county}
                              className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                            />
                          </div>
                        </div>

                        {/* Sub-county */}
                        <div className='col-start-2 col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='sub_county'
                              className='text-gray-600 capitalize text-sm'>
                              Sub-county
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <Select
                              options={[
                                {
                                  value: 'Private Practice',
                                  label: 'Private Practice',
                                },
                                {
                                  value:
                                    'Non-Governmental Organizations',
                                  label:
                                    'Non-Governmental Organizations',
                                },
                                {
                                  value: 'Ministry of Health',
                                  label: 'Ministry of Health',
                                },
                                {
                                  value: 'Faith Based Organization',
                                  label: 'Faith Based Organization',
                                },
                              ]}
                              required
                              placeholder='Select Sub County'
                              onChange={handleChange}
                              name='sub_county'
                              value={cu.facility_subcounty}
                              className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                            />
                          </div>
                        </div>

                        {/* Constituency */}
                        <div className='col-start-3 col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='constituency'
                              className='text-gray-600 capitalize text-sm'>
                              Constituency
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <Select
                              options={[
                                {
                                  value: 'Private Practice',
                                  label: 'Private Practice',
                                },
                                {
                                  value:
                                    'Non-Governmental Organizations',
                                  label:
                                    'Non-Governmental Organizations',
                                },
                                {
                                  value: 'Ministry of Health',
                                  label: 'Ministry of Health',
                                },
                                {
                                  value: 'Faith Based Organization',
                                  label: 'Faith Based Organization',
                                },
                              ]}
                              required
                              placeholder='Select Constituency'
                              onChange={handleChange}
                              name='constituency'
                              value={cu.constituency}
                              className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                            />
                          </div>
                        </div>

                        {/* Ward */}
                        <div className='col-start-4 col-span-1'>
                          <div className='w-full flex flex-col items-start justify-start gap-1 mb-3'>
                            <label
                              htmlFor='ward'
                              className='text-gray-600 capitalize text-sm'>
                              Ward
                              <span className='text-medium leading-12 font-semibold'>
                                {' '}
                                *
                              </span>
                            </label>
                            <Select
                              options={[
                                {
                                  value: 'Private Practice',
                                  label: 'Private Practice',
                                },
                                {
                                  value:
                                    'Non-Governmental Organizations',
                                  label:
                                    'Non-Governmental Organizations',
                                },
                                {
                                  value: 'Ministry of Health',
                                  label: 'Ministry of Health',
                                },
                                {
                                  value: 'Faith Based Organization',
                                  label: 'Faith Based Organization',
                                },
                              ]}
                              required
                              placeholder='Select Ward'
                              name='ward'
                              onChange={handleChange}
                              value={cu.facility_ward}
                              className='flex-none w-full bg-gray-50 rounded flex-grow  placeholder-gray-500 focus:bg-white focus:border-gray-200 outline-none'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </form>
                </>
              </Tabs.Panel>

            </Tabs.Root>

          </div>


        </div>
      </MainLayout>
    </div>
  );
};

CommUnit.getInitialProps = async (ctx) =>
{
  if (ctx.query.q)
  {
    const query = ctx.query.q;

    if (typeof window !== 'undefined' && query.length > 2)
    {
      window.location.href = `/community-units?q=${ query }`;
    } else
    {
      if (ctx.res)
      {
        ctx.res.writeHead(301, {
          Location: '/community-units?q=' + query,
        });
        ctx.res.end();
        return {};
      }
    }
  }
  return checkToken(ctx.req, ctx.res)
    .then((t) =>
    {
      if (t.error)
      {
        throw new Error('Error checking token');
      } else
      {
        let token = t.token;
        let url =
          process.env.NEXT_PUBLIC_API_URL + '/chul/units/' + ctx.query.id + '/';

        return fetch(url, {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        })
          .then((r) => r.json())
          .then((json) =>
          {
            return {
              data: json,
            };
          })
          .catch((err) =>
          {
            console.log('Error fetching facilities: ', err);
            return {
              error: true,
              err: err,
              data: [],
            };
          });
      }
    })
    .catch((err) =>
    {
      console.log('Error checking token: ', err);
      if (typeof window !== 'undefined' && window)
      {
        if (ctx?.asPath)
        {
          window.location.href = ctx?.asPath;
        } else
        {
          let token = t.token;
          let url =
            process.env.NEXT_PUBLIC_API_URL +
            '/chul/units/' +
            ctx.query.id +
            '/';
          return fetch(url, {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
            },
          })
            .then((r) => r.json())
            .then((json) =>
            {
              console.log(json);
              return {
                data: json,
              };
            })
            .catch((err) =>
            {
              console.log('Error fetching facilities: ', err);
              return {
                error: true,
                err: err,
                data: [],
              };
            });
        }
      }
      console.log('My Error:' + err);

      return {
        error: true,
        err: err,
        data: [],
      };
    });
};

export default CommUnit;
