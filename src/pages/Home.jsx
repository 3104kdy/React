import { useState, useContext } from 'react';
import { DiaryStateContext } from '../App';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

//해당하는 달에 포함되는 값만 보여주기
const getMonthlyData = (pivotDate, data) => {
  // 이번달의 시작과 끝시간 사이에 있는지 알아야 됨

  // 시작 시간 해당하는 월의 1일의 0시 0분 0초의 시작을 저장해둠
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime(); // 비교를 해야하기에 숫자값 형식으로 저장

  // 마지막 시간 해당하는 월의 마지막 날일의 23시 59분 59초의 데이터를 저장해둠
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1, //다음달의
    0, //0일은 // 이전달의 마지막 날로 지정
    23,
    59,
    59
  ).getTime();

  // 시작 시간보다 크고, 마지막 시간 보다 작다면
  // 이번 달 안에 작성된 글이 맞음
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  // App 컴포넌트의 리턴문 안에 모든 페이지들을 다 하위 컴포넌트로 감싸도록 설정을 해주었음
  // value props로 data steate를 내려주었기 때문에
  // useContext라는 리액트의 훅을 통해서 DiaryStateContext로부터 데이터를 공급받을 수 있는 것
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const montlyData = getMonthlyData(pivotDate, data);

  const onIncreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1} 월`}
        leftChild={<Button onClick={onDecreseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreseMonth} text={'>'} />}
      />
      <DiaryList data={montlyData} />
    </div>
  );
};

export default Home;
