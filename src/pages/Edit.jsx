import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import useDiary from '@/hooks/useDiary';

// 절대경로로 import 시도
import Button from '../components/Button';
import Header from '@/components/Header';
import Editor from '@/components/Editor';

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

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
