import { toast } from 'react-toastify'

// localStorage에 장바구니 상품 담기
export const addCartItem = (data: any) => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : []

  cartItems.push(data)
  toast.success(`${data.name} 상품이 추가되었습니다.`)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

// 장바구니 상품 삭제하기
export const removeCartItem = (data: any) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')!)
  const newCartItem = cartItems.filter((item: any) => item.id !== data.id)

  toast.success(`${data.name}이 장바구니에서 삭제되었습니다.`)
  localStorage.setItem('cartItems', JSON.stringify(newCartItem))
}

// 장바구니 전체 삭제하기
export const clearAllCartItem = () => {
  const cartItems: any[] = []

  toast.success('장바구니가 비었습니다.')
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
