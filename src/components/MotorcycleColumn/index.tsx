import { api } from "@/services";
import { formatValue } from "@/utils";
import { Modal, Input } from "@/components";
import { useDebounce } from "@/hooks";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { FiAlertCircle, FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiInfo, FiLoader, FiPlusCircle, FiSearch, FiXCircle } from "react-icons/fi"
import { ImSpinner8 } from 'react-icons/im'
import { toast } from "react-toastify";
import { Form } from "@unform/web";

type Motorcycle = {
  id: string
  brand: string
  model: string
  price: string
  engine_capacity: string
  maximum_power: string
  image_url: string
  quantity: number
}

type FormData = {
  brand: string
  model: string
  price: number
  engine_capacity: number
  maximum_power: number
  image_url: string
  quantity: number
}

type Props = {
  debouncedSearchTerm: string
}

export function MotorcycleColumn({ debouncedSearchTerm }: Props) {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle>()

  const { data, refetch, isLoading, error } = useQuery(['motorcycleData', debouncedSearchTerm], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 50, search: debouncedSearchTerm }
    })
  })
  const handleAdd = useCallback(async (data: FormData, { reset }) => {
    try {
      await api.post('/motorcycles', data)
      refetch()
      setModalIsVisible(false)
      reset()
      toast('Motocicleta adicionada com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao adicionar motocicleta!', { type: 'error' })
    }
  }, [refetch])  
  const handleUpdate = useCallback(async (data: FormData) => {
    try {      
      await api.put(`/motorcycles/${selectedMotorcycle?.id}`, data)
      refetch()
      setSelectedMotorcycle(undefined)
      toast('Motocicleta atualizada com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao atualizar motocicleta!', { type: 'error' })
    }
  }, [refetch, selectedMotorcycle?.id])
  const handleDelete = async (id: string) => {
    try {      
      await api.delete(`/motorcycles/${id}`)
      refetch()
      toast('Motocicleta deletada com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao deletar motocicleta!', { type: 'error' })
    }
  }
  const motos = data?.data || []

  return (
    <>
      <Modal
        isVisible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        title="Cadastrar motocicleta"  
      >
        <Form onSubmit={handleAdd}>
          <Input name="brand" title="Marca" />
          <Input name="model" title="Modelo" />
          <Input name="price" title="Preço" type="number" />
          <Input name="engine_capacity" title="Capacidade do motor" type="number" />
          <Input name="maximum_power" title="Potência máxima" type="number" />
          <Input name="image_url" title="URL da imagem" />
          <Input name="quantity" title="Quantidade" type="number" />
          <button type="submit">Cadastrar</button>
        </Form>
      </Modal>
      <Modal
        isVisible={selectedMotorcycle !== undefined}
        onClose={() => setSelectedMotorcycle(undefined)}
        title="Atualizar motocicleta"  
      >
        <Form onSubmit={handleUpdate} initialData={selectedMotorcycle}>
          <Input name="brand" title="Marca" />
          <Input name="model" title="Modelo" />
          <Input name="price" title="Preço" type="number" />
          <Input name="engine_capacity" title="Capacidade do motor" type="number" />
          <Input name="maximum_power" title="Potência máxima" type="number" />
          <Input name="image_url" title="URL da imagem" />
          <button type="submit">Cadastrar</button>
        </Form>
      </Modal>
      <div className="item full">
        <button onClick={() => setModalIsVisible(true)} className="full"><FiPlusCircle size={22} /> Cadastrar motocicleta</button>
      </div>
      {error && (
        <div className="message">
          <FiAlertCircle size={32} /> Ocorreu um erro inesperado.
        </div>
      )}
      {!error && isLoading && (
        <div className="message">
          <ImSpinner8 size={32} className="loading" /> Carregando...
        </div>
      )}
      {!error && !isLoading && !motos.length ? (
        <div className="message">
          <FiInfo size={32} /> Nenhuma motocicleta encontrada.
        </div>
      ) : motos.map((moto, index) => (
        <div key={moto.id} className="item">
          <div className="content">
            <img src={!moto.image_url ? `https://picsum.photos/id/${index + 30}/500/500` : moto.image_url} width="100" height="auto" />
            <div className="info">
              <h1>{moto.brand} - {moto.model}</h1>
              <p>{moto.engine_capacity} cilindrada com {moto.maximum_power } cavalos de potência</p>
              <p className="featured">{formatValue(Number(moto.price))}</p>
            </div>
          </div>          
          <div className="actions">
            <button onClick={() => setSelectedMotorcycle(moto)}><FiEdit3 size={22} /></button>
            <button onClick={() => handleDelete(moto.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </>
  )
}