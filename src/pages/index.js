import React, { useEffect, useState } from 'react'

const productsList = [
  { id: 1, name: "Laptop", price: 500, qty: 1 },
  { id: 2, name: "Smartphone", price: 300, qty: 1 },
  { id: 3, name: "Headphones", price: 100, qty: 1 },
  { id: 4, name: "Smartwatch", price: 150, qty: 1 },
];

const freeGift = { id: 99, name: "Wireless Mouse", price: 0, qty: 1 };

const threshold = 1000;

const calculateSubTotal = (myArray) => {

  let subTotal = 0

  myArray.map(item => {
    subTotal += Math.round(item?.price * item?.qty)
  })

  return subTotal

}


const Home = () => {

  const [subTotal, setSubTotal] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState(productsList)

  const progress = Math.min((subTotal / threshold) * 100, 100);

  const handleAddToCart = (prod) => {
    let temp = [...cartItems]

    let existingIndex = temp.findIndex(item => item?.id === prod.id)

    if (existingIndex !== -1) {
      temp[existingIndex].qty += prod.qty
    }
    else {
      temp.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        qty: prod.qty,
      })
    }

    setCartItems(temp)
  }

  const handleCartQtyIncrement = (index) => {
    let temp = [...cartItems]
    temp[index] = {
      ...temp[index],
      qty: temp[index].qty + 1
    }

    setCartItems(temp)
  }


  const handleCartQtyDecrement = (index) => {
    let temp = [...cartItems]

    if (temp[index].qty === 1) {
      temp.splice(index, 1)
    }
    else {
      temp[index] = {
        ...temp[index],
        qty: temp[index].qty - 1
      }
    }

    setCartItems(temp)
  }

  const handleProductQtyIncrement = (index) => {
    let temp = [...products]
    temp[index] = {
      ...temp[index],
      qty: temp[index].qty + 1
    }

    setProducts(temp)
  }


  const handleProductQtyDecrement = (index) => {
    let temp = [...products]
    temp[index] = {
      ...temp[index],
      qty: temp[index].qty - 1
    }
    setProducts(temp)
  }

  useEffect(() => {
    if (cartItems?.length > 0) {
      setSubTotal(calculateSubTotal(cartItems))
    }
    else {
      setSubTotal(0)
    }
  }, [cartItems])

  useEffect(() => {

    let temp = [...cartItems]
    const freeGiftIndex = temp.findIndex(item => item?.id === freeGift.id)

    if (subTotal >= threshold && freeGiftIndex === -1) {
      temp.push(freeGift)
      setCartItems(temp)
    }
    else if (subTotal < threshold && freeGiftIndex !== -1) {
      temp.splice(freeGiftIndex, 1)
      setCartItems(temp)
    }

  }, [subTotal])

  return (
    <div className='flex flex-col w-full min-h-screen bg-[#f2f2f2] lg:p-10 p-6 lg:gap-6 gap-4'>

      <h1 className='lg:text-2xl text-xl text-[#121212] font-bold'>Shopping Cart</h1>


      <div className='flex flex-col lg:gap-6 gap-4 w-full'>

        <h2 className='lg:text-xl text-lg text-[#121212] font-bold'>Products</h2>


        <div className='flex items-center w-full overflow-x-auto snap-x snap-mandatory lg:gap-6 gap-4 pb-4'>

          {
            products.map((item, index) => (
              <div className='lg:w-1/4 shrink-0 flex flex-col lg:p-6 p-4 lg:gap-4 gap-2 bg-white rounded-md shadow'>

                <p className='lg:text-base text-sm text-[#121212]'>{item?.name}</p>
                <p className='lg:text-base text-sm text-[#121212] font-semibold'>&#8377; {item?.price}</p>

                <div className='flex items-center gap-4'>

                  <button onClick={() => handleProductQtyDecrement(index)} disabled={item?.qty === 1} className='w-9 h-9 border border-[#808080] rounded-md lg:text-base text-sm disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'>
                    -
                  </button>

                  <span className='lg:text-base text-sm'>{item?.qty}</span>

                  <button onClick={() => handleProductQtyIncrement(index)} className='w-9 h-9 border border-[#808080] rounded-md lg:text-base text-sm disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'>
                    +
                  </button>

                </div>

                <button onClick={() => handleAddToCart(item)} className='py-2 px-4 bg-blue-500 text-white lg:text-base text-sm font-medium rounded-md cursor-pointer select-none'>
                  Add to Cart
                </button>

              </div>
            ))
          }

        </div>

      </div>

      <div className='flex flex-col lg:gap-6 gap-4 w-full'>

        <h2 className='lg:text-xl text-lg text-[#121212] font-bold'>Cart Summary</h2>

        <div className='flex flex-col lg:p-6 p-4 bg-white rounded-md shadow lg:gap-6 gap-4'>

          <div className='flex items-center justify-between w-full pb-4 border-b border-[#121212]'>

            <p className='lg:text-base text-sm font-semibold text-[#121212]'>Subtotal</p>
            <p className='lg:text-base text-sm font-semibold text-[#121212]'>&#8377; {subTotal}</p>

          </div>


          {
            (subTotal < threshold) ?
              <div className='flex flex-col lg:p-6 p-4 bg-blue-50 gap-2 rounded-md'>

                <p className='lg:text-base text-sm text-[#121212] font-medium'>Add <span className='font-semibold'>&#8377;{threshold - subTotal}</span> more to get a FREE Wirelss Mouse!</p>

                <div className='w-full h-4 bg-slate-200 rounded-md-full relative overflow-hidden'>

                  <div style={{ width: `${progress}%` }} className='h-full absolute bg-blue-500 top-0 left-0' />

                </div>

              </div> :
              <p className='lg:text-base text-sm text-[#121212] font-medium'>You got a free Wireless Mouse!</p>
          }

        </div>

      </div>


      {
        cartItems?.length > 0 ?
          <div className='flex flex-col lg:gap-6 gap-4 w-full'>

            <h2 className='lg:text-xl text-lg text-[#121212] font-bold'>Cart Items</h2>

            <div className='flex flex-col lg:gap-4 gap-2'>
              {
                cartItems.map((item, index) => (
                  <div className='flex items-center justify-between w-full lg:p-6 p-4 bg-white rounded-md shadow'>

                    <div>
                      <p className='lg:text-base text-sm font-semibold text-[#121212]'>{item?.name}</p>
                      <p className='lg:text-base text-sm font-semibold text-[#12121280]'>&#8377; {item?.price} * {item?.qty} = {Math.round(item?.price * item?.qty)}</p>
                    </div>


                    {
                      item?.id === freeGift.id ?
                        <div className='py-2 px-4 bg-green-100 rounded-md text-green-700 text-sm font-semibold uppercase'>
                          Free Gift
                        </div> :
                        <div className='flex items-center gap-4'>

                          <button onClick={() => handleCartQtyDecrement(index)} className='w-9 h-9 bg-red-500 rounded-md text-white lg:text-base text-sm disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'>
                            -
                          </button>

                          <span className='lg:text-base text-sm'>{item?.qty}</span>

                          <button onClick={() => handleCartQtyIncrement(index)} className='w-9 h-9 bg-green-500 rounded-md text-white lg:text-base text-sm disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'>
                            +
                          </button>

                        </div>
                    }
                  </div>
                ))
              }
            </div>

          </div> :
          <div className='flex flex-col w-full lg:p-6 p-4 bg-white rounded-md min-h-40 shadow items-center justify-center'>

            <h2 className='lg:text-base text-sm text-[#121212] font-medium'>Your cart is empty</h2>
            <p className='lg:text-base text-sm'>Add some products to see them here!</p>

          </div>
      }






    </div>
  )
}

export default Home