import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sorType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    // 받아온 값 저장
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // 원본 배열을 수정하지 않고 정렬된 새로운 배열을 반환하는 함수 toSorted
    // js는 기본 사전순 비교임, 객체 내에서 sort가 잘 안됨
    // 그래서 비교함수를 콜백함수로 추가 작성
    return data.toSorted((a, b) => {
      if (sorType === 'oldest') {
        // 더 오래된 일기가 앞으로 배치됨
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        // 최신순으로 배치
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav('/new')}
          text={'새로운 일기 쓰기'}
          type={'POSITIVE'}
        />
      </div>
      <div className="list_warpper">
        {sortedData.map((item) => (
          // 모든 일기 아이템의 데이터를 Props로 전달해줌
          // DiaryItem에서는 전달받은 props의 데이터를 활용할 수 있음
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
