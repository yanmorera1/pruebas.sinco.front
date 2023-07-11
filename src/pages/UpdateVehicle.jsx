import { Alert, Typography, Card, Button, Input, Spinner } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES, VEHICLE_STATUSES } from '../consts'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import FieldsByVehicleType from '../components/FieldsByVehicleType'
import { useParams } from 'react-router-dom'

export default function UpdateVehicle() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [vehicle, setVehicle] = useState()
  const { vehicleId } = useParams()
  useEffect(() => {
    getVehicle(vehicleId)
  }, [])

  const getVehicle = (vehicleId) => {
    fetch(`${BASE_URL}/vehicles?vehicleId=${vehicleId}`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setVehicle(json[0])
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    const values = Object.entries(model).map(([path, value]) => ({
        path,
        op: 'replace',
        value
    }))

    try {
      const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: new Headers({ 'content-type': 'application/json' })
      })
      if (response.ok) {
        setStatus(FORM_STATES.SUCCESS)
        e.target.reset()
      } else throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
      setStatus(FORM_STATES.FAILED)
    }
  }
  if (!vehicle) return <Spinner />
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray' className='mb-3'>
          Actualizar vehiculo - {vehicle.model.name} - ${vehicle.price}
        </Typography>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Vehículo actualizado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Color' defaultValue={vehicle.color} name='color' required />
            <Input
              label='Kilometraje'
              defaultValue={vehicle.mileage}
              name='mileage'
              type='number'
              required
            />

            {vehicle.status.id === VEHICLE_STATUSES.USED && (
              <Input
                label='Precio'
                defaultValue={vehicle.price}
                name='price'
                type='number'
                required
              />
            )}

            <Input
              label='Url de la imagen'
              defaultValue={vehicle.imgUrl}
              name='imgUrl'
              type='url'
            />

            <FieldsByVehicleType
              vehicleTypeId={vehicle.model?.vehicleType?.id}
              defaultValues={{ displacement: vehicle.displacement, gears: vehicle.gears }}
            />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
