import { HashRouter, Routes, Route } from 'react-router-dom'
import LandingFeed from './pages/LandingFeed'
import Feed from './pages/Feed'
import Detail from './pages/Detail'
import Library from './pages/Library'
import BoletinesIndex from './pages/BoletinesIndex'
import AvisoLegal from './pages/AvisoLegal'
import Privacidad from './pages/Privacidad'
import DivulgacionIA from './pages/DivulgacionIA'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingFeed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/boletines" element={<BoletinesIndex />} />
        <Route path="/boletin/*" element={<Detail />} />
        <Route path="/biblioteca" element={<Library />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/uso-ia" element={<DivulgacionIA />} />
      </Routes>
    </HashRouter>
  )
}
