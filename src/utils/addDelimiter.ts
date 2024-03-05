// 입력값을 받으면 구분자를 넣어주는 함수
function addDelimiter(value: number | string, delimiter = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}
export default addDelimiter
