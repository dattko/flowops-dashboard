import type { CartItem } from "../model/types"

const isSameCartItems = (first: CartItem[], second: CartItem[]) =>
  first.length === second.length &&
  first.every((item, index) => {
    const comparedItem = second[index]

    return (
      comparedItem !== undefined &&
      item.id === comparedItem.id &&
      item.quantity === comparedItem.quantity &&
      item.available === comparedItem.available &&
      item.price === comparedItem.price
    )
  })

export { isSameCartItems }
