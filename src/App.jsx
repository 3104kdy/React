import './App.css';
import { useReducer, useRef, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';

// 임시 일기 데이터
const mokData = [
  {
    id: 1,
    createdDate: new Date('2025-05-03').getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2025-05-02').getTime(),
    emotionId: 2,
    content: '2번 일기 내용 222',
  },
  {
    id: 3,
    createdDate: new Date('2025-04-01').getTime(),
    emotionId: 3,
    content: '3번 일기 내용',
  },
];

// 매개변수로 action 객체를 전달
function reducer(state, action) {
  //state를 복사 (원본 데이터 복사 기능 ...)
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}
// Home 컴포넌트에서 DiaryStateContext를 통해서 데이터 공급을 받아와야 됨 ==> export
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // data라는 stat가 여러개의 일기를 보관하는 용도
  const [data, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(3); //임시 데이터를 2번까지 만들어두었으니 3번 부터 생성

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    // action 객체임
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++, //신규가 생성될 때마다, 증가
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: id,
        createdDate,
        emotionId,
        content,
      },
    });
  };
  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
