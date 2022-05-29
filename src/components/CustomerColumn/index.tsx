import { api } from "@/services";
import { Container } from "./styles";
import { Modal } from "@/components";

import { useQuery } from "react-query";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle, FiPlusCircle, FiXCircle } from "react-icons/fi"
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Customer = {
  id: string
  name: string
  email: string
  gender: string
  identifier: string
  address: string
  phone: string
  state: string
  city: string
  zip_code: string
  avatar_url: string
}

type Inputs = {
  name: string
  email: string
  gender: string
  identifier: string
  address: string
  phone: string
  state: string
  city: string
  zip_code: string
  avatar_url: string
}

export function CustomerColumn() {
  const [page, setPage] = useState(1)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await api.post('/customers', data)
      refetch()
      reset()
      setModalIsVisible(false)
      toast('Cliente adicionado com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao adicionar cliente!', { type: 'error' })
    }
  };
  const { data, refetch } = useQuery(['customerData', page], async () => {
    return api.get<Customer[]>('/customers', {
      params: { per_page: 4, page: page }
    })
  })
  const onDelete = async (id: string) => {
    try {      
      await api.delete(`/customers/${id}`)
      refetch()
      toast('Cliente deletado com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao deletar cliente!', { type: 'error' })
    }
  }
  const customers = data?.data || []

  return (
    <Container>
      <Modal
        isVisible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
        title="Cadastrar cliente"  
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label htmlFor="title">Nome:</label>
            <input {...register('name', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Email:</label>
            <input {...register('email', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Identificador:</label>
            <input {...register('identifier', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Endereço:</label>
            <input {...register('address', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Telefone:</label>
            <input {...register('phone', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Estado:</label>
            <input {...register('state', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Cidade:</label>
            <input {...register('city', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">CEP:</label>
            <input {...register('zip_code', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Avatar:</label>
            <input {...register('avatar_url', { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="title">Gênero:</label>
            <input {...register('gender', { required: true })} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </Modal>
      <div className="column-header">
        <h1><span>&bull;</span> Clientes</h1>
        <em />
        <button onClick={() => setModalIsVisible(true)}><FiPlusCircle size={22} /></button>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}><FiArrowLeftCircle size={22} /></button>
        <button onClick={() => setPage(page + 1)} disabled={page >= Number(data?.headers['x-total-pages'])}><FiArrowRightCircle size={22} /></button>
      </div>
      {customers?.map(customer => (
        <div key={customer.id} className="item">
          <img src={customer.avatar_url} width="100" height="auto" />
          <div className="info">
            <h1>{customer.name}</h1>
            <p>{customer.email}</p>
            <p className="featured">{customer.city}, {customer.state}</p>
          </div>
          <div className="actions">
            <button onClick={() => onDelete(customer.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </Container>
  )
}