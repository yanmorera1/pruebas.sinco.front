import { Input } from '@material-tailwind/react'
import { VEHICLE_TYPES } from '../consts'

export default function FieldsByVehicleType({ vehicleTypeId, defaultValues }) {
  if (vehicleTypeId === VEHICLE_TYPES.MOTORCYCLE)
    return (
      <>
        <Input label='Cilindraje' defaultValue={defaultValues?.displacement} name='displacement' type='number' required />
        <Input label='Número de velocidades' defaultValue={defaultValues?.gears} name='gears' type='number' required />
      </>
    )

  return null
}
