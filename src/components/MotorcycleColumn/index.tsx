import { api } from "@/services";
import { formatValue } from "@/utils";
import { Container } from "./styles";
import { Modal } from "@/components";

import { useState } from "react";
import { useQuery } from "react-query";
import { FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiPlusCircle, FiXCircle } from "react-icons/fi"
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Motorcycle = {
  id: string
  brand: string
  model: string
  price: string
  engine_capacity: string
  maximum_power: string
  image_url: string
}

type Inputs = {
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
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await api.post('/motorcycles', data)
      refetch()
      reset()
      setModalIsVisible(false)
      toast('Motocicleta adicionada com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao adicionar motocicleta!', { type: 'error' })
    }
  };
  const { data, refetch } = useQuery(['motorcycleData', page], async () => {
    return api.get<Motorcycle[]>('/motorcycles', {
      params: { per_page: 4, page: page }
    })
  })
  const onDelete = async (id: string) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label htmlFor="title">Marca:</label>
            <input {...register('brand', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="model">Modelo:</label>
            <input {...register('model', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="price">Preço: {errors.price && <span>This field is required</span>}</label>
            <input {...register('price', { required: true,  })} />
          </div>
          <div className="input">
            <label htmlFor="engine_capacity">Cilindrada:</label>
            <input {...register('engine_capacity', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="maximum_power">Capacidade máxima:</label>
            <input {...register('maximum_power', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="image_url">URL da Imagem:</label>
            <input {...register('image_url', { required: true })} />
          </div>
          <button type="submit">Enviar</button>
        </form>
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
          <img src={moto.image_url} width="100" height="auto" />
          <div className="info">
            <h1>{moto.brand} - {moto.model}</h1>
            <p>{moto.engine_capacity} cilindrada com {moto.maximum_power } cavalos de potência</p>
            <p className="featured">{formatValue(Number(moto.price))}</p>
          </div>
          <div className="actions">
            <button onClick={() => onDelete(moto.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </Container>
  )
}