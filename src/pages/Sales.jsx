import { Card, Typography, Alert, Input, Button, Option, Select } from '@material-tailwind/react'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { BASE_URL, FORM_STATES } from '../consts'

export default function Sales() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicleId, setSelectedVehicleId] = useState()
  const [haveVehiclesForSale, sethaveVehiclesForSale] = useState(true)

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
        else if (res.status === 404){
          sethaveVehiclesForSale(false)
          throw new Error(res.statusText)
        }
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setVehicles(json)
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.vehicleId = selectedVehicleId

    try {
      const response = await fetch(`${BASE_URL}/sales`, {
        method: 'POST',
        body: JSON.stringify(model),
        headers: new Headers({ 'content-type': 'application/json' })
      })
      if (response.ok) {
        setStatus(FORM_STATES.SUCCESS)
        e.target.reset()
        getVehicles()
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
          Nueva venta
        </Typography>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Venta creada</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}
        {!haveVehiclesForSale && <Alert color='red'>No hay vehículos disponibles para la venta</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Número de Identificación' name='identificationNumber' />
            <Input label='Nombre del cliente' name='clientName' />
            <Select label='Vehículo' name='vehicleId' onChange={setSelectedVehicleId}>
              {
                vehicles.map((vehicle) => <Option key={vehicle.id} value={vehicle.id}>{vehicle.model.name}</Option>)
              }
            </Select>
          </div>
          <Button className='mt-6' fullWidth type='submit' disabled={!haveVehiclesForSale}>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
