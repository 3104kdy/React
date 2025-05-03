import { getEmotionImage } from '../util/get-emotion-image';
import Button from './Button';
import './DiaryItem.css';

const DiaryItem = () => {
  //이미지에 맞는 컬러값을 동적으로 css에 전달
  const emotionId = 4;

  return (
    <div className="DiaryItem">
      <div className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="content"> 일기 컨텐츠 </div>
      </div>
      <div className="button_section">
        <Button text={'수정'}></Button>
      </div>
    </div>
  );
};
export default DiaryItem;
