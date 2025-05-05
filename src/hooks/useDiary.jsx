import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '@/App';
import { useNavigate } from 'react-router-dom';

// use를 함수 이름 앞에 붙이게 되면
// 커스텀 훅이 된다.
// 커스텀 훅 안에서는 useContext, useState와 같은 훅을 사용할 수 있다.
// use가 붙은 훅을 사용하려면 추가적인 커스텀 훅을 만들어주어야 됨

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기');
      // navigate 함수는
      // 컴포넌트들이 다 마운트가 된 이후에 동작함
      nav('/', { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
    //onClickDelete 함수가 실행되고 나서도 useEffect가 진행됨
  }, [id]); //useEffect 값이 비동기로 update되었기에, 의존성 배열에 data를 전달해주지 않는 방식으로 진행

  return curDiaryItem;
};

export default useDiary;
