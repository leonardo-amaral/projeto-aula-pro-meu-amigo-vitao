import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.css'

type FakeDataBase = {
  products: products[]
}

type products = {
  name: string
  price: number
}

function App() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<number>(1)
  const [inputName, setInputName] = useState<any>()
  const [inputPrice, setInputPrice] = useState<any>()

  useEffect(() => {
    axios.get('http://localhost:7001/products').then(res => setData(res.data))
  }, [isLoading])

  function setNewDatabase(newValue: { name: string; price: number }) {
    axios.post(
      'http://localhost:7001/products',
      newValue,
      'content-type: application/json'
    )
    setIsLoading(isLoading + 1)
  }

  function deleteDatabase(name: string, price: number, id: any) {
    const deleteProduct = {
      name: name,
      price: price
    }

    axios
      .delete(
        `http://localhost:7001/products/${id}`,
        deleteProduct,
        'content-type: application/json'
      )
      .then(res => console.log(res.data))
    setIsLoading(isLoading + 1)
  }

  const newProduct = {
    name: inputName,
    price: inputPrice
  }

  return (
    <div
      className="App"
      style={{
        margin: '0px',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      <div className="to-do">
        <div
          className="header-to-do"
          style={{
            width: '100vw',
            height: '30vh',
            backgroundColor: '#111111',
            boxShadow: '0 1px 5px solid rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2vh',
            overflowX: 'hidden'
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              textAlign: 'center',
              paddingTop: '50px'
            }}
          >
            To-Do (Aula do vitao)
          </h1>
          <div
            className="itens-tools"
            style={{
              width: '100vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2vh',
              overflowX: 'hidden'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1vw'
              }}
            >
              <div
                className="input-todo"
                style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}
              >
                <h3 style={{ color: '#5f5f5f' }}>Name:</h3>
                <input
                  style={{
                    width: '25vw',
                    border: 'none',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    outline: 'none',
                    paddingLeft: '5px',
                    color: 'white',
                    height: '4vh',
                    overflowX: 'hidden'
                    // boxShadow: '2px 2px 1px solid rgba(0,0,0,0.5)'
                  }}
                  onChange={e => setInputName(e.target.value)}
                />
              </div>
              <div
                className="input-todo"
                style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}
              >
                <h3 style={{ color: '#5f5f5f' }}>Price:</h3>
                <input
                  style={{
                    width: '25vw',
                    border: 'none',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    outline: 'none',
                    paddingLeft: '5px',
                    color: 'white',
                    height: '4vh',
                    overflowX: 'hidden'
                    // boxShadow: '2px 2px 1px solid rgba(0,0,0,0.5)'
                  }}
                  onChange={e => setInputPrice(e.target.value)}
                />
              </div>
            </div>
            <button
              style={{
                width: '52vw',
                height: '4vh',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (newProduct.name === null || undefined) {
                  return alert('Nome vazio!')
                } else if (newProduct.price === null || undefined) {
                  return alert('Price vazio!')
                } else {
                  setNewDatabase(newProduct)
                }
              }}
            >
              Add Product
            </button>
          </div>
        </div>
        <div
          className="to-do-main-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5vh',
            gap: '2vh',
            overflowX: 'hidden'
          }}
        >
          {data?.products?.map((item: any, index: number) => (
            <div
              key={index}
              style={{
                width: '50vw',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '100px',
                padding: '30px',
                overflowX: 'hidden',
                boxShadow: '1px 1px 5px rgba(0,0,0,0.5)'
              }}
            >
              <h1 style={{ color: '#ffffff' }}>{item.name}</h1>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '2vw'
                }}
              >
                <h1 style={{ color: '#059100' }}>R$ {item.price}</h1>
                <button
                  style={{
                    color: '#851a23',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    deleteDatabase(item.name, item.price, item.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
