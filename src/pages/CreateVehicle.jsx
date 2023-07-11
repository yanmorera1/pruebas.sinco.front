import { Alert, Typography, Card, Button, Select, Option, Input } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES, VEHICLE_STATUSES } from '../consts'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import FieldsByVehicleType from '../components/FieldsByVehicleType'

export default function CreateVehicles() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [models, setModels] = useState([])
  const [selectedModelId, setSelectedModelId] = useState()
  const [statuses, setStatuses] = useState([])
  const [selectedStatusId, setSelectedStatusId] = useState()

  useEffect(() => {
    getModels()
    getStatuses()
  }, [])

  const getModels = () => {
    fetch(`${BASE_URL}/models`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setModels(json)
      })
      .catch((error) => console.error(error))
  }

  const getStatuses = () => {
    fetch(`${BASE_URL}/statuses`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setStatuses(json)
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.modelId = selectedModelId
    model.statusId = selectedStatusId

    try {
      const response = await fetch(`${BASE_URL}/vehicles`, {
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
          Nuevo vehiculo
        </Typography>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Vehículo creado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Select label='Estado' name='statusId' required onChange={setSelectedStatusId}>
              {statuses.map((status) => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
            <Select label='Modelo' name='modelId' required onChange={setSelectedModelId}>
              {models.map((model) => (
                <Option key={model.id} value={model.id}>
                  {model.name} - {model.price}
                </Option>
              ))}
            </Select>
            <Input label='Color' name='color' required />
            <Input label='Kilometraje' name='mileage' type='number' required />
            
            {selectedStatusId === VEHICLE_STATUSES.USED && <Input label='Precio' name='price' type='number' required />}

            <Input label='Url de la imagen' name='imgUrl' type='url' />

            <FieldsByVehicleType
              vehicleTypeId={models.find((model) => model.id === selectedModelId)?.vehicleType?.id}
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
