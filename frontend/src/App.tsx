import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

//já tem duas rotas considerando que terão apenas duas páginas
import Listing from 'pages/Listing'; //página da listagem
import Form from 'pages/Form'; //página do formulário

import Navbar from "components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/form">
          <Route path=":movieId" element={<Form />} /> {/* uma subrota onde terá o id*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;