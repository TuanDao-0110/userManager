import LoginTemplate from './Template/LoginTemplate';
import { Route, Routes, useNavigate } from "react-router-dom";
import UserTemplate from './Template/UserTemplate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NAVIGATOR } from './ultilities/TypeServiceContanst';
import ErrorPages from './Pages/ErrorPages';

import LoadingBackGround from './Component/LoadingBackGround'
import ModalLogout from './Component/ModalLogout';
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch({
      type: NAVIGATOR,
      navigator: navigate
    })
  }, [])

  return (
    <div >
      {/* <LoginTemplate></LoginTemplate> */}
      <LoadingBackGround></LoadingBackGround>
      <ModalLogout></ModalLogout>
      <Routes >

        {/* <Route exact path="/managerment/*" element={<UserTemplate />}  ></Route> */}

        <Route exact path="/managerment/:id/*" element={<UserTemplate />}  ></Route>
        <Route exact path="/" element={<LoginTemplate />}></Route>
        <Route path='*' element={<ErrorPages></ErrorPages>}></Route>

      </Routes>
    </div>
  );
}

export default App;
