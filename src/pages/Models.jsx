import Layout from '../components/Layout'
import { Input, Button, Typography, Card } from '@material-tailwind/react'
import { BASE_URL } from '../consts'

export default function Models() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.price = Number(model.price)
    const response = await fetch(`${BASE_URL}/models`, {
      method: 'POST',
      body: JSON.stringify(model),
      headers: new Headers({ 'content-type': 'application/json' })
    })
    console.log(await response.json())
    // if (response.ok)
  }
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray'>
          Nuevo modelo
        </Typography>
        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Nombre' name='name' />
            <Input label='Precio' name='price' type='number' />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
