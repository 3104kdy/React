import './Button.css';

// props를 객체의 구조분해 할당을 이용해서 받아옴
// text 와 type 으로 구분
// 버튼이 실행되었을 떄 받아올 이벤트 함수 onClick
const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
};
export default Button;
