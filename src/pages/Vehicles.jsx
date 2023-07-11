import { Card, Typography } from '@material-tailwind/react'
import Layout from '../components/Layout'
import { BASE_URL } from '../consts'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TABLE_HEAD = ['Modelo', 'Color', 'Precio', 'Tipo', 'Estado', '']
export default function Vehicles() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    getVehicles()
  }, [])

  const getVehicles = () => {
    fetch(`${BASE_URL}/vehicles`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setVehicles(json)
      })
      .catch((error) => console.error(error))
  }

  return (
    <Layout>
      <Typography variant='h4' color='blue-gray' className='mb-3'>
        Vehiculos
      </Typography>
      <Card className='overflow-scroll h-full w-full'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map(({ id, model, color, price, status }, index) => {
              const isLast = index === vehicles.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {model.name}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {color}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {price}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {model.vehicleType.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {status.name}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Link to={`/vehicles/update/${id}`} className='font-medium text-blue-900'>
                      Editar
                    </Link>
                    {/* <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                    Edit
                  </Typography> */}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </Layout>
  )
}
