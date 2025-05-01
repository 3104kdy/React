import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import NotFound from './pages/NotFound';
import { getEmotionImage } from './util/get-emotion-image'; 


// Routes 컴포넌트 안에는 Route만 넣을 수 있음 
// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지 
// 4, "/*" : 잘못된 경로에 대한 NotFound 페이지


// URL 파라미터에 따른 동적 경로 이동 
function App() {

  const nav = useNavigate();

  const onClickButton = () => {
    // 새로운 페이지로 이동
    nav("/new");
  };
  
  return (
    <>
    <div>
      <img src= {getEmotionImage(1)}></img>
      <img src= {getEmotionImage(2)}></img>
      <img src= {getEmotionImage(3)}></img>

    </div>
    <div>
        <Link to="/">홈</Link>
        <Link to="/new">새로운 일기</Link>
        <Link to="/diary">일기 상세</Link>
    </div>

    <button onClick={onClickButton}>New 페이지로 이동</button>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App
 