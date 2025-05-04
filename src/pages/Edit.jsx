import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';

// 절대경로로 import 시도
import Button from '../components/Button';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currDiaryItem) {
      window.alert('존재하지 않는 일기');
      // navigate 함수는
      // 컴포넌트들이 다 마운트가 된 이후에 동작함
      nav('/', { replace: true });
    }

    setCurDiaryItem(currDiaryItem);
    //onClickDelete 함수가 실행되고 나서도 useEffect가 진행됨
  }, [params.id]); //useEffect 값이 비동기로 update되었기에, 의존성 배열에 data를 전달해주지 않는 방식으로 진행

  const onClickDelete = () => {
    // window.confirm 에는 return 값이 boolean으로 존재함
    // 확인을 누를 경우 = true 값을 반환
    if (window.confirm('일기를 정말 삭제하시겠습니까?')) {
      //일기 삭제로직 //App컴포넌트에 선언해둔 onDelete 함수 활용
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정하시겠습니까?')) {
      // useContext로 부터 받은 onUpdate 함수가 호출됨
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      // HOME 페이지로 이동 && 뒤로가기 방지 = replace: true
      nav('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={'< 뒤로가기'}
          />
        }
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
