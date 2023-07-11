import { Menu, Typography, Navbar, MenuList, MenuItem, MenuHandler } from '@material-tailwind/react'

import { useState } from 'react'

import { Link } from 'react-router-dom'
export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Navbar className='w-full rounded-none'>
      <ul className='flex gap-3 text-lg'>
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
          <MenuHandler>
            <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium cursor-pointer'>
              Vehiculos
            </Typography>
          </MenuHandler>
          <MenuList className='p-1'>
            <MenuItem>
              <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
                <Link
                  className='flex items-center hover:text-blue-500 transition-colors'
                  to={'/vehicles/create'}
                >
                  Crear Vehiculo
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
                <Link
                  className='flex items-center hover:text-blue-500 transition-colors'
                  to={'/vehicles'}
                >
                  Consultar Vehiculos
                </Link>
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/models'}>
            Modelos
          </Link>
        </Typography>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/sales'}>
            Ventas
          </Link>
        </Typography>
      </ul>
    </Navbar>
  )
}
