import Layout from '../components/Layout'
import { Input, Button, Typography, Card, Alert, Option, Select } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import { useState, useEffect } from 'react'

export default function Models() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState()

  useEffect(() => {
    getVehicleTypes()
  }, [])

  const getVehicleTypes = () => {
    fetch(`${BASE_URL}/vehicle/types`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setVehicleTypes(json)
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.price = Number(model.price)
    model.vehicleTypeId = selectedVehicleTypeId

    try {
      const response = await fetch(`${BASE_URL}/models`, {
        method: 'POST',
        body: JSON.stringify(model),
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
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray' className='mb-3'>
          Nuevo modelo
        </Typography>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Modelo creado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Nombre' name='name' />
            <Input label='Precio' name='price' type='number' />
            <Select
              label='Tipo de Vehículo'
              name='vehicleTypeId'
              onChange={setSelectedVehicleTypeId}
            >
              {vehicleTypes.map((vehicleType) => (
                <Option key={vehicleType.id} value={vehicleType.id}>
                  {vehicleType.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
