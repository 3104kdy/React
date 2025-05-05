import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '@/util/get-stringed-date';

// Editor 컴포넌트는 New , Edit 모두 사용하고 있음
const Editor = ({ initData, onSubmit }) => {
  // input이라는 하나의 state에 보관
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangedInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  // 새로 작성한 Input을 받아서 new 컴포넌트에서 처리
  const onClickSubmitButton = () => {
    // 부모 컴포넌트로부터 받은 onSubmit 함수를 호출
    onSubmit(input);
  };

  // 아래 '저장'버튼을 클릭하면, onClickSubmit이 작동됨
  return (
    <div className="Editor">
      <section className="date_section">
        <h4> 오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangedInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangedInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangedInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button
          text={'취소'}
          onClick={() => {
            nav(-1);
          }}
        />
        <Button onClick={onClickSubmitButton} text={'저장'} type={'POSITIVE'} />
      </section>
    </div>
  );
};

export default Editor;
