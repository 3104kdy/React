import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    // useContext로 부터 받은 OnCreate 함수가 호출됨
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    // HOME 페이지로 이동 && 뒤로가기 방지 = replace: true
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        //leftChild={<Button onClick={() => nav('/')} text={'< 뒤로가기'} />}
        // navigate에 인수로 -1을 주면, 페이지를 뒤로 이동시켜줌
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
