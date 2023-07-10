import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className='p-2 bg-gray-100 shadow-md'>
      <ul className='flex gap-3 text-lg'>
        <li>
          <Link className='p-2 rounded-md hover:bg-slate-400' to={'/vehicles'}>
            Vehiculos
          </Link>
        </li>
        <li>
          <Link className='p-2 rounded-md hover:bg-slate-400' to={'/models'}>
            Modelos
          </Link>
        </li>
        <li>
          <Link className='p-2 rounded-md hover:bg-slate-400' to={'/sales'}>
            Ventas
          </Link>
        </li>
      </ul>
    </nav>
  )
}
