import { api } from "@/services";
import { formatValue } from "@/utils";
import { Container } from "./styles";
import { Modal, Input } from "@/components";

import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiPlusCircle, FiXCircle } from "react-icons/fi"
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
}

type FormData = {
  brand: string
  model: string
  price: number
  engine_capacity: number
  maximum_power: number
  image_url: string
}

export function MotorcycleColumn() {
  const [page, setPage] = useState(1)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle>()
  const { data, refetch } = useQuery(['motorcycleData', page], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 4, page: page }
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
    <Container>
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
      <div className="column-header">
        <h1><span>&bull;</span> Motocicletas</h1>
        <em />
        <button onClick={() => setModalIsVisible(true)}><FiPlusCircle size={22} /></button>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}><FiArrowLeftCircle size={22} /></button>
        <button onClick={() => setPage(page + 1)} disabled={page >= Number(data?.headers['x-total-pages'])}><FiArrowRightCircle size={22} /></button>
      </div>
      {motos.map(moto => (
        <div key={moto.id} className="item">
          <div className="content">
            <img src={moto.image_url} width="100" height="auto" />
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
    </Container>
  )
}