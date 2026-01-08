import { faBook, faClock, faCloud, faCog, faFaceGrinSquintTears, faLanguage, faMap, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface LinkItem {
  icon: IconDefinition,
  label: string,
  href: string
}

export default function Navbar() {
  const links: LinkItem[] = [
    { icon: faCloud, label: 'Weather', href: '/' },
    { icon: faMap, label: 'Map', href: '/map' },
    { icon: faFaceGrinSquintTears, label: 'Meme', href: '/dailymeme' },
    { icon: faClock, label: 'Global Time', href: '/bookatlas' },
    { icon: faBook, label: 'Info', href: '/info' }
  ]

  return (
    <div className='hidden md:flex flex-row md:flex-col gap-3 h-1 md:min-h-screen md:justify-between justify-center w-10fukk md:w-[8%] py-5 md:py-10 rounded-xl bg-slate-700'>
      <div className='flex felx-row md:flex-col items-center gap-3 justify-center md:justify-start h-full'>
        {links.map((itm, i) => <Link key={i} href={itm.href} className='flex flex-col items-center text-center'>
          <FontAwesomeIcon icon={itm.icon} className='text-2xl text-slate-300'/>
          <p className='hidden md:flex'>{itm.label}</p>
        </Link>)}
      </div>

      <div className='flex flex-col items-center gap-3 justify-center md:justify-end h-full'>
        <button className='flex-col hidden md:flex items-center'>
          <FontAwesomeIcon icon={faLanguage} className='text-2xl text-slate-300'/>
          <span className='hidden md:flex'>Language</span>
        </button>

        <Link href='/settings' className='hidden md:flex flex-col items-center'>
          <FontAwesomeIcon icon={faCog} className='text-2xl text-slate-300'/>
          <span className='hidden md:flex'>Settings</span>
        </Link>
      </div>
    </div>
  )
}
