// Header 컴포넌트
// Editor 컴포넌트
// EmotionItem 컴포넌트 작성
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const nav = useNavigate();

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button onClick={() => nav('/')} text={'< 뒤로가기'} />}
      />
      <Editor />
    </div>
  );
};

export default New;
