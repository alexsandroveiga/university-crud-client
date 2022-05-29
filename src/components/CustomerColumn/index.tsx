import { api } from "@/services";
import { Container } from "./styles";
import { Modal, Input } from "@/components";

import { useQuery } from "react-query";
import { useCallback, useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiPlusCircle, FiXCircle } from "react-icons/fi"
import { toast } from "react-toastify";
import { Form } from "@unform/web";

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

type FormData = {
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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const { data, refetch } = useQuery(['customerData', page], async () => {
    return api.get<Customer[]>('/customers', {
      params: { per_page: 4, page: page }
    })
  })
  const handleAdd = useCallback(async (data: FormData, { reset }) => {
    try {
      await api.post('/customers', data)
      refetch()
      setModalIsVisible(false)
      reset()
      toast('Cliente adicionado com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao adicionar cliente!', { type: 'error' })
    }
  }, [refetch])  
  const handleUpdate = useCallback(async (data: FormData, { reset }) => {
    try {
      await api.put(`/customers/${selectedCustomer?.id}`, data)
      refetch()
      reset()
      setSelectedCustomer(undefined)
      toast('Cliente atualizado com sucesso!', { type: 'success' })
    } catch(err) {
      toast('Erro ao atualizar cliente!', { type: 'error' })
    }
  }, [refetch, selectedCustomer])
  const handleDelete = async (id: string) => {
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
        <Form onSubmit={handleAdd}>
          <Input name="name" title="Nome" />
          <Input name="email" title="E-mail" />
          <Input name="address" title="Endereço" />
          <Input name="phone" title="Telefone" />
          <Input name="identifier" title="CPF/CNPJ" />
          <Input name="city" title="Cidade" />
          <Input name="state" title="Estado" />
          <Input name="zip_code" title="CEP" />
          <Input name="gender" title="Gênero" />
          <Input name="avatar_url" title="URL do avatar" />
          <button type="submit">Cadastrar</button>
        </Form>
      </Modal>
      <Modal
        isVisible={selectedCustomer !== undefined}
        onClose={() => setSelectedCustomer(undefined)}
        title="Atualizar cliente"  
      >
        <Form onSubmit={handleUpdate} initialData={selectedCustomer}>
        <Input name="name" title="Nome" />
          <Input name="email" title="E-mail" />
          <Input name="address" title="Endereço" />
          <Input name="phone" title="Telefone" />
          <Input name="identifier" title="CPF/CNPJ" />
          <Input name="city" title="Cidade" />
          <Input name="state" title="Estado" />
          <Input name="zip_code" title="CEP" />
          <Input name="gender" title="Gênero" />
          <Input name="avatar_url" title="URL do avatar" />
          <button type="submit">Atualizar</button>
        </Form>
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
          <div className="content">
            <img src={customer.avatar_url} width="100" height="auto" />
            <div className="info">
              <h1>{customer.name}</h1>
              <p>{customer.email}</p>
              <p className="featured">{customer.city}, {customer.state}</p>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => setSelectedCustomer(customer)}><FiEdit3 size={22} /></button>
            <button onClick={() => handleDelete(customer.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </Container>
  )
}