import { api } from "@/services";
import { Container } from "./styles";
import { Modal, Input } from "@/components";
import { useDebounce } from "@/hooks";

import { useQuery } from "react-query";
import { useCallback, useState } from "react";
import { FiAlertCircle, FiArrowLeftCircle, FiArrowRightCircle, FiEdit3, FiInfo, FiLogIn, FiLogOut, FiPlusCircle, FiSearch, FiXCircle } from "react-icons/fi"
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { ImSpinner8 } from "react-icons/im";
import { useAuth } from "@/contexts";

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

type Props = {
  debouncedSearchTerm: string
}

export function CustomerColumn({ debouncedSearchTerm }: Props) {
  const { login, logout, customer: loggedCustomer } = useAuth();
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const { data, refetch, isLoading, error } = useQuery(['customerData', debouncedSearchTerm], async () => {
    return api.get<Customer[]>('/customers', {
      params: { per_page: 50, search: debouncedSearchTerm }
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
    <>
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
      <div className="item full">
        <button onClick={() => setModalIsVisible(true)} className="full"><FiPlusCircle size={22} /> Cadastrar novo cliente</button>
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
      {!error && !isLoading && !customers.length ? (
        <div className="message">
          <FiInfo size={32} /> Nenhum cliente encontrado.
        </div>
      ) : customers?.map((customer, index) => (
        <div key={customer.id} className="item">
          <div className="content">
            <img src={!customer.avatar_url ? `https://picsum.photos/id/${index + 1}/500/500` : customer.avatar_url} width="100" height="auto" />
            <div className="info">
              <h1>{customer.name}</h1>
              <p>{customer.email}</p>
              <p className="featured">{customer.city}, {customer.state}</p>
            </div>
          </div>
          <div className="actions">
            {customer.id === loggedCustomer?.id ? (
              <button onClick={() => logout}><FiLogOut size={22} /></button>
            ) : (
              <button onClick={() => login(customer)}><FiLogIn size={22} /></button>
            )}            
            <button onClick={() => setSelectedCustomer(customer)}><FiEdit3 size={22} /></button>
            <button onClick={() => handleDelete(customer.id)}><FiXCircle size={22} /></button>
          </div>
        </div>
      ))}
    </>
  )
}