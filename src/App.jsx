import './App.css'
import React from 'react'
import Card from './assets/components/Card'
import FormRecipe from './assets/components/FormRecipe'
import SearchBar from './assets/components/SearchBar'
import Button from './assets/components/Button'
import Modal from './assets/components/Modal'
import { FaPlus, FaSliders } from "react-icons/fa6";
import { Form } from 'formik'

function App() {
  const [showForm, setShowForm] = React.useState(false);

  const openFormModal = () => {
    setShowForm(true);
  };
  const closeFormModal = () => {
    setShowForm(false);
  };

  return (
    <>
    <Modal
        open={showForm}
        title="Nova Receita"
        onClose={closeFormModal}
        onConfirm={() => {}}
      >
        <FormRecipe onSubmit={closeFormModal} />
    </Modal>
    <div className="bg-background-200 flex flex-col mb-28 pb-4 pl-28 pt-28 rounded-bl-[100px] rounded-br-[100px] gap-4">
      <h1 className='text-6xl text-title-light font-modak uppercase'>Cookbook</h1>
      {/* adicionar nome do usuario vindo do backend */}
      <p className='text-stone-600 font-semibold text-2xl'>Bem-vindo, <b>Yasmin</b></p>
      <div>
        <div className="flex justify-normal items-center mt-4 mb-8 space-x-4">
          <SearchBar 
            placeholder="Pesquise sua receita..."
          />
           <Button
            icon={<FaSliders className="text-stone-50"/>}
            onClick={() => console.log('Open filters')}
          />
          <Button
            icon={<FaPlus className="text-stone-50"/>}
            onClick={() => openFormModal()}
          />
      </div>
      </div>
    </div>
      <div className='gap-8 mx-28 mt-8 mb-8'>
        <Card 
          title='Lasanha Bolonhesa'
          description='This is a description of the dishe.'
          image='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
          hour={2}
          minute={30}
          category={['Salgado', 'Vegano']}
          portion='4'
          isFavorite={true}
        />
      </div>
    </>
  )
}

export default App
